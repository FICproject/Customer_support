import { Router } from 'express';
import { store } from '../db/inMemoryStore';
import { validateBody } from '../middleware/validate';
import { AuthSwitchUserSchema } from '../schemas';
import { UserRole } from '../types';

const router = Router();

// Switch active user role
router.get('/users', (req, res) => {
  const userList = Array.from(store.users.values());
  res.json({ success: true, count: userList.length, data: userList });
});

router.post('/switch-user', validateBody(AuthSwitchUserSchema), (req, res) => {
  const { userId } = req.body;
  const user = store.users.get(userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.json({ success: true, activeUser: user, message: `Switched perspective to ${user.name} (${user.role})` });
});

// Get all human agents filtered by role/department
router.get('/agents', (req, res) => {
  const { department } = req.query;
  let agents = Array.from(store.users.values()).filter(u => 
    [UserRole.QUERY_AGENT, UserRole.KYC_AGENT, UserRole.PAYMENT_AGENT].includes(u.role as UserRole)
  );
  if (department) {
    agents = agents.filter(a => a.department === department);
  }
  res.json({ success: true, count: agents.length, data: agents });
});

// Create new human agent
router.post('/create-agent', (req, res) => {
  const { name, email, phone, role, department, specializations } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ success: false, error: 'Name, email, and role are required' });
  }

  const agentId = `usr-${role.toLowerCase().replace('_', '-')}-${Date.now().toString().slice(-4)}`;
  const newAgent = {
    id: agentId,
    name,
    email,
    phone: phone || '+91-98800-00000',
    role: role as UserRole,
    userType: store.users.get('usr-superadmin')?.userType || 'INTERNAL' as any,
    department: department || (role === UserRole.QUERY_AGENT ? 'QUERY' : role === UserRole.KYC_AGENT ? 'KYC' : 'PAYMENT') as any,
    specializations: specializations || ['Live AI Monitoring', 'Customer Interaction', 'Escalation Resolution'],
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  store.users.set(agentId, newAgent as any);
  res.status(201).json({ success: true, agent: newAgent, message: `Human Agent ${name} successfully onboarded.` });
});

// Delete / deprovision human agent
router.delete('/agents/:id', (req, res) => {
  const { id } = req.params;
  if (!store.users.has(id)) {
    return res.status(404).json({ success: false, error: 'Agent not found' });
  }
  store.users.delete(id);
  res.json({ success: true, message: `Agent ${id} successfully deprovisioned.` });
});

export const authRoutes = router;

