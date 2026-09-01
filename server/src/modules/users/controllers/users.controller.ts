import type { Request, Response } from 'express';
import * as usersService from '../services/users.service';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await usersService.findAll();
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await usersService.findById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await usersService.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await usersService.update(Number(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await usersService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
