import type { Request, Response } from 'express';
import * as branchesService from '../services/branches.service';

export const getAllBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await branchesService.findAll();
    return res.json({ data: branches });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await branchesService.findById(Number(req.params.id));
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    return res.json(branch);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchesService.create(req.body);
    return res.status(201).json(branch);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchesService.update(Number(req.params.id), req.body);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    return res.json({ success: true, data: branch });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const deleted = await branchesService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    return res.json({ success: true, message: 'Branch deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
