// routers/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const checkJwt = require('../middlewares/authMiddleware');

/**
 * @openapi
 * /api/v1/category/create:
 *   post:
 *     summary: Kategori oluşturma
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kategori başarıyla oluşturuldu
 *       401:
 *         description: Yetkilendirme başarısız
 */
router.post('/create', checkJwt, categoryController.categoryCreate);

/**
 * @openapi
 * /api/v1/category/upDate/{id}:
 *   put:
 *     summary: Kategori güncelleme
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kategori başarıyla güncellendi
 *       401:
 *         description: Yetkilendirme başarısız
 */
router.put('/upDate/:id', checkJwt, categoryController.categoryUpdate);

/**
 * @openapi
 * /api/v1/category/getAll:
 *   get:
 *     summary: Tüm kategorileri alma
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Tüm kategoriler başarıyla alındı
 *       404:
 *         description: Kategoriler bulunamadı
 */
router.get('/getAll', categoryController.categoryGetAll);

module.exports = router;
