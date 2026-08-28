import { store } from '../db/inMemoryStore';
import { KnowledgeDocument } from '../types';
import { VectorEmbeddingService } from './VectorEmbeddingService';

export interface RAGSearchResult {
  document: KnowledgeDocument;
  chunkId?: string;
  chunkContent?: string;
  relevanceScore: number;
  vectorSimilarity: number;
}

export class RAGKnowledgeService {
  private static vectorCache: Map<string, number[]> = new Map();

  /**
   * High-accuracy Vector Search combining Cosine Vector Similarity & Keyword Term Frequency
   */
  public static async searchKnowledgeBase(
    query: string, 
    category?: string, 
    limit: number = 3
  ): Promise<RAGSearchResult[]> {
    const queryVector = await VectorEmbeddingService.generateEmbedding(query);
    const results: RAGSearchResult[] = [];

    const docs = Array.from(store.knowledgeDocs.values());

    for (const doc of docs) {
      if (category && doc.category !== category) continue;

      let docVector = this.vectorCache.get(doc.id);
      if (!docVector) {
        const fullContent = `${doc.title} ${doc.content} ${doc.tags.join(' ')}`;
        docVector = await VectorEmbeddingService.generateEmbedding(fullContent);
        this.vectorCache.set(doc.id, docVector);
      }

      const cosineSim = VectorEmbeddingService.cosineSimilarity(queryVector, docVector);

      // Keyword term match boost
      const queryTerms = query.toLowerCase().split(' ').filter(t => t.length > 2);
      let keywordHits = 0;
      queryTerms.forEach(term => {
        if (doc.title.toLowerCase().includes(term) || doc.content.toLowerCase().includes(term)) {
          keywordHits += 1;
        }
      });

      const termBonus = Math.min(0.25, (keywordHits / Math.max(1, queryTerms.length)) * 0.25);
      const combinedScore = Math.min(1.0, cosineSim * 0.75 + termBonus + 0.15);

      if (combinedScore > 0.3) {
        doc.usageCount += 1;
        results.push({
          document: doc,
          chunkContent: doc.content,
          vectorSimilarity: Math.round(cosineSim * 100) / 100,
          relevanceScore: Math.round(combinedScore * 100)
        });
      }
    }

    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return results.slice(0, limit);
  }
}
