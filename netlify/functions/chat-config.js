exports.handler = async (event, context) => {
	const config = {
		integrationID: process.env.integrationID,
		region: process.env.region,
		serviceInstanceID: process.env.serviceInstanceID,
		onLoad: async (instance) => { await instance.render(); },
		openChatByDefault: true,
		headerConfig: {
			minimizeButtonIconType: 'close',
			showRestartButton: true,
		}
	};

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(config)
	};
};