/* ================================================
   INTENT ENGINE - Motor de detección de intenciones
   ================================================ */

import portfolioContext from '../data/portfolio-context.json' with { type: 'json' };

class IntentEngine {
    constructor() {
        this.intents = {
            proyectos: {
                keywords: ['proyecto', 'proyectos', 'trabajo', 'trabajos', 'portfolio', 'portafolio', 'realizados', 'completados', 'natural groove', 'construcciones', 'padema'],
                response: this.generateProjectsResponse.bind(this)
            },
            servicios: {
                keywords: ['servicio', 'servicios', 'ofrece', 'ofreces', 'haces', 'hace', 'mantenimiento', 'auditoria', 'auditoría', 'desarrollo', 'seo', 'optimización', 'automatización', 'automatizacion', 'chatbot', 'chatbots', 'atencion', 'atención'],
                response: this.generateServicesResponse.bind(this)
            },
            automatizacion: {
                keywords: ['automatización', 'automatizacion', 'chatbot', 'chatbots', 'bot', 'bots', 'asistente virtual', 'atencion automatizada', 'atención automatizada', 'ia', 'inteligencia artificial', 'automatizar'],
                response: this.generateAutomationResponse.bind(this)
            },
            contacto: {
                keywords: ['contacto', 'contactar', 'email', 'correo', 'teléfono', 'telefono', 'llamar', 'escribir', 'hablar'],
                response: this.generateContactResponse.bind(this)
            },
            tecnologias: {
                keywords: ['tecnología', 'tecnologias', 'tecnología', 'stack', 'herramienta', 'herramientas', 'lenguaje', 'lenguajes', 'framework', 'react', 'node', 'python'],
                response: this.generateTechResponse.bind(this)
            },
            experiencia: {
                keywords: ['experiencia', 'trayectoria', 'años', 'tiempo', 'aprendizaje', 'formación', 'autodidacta', 'historia'],
                response: this.generateExperienceResponse.bind(this)
            },
            sobre_mi: {
                keywords: ['quien', 'quién', 'eres', 'sobre ti', 'sobre mi', 'presentación', 'presentacion', 'conocer'],
                response: this.generateAboutResponse.bind(this)
            }
        };
    }

    /**
     * Detectar la intención del mensaje del usuario
     */
    detectIntent(message) {
        const normalizedMessage = this.normalizeText(message);

        // Buscar coincidencias con keywords
        for (const [intentName, intent] of Object.entries(this.intents)) {
            for (const keyword of intent.keywords) {
                if (normalizedMessage.includes(keyword)) {
                    return {
                        intent: intentName,
                        confidence: this.calculateConfidence(normalizedMessage, intent.keywords)
                    };
                }
            }
        }

        return {
            intent: 'general',
            confidence: 0
        };
    }

    /**
     * Generar respuesta basada en la intención
     */
    async generateResponse(intent, message) {
        const intentData = this.intents[intent];

        if (intentData && intentData.response) {
            return intentData.response(message);
        }

        return null; // Deja que OpenAI maneje la respuesta
    }

