# CLÁUSULAS PARA FORMULARIOS Y CHATBOT

**Textos legales listos para implementar**

---

## 1. CLÁUSULA FORMULARIO DE CONTACTO

### Checkbox obligatorio (antes del botón "Enviar"):

```html
<div class="form-group form-checkbox">
    <input type="checkbox" id="privacy-accept" name="privacy-accept" required>
    <label for="privacy-accept">
        He leído y acepto la <a href="/politica-privacidad.html" target="_blank">Política de Privacidad</a>
        y el <a href="/aviso-legal.html" target="_blank">Aviso Legal</a>.
        Consiento el tratamiento de mis datos para atender mi consulta.*
    </label>
</div>
```

### Cláusula informativa completa (debajo del formulario):

```html
<div class="form-legal-notice">
    <h4>Información sobre Protección de Datos</h4>
    <p>
        <strong>Responsable:</strong> Denilson Capa<br>
        <strong>Finalidad:</strong> Gestionar y responder a su consulta profesional.<br>
        <strong>Legitimación:</strong> Consentimiento del interesado al marcar la casilla.<br>
        <strong>Destinatarios:</strong> Los datos serán comunicados a EmailJS (servicio de envío de correos electrónicos) ubicado en Estados Unidos, con garantías adecuadas mediante Cláusulas Contractuales Tipo.<br>
        <strong>Derechos:</strong> Acceder, rectificar, suprimir, limitar, portar y oponerse al tratamiento de sus datos dirigiéndose a: privacidad@denilsonarnau.com<br>
        <strong>Información adicional:</strong> Puede consultar información adicional y detallada en nuestra <a href="/politica-privacidad.html">Política de Privacidad</a>.
    </p>
</div>
```

---

## 2. CLÁUSULA CHATBOT CON IA

### Aviso inicial (primera vez que se abre el chatbot):

```html
<div class="chatbot-privacy-notice" id="chatbot-privacy-notice">
    <div class="notice-icon">ℹ️</div>
    <h4>Aviso sobre Tratamiento de Datos</h4>
    <p>
        Este chatbot utiliza <strong>inteligencia artificial</strong> (OpenAI GPT-4) para responder a sus consultas.
        Sus mensajes serán procesados por servicios de terceros ubicados en Estados Unidos.
    </p>
    <p><strong>Por favor, NO incluya:</strong></p>
    <ul>
        <li>❌ Datos bancarios o financieros</li>
        <li>❌ Números de DNI/NIE/Pasaporte</li>
        <li>❌ Datos de salud</li>
        <li>❌ Información especialmente sensible</li>
    </ul>
    <p>
        Las conversaciones se conservan durante 30 días. Puede ejercer sus derechos contactando con:
        <a href="mailto:privacidad@denilsonarnau.com">privacidad@denilsonarnau.com</a>
    </p>
    <p>
        Más información en nuestra <a href="/politica-privacidad.html" target="_blank">Política de Privacidad</a>.
    </p>
    <div class="notice-buttons">
        <button class="btn-accept-chatbot" onclick="acceptChatbotTerms()">Entendido</button>
        <button class="btn-decline-chatbot" onclick="closeChatbot()">Cancelar</button>
    </div>
</div>
```

### Aviso permanente (en el footer del chatbot):

```html
<div class="chatbot-footer-notice">
    <small>
        🔒 Tus datos están protegidos.
        <a href="/politica-privacidad.html" target="_blank">Política de Privacidad</a> |
        Powered by IA (OpenAI)
    </small>
</div>
```

---

## 3. BANNER DE COOKIES (PRIMERA VISITA)

### HTML del banner:

```html
<div class="cookie-banner" id="cookie-banner" style="display: none;">
    <div class="cookie-content">
        <div class="cookie-icon">🍪</div>
        <div class="cookie-text">
            <h3>Este sitio web utiliza cookies</h3>
            <p>
                Utilizamos cookies propias y de terceros para mejorar tu experiencia.
                Algunas cookies son esenciales para el funcionamiento del sitio,
                mientras que otras nos ayudan a entender cómo interactúas con nosotros.
            </p>
            <p>
                <a href="/politica-cookies.html" target="_blank">Más información sobre cookies</a>
            </p>
        </div>
        <div class="cookie-buttons">
            <button class="btn-accept-all" onclick="acceptAllCookies()">Aceptar todas</button>
            <button class="btn-reject-optional" onclick="rejectOptionalCookies()">Solo esenciales</button>
            <button class="btn-configure" onclick="openCookieSettings()">Configurar</button>
        </div>
    </div>
</div>
```

### Panel de configuración de cookies:

