import type { Request, Response } from 'express';
import * as invoicesService from '../services/invoices.service';

export const getAllInvoices = async (_req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.findAll();
    return res.json({ data: invoices });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await invoicesService.findById(Number(req.params.id));
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    return res.json(invoice);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await invoicesService.create(req.body);
    return res.status(201).json(invoice);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await invoicesService.update(Number(req.params.id), req.body);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    return res.json({ success: true, data: invoice });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const deleted = await invoicesService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    return res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