    /**
     * Normalizar texto para búsqueda
     */
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remover acentos
            .trim();
    }

    /**
     * Calcular confianza de la intención
     */
    calculateConfidence(message, keywords) {
        let matches = 0;
        for (const keyword of keywords) {
            if (message.includes(keyword)) {
                matches++;
            }
        }
        return matches / keywords.length;
    }

    // ==================== Generadores de Respuestas ====================

    generateProjectsResponse() {
        const proyectos = portfolioContext.proyectos;
        const destacados = proyectos.filter(p => p.destacado);

        let response = "He trabajado en varios proyectos interesantes:\n\n";

        destacados.forEach((proyecto, index) => {
            response += `${index + 1}. **${proyecto.nombre}**\n`;
            response += `   ${proyecto.descripcion}\n`;
            response += `   Tecnologías: ${proyecto.tecnologias.join(', ')}\n`;
            if (proyecto.url) {
                response += `   Ver proyecto: ${proyecto.url}\n`;
            }
            response += '\n';
        });

        response += "\n¿Te gustaría saber más sobre alguno de estos proyectos en particular?";

        return response;
    }

    generateServicesResponse() {
        const servicios = portfolioContext.servicios;

        let response = "Ofrezco los siguientes servicios profesionales:\n\n";

        servicios.forEach((servicio, index) => {
            response += `${index + 1}. **${servicio.nombre}**\n`;
            response += `   ${servicio.descripcion}\n`;
            response += `   Incluye: ${servicio.caracteristicas.join(', ')}\n\n`;
        });

        response += "¿En qué servicio estás interesado? Puedo darte más detalles.";

        return response;
    }

    generateContactResponse() {
        const contacto = portfolioContext.personal;

        let response = "Puedes contactar conmigo a través de:\n\n";
        response += `📧 Email: ${contacto.email}\n`;
        response += `📱 Teléfono: ${contacto.telefono}\n`;
        response += `📍 Ubicación: ${contacto.ubicacion}\n\n`;
        response += `También puedes encontrarme en:\n`;
        response += `• LinkedIn: ${contacto.linkedin}\n`;
        response += `• GitHub: ${contacto.github}\n`;
        response += `• Instagram: ${contacto.instagram}\n\n`;
        response += "No dudes en escribirme, estaré encantado de hablar sobre tu proyecto.";

        return response;
    }

    generateTechResponse() {
        const tech = portfolioContext.tecnologias;

        let response = "Trabajo con las siguientes tecnologías:\n\n";
        response += `**Frontend:** ${tech.frontend.join(', ')}\n`;
        response += `**Backend:** ${tech.backend.join(', ')}\n`;
        response += `**Diseño:** ${tech.diseño.join(', ')}\n`;
        response += `**Herramientas:** ${tech.herramientas.join(', ')}\n\n`;
        response += `**Especialidades:**\n`;
        tech.especialidades.forEach(esp => {
            response += `• ${esp}\n`;
        });

        return response;
    }

    generateExperienceResponse() {
        const personal = portfolioContext.personal;
        const experiencia = portfolioContext.experiencia_empresarial;
        const sobreMi = portfolioContext.sobre_mi;

        let response = `Llevo **${personal.años_experiencia} años** desarrollando webs y aplicaciones profesionalmente.\n\n`;
        response += `${sobreMi.historia}\n\n`;
        response += "**Experiencia destacada:**\n\n";

        experiencia.forEach(exp => {
            response += `• **${exp.empresa}** - ${exp.rol}\n`;
            response += `  ${exp.descripcion}\n\n`;
        });

        response += "Estoy en constante aprendizaje y siempre explorando nuevas tecnologías.";

        return response;
    }

    generateAboutResponse() {
        const personal = portfolioContext.personal;
        const presentacion = portfolioContext.presentacion;

        let response = `Hola, soy **${personal.nombre}**, ${personal.rol} basado en ${personal.ubicacion}.\n\n`;
        response += `${presentacion.corta}\n\n`;
        response += `${presentacion.historia}\n\n`;
        response += `${presentacion.enfoque}\n\n`;
        response += `Actualmente estoy ${personal.disponibilidad.toLowerCase()}.`;

        return response;
    }

    generateAutomationResponse() {
        const servicios = portfolioContext.servicios;
        const automationService = servicios.find(s => s.nombre === 'Atención Automatizada');

        if (!automationService) {
            return this.generateServicesResponse();
        }

        let response = `🤖 **${automationService.nombre}**\n\n`;
        response += `${automationService.descripcion}\n\n`;

        response += `**Características principales:**\n`;
        automationService.caracteristicas.forEach(car => {
            response += `✓ ${car}\n`;
        });

        response += `\n**Beneficios para tu negocio:**\n`;
        automationService.beneficios.forEach(ben => {
            response += `• ${ben}\n`;
        });

        response += `\n**Casos de uso:**\n`;
        automationService.casos_uso.forEach((caso, index) => {
            if (index < 4) { // Mostrar solo los primeros 4
                response += `${index + 1}. ${caso}\n`;
            }
        });

        response += `\n💡 **¡Prueba el chatbot de esta web!** Es un ejemplo funcional de lo que puedo crear para tu negocio.\n\n`;
        response += `¿Te gustaría implementar algo similar en tu empresa?`;

        return response;
    }

    /**
     * Obtener contexto relevante para OpenAI
     */
    getRelevantContext(intent) {
        switch (intent) {
            case 'proyectos':
                return JSON.stringify(portfolioContext.proyectos);
            case 'servicios':
                return JSON.stringify(portfolioContext.servicios);
            case 'automatizacion':
                const automationService = portfolioContext.servicios.find(s => s.nombre === 'Atención Automatizada');
                return JSON.stringify({
                    servicio: automationService,
                    ejemplo_chatbot: "El chatbot que estás usando ahora es un ejemplo de lo que se puede crear",
                    proyectos_relacionados: portfolioContext.proyectos.filter(p => p.nombre === 'Automatización Empresarial')
                });
            case 'contacto':
                return JSON.stringify(portfolioContext.personal);
            case 'tecnologias':
                return JSON.stringify(portfolioContext.tecnologias);
            case 'experiencia':
                return JSON.stringify({
                    experiencia: portfolioContext.experiencia_empresarial,
                    sobre_mi: portfolioContext.sobre_mi
                });
            default:
                return JSON.stringify(portfolioContext);
        }
    }
}

export default new IntentEngine();
