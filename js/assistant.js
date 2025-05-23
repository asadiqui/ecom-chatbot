async function initWatsonChat() {
  try {
    // Fetch config from your Netlify function
    const response = await fetch('/.netlify/functions/chat-config');
    const config = await response.json();
    
    // Set the Watson chat options
    window.watsonAssistantChatOptions = config;
    
    // Load the Watson script
    setTimeout(function(){
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
              (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
              "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
    
  } catch (error) {
    console.error('Failed to load chat config:', error);
  }
}

// Initialize when page loads
initWatsonChat();