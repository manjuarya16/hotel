import type { Request, Response } from 'express';
import * as organizationsService from '../services/organizations.service';

export const getAllOrganizations = async (_req: Request, res: Response) => {
  try {
    const organizations = await organizationsService.findAll();
    return res.json({ data: organizations });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const organization = await organizationsService.findById(Number(req.params.id));
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    return res.json(organization);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await organizationsService.create(req.body);
    return res.status(201).json(organization);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await organizationsService.update(Number(req.params.id), req.body);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    return res.json({ success: true, data: organization });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const deleted = await organizationsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    return res.json({ success: true, message: 'Organization deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
