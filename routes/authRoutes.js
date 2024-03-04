const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Kullanıcı kaydı
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               lastname:
 *                 type: string
 *               firstname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi
 *       500:
 *         description: Kayıt işlemi sırasında bir hata oluştu
 */
router.post('/register', authController.registerUser);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla giriş yaptı, token döner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Kullanıcı adı veya şifre hatalı
 *       500:
 *         description: Giriş işlemi sırasında bir hata oluştu
 *     security:
 *       - bearerAuth: []
 */
router.post('/login', authController.loginUser);

module.exports = router;


module.exports = router;
