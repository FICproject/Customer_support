import { Router } from 'express';
import { store } from '../db/inMemoryStore';

const router = Router();

router.get('/', (req, res) => {
  const definitions = Array.from(store.workflows.values());
  res.json({ success: true, count: definitions.length, data: definitions });
});

export const workflowRoutes = router;
