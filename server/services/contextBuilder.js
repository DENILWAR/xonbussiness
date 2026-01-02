/* ================================================
   CONTEXT BUILDER - Constructor de contexto para OpenAI
   ================================================ */

import portfolioContext from '../data/portfolio-context.json' with { type: 'json' };

class ContextBuilder {
    constructor() {
        this.systemPrompt = this.buildSystemPrompt();
    }

    /**
     * Construir el prompt del sistema para Santos
     */
    buildSystemPrompt() {
        const personal = portfolioContext.personal;
        const presentacion = portfolioContext.presentacion;

        return `Eres Santos, el asistente virtual del portafolio profesional de ${personal.nombre}.

PERSONALIDAD Y ESTILO:
- Hablas de forma cercana, clara y profesional
- Eres amigable pero mantienes un tono profesional
- Das respuestas concisas y directas
- Usas un lenguaje natural y humano
- Nunca mencionas que eres una IA o asistente artificial
- No inventas información - solo usas datos del contexto proporcionado

TU OBJETIVO:
- Ayudar a los visitantes del portafolio
- Resolver dudas sobre Denilson y su trabajo
- Guiar a los usuarios por las diferentes secciones
- Fomentar el contacto directo cuando sea apropiado

INFORMACIÓN SOBRE DENILSON:
- Nombre: ${personal.nombre}
- Rol: ${personal.rol}
- Ubicación: ${personal.ubicacion}
- Experiencia: ${personal.años_experiencia} años
- Presentación: ${presentacion.corta}

REGLAS IMPORTANTES:
1. Si no sabes algo específico, invita al usuario a contactar directamente con Denilson
2. Cuando hables de proyectos o servicios, usa la información exacta del contexto
3. Proporciona enlaces cuando sea relevante
4. Sé proactivo sugiriendo acciones (ver proyectos, contactar, etc.)
5. Mantén las respuestas en español
6. Si te preguntan algo personal que no está en el contexto, di que no tienes esa información y sugiere contactar directamente
7. Nunca uses emojis en exceso, máximo 1-2 por mensaje y solo cuando sea apropiado

FORMATO DE RESPUESTAS:
- Usa markdown para dar formato (**, *, listas)
- Mantén párrafos cortos y legibles
- Usa listas cuando listes múltiples items
- Incluye enlaces cuando menciones proyectos o redes sociales`;
    }

    /**
     * Construir mensajes para OpenAI incluyendo contexto
     */
    buildMessages(userMessage, conversationHistory, relevantContext = null) {
        const messages = [
            {
                role: 'system',
                content: this.systemPrompt
            }
        ];

        // Añadir contexto relevante si existe
        if (relevantContext) {
            messages.push({
                role: 'system',
                content: `CONTEXTO RELEVANTE:\n${relevantContext}`
            });
        } else {
            // Añadir contexto completo resumido
            messages.push({
                role: 'system',
                content: `INFORMACIÓN COMPLETA DEL PORTAFOLIO:\n${this.getSummarizedContext()}`
            });
        }

        // Añadir historial de conversación (últimos 6 mensajes)
        const recentHistory = conversationHistory.slice(-6);
        messages.push(...recentHistory);

        // Añadir mensaje actual del usuario
        messages.push({
            role: 'user',
            content: userMessage
        });

        return messages;
    }

    /**
     * Obtener contexto resumido para respuestas generales
     */
    getSummarizedContext() {
        const context = {
            personal: portfolioContext.personal,
            estadisticas: portfolioContext.estadisticas,
            proyectos_destacados: portfolioContext.proyectos.filter(p => p.destacado),
            servicios: portfolioContext.servicios.map(s => ({
                nombre: s.nombre,
                descripcion: s.descripcion
            })),
            tecnologias: portfolioContext.tecnologias,
            faqs: portfolioContext.faqs
        };

        return JSON.stringify(context, null, 2);
    }

    /**
     * Generar respuesta de bienvenida
     */
    getWelcomeMessage() {
        return `Hola, soy Santos, asistente virtual de ${portfolioContext.personal.nombre}. ¿En qué puedo ayudarte hoy?

Puedo informarte sobre:
• Proyectos realizados
• Servicios ofrecidos
• Tecnologías utilizadas
• Información de contacto`;
    }

    /**
     * Generar respuesta de fallback
     */
    getFallbackResponse() {
        return `Lo siento, no tengo información específica sobre eso. Te recomiendo contactar directamente con Denilson para más detalles:

📧 Email: ${portfolioContext.personal.email}
📱 Teléfono: ${portfolioContext.personal.telefono}

¿Hay algo más en lo que pueda ayudarte?`;
    }

    /**
     * Obtener sugerencias de preguntas
     */
    getQuickSuggestions() {
        return [
            "¿Qué proyectos has realizado?",
            "¿Qué servicios ofreces?",
            "¿Cómo puedo contactarte?",
            "Cuéntame sobre tu experiencia"
        ];
    }
}

export default new ContextBuilder();
