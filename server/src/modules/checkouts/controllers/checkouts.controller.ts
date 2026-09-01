import type { Request, Response } from 'express';
import * as checkoutsService from '../services/checkouts.service';

export const getAllCheckouts = async (_req: Request, res: Response) => {
  try {
    const checkouts = await checkoutsService.findAll();
    return res.json({ data: checkouts });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getCheckoutById = async (req: Request, res: Response) => {
  try {
    const checkout = await checkoutsService.findById(Number(req.params.id));
    if (!checkout) {
      return res.status(404).json({ error: 'Checkout not found' });
    }
    return res.json(checkout);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const checkout = await checkoutsService.create(req.body);
    return res.status(201).json(checkout);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCheckout = async (req: Request, res: Response) => {
  try {
    const checkout = await checkoutsService.update(Number(req.params.id), req.body);
    if (!checkout) {
      return res.status(404).json({ error: 'Checkout not found' });
    }
    return res.json({ success: true, data: checkout });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteCheckout = async (req: Request, res: Response) => {
  try {
    const deleted = await checkoutsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Checkout not found' });
    }
    return res.json({ success: true, message: 'Checkout deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
