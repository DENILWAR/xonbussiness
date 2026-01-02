/* ================================================
   CHATBOT SANTOS - WIDGET FRONTEND
   ================================================ */

class ChatbotWidget {
    constructor(config = {}) {
        this.config = {
            apiUrl: config.apiUrl || 'https://xonbussiness-production.up.railway.app',
            botName: config.botName || 'Santos',
            botAvatar: config.botAvatar || '🤖',
            userAvatar: config.userAvatar || '👤',
            ...config
        };

        this.isOpen = false;
        this.sessionId = this.getOrCreateSessionId();
        this.messageHistory = [];

        this.init();
    }

    // ==================== Inicialización ====================
    init() {
        this.injectStyles();
        this.createWidget();
        this.attachEventListeners();
        this.loadHistory();
    }

    injectStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/css/chatbot/chatbot-widget.css';
        document.head.appendChild(link);
    }

    createWidget() {
        const widgetHTML = `
            <!-- Botón flotante -->
            <button class="chatbot-button" id="chatbot-toggle" aria-label="Abrir chat">
                <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>

            <!-- Ventana del chat -->
            <div class="chatbot-window" id="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-avatar">${this.config.botAvatar}</div>
                    <div class="chatbot-info">
                        <h3 class="chatbot-name">${this.config.botName}</h3>
                        <div class="chatbot-status">
                            <span class="status-indicator"></span>
                            <span>En línea</span>
                        </div>
                    </div>
                </div>

                <!-- Cuerpo del chat -->
                <div class="chatbot-body" id="chatbot-body">
                    <div class="welcome-message">
                        <h3>Hola, soy ${this.config.botName}</h3>
                        <p>Asistente virtual de Denilson Capa. ¿En qué puedo ayudarte hoy?</p>
                    </div>

                    <!-- Sugerencias iniciales -->
                    <div class="quick-suggestions">
                        <button class="quick-suggestion" data-message="¿Qué proyectos has realizado?">
                            Ver proyectos
                        </button>
                        <button class="quick-suggestion" data-message="¿Qué servicios ofreces?">
                            Servicios
                        </button>
                        <button class="quick-suggestion" data-message="¿Cómo puedo contactarte?">
                            Contacto
                        </button>
                        <button class="quick-suggestion" data-message="Cuéntame sobre tu experiencia">
                            Experiencia
                        </button>
                    </div>
                </div>

                <!-- Footer / Input -->
                <div class="chatbot-footer">
                    <div class="chat-input-container">
                        <textarea
                            class="chat-input"
                            id="chat-input"
                            placeholder="Escribe tu mensaje..."
                            rows="1"
                        ></textarea>
                        <button class="chat-send-button" id="chat-send" aria-label="Enviar mensaje">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.innerHTML = widgetHTML;
        document.body.appendChild(container);

        // Cachear elementos
        this.elements = {
            button: document.getElementById('chatbot-toggle'),
            window: document.getElementById('chatbot-window'),
            body: document.getElementById('chatbot-body'),
            input: document.getElementById('chat-input'),
            sendButton: document.getElementById('chat-send')
        };
    }

    // ==================== Event Listeners ====================
    attachEventListeners() {
        // Toggle chat window
        this.elements.button.addEventListener('click', () => this.toggleChat());

        // Enviar mensaje con botón
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());

        // Enviar mensaje con Enter
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.elements.input.addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        });

        // Sugerencias rápidas
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-suggestion')) {
                const message = e.target.getAttribute('data-message');
                this.elements.input.value = message;
                this.sendMessage();
            }
        });
    }

    // ==================== Toggle Chat ====================
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.elements.button.classList.toggle('active', this.isOpen);
        this.elements.window.classList.toggle('active', this.isOpen);

        if (this.isOpen) {
            this.elements.input.focus();
            this.scrollToBottom();
        }
    }

    // ==================== Enviar Mensaje ====================
    async sendMessage() {
        const message = this.elements.input.value.trim();
        if (!message) return;

        // Limpiar input
        this.elements.input.value = '';
        this.elements.input.style.height = 'auto';

        // Añadir mensaje del usuario
        this.addMessage(message, 'user');

        // Deshabilitar input mientras procesa
        this.setInputState(false);

        // Mostrar indicador de escritura
        this.showTypingIndicator();

        try {
            // Enviar a la API
            const response = await this.sendToAPI(message);

            // Remover indicador de escritura
            this.hideTypingIndicator();

            // Añadir respuesta del bot
            this.addMessage(response.message, 'bot');

            // Guardar en historial
            this.saveHistory();

        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            this.hideTypingIndicator();
            this.addMessage(
                'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta directamente con Denilson.',
                'bot'
            );
        } finally {
            this.setInputState(true);
            this.elements.input.focus();
        }
    }

    // ==================== API Communication ====================
    async sendToAPI(message) {
        const response = await fetch(this.config.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                sessionId: this.sessionId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // ==================== UI Methods ====================
    addMessage(text, sender = 'bot') {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;

        const avatar = sender === 'bot' ? this.config.botAvatar : this.config.userAvatar;
        const time = this.formatTime(new Date());

        messageEl.innerHTML = `
            <div class="message-avatar ${sender}">${avatar}</div>
            <div class="message-content">
                <div class="message-bubble">${this.formatMessage(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        // Remover mensaje de bienvenida si existe
        const welcomeMsg = this.elements.body.querySelector('.welcome-message');
        if (welcomeMsg && sender === 'user') {
            welcomeMsg.remove();
        }

        // Remover sugerencias iniciales después del primer mensaje
        const suggestions = this.elements.body.querySelector('.quick-suggestions');
        if (suggestions && sender === 'user') {
            suggestions.remove();
        }

        this.elements.body.appendChild(messageEl);
        this.scrollToBottom();

        // Guardar en historial
        this.messageHistory.push({
            text: text,
            sender: sender,
            timestamp: Date.now()
        });
    }

    showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-message bot typing-message';
        typingEl.innerHTML = `
            <div class="message-avatar bot">${this.config.botAvatar}</div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        this.elements.body.appendChild(typingEl);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMsg = this.elements.body.querySelector('.typing-message');
        if (typingMsg) {
            typingMsg.remove();
        }
    }

    setInputState(enabled) {
        this.elements.input.disabled = !enabled;
        this.elements.sendButton.disabled = !enabled;

        if (!enabled) {
            this.elements.sendButton.innerHTML = '<div class="loading-spinner"></div>';
        } else {
            this.elements.sendButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
            `;
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.body.scrollTop = this.elements.body.scrollHeight;
        }, 100);
    }

    // ==================== Utilities ====================
    formatMessage(text) {
        // Convertir URLs a enlaces
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        text = text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');

        // Convertir saltos de línea
        text = text.replace(/\n/g, '<br>');

        return text;
    }

    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('chatbot_session_id');
        if (!sessionId) {
            sessionId = this.generateUUID();
            sessionStorage.setItem('chatbot_session_id', sessionId);
        }
        return sessionId;
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // ==================== Persistencia ====================
    saveHistory() {
        try {
            const history = {
                messages: this.messageHistory,
                sessionId: this.sessionId,
                lastUpdate: Date.now()
            };
            localStorage.setItem('chatbot_history', JSON.stringify(history));
        } catch (error) {
            console.warn('No se pudo guardar el historial:', error);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('chatbot_history');
            if (!saved) return;

            const history = JSON.parse(saved);

            // Solo cargar si es de la misma sesión y no es muy antiguo (24h)
            const isRecent = (Date.now() - history.lastUpdate) < 24 * 60 * 60 * 1000;
            const isSameSession = history.sessionId === this.sessionId;

            if (isRecent && isSameSession && history.messages.length > 0) {
                // Remover mensaje de bienvenida
                const welcomeMsg = this.elements.body.querySelector('.welcome-message');
                const suggestions = this.elements.body.querySelector('.quick-suggestions');
                if (welcomeMsg) welcomeMsg.remove();
                if (suggestions) suggestions.remove();

                // Restaurar mensajes (últimos 10)
                const recentMessages = history.messages.slice(-10);
                recentMessages.forEach(msg => {
                    this.addMessageFromHistory(msg.text, msg.sender);
                });

                this.messageHistory = history.messages;
            }
        } catch (error) {
            console.warn('No se pudo cargar el historial:', error);
        }
    }

    addMessageFromHistory(text, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;

        const avatar = sender === 'bot' ? this.config.botAvatar : this.config.userAvatar;

        messageEl.innerHTML = `
            <div class="message-avatar ${sender}">${avatar}</div>
            <div class="message-content">
                <div class="message-bubble">${this.formatMessage(text)}</div>
            </div>
        `;

        this.elements.body.appendChild(messageEl);
    }
}

// ==================== Inicialización Automática ====================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el chatbot
    window.chatbot = new ChatbotWidget({
        apiUrl: 'http://localhost:3001/api/chat',
        botName: 'Santos',
        botAvatar: '🤖'
    });

    console.log('✅ Chatbot Santos inicializado');
});
