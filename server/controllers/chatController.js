/* ================================================
   CHAT CONTROLLER - Controlador principal del chat
   ================================================ */

import sessionManager from '../services/sessionManager.js';
import intentEngine from '../services/intentEngine.js';
import contextBuilder from '../services/contextBuilder.js';
import { generateChatResponse } from '../config/openai.config.js';

/**
 * Manejar mensaje de chat
 */
export async function handleChatMessage(req, res) {
    try {
        const message = req.sanitizedMessage;
        const sessionId = req.validatedSessionId;

        console.log(`💬 Nuevo mensaje: "${message.substring(0, 50)}..." (Session: ${sessionId || 'nueva'})`);

        // Obtener o crear sesión
        const session = sessionManager.getSession(sessionId);

        // Detectar intención
        const { intent, confidence } = intentEngine.detectIntent(message);
        console.log(`🎯 Intención detectada: ${intent} (confianza: ${confidence.toFixed(2)})`);

        let responseMessage;

        // Si la confianza es alta y tenemos una respuesta predefinida, usarla
        if (confidence > 0.5) {
            const predefinedResponse = await intentEngine.generateResponse(intent, message);

            if (predefinedResponse) {
                console.log(`⚡ Usando respuesta predefinida para: ${intent}`);
                responseMessage = predefinedResponse;

                // Guardar en historial
                sessionManager.addMessage(session.id, 'user', message);
                sessionManager.addMessage(session.id, 'assistant', responseMessage);

                return res.json({
                    message: responseMessage,
                    sessionId: session.id,
                    intent: intent,
                    source: 'predefined'
                });
            }
        }

        // Si no hay respuesta predefinida, usar OpenAI
        console.log(`🤖 Consultando OpenAI...`);

        // Obtener contexto relevante
        const relevantContext = intentEngine.getRelevantContext(intent);

        // Obtener historial de conversación
        const conversationHistory = sessionManager.getConversationHistory(session.id);

        // Construir mensajes para OpenAI
        const messages = contextBuilder.buildMessages(
            message,
            conversationHistory,
            relevantContext
        );

        // Generar respuesta con OpenAI
        const aiResponse = await generateChatResponse(messages);
        responseMessage = aiResponse.message;

        // Guardar en historial
        sessionManager.addMessage(session.id, 'user', message);
        sessionManager.addMessage(session.id, 'assistant', responseMessage);

        // Responder al cliente
        res.json({
            message: responseMessage,
            sessionId: session.id,
            intent: intent,
            source: 'openai',
            tokensUsed: aiResponse.tokensUsed
        });

    } catch (error) {
        console.error('❌ Error en handleChatMessage:', error);

        // Respuesta de error al cliente
        res.status(500).json({
            error: 'Lo siento, hubo un problema al procesar tu mensaje.',
            message: 'Por favor, intenta de nuevo en unos momentos.',
            fallback: true
        });
    }
}

/**
 * Obtener estadísticas de la sesión
 */
export function getSessionStats(req, res) {
    try {
        const sessionId = req.params.sessionId;

        if (!sessionId) {
            return res.status(400).json({
                error: 'Session ID requerido'
            });
        }

        const stats = sessionManager.getSessionStats(sessionId);

        if (!stats) {
            return res.status(404).json({
                error: 'Sesión no encontrada'
            });
        }

        res.json(stats);

    } catch (error) {
        console.error('❌ Error en getSessionStats:', error);
        res.status(500).json({
            error: 'Error al obtener estadísticas'
        });
    }
}

/**
 * Eliminar sesión
 */
export function deleteSession(req, res) {
    try {
        const sessionId = req.params.sessionId;

        if (!sessionId) {
            return res.status(400).json({
                error: 'Session ID requerido'
            });
        }

        const deleted = sessionManager.deleteSession(sessionId);

        if (!deleted) {
            return res.status(404).json({
                error: 'Sesión no encontrada'
            });
        }

        res.json({
            message: 'Sesión eliminada correctamente'
        });

    } catch (error) {
        console.error('❌ Error en deleteSession:', error);
        res.status(500).json({
            error: 'Error al eliminar sesión'
        });
    }
}

/**
 * Health check
 */
export function healthCheck(req, res) {
    const activeSessions = sessionManager.getActiveSessionsCount();

    res.json({
        status: 'ok',
        service: 'Chatbot Santos API',
        timestamp: new Date().toISOString(),
        activeSessions: activeSessions,
        uptime: process.uptime()
    });
}

export default {
    handleChatMessage,
    getSessionStats,
    deleteSession,
    healthCheck
};
