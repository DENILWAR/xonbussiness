/* ================================================
   RATE LIMITER - Protección contra spam y abuso
   ================================================ */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter para la API de chat
 * Límite: 20 mensajes por minuto por IP
 */
export const chatRateLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000, // 1 minuto
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 20, // 20 requests
    message: {
        error: 'Demasiadas solicitudes. Por favor, espera un momento antes de continuar.',
        retryAfter: 60
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        console.warn(`⚠️  Rate limit excedido para IP: ${req.ip}`);
        res.status(429).json({
            error: 'Demasiadas solicitudes. Por favor, espera un momento antes de continuar.',
            retryAfter: 60
        });
    }
});

/**
 * Rate limiter más estricto para prevenir abuso severo
 * Límite: 100 mensajes por hora por IP
 */
export const strictRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 100, // 100 requests
    message: {
        error: 'Has excedido el límite de mensajes por hora. Intenta más tarde.',
        retryAfter: 3600
    },
    skipSuccessfulRequests: false,
    handler: (req, res) => {
        console.error(`🚨 Rate limit severo excedido para IP: ${req.ip}`);
        res.status(429).json({
            error: 'Has excedido el límite de mensajes por hora. Por favor, inténtalo más tarde.'
        });
    }
});

export default {
    chatRateLimiter,
    strictRateLimiter
};
