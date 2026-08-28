import OpenAI from 'openai';

export interface VectorChunk {
  chunkId: string;
  docId: string;
  title: string;
  content: string;
  category: string;
  embedding: number[];
}

export class VectorEmbeddingService {
  private static openaiClient: OpenAI | null = null;

  private static getOpenAIClient(): OpenAI | null {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    if (!this.openaiClient) {
      try {
        this.openaiClient = new OpenAI({ apiKey });
      } catch (err) {
        console.warn('VectorEmbeddingService OpenAI init fallback:', err);
      }
    }
    return this.openaiClient;
  }

  /**
   * Generates a 1536-dimensional vector embedding for a given text query/document.
   */
  public static async generateEmbedding(text: string): Promise<number[]> {
    const client = this.getOpenAIClient();
    if (client) {
      try {
        const res = await client.embeddings.create({
          model: 'text-embedding-3-small',
          input: text
        });
        if (res.data && res.data[0] && res.data[0].embedding) {
          return res.data[0].embedding;
        }
      } catch (err: any) {
        console.warn('OpenAI Embedding error, fallback to semantic hashing vector:', err?.message || err);
      }
    }

    // Deterministic 1536-dimensional semantic hashing vector for zero-config fallback
    return this.generateDeterministicVector(text, 1536);
  }

  /**
   * Calculates cosine similarity between two 1536-dimensional vectors.
   * Returns a score between 0.0 and 1.0 (or 0% to 100%).
   */
  public static cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (!vectorA || !vectorB || vectorA.length !== vectorB.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return Math.max(0, Math.min(1, dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))));
  }

  /**
   * Splits long text into overlapping chunks of approx. chunkSize characters.
   */
  public static chunkText(text: string, chunkSize: number = 400, overlap: number = 80): string[] {
    if (!text || text.length <= chunkSize) return [text];

    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      let end = start + chunkSize;
      if (end < text.length) {
        const lastSpace = text.lastIndexOf(' ', end);
        if (lastSpace > start) {
          end = lastSpace;
        }
      }
      chunks.push(text.substring(start, end).trim());
      start = end - overlap;
    }

    return chunks.filter(c => c.length > 0);
  }

  private static generateDeterministicVector(text: string, dimensions: number = 1536): number[] {
    const vector: number[] = new Array(dimensions).fill(0);
    const normalizedText = text.toLowerCase();
    
    for (let i = 0; i < normalizedText.length; i++) {
      const charCode = normalizedText.charCodeAt(i);
      const index = (charCode * 31 + i) % dimensions;
      vector[index] += Math.sin(charCode + i) * 0.1 + 0.05;
    }

    // L2 Normalize
    let norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (norm === 0) norm = 1;
    return vector.map(val => val / norm);
  }
}
