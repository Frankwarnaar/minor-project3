class Utils {
	constructor(app) {
		this.app = app;
	}

	calculateScoreZone(ratio) {
		switch(true) {
			case (ratio > this.app.config.caterers.ratios.high):
				return 'high';
				break;
			case (ratio < this.app.config.caterers.ratios.low):
				return 'low';
				break;
			default:
				return 'medium';
		}
	}
}

module.exports = Utils;