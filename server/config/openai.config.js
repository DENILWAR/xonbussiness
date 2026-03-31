/* ================================================
   OPENAI CONFIGURATION
   ================================================ */

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Validar que existe la API key
if (!process.env.OPENAI_API_KEY) {
    console.error('❌ ERROR: OPENAI_API_KEY no está configurada en .env');
    process.exit(1);
}

// Inicializar cliente de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Configuración del modelo
export const openAIConfig = {
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 500,
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
    topP: 1,
    frequencyPenalty: 0.3,
    presencePenalty: 0.3
};

/**
 * Generar respuesta con OpenAI
 */
export async function generateChatResponse(messages) {
    try {
        console.log(`🤖 Generando respuesta con OpenAI (${openAIConfig.model})...`);

        const completion = await openai.chat.completions.create({
            model: openAIConfig.model,
            messages: messages,
            max_tokens: openAIConfig.maxTokens,
            temperature: openAIConfig.temperature,
            top_p: openAIConfig.topP,
            frequency_penalty: openAIConfig.frequencyPenalty,
            presence_penalty: openAIConfig.presencePenalty
        });

        const response = completion.choices[0].message.content;
        const tokensUsed = completion.usage.total_tokens;

        console.log(`✅ Respuesta generada (${tokensUsed} tokens)`);

        return {
            message: response,
            tokensUsed: tokensUsed,
            model: openAIConfig.model
        };

    } catch (error) {
        console.error('❌ Error al generar respuesta con OpenAI:', error.message);

        // Manejo de errores específicos
        if (error.code === 'insufficient_quota') {
            throw new Error('Cuota de OpenAI excedida. Por favor, contacta directamente.');
        }

        if (error.code === 'rate_limit_exceeded') {
            throw new Error('Límite de solicitudes excedido. Intenta de nuevo en un momento.');
        }

        throw new Error('Error al procesar tu mensaje. Por favor, intenta de nuevo.');
    }
}

export default openai;
