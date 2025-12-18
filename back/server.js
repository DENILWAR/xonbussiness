const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno (la API key)
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- Configuración ---
const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Middlewares ---
app.use(cors()); // Permite que tu frontend hable con este backend
app.use(express.json()); // Permite al servidor entender JSON

// --- La Ruta del Chat ---
app.post('/chat', async (req, res) => {
    try {
        const userInput = req.body.message;
        if (!userInput) {
            return res.status(400).json({ error: 'No se recibió ningún mensaje.' });
        }

        // El "Cerebro" de Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // El "Prompt" o instrucción que define la personalidad del bot
        // ¡Aquí es donde pones las reglas y la personalidad de Chip!
        const prompt = `
            Eres 'Chip', un asistente virtual para una página web.
            Tu objetivo es ser ingenioso, servicial y guiar a los usuarios para que contraten el servicio de chatbots.
            Respuestas cortas y amigables.

            Usuario: "${userInput}"
            Chip:
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Enviamos la respuesta de vuelta al frontend
        res.json({ response: text });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al procesar tu mensaje.' });
    }
});

// --- Iniciar el servidor ---
app.listen(port, () => {
    console.log(`Servidor de chatbot escuchando en http://localhost:${port}`);
});