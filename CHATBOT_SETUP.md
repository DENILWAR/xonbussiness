# 🤖 Guía de Instalación - Chatbot Santos

Esta guía te ayudará a instalar y configurar el chatbot Santos en tu portafolio.

## 📋 Requisitos Previos

- Node.js 18 o superior instalado
- Una cuenta de OpenAI con API key
- Editor de código (VS Code recomendado)

---

## 🚀 Instalación Paso a Paso

### Paso 1: Instalar Dependencias del Servidor

Abre una terminal y navega a la carpeta del servidor:

```bash
cd server
npm install
```

Esto instalará todas las dependencias necesarias (Express, OpenAI, etc.)

### Paso 2: Configurar Variables de Entorno

1. En la carpeta `server/`, crea un archivo llamado `.env`
2. Copia el contenido de `.env.example` al nuevo archivo `.env`
3. Edita el archivo `.env`:

```env
# Tu API Key de OpenAI (obligatorio)
OPENAI_API_KEY=sk-tu_api_key_aqui

# Puerto del servidor
PORT=3001

# Entorno
NODE_ENV=development

# CORS - Si abres tu portafolio desde Live Server
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500

# Rate Limiting (opcional)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=20

# OpenAI Configuration (opcional)
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7
```

### Paso 3: Obtener tu API Key de OpenAI

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Inicia sesión o crea una cuenta
3. Ve a la sección **API Keys** en el menú lateral
4. Haz clic en **Create new secret key**
5. Dale un nombre (ejemplo: "Chatbot Santos")
6. Copia la API key (empieza con `sk-...`)
7. Pégala en tu archivo `.env` en `OPENAI_API_KEY`

⚠️ **IMPORTANTE:** Nunca compartas tu API key públicamente

### Paso 4: Iniciar el Servidor

En la terminal, dentro de la carpeta `server/`:

```bash
npm start
```

Deberías ver algo como:

```
============================================================
🤖  CHATBOT SANTOS - Servidor iniciado
============================================================
📡 Puerto: 3001
🌍 Entorno: development
🔒 CORS habilitado para: http://localhost:5500, ...
⚡ Endpoints disponibles:
   - POST   http://localhost:3001/api/chat
   - GET    http://localhost:3001/api/health
============================================================
```

### Paso 5: Abrir tu Portafolio

1. Abre `index.html` con Live Server (VS Code)
2. O simplemente abre el archivo en tu navegador

### Paso 6: Probar el Chatbot

1. Verás un botón flotante naranja en la esquina inferior derecha
2. Haz clic para abrir el chat
3. Escribe un mensaje como "Hola" o "¿Qué proyectos has hecho?"
4. Santos debería responder

---

## ✅ Verificación

### Probar que el servidor funciona

Abre tu navegador y ve a:
```
http://localhost:3001/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "service": "Chatbot Santos API",
  "activeSessions": 0
}
```

### Probar el widget

1. Abre las herramientas de desarrollador (F12)
2. En la consola deberías ver: `✅ Chatbot Santos inicializado`
3. Haz clic en el botón del chat
4. Envía un mensaje de prueba

---

## 🎨 Personalización

### Cambiar información del portafolio

Edita el archivo:
```
server/data/portfolio-context.json
```

Ahí puedes actualizar:
- Información personal
- Proyectos
- Servicios
- Tecnologías
- FAQs

### Cambiar la personalidad de Santos

Edita el archivo:
```
server/services/contextBuilder.js
```

Busca el método `buildSystemPrompt()` y modifica el prompt.

### Cambiar colores del chat

Edita el archivo:
```
assets/css/chatbot/chatbot-widget.css
```

Las variables CSS están al inicio del archivo.

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Problema:** Error "OPENAI_API_KEY no está configurada"

**Solución:** Verifica que tu archivo `.env` existe y tiene la API key correcta.

---

**Problema:** Error "Puerto 3001 en uso"

**Solución:** Cambia el puerto en `.env`:
```env
PORT=3002
```

Y actualiza también en `assets/js/chatbot/chatbot-widget.js`:
```javascript
apiUrl: 'http://localhost:3002/api/chat'
```

---

### El chatbot no responde

**Problema:** Error de CORS en la consola

**Solución:** Añade tu origen al archivo `.env`:
```env
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000
```

Reinicia el servidor después de cambiar `.env`.

---

**Problema:** "Error al enviar mensaje"

**Solución:**
1. Verifica que el servidor esté corriendo (`npm start`)
2. Verifica la URL de la API en `chatbot-widget.js`
3. Revisa la consola del navegador para más detalles

---

### Errores de OpenAI

**Problema:** "Cuota de OpenAI excedida"

**Solución:**
- Ve a tu cuenta de OpenAI y añade crédito
- O verifica que no hayas excedido tu límite gratuito

---

**Problema:** "Invalid API Key"

**Solución:**
- Verifica que copiaste la API key completa
- Genera una nueva API key en OpenAI
- Asegúrate de no tener espacios al inicio/final

---

## 📊 Monitoreo

### Ver logs del servidor

Los logs aparecen en la terminal donde ejecutaste `npm start`.

Verás:
- Mensajes recibidos
- Intenciones detectadas
- Respuestas enviadas
- Sesiones activas

### Ver actividad en el navegador

1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Verás logs del widget del chat

---

## 🔒 Seguridad

### En Producción

Cuando subas tu portafolio a producción:

1. Cambia `NODE_ENV` a `production`:
```env
NODE_ENV=production
```

2. Actualiza `ALLOWED_ORIGINS` con tu dominio real:
```env
ALLOWED_ORIGINS=https://tuportafolio.com
```

3. Actualiza la URL de la API en `chatbot-widget.js`:
```javascript
apiUrl: 'https://tu-api.com/api/chat'
```

4. Considera usar servicios como:
   - **Railway** para el backend
   - **Netlify/Vercel** para el frontend

---

## 💰 Costos

- **OpenAI GPT-4 Turbo:** ~$0.01 por 1000 tokens
- Un mensaje típico usa ~200-400 tokens
- Costo estimado: ~$0.002-0.004 por mensaje
- Con 20 mensajes/minuto límite: ~$2-4 por cada 1000 mensajes

**Recomendación:** Establece límites de gasto en tu cuenta de OpenAI.

---

## 📝 Comandos Útiles

```bash
# Iniciar servidor
npm start

# Iniciar con auto-reload (desarrollo)
npm run dev

# Verificar versión de Node
node --version

# Instalar dependencias
npm install

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🆘 Ayuda

Si tienes problemas:

1. Revisa los logs del servidor
2. Revisa la consola del navegador
3. Verifica que todas las URLs coincidan
4. Asegúrate de que el servidor esté corriendo
5. Reinicia tanto el servidor como el navegador

---

## ✨ Próximos Pasos

Una vez funcionando, puedes:

1. Personalizar los colores del widget
2. Añadir más intenciones al motor
3. Actualizar la información del portafolio
4. Ajustar la personalidad de Santos
5. Desplegar en producción

¡Disfruta de tu nuevo chatbot! 🚀
