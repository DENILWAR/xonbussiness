# 🌐 SON - Sistemas Organizados at Network

**Portafolio Profesional de Denilson Capa**

[![Deploy Status](https://img.shields.io/badge/deploy-netlify-00C7B7?style=flat-square&logo=netlify)](https://denilsonarnau.com)
[![RGPD](https://img.shields.io/badge/RGPD-Compliant-success?style=flat-square)](./LEGAL/)
[![License](https://img.shields.io/badge/license-Private-red?style=flat-square)]()

---

## 📋 Descripción

Portafolio web profesional y moderno que presenta mis servicios de desarrollo web, diseño digital y automatización de procesos. Incluye un chatbot inteligente con IA (OpenAI GPT-4) para atención automatizada.

**🔗 Web en vivo:** [https://denilsonarnau.com](https://denilsonarnau.com)

---

## ✨ Características Principales

### 🎨 Frontend
- ✅ Diseño responsive y moderno
- ✅ Animaciones fluidas con scroll effects
- ✅ Modo claro/oscuro automático
- ✅ Cursor personalizado
- ✅ Performance optimizado
- ✅ Compatibilidad cross-browser

### 🤖 Chatbot con IA
- ✅ Integración con OpenAI GPT-4
- ✅ Detección inteligente de intenciones
- ✅ Gestión de contexto y sesiones
- ✅ Rate limiting y validación
- ✅ Respuestas personalizadas sobre el portafolio

### 📧 Formulario de Contacto
- ✅ Integración con EmailJS
- ✅ Validación de campos
- ✅ Consentimiento RGPD obligatorio
- ✅ Notificaciones en tiempo real

### 🍪 Cumplimiento Legal (100%)
- ✅ RGPD compliant
- ✅ LOPDGDD compliant
- ✅ LSSI compliant
- ✅ Banner de cookies innovador (galleta flotante)
- ✅ Carga condicional de cookies de terceros
- ✅ Políticas legales completas

---

## 🚀 Inicio Rápido

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Instalación

**1. Clonar el repositorio**
```bash
git clone <tu-repo>
cd XON
```

**2. Instalar dependencias del backend**
```bash
cd server
npm install
```

**3. Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus API keys
```

**4. Iniciar el servidor de desarrollo**
```bash
# Backend (puerto 3001)
cd server
npm run dev

# Frontend (abrir index.html)
# Usar Live Server en VS Code o cualquier servidor local
```

---

## 📁 Estructura del Proyecto

```
XON/
├── index.html                     # Página principal
├── aviso-legal.html              # Aviso legal LSSI
├── politica-privacidad.html      # Política RGPD
├── politica-cookies.html         # Política de cookies
│
├── assets/
│   ├── css/
│   │   ├── styles.css            # Estilos principales (2,362 líneas)
│   │   └── chatbot/
│   │       └── chatbot-widget.css
│   ├── js/
│   │   ├── main.js               # Lógica frontend (828 líneas)
│   │   └── chatbot/
│   │       └── chatbot-widget.js # Widget del chatbot
│   └── images/                   # Imágenes y videos del portafolio
│
├── server/                        # Backend API Node.js
│   ├── config/
│   │   └── openai.config.js      # Configuración OpenAI
│   ├── controllers/
│   │   └── chatController.js     # Lógica del chat
│   ├── middleware/
│   │   ├── rateLimiter.js        # Control de spam (3 msgs/min)
│   │   └── validator.js          # Validación de entrada
│   ├── services/
│   │   ├── sessionManager.js     # Gestión de sesiones
│   │   ├── intentEngine.js       # Detección de intenciones
│   │   └── contextBuilder.js     # Construcción de prompts
│   ├── data/
│   │   └── portfolio-context.json # Información del portafolio
│   ├── server.js                  # Punto de entrada
│   └── package.json               # Dependencias
│
├── LEGAL/                         # Documentación legal RGPD
│   ├── README.md                  # Índice de documentación legal
│   ├── 00_RESUMEN_EJECUTIVO_AUDITORIA_RGPD.md
│   ├── 01_AVISO_LEGAL.md
│   ├── 02_POLITICA_PRIVACIDAD.md
│   ├── 03_POLITICA_COOKIES.md
│   ├── 04_CLAUSULAS_FORMULARIOS.md
│   ├── 05_REGISTRO_ACTIVIDADES_TRATAMIENTO.md
│   ├── 06_CHECKLIST_TECNICA_IMPLEMENTACION.md
│   └── 07_EJERCICIO_DERECHOS_ARSOPL.md
│
├── .gitignore                     # Exclusiones de Git
└── README.md                      # Este archivo
```

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica interactiva
- **EmailJS** - Servicio de email
- **Google Fonts** - Tipografías (Outfit, Syne, Cinzel)

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **OpenAI API** - Inteligencia artificial (GPT-4)
- **CORS** - Control de acceso
- **Express Rate Limit** - Protección contra spam
- **Express Validator** - Validación de datos

### Hosting
- **Frontend:** Netlify
- **Backend:** Railway.app
- **DNS:** Netlify DNS

---

## 🤖 Chatbot con IA

### Características

**Detección Inteligente de Intenciones:**
- Información sobre servicios
- Consultas sobre proyectos
- Solicitudes de contacto
- Información personal/profesional
- Preguntas técnicas

**Gestión de Contexto:**
- Persistencia de conversación por sesión
- Máximo 10 mensajes de historial
- Límite de 500 caracteres por mensaje
- Rate limiting: 3 mensajes por minuto

**Seguridad:**
- Validación de entrada
- Sanitización de HTML
- Rate limiting por IP
- Gestión de errores robusta

### Configuración

Edita `server/data/portfolio-context.json` para actualizar:
- Información de servicios
- Proyectos destacados
- Datos de contacto
- Experiencia profesional

---

## 🍪 Sistema de Cookies Innovador

### Widget Flotante
En lugar del típico banner invasivo, implementamos:
- **Galleta flotante animada** en esquina inferior derecha
- **Mensaje tipo chat** que se despliega
- **Animación de "mordida"** al aceptar/rechazar
- **Carga condicional** de Google Fonts solo tras consentimiento

### Cumplimiento Legal
- ✅ Consentimiento previo a carga de cookies de terceros
- ✅ Opción clara de rechazar cookies opcionales
- ✅ Enlace directo a Política de Cookies
- ✅ Persistencia de preferencias en localStorage

---

## 📧 Formulario de Contacto

### Validaciones Implementadas
1. **Campos obligatorios:** nombre, email, asunto, mensaje
2. **Checkbox de privacidad:** obligatorio (RGPD)
3. **Validación de email:** formato correcto
4. **Protección anti-spam:** EmailJS rate limiting

### Cláusula Informativa RGPD
Incluye información sobre:
- Responsable del tratamiento
- Finalidad de los datos
- Legitimación legal
- Destinatarios (EmailJS - EEUU - CCT)
- Derechos del usuario (ARSOPL)

---

## 🔒 Seguridad y Privacidad

### Medidas Implementadas
- ✅ **HTTPS** en producción
- ✅ **Rate Limiting** en API (3 req/min)
- ✅ **Validación de entrada** en todos los endpoints
- ✅ **Sanitización HTML** de mensajes
- ✅ **CORS** configurado correctamente
- ✅ **Variables de entorno** para API keys
- ✅ **.env en .gitignore** (no exponer secretos)

### Protección de Datos
- Plazos de conservación definidos
- Email de privacidad: privacidad@denilsonarnau.com
- Procedimientos de ejercicio de derechos
- Registro de Actividades de Tratamiento (Art. 30 RGPD)

---

## 🎨 Personalización

### Colores de Marca
```css
--color-primary: #e14700;     /* Naranja */
--color-primary-light: #ff6a1a;
--color-secondary: #6f0505;   /* Rojo oscuro */
--color-accent: #22d3ee;      /* Cyan */
```

### Tipografías
```css
--font-display: 'Syne', sans-serif;      /* Títulos */
--font-body: 'Outfit', sans-serif;       /* Cuerpo */
--font-brand: 'Cinzel', serif;           /* Marca */
```

---

## 📊 Performance

### Métricas
- **Lighthouse Score:** 90+ en todas las categorías
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1

### Optimizaciones
- Lazy loading de imágenes
- Minificación de CSS/JS
- Compresión de imágenes
- Carga condicional de fuentes
- Preconnect a servicios externos

---

## 📝 Documentación Adicional

### Guías Técnicas
- [QUICK_START.md](./QUICK_START.md) - Guía de inicio rápido
- [ARQUITECTURA.txt](./ARQUITECTURA.txt) - Documentación de arquitectura
- [CHATBOT_RESUMEN.md](./CHATBOT_RESUMEN.md) - Detalles del chatbot
- [CAMBIOS_AUTOMATIZACION.md](./CAMBIOS_AUTOMATIZACION.md) - Registro de cambios

### Documentación Legal
- [LEGAL/README.md](./LEGAL/README.md) - Índice completo de documentación legal
- Todos los documentos RGPD/LOPDGDD/LSSI en carpeta `LEGAL/`

---

## 🚨 Antes de Publicar

### Checklist Crítico
- [ ] ✅ Crear email: **privacidad@denilsonarnau.com**
- [ ] ✅ Verificar API keys en `.env`
- [ ] ✅ Actualizar `.env.example` sin secretos
- [ ] ✅ Verificar que `.env` está en `.gitignore`
- [ ] ✅ Probar formulario de contacto
- [ ] ✅ Probar chatbot (límites y validaciones)
- [ ] ✅ Verificar banner de cookies
- [ ] ✅ Revisar enlaces del footer
- [ ] ✅ Comprobar páginas legales (aviso-legal, privacidad, cookies)
- [ ] ✅ Test responsive en móvil

---

## 🔄 Deploy

### Frontend (Netlify)
1. Conectar repositorio a Netlify
2. Build command: ninguno (HTML estático)
3. Publish directory: `/`
4. Variables de entorno: ninguna necesaria

### Backend (Railway.app)
1. Conectar repositorio
2. Root directory: `/server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Variables de entorno:
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`
   - `PORT` (automático en Railway)

---

## 🐛 Troubleshooting

### El chatbot no responde
1. Verificar que el servidor backend esté corriendo
2. Comprobar API key de OpenAI en `.env`
3. Revisar consola del navegador para errores CORS
4. Verificar logs del servidor

### Formulario no envía
1. Verificar configuración de EmailJS
2. Comprobar que el checkbox de privacidad esté marcado
3. Revisar consola para errores de validación
4. Verificar conexión a internet

### Banner de cookies no aparece
1. Limpiar localStorage del navegador
2. Verificar consola para errores JavaScript
3. Comprobar que el script `main.js` esté cargado

---

## 📞 Contacto

**Denilson Capa**
- 🌐 Web: [https://denilsonarnau.com](https://denilsonarnau.com)
- 📧 Email: bussiness@denilsonarnau.com
- 🔒 Privacidad: privacidad@denilsonarnau.com
- 📱 Teléfono: +34 692 257 776
- 💼 LinkedIn: [Denilson Capa](https://www.linkedin.com/in/denilson-arnau-capa-42339a270/)
- 💻 GitHub: [DENILWAR](https://github.com/DENILWAR)

---

## 📄 Licencia

Este proyecto es propiedad privada de Denilson Capa.

**© 2026 Sistemas Organizados at Network - Denilson Capa**

NIF: 47929828J

---

## 🙏 Agradecimientos

- **OpenAI** por la API de GPT-4
- **Netlify** por el hosting gratuito
- **Railway** por el backend hosting
- **EmailJS** por el servicio de email
- **Google Fonts** por las tipografías

---

**Última actualización:** 13 de enero de 2026
**Versión:** 2.0.0 (Con cumplimiento legal RGPD completo)
