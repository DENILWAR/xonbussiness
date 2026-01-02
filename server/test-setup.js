/* ================================================
   TEST SETUP - Script de verificación rápida
   ================================================ */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 Verificando configuración del Chatbot Santos...\n');

let allGood = true;

// 1. Verificar .env
console.log('1️⃣  Verificando archivo .env...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('   ✅ Archivo .env encontrado');

    const envContent = fs.readFileSync(envPath, 'utf-8');

    if (envContent.includes('OPENAI_API_KEY=') && !envContent.includes('tu_api_key_aqui')) {
        console.log('   ✅ OPENAI_API_KEY configurada');
    } else {
        console.log('   ❌ OPENAI_API_KEY no está configurada correctamente');
        console.log('      Edita server/.env y añade tu API key de OpenAI');
        allGood = false;
    }
} else {
    console.log('   ❌ Archivo .env NO encontrado');
    console.log('      Crea el archivo server/.env basándote en .env.example');
    allGood = false;
}

// 2. Verificar node_modules
console.log('\n2️⃣  Verificando dependencias...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('   ✅ Dependencias instaladas');
} else {
    console.log('   ❌ Dependencias NO instaladas');
    console.log('      Ejecuta: cd server && npm install');
    allGood = false;
}

// 3. Verificar estructura de archivos
console.log('\n3️⃣  Verificando estructura de archivos...');
const requiredFiles = [
    'server.js',
    'package.json',
    'config/openai.config.js',
    'controllers/chatController.js',
    'middleware/rateLimiter.js',
    'middleware/validator.js',
    'services/sessionManager.js',
    'services/intentEngine.js',
    'services/contextBuilder.js',
    'data/portfolio-context.json'
];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file} NO encontrado`);
        allGood = false;
    }
});

// 4. Verificar widget frontend
console.log('\n4️⃣  Verificando widget frontend...');
const widgetJsPath = path.join(__dirname, '..', 'assets', 'js', 'chatbot', 'chatbot-widget.js');
const widgetCssPath = path.join(__dirname, '..', 'assets', 'css', 'chatbot', 'chatbot-widget.css');

if (fs.existsSync(widgetJsPath)) {
    console.log('   ✅ chatbot-widget.js');
} else {
    console.log('   ❌ chatbot-widget.js NO encontrado');
    allGood = false;
}

if (fs.existsSync(widgetCssPath)) {
    console.log('   ✅ chatbot-widget.css');
} else {
    console.log('   ❌ chatbot-widget.css NO encontrado');
    allGood = false;
}

// Resultado final
console.log('\n' + '='.repeat(60));
if (allGood) {
    console.log('✅ ¡Todo listo! Puedes iniciar el servidor con: npm start');
} else {
    console.log('❌ Hay problemas que resolver antes de iniciar');
    console.log('   Revisa los errores arriba y corrígelos');
}
console.log('='.repeat(60) + '\n');

process.exit(allGood ? 0 : 1);
