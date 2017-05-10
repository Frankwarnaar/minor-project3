const d3 = require('d3');

class Linechart {
	constructor(app) {
		this.app = app;
		this.settings = {};
		this.settings.padding = 16;
		this.settings.width = window.innerWidth > 1000 ? (1000 - 4 * this.settings.padding) / 3 * 2 : window.innerWidth - 4 * this.settings.padding;
		this.settings.height = 400 - 4 * this.settings.padding;
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
		this.productsGroup = this.svg.append('g');
		this.consumptionGroup = this.svg.append('g');

		this.x = d3.time.scale()
			.range([0, this.settings.width - 2 * this.settings.padding]);

		this.yScore = d3.scale.linear()
			.rangeRound([this.settings.height - 2 * this.settings.padding, 0]);
		this.yProductsSold = d3.scale.linear()
			.rangeRound([this.settings.height - 2 * this.settings.padding, 0]);
		this.yConsumption = d3.scale.linear()
			.rangeRound([this.settings.height - 2 * this.settings.padding, 0]);

		this.scorePath = createLine('score', 'yScore');
		this.productsPath = createLine('productsSold', 'yProductsSold');
		this.consumptionPath = createLine('consumption', 'yConsumption');

		const self = this;

		function createLine(parameter, yScale) {
			return d3.svg.line()
				.x(d => self.x(new Date(d.timestamp)))
				.y(d => self[yScale](d[parameter]));
		}

		this.scoreLine = this.scoreGroup.append('path')
			.attr('class', 'path__secondary');
		this.consumptionLine = this.consumptionGroup.append('path');
		this.productsLine = this.productsGroup.append('path')
		.attr('class', 'path__tertiary');
	}

	update(ranking) {
		const caterer = ranking.filter(caterer => {
			return caterer.id === this.id;
		})[0];
		const data = caterer.data;

		this.x.domain(d3.extent(data, d => new Date(d.timestamp)));
		const maxScore = d3.max(data, d => d.score);
		const maxProductsSold = d3.max(data, d => d.productsSold);
		const maxConsumption = d3.max(data, d => d.consumption);

		this.yScore.domain([0, maxScore]);
		this.yProductsSold.domain([0, maxProductsSold]);
		this.yConsumption.domain([0, maxConsumption]);

		this.scoreLine.data(data);
		this.scoreLine.attr('d', this.scorePath(data));

		this.productsLine.data(data);
		this.productsLine.attr('d', this.productsPath(data));

		this.consumptionLine.data(data);
		this.consumptionLine.attr('d', this.consumptionPath(data));
	}
}

module.exports = Linechart;