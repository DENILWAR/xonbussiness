# 🚀 Inicio Rápido - Chatbot Santos

## ⚡ En 3 pasos

### 1️⃣ Instalar dependencias

```bash
cd server
npm install
```

### 2️⃣ Configurar OpenAI

Crea el archivo `server/.env`:

```env
OPENAI_API_KEY=tu_api_key_de_openai_aqui
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
```

**¿Dónde conseguir tu API Key?**
- Ve a [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Crea una nueva key
- Cópiala al archivo `.env`

### 3️⃣ Iniciar

Terminal 1 - Servidor:
```bash
cd server
npm start
```

Terminal 2 - Portafolio:
- Abre `index.html` con Live Server
- O abre directamente en el navegador

**¡Listo!** El botón del chat aparecerá en la esquina inferior derecha.

---

## 🧪 Probar que funciona

1. **Servidor:** Abre http://localhost:3001/api/health
   - Deberías ver: `{"status": "ok"}`

2. **Widget:** Abre tu portafolio y busca en la consola:
   - Deberías ver: `✅ Chatbot Santos inicializado`

3. **Chat:** Haz clic en el botón naranja y escribe "Hola"

---

## 📁 Estructura creada

```
XON/
├── assets/
│   ├── css/
│   │   └── chatbot/
│   │       └── chatbot-widget.css  ← Estilos del chat
│   └── js/
│       └── chatbot/
│           └── chatbot-widget.js   ← Widget frontend
│
├── server/                          ← API Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── data/
│   │   └── portfolio-context.json  ← Tu información
│   ├── server.js
│   ├── package.json
│   └── .env                         ← CREA ESTE ARCHIVO
│
├── index.html                       ← Ya integrado
├── CHATBOT_SETUP.md                 ← Guía completa
└── QUICK_START.md                   ← Esta guía
```

---

## ⚙️ Configuración Personalizada

### Cambiar información personal

Edita `server/data/portfolio-context.json`

### Cambiar personalidad de Santos

Edita `server/services/contextBuilder.js`

### Cambiar colores del chat

Edita `assets/css/chatbot/chatbot-widget.css`

---

## 🆘 Problemas comunes

**Error: OPENAI_API_KEY no configurada**
- Crea el archivo `server/.env` con tu API key

**Error: Puerto 3001 en uso**
- Cambia `PORT=3002` en `.env`
- Actualiza la URL en `chatbot-widget.js` línea 4

**Error de CORS**
- Verifica que tu origen esté en `ALLOWED_ORIGINS`
- Reinicia el servidor después de cambiar `.env`

---

## 📚 Más información

Lee [CHATBOT_SETUP.md](CHATBOT_SETUP.md) para la guía completa.

---

**¡Disfruta de Santos! 🤖**
