class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.socket();
	}

	socket() {
		this.app.socket = io();

		this.app.socket
			.on('publishRanking', onPublishRanking.bind(this));

		function onPublishRanking(ranking) {
			this.app.view.renderRanking(ranking);
			this.app.linechart.update(ranking);
		}
	}
}

module.exports = Controller;
