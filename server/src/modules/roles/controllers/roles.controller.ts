import type { Request, Response } from 'express';
import * as rolesService from '../services/roles.service';

export const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await rolesService.findAll();
    return res.json({ data: roles });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await rolesService.findById(Number(req.params.id));
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await rolesService.create(req.body);
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await rolesService.update(Number(req.params.id), req.body);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    return res.json({ success: true, data: role });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await rolesService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Role not found' });
    }
    return res.json({ success: true, message: 'Role deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
