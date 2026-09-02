import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await authService.login(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleCode: user.role_code,
        organizationId: user.organization_id,
        hotelId: user.hotel_id,
        branchId: user.branch_id,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getCurrentUser = async (_req: Request, res: Response) => {
  try {
    return res.json({ success: true, user: null });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
