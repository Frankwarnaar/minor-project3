class Utils {
	constructor(app) {
		this.app = app;
	}

	calculateScoreZone(ratio) {
		switch(true) {
			case (ratio == 0):
				return 'not measured';
				break;
			case (ratio > 1.5):
				return 'Very Sustainable';
				break;
			case (ratio > 1.05):
				return 'Sunstainable';
				break;
			case (ratio > .95 && ratio < 1.05):
				return 'Avarage';
				break;
			default:
				return 'Not sustainable'
		}
	}
}

module.exports = Utils;