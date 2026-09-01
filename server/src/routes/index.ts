import { Router } from 'express';
import bookingsRouter from '../modules/bookings/routes';
import roomsRouter from '../modules/rooms/routes';
import facilitiesRouter from '../modules/facilities/routes';
import organizationsRouter from '../modules/organizations/routes';
import hotelsRouter from '../modules/hotels/routes';
import branchesRouter from '../modules/branches/routes';
import guestsRouter from '../modules/guests/routes';
import checkinsRouter from '../modules/checkins/routes';
import checkoutsRouter from '../modules/checkouts/routes';
import housekeepingRouter from '../modules/housekeeping/routes';
import maintenanceRouter from '../modules/maintenance/routes';
import reportsRouter from '../modules/reports/routes';
import pool from '../config/database';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/db-test', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.use('/organizations', organizationsRouter);
router.use('/hotels', hotelsRouter);
router.use('/branches', branchesRouter);
router.use('/guests', guestsRouter);
router.use('/bookings', bookingsRouter);
router.use('/rooms', roomsRouter);
router.use('/facilities', facilitiesRouter);
router.use('/checkins', checkinsRouter);
router.use('/checkouts', checkoutsRouter);
router.use('/housekeeping', housekeepingRouter);
router.use('/maintenance', maintenanceRouter);
router.use('/reports', reportsRouter);

export default router;
