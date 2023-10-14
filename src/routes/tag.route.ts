import { Router } from 'express';

import { tagController } from '../controllers';

const router = Router();

router.get('/', tagController.getTags);
router.post('/', tagController.createTag);
router.delete('/:id', tagController.deleteTag);
router.put('/:id', tagController.updateTag);
router.get('/:id', tagController.getTag);

export default router;
