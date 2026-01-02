/* ================================================
   SESSION MANAGER - Gestión de sesiones de chat
   ================================================ */

import { v4 as uuidv4 } from 'uuid';

class SessionManager {
    constructor() {
        this.sessions = new Map();
        this.SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos
        this.MAX_HISTORY = 10; // Máximo de mensajes por sesión

        // Limpiar sesiones expiradas cada 5 minutos
        setInterval(() => this.cleanupExpiredSessions(), 5 * 60 * 1000);
    }

    /**
     * Crear o recuperar una sesión
     */
    getSession(sessionId) {
        if (!sessionId) {
            return this.createSession();
        }

        let session = this.sessions.get(sessionId);

        if (!session) {
            session = this.createSession(sessionId);
        } else {
            // Actualizar última actividad
            session.lastActivity = Date.now();
        }

        return session;
    }

    /**
     * Crear nueva sesión
     */
    createSession(sessionId = null) {
        const id = sessionId || uuidv4();

        const session = {
            id: id,
            createdAt: Date.now(),
            lastActivity: Date.now(),
            messageHistory: [],
            context: {},
            messageCount: 0
        };

        this.sessions.set(id, session);
        console.log(`✅ Nueva sesión creada: ${id}`);

        return session;
    }

    /**
     * Añadir mensaje al historial de la sesión
     */
    addMessage(sessionId, role, content) {
        const session = this.sessions.get(sessionId);
        if (!session) return;

        session.messageHistory.push({
            role: role,
            content: content,
            timestamp: Date.now()
        });

        session.messageCount++;

        // Mantener solo los últimos N mensajes
        if (session.messageHistory.length > this.MAX_HISTORY * 2) {
            session.messageHistory = session.messageHistory.slice(-this.MAX_HISTORY * 2);
        }

        session.lastActivity = Date.now();
    }

    /**
     * Obtener historial de conversación de la sesión
     */
    getConversationHistory(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return [];

        return session.messageHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    /**
     * Obtener estadísticas de la sesión
     */
    getSessionStats(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return null;

        return {
            id: session.id,
            messageCount: session.messageCount,
            duration: Date.now() - session.createdAt,
            lastActivity: session.lastActivity
        };
    }

    /**
     * Eliminar sesión
     */
    deleteSession(sessionId) {
        const deleted = this.sessions.delete(sessionId);
        if (deleted) {
            console.log(`🗑️  Sesión eliminada: ${sessionId}`);
        }
        return deleted;
    }

    /**
     * Limpiar sesiones expiradas
     */
    cleanupExpiredSessions() {
        const now = Date.now();
        let cleaned = 0;

        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.lastActivity > this.SESSION_TIMEOUT) {
                this.sessions.delete(sessionId);
                cleaned++;
            }
        }

        if (cleaned > 0) {
            console.log(`🧹 Limpieza: ${cleaned} sesiones expiradas eliminadas`);
        }
    }

    /**
     * Obtener número de sesiones activas
     */
    getActiveSessionsCount() {
        return this.sessions.size;
    }

    /**
     * Verificar si una sesión está activa
     */
    isSessionActive(sessionId) {
        return this.sessions.has(sessionId);
    }
}

// Exportar instancia única (singleton)
export default new SessionManager();
