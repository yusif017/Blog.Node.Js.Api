const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllor');
const checkJwt = require('../middlewares/authMiddleware');

router.post('/create', checkJwt, postController.postCreate);
router.put('/upDate/:id',checkJwt, postController.postUpdate);
router.get('/getAll', postController.postGetAll);
module.exports = router;
