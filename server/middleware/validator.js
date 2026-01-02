/* ================================================
   VALIDATOR - Validación y sanitización de entrada
   ================================================ */

/**
 * Validar y sanitizar el mensaje del usuario
 */
export const validateChatMessage = (req, res, next) => {
    const { message, sessionId } = req.body;

    // Validar que existe el mensaje
    if (!message) {
        return res.status(400).json({
            error: 'El mensaje es requerido'
        });
    }

    // Validar tipo
    if (typeof message !== 'string') {
        return res.status(400).json({
            error: 'El mensaje debe ser texto'
        });
    }

    // Sanitizar y validar longitud
    const sanitizedMessage = message.trim();

    if (sanitizedMessage.length === 0) {
        return res.status(400).json({
            error: 'El mensaje no puede estar vacío'
        });
    }

    if (sanitizedMessage.length > 1000) {
        return res.status(400).json({
            error: 'El mensaje es demasiado largo (máximo 1000 caracteres)'
        });
    }

    // Validar sessionId si existe
    if (sessionId && typeof sessionId !== 'string') {
        return res.status(400).json({
            error: 'ID de sesión inválido'
        });
    }

    // Validar formato UUID del sessionId
    if (sessionId && !isValidUUID(sessionId)) {
        return res.status(400).json({
            error: 'Formato de ID de sesión inválido'
        });
    }

    // Detectar patrones sospechosos (SQL injection, XSS, etc.)
    if (containsSuspiciousPatterns(sanitizedMessage)) {
        console.warn(`⚠️  Patrón sospechoso detectado: ${sanitizedMessage.substring(0, 50)}`);
        // No bloqueamos, pero registramos
    }

    // Añadir mensaje sanitizado al request
    req.sanitizedMessage = sanitizedMessage;
    req.validatedSessionId = sessionId || null;

    next();
};

/**
 * Validar formato UUID
 */
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

/**
 * Detectar patrones sospechosos
 */
function containsSuspiciousPatterns(text) {
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // event handlers
        /SELECT.*FROM/i,
        /DROP.*TABLE/i,
        /INSERT.*INTO/i,
        /UPDATE.*SET/i,
        /DELETE.*FROM/i,
        /UNION.*SELECT/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(text));
}

/**
 * Sanitizar HTML básico
 */
export function sanitizeHTML(text) {
    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
}

/**
 * Middleware de validación de headers
 */
export const validateHeaders = (req, res, next) => {
    const contentType = req.get('Content-Type');

    if (!contentType || !contentType.includes('application/json')) {
        return res.status(400).json({
            error: 'Content-Type debe ser application/json'
        });
    }

    next();
};

export default {
    validateChatMessage,
    validateHeaders,
    sanitizeHTML
};
