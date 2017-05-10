const d3 = require('d3');

class Linechart {
	constructor(app) {
		this.app = app;
		this.settings = {
			width: 600,
			height: 400
		}
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
			.attr('width', this.settings.width)
			.attr('height', this.settings.height);

		this.scoreGroup = this.svg.append('g');

		this.x = d3.scaleTime()
			.range([0, this.settings.width]);

		this.yScore = d3.scaleLinear()
			.rangeRound([this.settings.height, 0]);
		// this.yConsumption = d3.scaleLinear()
		// 	.rangeRound([height, 0]);
		// this.yProductsSold = d3.scaleLinear()
		// 	.rangeRound([height, 0]);
		this.scoreLine = d3.line()
			.x(d => x(new Date(d.timestamp)))
			.y(d => y(new Date(d.score)));
	}

	update(ranking) {
		const caterer = ranking.filter(caterer => {
			return caterer.id === this.id;
		})[0];
		const data = caterer.data;
		console.log(data);

		this.x.domain(d3.extent(data, d => new Date(d.timestamp)));
		this.yScore.domain(d3.extent(data, d => new Date(d.score)));
	}
}

module.exports = Linechart;