# 🤖 Chatbot Santos - Resumen de Implementación

## ✅ Implementación Completa

Se ha creado un chatbot profesional para tu portafolio con las siguientes características:

---

## 📦 Componentes Creados

### 🎨 Frontend (Widget)

**Archivos:**
- `assets/css/chatbot/chatbot-widget.css` - Estilos del chat
- `assets/js/chatbot/chatbot-widget.js` - Lógica del widget
- `index.html` - Actualizado con las referencias

**Características:**
- ✅ Botón flotante naranja (esquina inferior derecha)
- ✅ Ventana de chat moderna y responsiva
- ✅ Animaciones suaves
- ✅ Indicador de escritura
- ✅ Sugerencias rápidas
- ✅ Persistencia de sesión
- ✅ Historial de conversación
- ✅ Adaptado al diseño de tu portafolio

---

### ⚙️ Backend (API)

**Estructura:**
```
server/
├── config/
│   └── openai.config.js          # Configuración OpenAI
├── controllers/
│   └── chatController.js         # Lógica del chat
├── middleware/
│   ├── rateLimiter.js            # Anti-spam
│   └── validator.js              # Sanitización
├── services/
│   ├── sessionManager.js         # Sesiones
│   ├── intentEngine.js           # Motor de intenciones
│   └── contextBuilder.js         # Contexto para IA
├── data/
│   └── portfolio-context.json    # Tu información
├── server.js                      # Servidor Express
├── package.json                   # Dependencias
├── .env.example                   # Plantilla config
├── .gitignore                     # Git ignore
├── README.md                      # Docs técnicas
└── test-setup.js                  # Script de verificación
```

**Características:**
- ✅ API REST con Express.js
- ✅ Integración OpenAI GPT-4
- ✅ Sistema de sesiones con UUID
- ✅ Rate limiting (20 msg/min, 100 msg/hora)
- ✅ Validación y sanitización de entrada
- ✅ Protección XSS/SQL Injection
- ✅ CORS configurado
- ✅ Headers de seguridad (Helmet)
- ✅ Logs detallados
- ✅ Manejo de errores robusto

---

## 🧠 Motor de Intenciones

El chatbot detecta automáticamente qué busca el usuario:

| Intención | Keywords | Acción |
|-----------|----------|--------|
| **Proyectos** | proyecto, portfolio, trabajo | Muestra tus proyectos destacados |
| **Servicios** | servicio, ofrece, auditoria | Lista tus servicios |
| **Contacto** | contacto, email, teléfono | Muestra información de contacto |
| **Tecnologías** | tecnología, stack, react, python | Lista tus skills técnicas |
| **Experiencia** | experiencia, años, trayectoria | Cuenta tu historia profesional |
| **Sobre ti** | quien, sobre ti, presentación | Presentación personal |
| **General** | cualquier otra cosa | OpenAI con contexto completo |

**Ventaja:** Respuestas instantáneas sin consumir tokens de OpenAI para preguntas comunes.

---

## 🎭 Personalidad de Santos

```
Nombre: Santos
Rol: Asistente virtual del portafolio de Denilson Capa

Personalidad:
- Cercano y profesional
- Claro y conciso
- No menciona que es IA
- No inventa información
- Invita a contactar cuando no sabe algo

Tono: Amigable pero profesional
Idioma: Español
```

---

## 📊 Contexto del Portafolio

Santos tiene acceso a toda esta información:

### Información Personal
- Nombre, ubicación, contacto
- Años de experiencia
- Redes sociales
- Disponibilidad

### Proyectos
- Natural Groove (E-commerce)
- Construcciones Padema (Web empresarial)
- Sistema 2FA
- Sistema de facturación
- Automatización empresarial

### Servicios
- Mantenimiento + Seguridad
- Auditorías Web
- Desarrollo Full Stack
- SEO & Optimización

### Tecnologías
- Frontend: HTML5, CSS3, JavaScript, React
- Backend: Node.js, Python
- Diseño: Figma
- Herramientas: Git, GitHub

### FAQs
- Clientes internacionales
- Años de experiencia
- Tipo de proyectos
- Diseño + Desarrollo

---

## 🔒 Seguridad Implementada

1. **Rate Limiting**
   - 20 mensajes/minuto por IP
   - 100 mensajes/hora por IP
   - Protección contra spam