```html
<div class="cookie-settings-panel" id="cookie-settings" style="display: none;">
    <h3>Configuración de Cookies</h3>

    <div class="cookie-category">
        <div class="cookie-category-header">
            <h4>Cookies Técnicas (Obligatorias)</h4>
            <input type="checkbox" checked disabled>
        </div>
        <p>Necesarias para el funcionamiento del sitio web. No se pueden desactivar.</p>
        <ul>
            <li><strong>chatbot_session_id:</strong> Identificador de sesión del chatbot</li>
            <li><strong>theme_preference:</strong> Preferencia de tema claro/oscuro</li>
        </ul>
    </div>

    <div class="cookie-category">
        <div class="cookie-category-header">
            <h4>Cookies de Terceros</h4>
            <input type="checkbox" id="third-party-cookies">
        </div>
        <p>Utilizadas para cargar recursos externos (fuentes, servicios).</p>
        <ul>
            <li><strong>Google Fonts:</strong> Tipografías web (transferencia a EEUU)</li>
            <li><strong>EmailJS:</strong> Servicio de formularios (transferencia a EEUU)</li>
        </ul>
    </div>

    <div class="cookie-settings-buttons">
        <button onclick="saveCookiePreferences()">Guardar preferencias</button>
        <button onclick="closeCookieSettings()">Cancelar</button>
    </div>
</div>
```

---

## 4. CHECKBOX COMUNICACIONES COMERCIALES (OPCIONAL)

### Si se desea enviar newsletters:

```html
<div class="form-group form-checkbox-optional">
    <input type="checkbox" id="marketing-accept" name="marketing-accept">
    <label for="marketing-accept">
        Deseo recibir información comercial sobre servicios de desarrollo web y automatización.
        Puedo darme de baja en cualquier momento.
    </label>
</div>
```

---

## 5. MENSAJE CONFIRMACIÓN ENVÍO FORMULARIO

### Después de enviar el formulario con éxito:

```html
<div class="form-success-message">
    <h3>✅ ¡Mensaje enviado correctamente!</h3>
    <p>Hemos recibido tu consulta y te responderemos en un plazo máximo de 48 horas.</p>
    <p>
        Si deseas modificar o eliminar los datos enviados, contacta con:
        <a href="mailto:privacidad@denilsonarnau.com">privacidad@denilsonarnau.com</a>
    </p>
</div>
```

---

## 6. FUNCIONES JAVASCRIPT NECESARIAS

### Para el banner de cookies:

```javascript
// Aceptar todas las cookies
function acceptAllCookies() {
    localStorage.setItem('cookies_accepted', 'all');
    document.getElementById('cookie-banner').style.display = 'none';
    loadThirdPartyScripts(); // Cargar Google Fonts, etc.
}

// Solo cookies esenciales
function rejectOptionalCookies() {
    localStorage.setItem('cookies_accepted', 'essential');
    document.getElementById('cookie-banner').style.display = 'none';
    // NO cargar scripts de terceros
}

// Guardar preferencias personalizadas
function saveCookiePreferences() {
    const thirdParty = document.getElementById('third-party-cookies').checked;
    localStorage.setItem('cookies_third_party', thirdParty ? 'yes' : 'no');
    document.getElementById('cookie-settings').style.display = 'none';
    document.getElementById('cookie-banner').style.display = 'none';

    if (thirdParty) {
        loadThirdPartyScripts();
    }
}

// Mostrar banner si no hay preferencias guardadas
window.addEventListener('load', () => {
    if (!localStorage.getItem('cookies_accepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
});
```

### Para el chatbot:

```javascript
// Aceptar términos del chatbot
function acceptChatbotTerms() {
    localStorage.setItem('chatbot_terms_accepted', 'true');
    document.getElementById('chatbot-privacy-notice').style.display = 'none';
    // Habilitar input del chat
    document.getElementById('chat-input').disabled = false;
}

// Verificar aceptación al abrir chatbot
function openChatbot() {
    const termsAccepted = localStorage.getItem('chatbot_terms_accepted');
    if (!termsAccepted) {
        document.getElementById('chatbot-privacy-notice').style.display = 'block';
        document.getElementById('chat-input').disabled = true;
    }
    document.getElementById('chatbot-window').classList.add('active');
}
```

### Para validación formulario:

```javascript
// Validar checkbox antes de enviar
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const privacyCheckbox = document.getElementById('privacy-accept');

    if (!privacyCheckbox.checked) {
        e.preventDefault();
        alert('Debes aceptar la Política de Privacidad para enviar el formulario');
        return false;
    }

    // Continuar con envío normal...
});
```

---

## 7. ESTILOS CSS RECOMENDADOS

```css
/* Banner de cookies */
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 20px;
    z-index: 10000;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
}

/* Aviso chatbot */
.chatbot-privacy-notice {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
}

/* Checkbox obligatorio */
.form-checkbox label {
    font-size: 0.9rem;
    line-height: 1.5;
}

.form-checkbox input[type="checkbox"]:not(:checked) ~ label {
    opacity: 0.7;
}
```

---

## 8. IMPLEMENTACIÓN TÉCNICA

### Orden de implementación:

1. ✅ Crear páginas `/aviso-legal.html`, `/politica-privacidad.html`, `/politica-cookies.html`
2. ✅ Añadir banner de cookies (bloquear terceros hasta aceptación)
3. ✅ Modificar formulario de contacto (añadir checkbox obligatorio)
4. ✅ Añadir aviso inicial en chatbot
5. ✅ Añadir enlaces a políticas en footer
6. ✅ Implementar lógica de consentimiento en JavaScript
7. ✅ Probar flujos completos

---

**Responsable:** Denilson Capa
**Contacto privacidad:** privacidad@denilsonarnau.com
