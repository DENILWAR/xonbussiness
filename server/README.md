# Chatbot Santos - Backend API

Backend API para el chatbot del portafolio de Denilson Capa.

## Características

- ✅ API REST con Express.js
- ✅ Integración con OpenAI GPT-4
- ✅ Sistema de sesiones persistentes
- ✅ Motor de detección de intenciones
- ✅ Rate limiting y protección anti-spam
- ✅ Validación y sanitización de entrada
- ✅ Contexto personalizado del portafolio
- ✅ Respuestas predefinidas para consultas comunes

## Requisitos

- Node.js 18+
- API Key de OpenAI
- npm o yarn

## Instalación

### 1. Instalar dependencias

```bash
cd server
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `server/`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y añade tu API Key de OpenAI:

```env
OPENAI_API_KEY=tu_api_key_aqui
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
```

### 3. Obtener tu API Key de OpenAI

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Inicia sesión o crea una cuenta
3. Ve a "API Keys" en tu dashboard
4. Crea una nueva API key
5. Cópiala y pégala en tu archivo `.env`

## Uso

### Iniciar el servidor

```bash
npm start
```

O para desarrollo con auto-reload:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## Endpoints

### POST /api/chat

Enviar mensaje al chatbot.

**Request:**
```json
{
  "message": "Hola, ¿qué proyectos has realizado?",
  "sessionId": "uuid-opcional"
}
```

**Response:**
```json
{
  "message": "He trabajado en varios proyectos...",
  "sessionId": "uuid-de-sesion",
  "intent": "proyectos",
  "source": "predefined"
}
```

### GET /api/health

Health check del servidor.

### GET /api/session/:sessionId

Obtener estadísticas de una sesión.

### DELETE /api/session/:sessionId

Eliminar una sesión.

## Estructura del Proyecto

```
server/
├── config/
│   └── openai.config.js      # Configuración de OpenAI
├── controllers/
│   └── chatController.js     # Controlador principal del chat
├── middleware/
│   ├── rateLimiter.js        # Rate limiting
│   └── validator.js          # Validación de entrada
├── services/
│   ├── sessionManager.js     # Gestión de sesiones
│   ├── intentEngine.js       # Motor de intenciones
│   └── contextBuilder.js     # Constructor de contexto
├── data/
│   └── portfolio-context.json # Datos del portafolio
├── server.js                  # Servidor principal
├── package.json
└── .env                       # Variables de entorno
```

## Seguridad

- **Rate Limiting:** 20 mensajes/minuto, 100 mensajes/hora
- **Validación:** Sanitización de entrada contra XSS/injection
- **CORS:** Configurado solo para orígenes permitidos
- **Helmet:** Headers de seguridad HTTP
- **Sesiones:** UUID únicos por usuario

## Personalización

### Modificar contexto del portafolio

Edita `data/portfolio-context.json` para actualizar información sobre proyectos, servicios, tecnologías, etc.

### Ajustar personalidad del bot

Edita `services/contextBuilder.js` en el método `buildSystemPrompt()` para cambiar el comportamiento y tono de Santos.

### Añadir nuevas intenciones

Edita `services/intentEngine.js` y añade nuevas intenciones en el constructor:

```javascript
this.intents = {
  mi_intencion: {
    keywords: ['palabra1', 'palabra2'],
    response: this.generateMiRespuesta.bind(this)
  }
}
```

## Solución de Problemas

### Error: OPENAI_API_KEY no está configurada

Asegúrate de crear el archivo `.env` y añadir tu API key.

### Error de CORS

Añade tu origen al archivo `.env` en `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=http://localhost:5500,http://tu-dominio.com
```

### Puerto en uso

Cambia el puerto en `.env`:

```env
PORT=3002
```

## Costos

El chatbot usa la API de OpenAI que tiene costos por uso:
- GPT-4 Turbo: ~$0.01 por 1000 tokens
- Se recomienda establecer límites de uso en tu cuenta de OpenAI
- El rate limiting ayuda a prevenir abuso

## Licencia

MIT