2. **Validación de Entrada**
   - Máximo 1000 caracteres por mensaje
   - Sanitización contra XSS
   - Detección de SQL injection
   - Validación de UUID de sesión

3. **CORS**
   - Solo orígenes permitidos
   - Configurable en .env

4. **Headers de Seguridad**
   - Helmet.js configurado
   - Content-Type validation

5. **API Key Protegida**
   - Solo en backend
   - Nunca expuesta al cliente
   - En archivo .env (no versionado)

---

## 💰 Costos Estimados

- **GPT-4 Turbo:** ~$0.01 por 1000 tokens
- **Mensaje típico:** 200-400 tokens
- **Costo por mensaje:** ~$0.002-0.004

**Con rate limiting:**
- Máximo 100 mensajes/hora/usuario
- Costo máximo: ~$0.40/hora por usuario activo

**Recomendación:** Establece límites de gasto en OpenAI

---

## 📝 Endpoints de la API

| Method | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/chat` | Enviar mensaje al chatbot |
| GET | `/api/health` | Health check del servidor |
| GET | `/api/session/:id` | Stats de una sesión |
| DELETE | `/api/session/:id` | Eliminar sesión |
| GET | `/` | Info de la API |

---

## 🚀 Cómo Iniciar

### Primera vez:

1. **Instalar dependencias:**
   ```bash
   cd server
   npm install
   ```

2. **Configurar .env:**
   ```bash
   cp .env.example .env
   # Edita .env y añade tu OPENAI_API_KEY
   ```

3. **Verificar setup:**
   ```bash
   npm test
   ```

4. **Iniciar servidor:**
   ```bash
   npm start
   ```

5. **Abrir portafolio:**
   - Live Server en index.html
   - O abrir directamente en navegador

### Próximas veces:

```bash
cd server
npm start
```

---

## 🎨 Personalización

### Cambiar colores del chat

Edita `assets/css/chatbot/chatbot-widget.css`:

```css
.chatbot-container {
    --chat-primary: #e14700;      /* Color principal */
    --chat-secondary: #6f0505;    /* Color secundario */
    --chat-accent: #22d3ee;       /* Color de acento */
}
```

### Actualizar información

Edita `server/data/portfolio-context.json`

### Modificar personalidad

Edita `server/services/contextBuilder.js` método `buildSystemPrompt()`

### Añadir nuevas intenciones

Edita `server/services/intentEngine.js`

---

## 📚 Documentación

- [QUICK_START.md](QUICK_START.md) - Inicio rápido
- [CHATBOT_SETUP.md](CHATBOT_SETUP.md) - Guía completa
- [server/README.md](server/README.md) - Docs técnicas backend

---

## 🐛 Testing

### Verificar setup:
```bash
cd server
npm test
```

### Probar API manualmente:
```bash
# Health check
curl http://localhost:3001/api/health

# Enviar mensaje
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola","sessionId":"test-123"}'
```

---

## 🌐 Despliegue en Producción

### Backend (Railway/Render/Heroku):
1. Sube la carpeta `server/`
2. Configura variables de entorno
3. Deploy

### Frontend (Netlify/Vercel):
1. Actualiza URL de la API en `chatbot-widget.js`
2. Deploy completo del portafolio

### Variables de entorno en producción:
```env
OPENAI_API_KEY=tu_key
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://tuportafolio.com
```

---

## ✨ Características Destacadas

- 🚀 **Respuestas instantáneas** para consultas comunes
- 🧠 **OpenAI GPT-4** para conversaciones complejas
- 💾 **Persistencia** de sesión y historial
- 🎯 **Detección inteligente** de intenciones
- 🔒 **Seguridad profesional** implementada
- 📱 **Totalmente responsive** (móvil + desktop)
- ⚡ **Optimizado** con rate limiting
- 🎨 **Integrado** con el diseño de tu portafolio

---

## 🎯 Próximos Pasos Sugeridos

1. ✅ Probar el chatbot localmente
2. ✅ Personalizar colores y mensajes
3. ✅ Actualizar información en portfolio-context.json
4. ⬜ Desplegar en producción
5. ⬜ Monitorear uso y costos en OpenAI
6. ⬜ Añadir analytics (opcional)

---

**🎉 ¡El chatbot está listo para usar!**

Lee [QUICK_START.md](QUICK_START.md) para comenzar en 3 pasos.
