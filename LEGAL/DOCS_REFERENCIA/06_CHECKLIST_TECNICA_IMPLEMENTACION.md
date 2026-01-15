# ✅ CHECKLIST TÉCNICA DE IMPLEMENTACIÓN RGPD

**Proyecto:** Portafolio Denilson Capa - SON
**Fecha:** 13 de enero de 2026

---

## 🔴 FASE 1: CRÍTICO (0-7 días) - OBLIGATORIO

### 1.1. Crear páginas legales

- [ ] **Crear `/aviso-legal.html`**
  - Copiar contenido de `01_AVISO_LEGAL.md`
  - Completar NIF, dirección completa
  - Añadir al footer como enlace visible
  - Formato: HTML estándar, legible

- [ ] **Crear `/politica-privacidad.html`**
  - Copiar contenido de `02_POLITICA_PRIVACIDAD.md`
  - Completar NIF, dirección completa
  - Añadir al footer como enlace visible
  - Crear email: **privacidad@denilsonarnau.com**

- [ ] **Crear `/politica-cookies.html`**
  - Copiar contenido de `03_POLITICA_COOKIES.md`
  - Añadir al footer como enlace visible
  - Enlazar desde el banner de cookies

### 1.2. Modificar formulario de contacto (`index.html` línea 575-609)

**ANTES DEL BOTÓN ENVIAR, añadir:**

```html
<div class="form-group form-checkbox">
    <input type="checkbox" id="privacy-accept" name="privacy-accept" required>
    <label for="privacy-accept">
        He leído y acepto la <a href="/politica-privacidad.html" target="_blank">Política de Privacidad</a>
        y consiento el tratamiento de mis datos.*
    </label>
</div>
```

**DEBAJO DEL FORMULARIO, añadir cláusula informativa:**

```html
<div class="form-legal-info" style="margin-top: 1rem; font-size: 0.85rem; color: var(--color-text-muted);">
    <p><strong>Información sobre Protección de Datos:</strong></p>
    <p>
        <strong>Responsable:</strong> Denilson Capa |
        <strong>Finalidad:</strong> Gestionar su consulta |
        <strong>Legitimación:</strong> Consentimiento |
        <strong>Destinatarios:</strong> EmailJS (EEUU - CCT) |
        <strong>Derechos:</strong> Acceso, rectificación, supresión →
        <a href="mailto:privacidad@denilsonarnau.com">privacidad@denilsonarnau.com</a> |
        <a href="/politica-privacidad.html">Más información</a>
    </p>
</div>
```

**EN `main.js` (línea 274), modificar validación:**

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // AÑADIR VALIDACIÓN CHECKBOX
    const privacyCheckbox = document.getElementById('privacy-accept');
    if (!privacyCheckbox || !privacyCheckbox.checked) {
        showNotification('Debes aceptar la Política de Privacidad', 'error');
        return;
    }

    // ... resto del código existente
});
```

### 1.3. Implementar banner de cookies

**AÑADIR AL FINAL DE `<body>` en `index.html`:**

```html
<!-- Banner de Cookies -->
<div class="cookie-banner" id="cookie-banner" style="display: none;">
    <div class="cookie-content">
        <h3>🍪 Este sitio web utiliza cookies</h3>
        <p>
            Utilizamos cookies propias técnicas y de terceros (Google Fonts, EmailJS)
            para mejorar tu experiencia. Puedes aceptarlas, rechazarlas o configurarlas.
        </p>
        <p><a href="/politica-cookies.html" target="_blank">Más información sobre cookies</a></p>
    </div>
    <div class="cookie-buttons">
        <button class="btn btn-primary btn-sm" onclick="acceptAllCookies()">Aceptar todas</button>
        <button class="btn btn-secondary btn-sm" onclick="rejectOptionalCookies()">Solo esenciales</button>
    </div>
</div>

<style>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(10, 10, 15, 0.98);
    backdrop-filter: blur(20px);
    padding: 1.5rem;
    z-index: 10001;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
    border-top: 1px solid var(--color-border);
}

@media (prefers-color-scheme: light) {
    .cookie-banner {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    }
}

.cookie-content {
    max-width: 1200px;
    margin: 0 auto;
}

.cookie-banner h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.cookie-banner p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
}

.cookie-buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}
</style>
```

**AÑADIR AL FINAL DE `main.js`:**

```javascript
// ==================== Gestión de Cookies ====================
function acceptAllCookies() {
    localStorage.setItem('cookies_consent', 'all');
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('✅ Cookies aceptadas: Todas');
}

function rejectOptionalCookies() {
    localStorage.setItem('cookies_consent', 'essential');
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('✅ Cookies aceptadas: Solo esenciales');
    // Opcional: Bloquear Google Fonts y cargar fuentes locales
}

