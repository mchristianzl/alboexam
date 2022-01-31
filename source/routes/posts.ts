/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

// use http://test.albo.mx/marvel/colaborators/ironman
router.get('/marvel/colaborators/:name', controller.getColaborators);
router.get('/marvel/characters/:name', controller.getCharacters);

export = router;