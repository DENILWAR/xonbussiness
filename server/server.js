/* ================================================
   CHATBOT SANTOS - SERVIDOR PRINCIPAL
   ================================================ */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Importar middleware
import { chatRateLimiter, strictRateLimiter } from './middleware/rateLimiter.js';
import { validateChatMessage, validateHeaders } from './middleware/validator.js';

// Importar controladores
import {
    handleChatMessage,
    getSessionStats,
    deleteSession,
    healthCheck
} from './controllers/chatController.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3001;

// ==================== Middleware de Seguridad ====================

// Helmet para headers de seguridad
app.use(helmet({
    contentSecurityPolicy: false, // Deshabilitamos CSP para desarrollo
    crossOriginEmbedderPolicy: false
}));

// CORS configurado
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5500', 'http://127.0.0.1:5500'];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir requests sin origin (como Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            console.warn(`⚠️  Origen bloqueado: ${origin}`);
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
}));

// Body parser
app.use(express.json({ limit: '10kb' })); // Limitar tamaño del body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiters globales
app.use('/api/', strictRateLimiter);

// ==================== Logging Middleware ====================
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// ==================== Rutas ====================

/**
 * Health Check
 */
app.get('/api/health', healthCheck);

/**
 * Ruta principal del chat
 * POST /api/chat
 */
app.post(
    '/api/chat',
    chatRateLimiter,
    validateHeaders,
    validateChatMessage,
    handleChatMessage
);

/**
 * Obtener estadísticas de sesión
 * GET /api/session/:sessionId
 */
app.get('/api/session/:sessionId', getSessionStats);

/**
 * Eliminar sesión
 * DELETE /api/session/:sessionId
 */
app.delete('/api/session/:sessionId', deleteSession);

/**
 * Ruta raíz - Información de la API
 */
app.get('/', (req, res) => {
    res.json({
        service: 'Chatbot Santos API',
        version: '1.0.0',
        description: 'API Backend para el chatbot del portafolio de Denilson Capa',
        endpoints: {
            chat: 'POST /api/chat',
            health: 'GET /api/health',
            session: 'GET /api/session/:sessionId',
            deleteSession: 'DELETE /api/session/:sessionId'
        },
        documentation: 'https://github.com/DENILWAR'
    });
});

// ==================== Error Handlers ====================

/**
 * 404 - Ruta no encontrada
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
});

/**
 * Error handler global
 */
app.use((err, req, res, next) => {
    console.error('❌ Error no manejado:', err);

    // Error de CORS
    if (err.message === 'No permitido por CORS') {
        return res.status(403).json({
            error: 'Acceso no permitido desde este origen'
        });
    }

    // Error de JSON malformado
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'JSON malformado en el request'
        });
    }

    // Error genérico
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Por favor, intenta de nuevo'
    });
});

// ==================== Iniciar Servidor ====================

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🤖  CHATBOT SANTOS - Servidor iniciado');
    console.log('='.repeat(60));
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 CORS habilitado para: ${allowedOrigins.join(', ')}`);
    console.log(`⚡ Endpoints disponibles:`);
    console.log(`   - POST   http://localhost:${PORT}/api/chat`);
    console.log(`   - GET    http://localhost:${PORT}/api/health`);
    console.log(`   - GET    http://localhost:${PORT}/api/session/:id`);
    console.log(`   - DELETE http://localhost:${PORT}/api/session/:id`);
    console.log('='.repeat(60) + '\n');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('\n🛑 Recibida señal SIGTERM. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Recibida señal SIGINT. Cerrando servidor...');
    process.exit(0);
});

export default app;
