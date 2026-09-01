import type { Request, Response } from 'express';
import * as permissionsService from '../services/permissions.service';

export const getAllPermissions = async (_req: Request, res: Response) => {
  try {
    const permissions = await permissionsService.findAll();
    return res.json({ data: permissions });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await permissionsService.findById(Number(req.params.id));
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createPermission = async (req: Request, res: Response) => {
  try {
    const permission = await permissionsService.create(req.body);
    return res.status(201).json(permission);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const permission = await permissionsService.update(Number(req.params.id), req.body);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    return res.json({ success: true, data: permission });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const deleted = await permissionsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    return res.json({ success: true, message: 'Permission deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
