class App {
	constructor() {
		const Controller = require('./Controller.js');
		const View = require('./View.js');
		const Utils = require('./Utils.js');

		this.controller = new Controller(this);
		this.view = new View(this);
		this.utils = new Utils(this);

		this.init();
	}

	init() {
		this.controller.init();
	}
}

module.exports = App;