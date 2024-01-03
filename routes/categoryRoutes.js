const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const checkJwt = require('../middlewares/authMiddleware');

router.post('/create', checkJwt,categoryController.categoryCreate );
router.put('/upDate/:id',checkJwt, categoryController.categoryUpdate);
router.get('/getAll', categoryController.categoryGetAll);
module.exports = router;
