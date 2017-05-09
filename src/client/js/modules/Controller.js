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
			.on('publishRanking', this.app.view.renderRanking.bind(this));

	}
}

module.exports = Controller;
