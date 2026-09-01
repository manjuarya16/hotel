import type { Request, Response } from 'express';
import * as paymentsService from '../services/payments.service';

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await paymentsService.findAll();
    return res.json({ data: payments });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentsService.findById(Number(req.params.id));
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json(payment);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentsService.create(req.body);
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentsService.update(Number(req.params.id), req.body);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json({ success: true, data: payment });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const deleted = await paymentsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    return res.json({ success: true, message: 'Payment deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
