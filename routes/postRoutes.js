const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllor');
const checkJwt = require('../middlewares/authMiddleware');

/**
 * @openapi
 * /api/v1/post/create:
 *   post:
 *     summary: Post oluşturma
 *     tags: [Post]
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
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post başarıyla oluşturuldu
 *       401:
 *         description: Yetkilendirme başarısız
 */

router.post('/create', checkJwt, postController.postCreate);
/**
 * @openapi
 * /api/v1/post/upDate/{id}:
 *   put:
 *     summary: Post güncelleme
 *     tags: [Post]
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
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post başarıyla güncellendi
 *       401:
 *         description: Yetkilendirme başarısız
 */
router.put('/upDate/:id',checkJwt, postController.postUpdate);
/**
 * @openapi
 * /api/v1/post/getAll:
 *   get:
 *     summary: Tüm posts alma
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Tüm posts başarıyla alındı
 *       404:
 *         description: Posts bulunamadı
 */
router.get('/getAll', postController.postGetAll);
module.exports = router;
