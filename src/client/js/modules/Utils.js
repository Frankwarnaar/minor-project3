class Utils {
	constructor(app) {
		this.app = app;
	}

	calculateScoreZone(ratio) {
		switch(true) {
			case (ratio > 1.05):
				return 'high';
				break;
			case (ratio < .95):
				return 'low';
				break;
			default:
				return 'medium';
		}
	}
}

module.exports = Utils;