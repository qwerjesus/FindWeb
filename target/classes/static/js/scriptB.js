const chatbotContainer = document.getElementById("chatbot-container");
const openChatbotBtn = document.getElementById("open-chatbot");
const closeChatbotBtn = document.getElementById("close-chatbot");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let userName = "";  // Variable para almacenar el nombre del usuario

// Lista de saludos aleatorios
let greetings = [
    "¡Hola! Soy FindWeb, tu asistente virtual. ¿Con quién tengo el gusto de hablar hoy?",
    "¡Hola! Soy FindWeb, encantado de ayudarte. ¿Cómo te gustaría que te llamara?",
    "¡Hola! Soy FindWeb, tu asistente virtual. ¿Me podrías decir tu nombre para empezar?",
    "¡Hola! Soy FindWeb. Es un placer conocerte. ¿Cómo te gustaría que me llame?",
    "¡Hola! Soy FindWeb. ¿Con qué nombre te gustaría que me dirigiera a ti?",
    "¡Hola! Soy FindWeb. ¿Cómo prefieres que te llame hoy?",
    "¡Hola! Soy FindWeb, tu asistente virtual. ¿Qué nombre debo usar para hablar contigo?"
];

// Función para elegir un saludo aleatorio
function getRandomGreeting() {
    let randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

// Función para validar el nombre ingresado
function validateName(name) {
    // Verificar que no empiece con un número y que tenga un máximo de 15 caracteres
    let nameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
    return nameRegex.test(name);
}

// Evento para abrir el chatbot
openChatbotBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    openChatbotBtn.style.display = "none";
});

// Evento para cerrar el chatbot
closeChatbotBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    openChatbotBtn.style.display = "block";
});

// Evento para enviar el mensaje
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

// Función para enviar el mensaje y manejar la respuesta del bot
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    addMessage(userMessage, "user-message");
    userInput.value = "";
    setTimeout(() => {
        generateBotResponse(userMessage);
    }, 500);
}

// Función para agregar un mensaje al chat
function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = `message ${className}`;
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para generar la respuesta del chatbot
async function generateBotResponse(userMessage) {
    let response = "Lo siento, no entiendo tu pregunta.";

    // Si el nombre aún no ha sido almacenado
    if (userName === "") {
        if (userMessage.length > 0) {
            if (validateName(userMessage)) {
                userName = userMessage;
                response = `¡Hola, ${userName}! ¿En qué puedo ayudarte hoy?`;
            } else {
                response = "El nombre no es válido. Debe comenzar con una letra y no tener más de 15 caracteres.";
            }
        }
    } else {
        // Convertir el mensaje a minúsculas para facilitar las comparaciones
        let lowerCaseMessage = userMessage.toLowerCase();

        // Usamos switch para manejar las respuestas
        switch (true) {
            // Saludos
            case ["hola", "¡hey!", "saludos"].some(word => lowerCaseMessage.includes(word)):
                response = `¡Hola, ${userName}! ¿En qué puedo ayudarte hoy?`;
                break;
			case ["xiaomi 13c", "precio de Xiaomi 13c dual", "precio de xiaomi 13c"].some(word => lowerCaseMessage.includes(word)):
				                response = `¡Hola, ${userName}! su precio es 589.900 pesos`;
				break;
            // Otros casos predefinidos aquí...
            default:
                // Si no hay coincidencia, se recurre al modelo de IA
                response = await getAIResponse(userMessage);
        }
    }

    addMessage(response, "bot-message");
}

// Función para obtener una respuesta de la IA (usando OpenAI, por ejemplo)
async function getAIResponse(userMessage) {
    const apiKey = "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";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const requestData = {
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            { role: "system", content: "Eres un asistente virtual amigable y profesional." },
            { role: "user", content: userMessage }
        ],
        max_tokens: 150,
        temperature: 0.7
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error al obtener respuesta de la IA:", error);
        return "Lo siento, hubo un error al procesar tu solicitud.";
    }
}

// Mostrar saludo aleatorio al iniciar
addMessage(getRandomGreeting(), "bot-message");
