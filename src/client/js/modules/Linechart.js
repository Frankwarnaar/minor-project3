const d3 = require('d3');

class Linechart {
	constructor(app) {
		this.app = app;
		this.init();
	}

	init() {
		const $id = document.querySelector('[data-id]');
		if ($id) {
			this.id = $id.getAttribute('data-id');
			this.setupChart(this.id);
		}
	}

	setupChart(id) {
		this.svg = d3.select('#line-chart').append('svg');

		this.svg
			.attr('width', '100%')
			.attr('height', '100vh');

		console.log(this.svg);
	}

	update(ranking) {
		const caterer = ranking.filter(caterer => {
			return caterer.id === this.id;
		})[0];
		console.log(caterer);
	}
}

module.exports = Linechart;