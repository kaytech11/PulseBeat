import { Router } from 'express';
import { searchSongs } from '../controllers/search.controller';

const router = Router();

// Search songs
router.get('/', searchSongs);

export default router;