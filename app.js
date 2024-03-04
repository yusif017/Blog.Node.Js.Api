const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = 3001;
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // dotenv konfigürasyonunu yükle

// MongoDB bağlantısını yap
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB bağlantısı başarılı");
})
.catch((err) => {
    console.error("MongoDB bağlantı hatası:", err);
});

// Swagger belgelerini oluşturma
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog Api',
            version: 'v1', // Versiyonu buradan değiştirin
            description: 'A sample API'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server'
            }
        ],
    },
    apis: ['./routes/*.js'], // API rotalarını belirtin
};

const specs = swaggerJsdoc(swaggerOptions);

// Express uygulamasına Swagger UI ve API belgeleri için ayrı ayrı URL'ler ekleme
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Giriş logu
app.use((req, res, next) => {
    console.log(`${req.method} isteği alındı: ${req.url}`);
    next();
});

// Rotaları tanımlama ve versiyonlama
app.use(`/api/v2/auth`, authRoutes);
app.use(`/api/v1/post`, postRoutes);
app.use(`/api/v1/category`, categoryRoutes);

// Middleware for v1 version
app.use((req, res, next) => {
    const path = req.originalUrl.split('/')[1]; // Get the first part of the URL
    if (path === 'api' || path === 'swagger') {
        // Allow access to general API and Swagger UI
        next();
    } else {
        // Redirect to v1 routes if v1 is specified
        const version = req.originalUrl.split('/')[2];
        if (version === 'v1') {
            next();
        } else {
            res.status(404).send('Not Found');
        }
    }
});

// Çıkış logu
app.use((req, res, next) => {
    console.log(`İstek tamamlandı: ${res.statusCode}`);
    next();
});

// Router için herhangi bir değişiklik yapmadan kullanılan boş router
const router = express.Router();
app.use(`/`, router);

app.listen(PORT, function () {
    console.log(`localhost:${PORT} çalışıyor`);
});