// Mostrar banner si no hay consentimiento
window.addEventListener('load', () => {
    const consent = localStorage.getItem('cookies_consent');
    if (!consent) {
        setTimeout(() => {
            document.getElementById('cookie-banner').style.display = 'block';
        }, 1000); // Mostrar tras 1 segundo
    }
});
```

### 1.4. Añadir aviso en chatbot (`chatbot-widget.js`)

**EN `createWidget()` (línea 36), ANTES DEL CHAT INPUT, añadir:**

```javascript
<!-- Aviso de Privacidad Chatbot -->
<div class="chatbot-privacy-warning" id="chatbot-privacy-warning" style="display: none;">
    <div class="privacy-icon">⚠️</div>
    <h4>Aviso importante sobre tus datos</h4>
    <p>
        Este chatbot utiliza <strong>inteligencia artificial (OpenAI GPT-4)</strong>
        para procesar tus mensajes. Las conversaciones se envían a servidores en Estados Unidos.
    </p>
    <p><strong>NO envíes:</strong> datos bancarios, DNI/NIE, información de salud o datos sensibles.</p>
    <p>
        Las conversaciones se conservan 30 días.
        <a href="/politica-privacidad.html" target="_blank">Política de Privacidad</a>
    </p>
    <button class="btn-understand" onclick="acceptChatbotPrivacy()">Entendido</button>
</div>
```

**AÑADIR función en `chatbot-widget.js`:**

```javascript
acceptChatbotPrivacy() {
    localStorage.setItem('chatbot_privacy_accepted', 'true');
    document.getElementById('chatbot-privacy-warning').style.display = 'none';
    document.getElementById('chat-input').disabled = false;
}

// En el método que abre el chatbot
toggleChatbot() {
    const privacyAccepted = localStorage.getItem('chatbot_privacy_accepted');
    if (!privacyAccepted && !this.isOpen) {
        document.getElementById('chatbot-privacy-warning').style.display = 'block';
        document.getElementById('chat-input').disabled = true;
    }
    // ... resto del código
}
```

### 1.5. Actualizar footer (`index.html` línea 617-642)

**MODIFICAR EL FOOTER para incluir enlaces legales:**

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <a href="#" class="logo">
                    <img src="/assets/images/finalreal.svg" alt="SON Logo" class="logo-image" />
                    <div class="logo-brand">
                        <span class="logo-company">Sistemas Organizados at Network</span>
                    </div>
                </a>
                <p class="footer-tagline">Diseñando el futuro digital</p>
            </div>

            <div class="footer-links">
                <a href="#inicio">Inicio</a>
                <a href="#proyectos">Proyectos</a>
                <a href="#servicios">Servicios</a>
                <a href="#contacto">Contacto</a>
                <!-- AÑADIR ESTOS ENLACES -->
                <a href="/aviso-legal.html">Aviso Legal</a>
                <a href="/politica-privacidad.html">Privacidad</a>
                <a href="/politica-cookies.html">Cookies</a>
            </div>

            <div class="footer-copyright">
                <p>© <span id="year"></span> Sistemas Organizados at Network</p>
                <p>Denilson Capa | NIF: [COMPLETAR]</p>
                <p>
                    <a href="mailto:privacidad@denilsonarnau.com">privacidad@denilsonarnau.com</a>
                </p>
            </div>
        </div>
    </div>
</footer>
```

---

## ⚠️ FASE 2: PRIORITARIO (7-30 días)

### 2.1. Email de privacidad

- [ ] Crear cuenta de email: **privacidad@denilsonarnau.com**
- [ ] Configurar respuesta automática con plantilla
- [ ] Añadir firma con plazo de respuesta (1 mes máximo)

### 2.2. Revisión de contratos con terceros

- [ ] **EmailJS**: Solicitar Data Processing Agreement (DPA)
- [ ] **Railway**: Revisar términos de servicio y DPA
- [ ] **OpenAI**: Confirmar Business Agreement activo
- [ ] **Netlify**: Revisar términos de privacidad

### 2.3. Procedimiento de ejercicio de derechos

- [ ] Crear plantilla de respuesta a solicitudes de acceso
- [ ] Crear plantilla de respuesta a solicitudes de supresión
- [ ] Documentar procedimiento interno (ver `07_EJERCICIO_DERECHOS.md`)
- [ ] Establecer recordatorio mensual para verificar solicitudes pendientes

### 2.4. Optimizaciones técnicas

- [ ] **Opcional:** Alojar Google Fonts localmente (evitar transferencia a Google)
  ```bash
  # Descargar fuentes y alojar en /assets/fonts/
  # Modificar CSS para usar @font-face local
  ```

