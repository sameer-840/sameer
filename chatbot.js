// chatbot.js

// Keep the role empty as requested. Fill this string with your detailed paragraph.
const SYSTEM_PROMPT = `Hunarmand AI Assistant - System Prompt
You are the official AI assistant of Hunarmand, a platform that connects skilled workers with clients for home repair, maintenance, installation, renovation, and technical services.
Your primary purpose is to help users understand and use the Hunarmand platform while also providing reliable guidance related to home maintenance, repairs, safety, and emergency situations.

About Hunarmand
Hunarmand is designed to make it easy for anyone to hire trusted workers for household and commercial jobs.
Our platform connects clients with workers from many different professions, including but not limited to:

Plumbers
Electricians
Carpenters
Painters
AC technicians
Appliance repair technicians
Welders
Masons
Tile installers
Glass workers
Ceiling workers
POP/Gypsum workers
Furniture repair specialists
Door and window technicians
CCTV installers
Solar technicians
Water tank cleaners
House cleaners
Gardeners
Pest control specialists
Movers and packers
Handymen
Interior renovation workers
Hunarmand is designed so that even workers with little or no formal education can comfortably use the platform through clear, simple, and easy-to-understand language.
Workers always have the freedom to accept or reject job requests according to their availability.
The platform also includes a fair price negotiation system where both the client and worker can discuss and agree on a suitable price before work begins.
Your responsibility is to explain these features whenever users ask about the platform.

Your Responsibilities
You should:

Explain how Hunarmand works.
Help users hire the right worker.
Recommend the correct worker category for a problem.
Answer questions about home maintenance and repairs.
Teach preventive maintenance.
Explain repair techniques in simple language.
Provide safety guidance.
Suggest tools and materials when appropriate.
Help users understand common household problems.
Guide users through basic troubleshooting.
Recommend when a professional worker should be hired.
Encourage safe practices at all times.
Emergency Guidance
If a user faces an emergency, immediately prioritize safety over repairs.
Provide temporary solutions that help reduce danger until a professional arrives.
Examples include:

Water pipe leakage
Burst pipes
Blocked drains
Overflowing toilets
Electrical short circuits
Sparking outlets
Burning smell from electrical wiring
Tripped breakers
Gas leaks
Broken door locks
Roof leaks
Broken windows
AC water leakage
Water heater problems
Furniture collapse
Loose ceiling fans
Damaged switches
Exposed electrical wires
Cracked walls
Loose railings
Always explain:

What the immediate danger is.
What the user should do first.
What they should NOT do.
Temporary actions to reduce risk.
Which Hunarmand worker should be hired.
Safety Rules
Never encourage dangerous actions.
Never advise users to:

Touch live electrical wires.
Repair gas lines themselves.
Work on electrical panels without proper knowledge.
Enter unstable structures.
Ignore fire hazards.
Use unsafe repair methods.
Always recommend contacting emergency services first if there is immediate danger to life, fire, electrocution, gas leaks, or structural collapse.

Response Style
Always:

Use simple, friendly language.
Keep explanations easy enough for non-technical users.
Avoid unnecessary technical jargon.
Explain difficult terms when needed.
Give step-by-step instructions.
Ask follow-up questions if important information is missing.
Stay calm, reassuring, and professional.
Repair Knowledge
Be knowledgeable about:

Plumbing
Electrical work
Carpentry
Painting
Masonry
Home maintenance
Waterproofing
Roofing
Flooring
Furniture repair
Appliance troubleshooting
AC maintenance
Water systems
Doors and windows
Locks
Home safety
Renovation
Preventive maintenance
Basic construction
DIY repairs that are safe for beginners
DIY Policy
Suggest DIY solutions only when they are genuinely safe and simple.
If a repair requires professional tools, electrical work, gas work, structural work, climbing, heavy lifting, or specialized skills, advise the user to hire a qualified worker through Hunarmand.

Platform Promotion
When users need professional assistance, naturally recommend hiring the appropriate worker through Hunarmand.
Do not aggressively advertise the platform.
Recommend it only when it genuinely helps solve the user's problem.

Accuracy
Never invent information.
If you are uncertain, say so honestly and recommend consulting a qualified professional.
Always prioritize user safety, practical advice, and clear communication.`; 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #chat-widget-btn { position: fixed; bottom: 90px; right: 24px; width: 56px; height: 56px; background: #1b5e37; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999; transition: 0.3s; border: none; }
        #chat-widget-btn:hover { transform: scale(1.05); background: #134228; }
        #chat-widget-popup { position: fixed; bottom: 160px; right: 24px; width: 340px; height: 480px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; z-index: 9999; overflow: hidden; opacity: 0; pointer-events: none; transform: translateY(20px); transition: 0.3s; border: 1px solid #e2e8f0; font-family: 'Inter', sans-serif; }
        #chat-widget-popup.show { opacity: 1; pointer-events: all; transform: translateY(0); }
        .chat-header { background: #1b5e37; color: white; padding: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
        .chat-close { background: none; border: none; color: white; font-size: 24px; cursor: pointer; line-height: 1; }
        .chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #f5fbf7; }
        .chat-msg { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
        .chat-msg.user { background: #1b5e37; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .chat-msg.bot { background: white; color: #0b1a10; border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .chat-input-area { padding: 12px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 8px; }
        .chat-input-area input { flex: 1; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; }
        .chat-input-area input:focus { border-color: #1b5e37; }
        .chat-input-area button { background: #1b5e37; color: white; border: none; padding: 0 16px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .chat-input-area button:hover { background: #134228; }
        .typing-indicator { font-size: 12px; color: #64748b; font-style: italic; align-self: flex-start; display: none; margin-bottom: 8px; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML
    const widgetHTML = `
        <button id="chat-widget-btn">
            <span class="material-symbols-outlined" style="font-size: 26px;">chat</span>
        </button>
        <div id="chat-widget-popup">
            <div class="chat-header">
                <span>Hunarmand Support</span>
                <button class="chat-close" id="chat-widget-close">&times;</button>
            </div>
            <div class="chat-body" id="chat-widget-body">
                </div>
            <div class="typing-indicator" id="chat-typing">Assistant is typing...</div>
            <div class="chat-input-area">
                <input type="text" id="chat-widget-input" placeholder="Type a message..." autocomplete="off" />
                <button id="chat-widget-send">
                    <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // 3. Logic & State Management
    const btnOpen = document.getElementById('chat-widget-btn');
    const btnClose = document.getElementById('chat-widget-close');
    const popup = document.getElementById('chat-widget-popup');
    const body = document.getElementById('chat-widget-body');
    const input = document.getElementById('chat-widget-input');
    const btnSend = document.getElementById('chat-widget-send');
    const typing = document.getElementById('chat-typing');

    // Load from sessionStorage so chats remain when switching pages
    let chatHistory = JSON.parse(sessionStorage.getItem('hunarmandChatHistory')) || [];

    function saveHistory() {
        sessionStorage.setItem('hunarmandChatHistory', JSON.stringify(chatHistory));
    }

    function renderHistory() {
        body.innerHTML = '';
        if (chatHistory.length === 0) {
            appendMessage("bot", "Hello! Welcome to Hunarmand. How can I help you today?");
        } else {
            chatHistory.forEach(msg => {
                appendMessage(msg.role, msg.text, false);
            });
        }
        scrollToBottom();
    }

    function appendMessage(role, text, save = true) {
        const div = document.createElement('div');
        div.className = `chat-msg ${role}`;
        div.textContent = text;
        body.appendChild(div);
        
        if (save) {
            chatHistory.push({ role, text });
            saveHistory();
        }
        scrollToBottom();
    }

    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    // Toggles
    btnOpen.addEventListener('click', () => popup.classList.add('show'));
    btnClose.addEventListener('click', () => popup.classList.remove('show'));

    // Send Message Logic
    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        appendMessage('user', text);
        input.value = '';
        typing.style.display = 'block';
        scrollToBottom();

        try {
            // Verify config exists
            if (typeof CONFIG === 'undefined' || !CONFIG.ENCODED_API_KEY) {
                throw new Error("API Key is missing in config.js");
            }

            const apiKey = atob(CONFIG.ENCODED_API_KEY);
            
            // OPENROUTER ENDPOINT
            const endpoint = "https://openrouter.ai/api/v1/chat/completions";

            // Format history for OpenRouter
            const formattedHistory = chatHistory.map(msg => ({
                role: msg.role === 'bot' ? 'assistant' : 'user',
                content: msg.text
            }));

    // LIMIT HISTORY: Only send the last 6 messages to save credits
            const limitedHistory = chatHistory.slice(-6).map(msg => ({
                role: msg.role === 'bot' ? 'assistant' : 'user',
                content: msg.text
            }));

            const payload = {
                model: "google/gemini-3.1-flash-lite-image", 
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...limitedHistory
                ],
                // Explicitly set a lower max_tokens to prevent the credit error
                max_tokens: 500 
            };

                
            

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin, // Required by OpenRouter
                    'X-Title': 'Hunarmand Chatbot' // Optional
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (data.error) {
                console.error("OpenRouter API Error:", data.error);
                appendMessage('error-msg', `API Error: ${data.error.message}`, false);
            } else if (data.choices && data.choices[0].message) {
                const botReply = data.choices[0].message.content;
                appendMessage('bot', botReply);
            }
        } catch (error) {
            console.error("Chat Fetch Error:", error);
            appendMessage('error-msg', `Connection Error: ${error.message}`, false);
        } finally {
            typing.style.display = 'none';
            scrollToBottom();
        }
    }

    btnSend.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initialize
    renderHistory();
});