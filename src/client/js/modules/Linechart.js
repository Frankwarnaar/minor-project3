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

		console.log(d3);

		this.scoreGroup = this.svg.append('g');

		this.x = d3.time.scale()
			.range([0, this.settings.width]);

		this.yScore = d3.scale.linear()
			.rangeRound([this.settings.height, 0]);
		// this.yConsumption = d3.scaleLinear()
		// 	.rangeRound([height, 0]);
		// this.yProductsSold = d3.scaleLinear()
		// 	.rangeRound([height, 0]);

		this.scorePath = d3.svg.line()
			.x(d => {
				return this.x(new Date(d.timestamp));
			})
			.y(d => {
				console.log(d.score);
				return this.yScore(d.score);
			});

		this.scoreLine = this.scoreGroup.append('path');
	}

	update(ranking) {
		const caterer = ranking.filter(caterer => {
			return caterer.id === this.id;
		})[0];
		const data = caterer.data;

		this.x.domain(d3.extent(data, d => new Date(d.timestamp)));
		this.yScore.domain(d3.extent(data, d => d.score));

		this.scoreLine.data(data);

		this.scoreLine.attr('d', this.scorePath(data));
	}
}

module.exports = Linechart;