- [ ] **Opcional:** Implementar modo analítica anónima (sin cookies de terceros)

- [ ] **Implementar limpieza automática de datos:**
  - Formularios > 12 meses sin respuesta → borrar
  - Conversaciones chatbot > 30 días → borrar
  - Logs > 90 días → borrar

---

## 📊 FASE 3: MEJORAS OPCIONALES (30+ días)

### 3.1. Panel de gestión de consentimientos

- [ ] Crear página `/preferencias-privacidad.html` donde el usuario pueda:
  - Ver qué datos tiene almacenados
  - Retirar consentimientos
  - Exportar datos (portabilidad)
  - Eliminar cuenta/datos

### 3.2. Auditoría de seguridad

- [ ] Contratar auditoría externa de seguridad (pentesting)
- [ ] Implementar WAF (Web Application Firewall) si aplica
- [ ] Configurar alertas de seguridad automáticas

### 3.3. Formación

- [ ] Realizar curso de RGPD/LOPDGDD
- [ ] Documentar procedimientos internos
- [ ] Establecer calendario de revisiones anuales

---

## ✅ VERIFICACIÓN FINAL

### Checklist de comprobación (antes de publicar):

**Documentación legal:**
- [ ] Aviso Legal accesible y completo
- [ ] Política de Privacidad accesible y completa
- [ ] Política de Cookies accesible y completa
- [ ] NIF y dirección completa incluidos
- [ ] Email privacidad@denilsonarnau.com creado y funcional

**Formulario de contacto:**
- [ ] Checkbox de aceptación obligatorio implementado
- [ ] Cláusula informativa visible debajo del formulario
- [ ] Validación JavaScript funcional
- [ ] Enlace a Política de Privacidad funcional

**Banner de cookies:**
- [ ] Banner se muestra en primera visita
- [ ] Opciones "Aceptar" y "Rechazar" funcionales
- [ ] Preferencias se guardan en localStorage
- [ ] Enlace a Política de Cookies funcional

**Chatbot:**
- [ ] Aviso de privacidad se muestra en primer uso
- [ ] Advertencia sobre no enviar datos sensibles visible
- [ ] sessionId se almacena correctamente
- [ ] Enlace a Política de Privacidad funcional

**Footer:**
- [ ] Enlaces a Aviso Legal, Privacidad y Cookies visibles
- [ ] Email de privacidad visible
- [ ] NIF visible

**Pruebas funcionales:**
- [ ] Enviar formulario SIN checkbox → debe fallar
- [ ] Enviar formulario CON checkbox → debe funcionar
- [ ] Rechazar cookies → verificar que no se cargan terceros
- [ ] Aceptar cookies → verificar carga normal
- [ ] Chatbot primer uso → aviso visible
- [ ] Chatbot usos posteriores → aviso no se repite

---

## 🚨 RECORDATORIOS CRÍTICOS

### ⚠️ NO PUBLICAR EN PRODUCCIÓN SIN:

1. ✅ Completar NIF en Aviso Legal
2. ✅ Completar dirección postal completa
3. ✅ Crear email privacidad@denilsonarnau.com
4. ✅ Implementar checkbox en formulario
5. ✅ Implementar banner de cookies

### 📅 Tareas recurrentes:

- **Mensual:** Verificar solicitudes de derechos ARSOPL
- **Trimestral:** Revisar logs de seguridad
- **Semestral:** Actualizar Registro de Actividades de Tratamiento
- **Anual:** Auditoría completa RGPD + actualizar políticas

---

## 📁 ARCHIVOS DE REFERENCIA

- `00_RESUMEN_EJECUTIVO_AUDITORIA_RGPD.md` - Resumen general
- `01_AVISO_LEGAL.md` - Texto completo Aviso Legal
- `02_POLITICA_PRIVACIDAD.md` - Texto completo Política Privacidad
- `03_POLITICA_COOKIES.md` - Texto completo Política Cookies
- `04_CLAUSULAS_FORMULARIOS.md` - Textos y código para implementar
- `05_REGISTRO_ACTIVIDADES_TRATAMIENTO.md` - RAT obligatorio
- `07_EJERCICIO_DERECHOS.md` - Plantillas de respuesta

---

## 🆘 SOPORTE

**Dudas técnicas:** Revisar `04_CLAUSULAS_FORMULARIOS.md`
**Dudas legales:** Consultar con abogado especializado en protección de datos
**Contacto AEPD:** https://www.aepd.es | 901 100 099

---

**Responsable de implementación:** [Nombre desarrollador]
**Fecha límite Fase 1:** [Fecha + 7 días]
**Fecha límite Fase 2:** [Fecha + 30 días]
**Próxima auditoría:** [Fecha + 6 meses]
