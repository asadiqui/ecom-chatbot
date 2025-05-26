window.watsonAssistantChatOptions = {
	integrationID: window.CHAT_CONFIG.integrationID,
	region: window.CHAT_CONFIG.region,
	serviceInstanceID: window.CHAT_CONFIG.serviceInstanceID,
	onLoad: async (instance) => { await instance.render(); },
	openChatByDefault: true,
	headerConfig: {
		minimizeButtonIconType: 'close',
		showRestartButton: true,
	},
};
setTimeout(function(){
	const t=document.createElement('script');
	t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
	document.head.appendChild(t);
});