const d3 = require('d3');

class Linechart {
	constructor(app) {
		this.app = app;
		this.settings = {
			width: window.innerWidth > 1000 ? 1000 : window.innerWidth,
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
		this.productsGroup = this.svg.append('g');
		this.consumptionGroup = this.svg.append('g');

		this.x = d3.time.scale()
			.range([0, this.settings.width]);

		this.yScore = d3.scale.linear()
			.rangeRound([this.settings.height, 0]);
		this.yProductsSold = d3.scale.linear()
			.rangeRound([this.settings.height, 0]);
		this.yConsumption = d3.scale.linear()
			.rangeRound([this.settings.height, 0]);

		this.scorePath = createLine('score', 'yScore');
		this.productsPath = createLine('productsSold', 'yProductsSold');
		this.consumptionPath = createLine('consumption', 'yConsumption');

		const self = this;

		function createLine(parameter, yScale) {
			console.log(yScale);
			return d3.svg.line()
				.x(d => self.x(new Date(d.timestamp)))
				.y(d => {
					console.log(yScale);
					return self[yScale](d[parameter])
				});
		}

		this.scoreLine = this.scoreGroup.append('path');
		this.productsLine = this.productsGroup.append('path')
			.attr('class', 'path__secondary');
		this.consumptionLine = this.consumptionGroup.append('path')
			.attr('class', 'path__tertiary');
	}

	update(ranking) {
		const caterer = ranking.filter(caterer => {
			return caterer.id === this.id;
		})[0];
		const data = caterer.data;

		this.x.domain(d3.extent(data, d => new Date(d.timestamp)));
		this.yScore.domain(d3.extent(data, d => d.score));
		this.yProductsSold.domain(d3.extent(data, d => d.productsSold));
		this.yConsumption.domain(d3.extent(data, d => d.consumption));

		this.scoreLine.data(data);
		this.scoreLine.attr('d', this.scorePath(data));

		this.productsLine.data(data);
		this.productsLine.attr('d', this.productsPath(data));

		this.consumptionLine.data(data);
		this.consumptionLine.attr('d', this.consumptionPath(data));
	}
}

module.exports = Linechart;