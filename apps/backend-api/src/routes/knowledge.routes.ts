import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { RAGKnowledgeService } from '../services/RAGKnowledgeService';
import { validateBody } from '../middleware/validate';
import { KnowledgeSearchSchema } from '../schemas';

const router = Router();

router.get('/documents', (req, res) => {
  const docs = Array.from(store.knowledgeDocs.values());
  res.json({ success: true, count: docs.length, data: docs });
});

router.post('/search', validateBody(KnowledgeSearchSchema), async (req, res) => {
  try {
    const { query, category } = req.body;
    const results = await RAGKnowledgeService.searchKnowledgeBase(query, category);
    res.json({ success: true, count: results.length, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/vector-search', validateBody(KnowledgeSearchSchema), async (req, res) => {
  try {
    const { query, category, limit } = req.body;
    const results = await RAGKnowledgeService.searchKnowledgeBase(query, category, limit || 5);
    res.json({
      success: true,
      query,
      dimensions: 1536,
      count: results.length,
      data: results
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/prompts', (req, res) => {
  const prompts = Array.from(store.prompts.values());
  res.json({ success: true, count: prompts.length, data: prompts });
});

router.post('/prompts', (req, res) => {
  const { id, agentType, title, systemPrompt, userPromptTemplate } = req.body;
  const prompt = {
    id: id || `pmt-${Date.now()}`,
    agentType,
    title,
    systemPrompt,
    userPromptTemplate,
    version: 1,
    active: true
  };
  store.prompts.set(prompt.id, prompt);
  res.json({ success: true, data: prompt });
});

export const knowledgeRoutes = router;
