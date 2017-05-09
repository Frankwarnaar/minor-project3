class View {
	constructor(app) {
		this.app = app;
	}

	renderRanking(ranking) {
		ranking = ranking.sort((a, b) => {
			return b.score - a.score;
		});

		const $list = document.getElementById('ranking');
		$list.innerHTML = null;
		ranking.forEach(caterer => {
			const $caterer = document.createElement('li');
			const content = `
			<h2>${caterer.title}</h2>
			<span>${caterer.score || 0}</span>
			`;
			const zone = this.app.utils.calculateScoreZone(caterer.score);

			$caterer.classList.add('caterer');
			$caterer.classList.add(zone);
			$caterer.insertAdjacentHTML('beforeend', content);
			$list.appendChild($caterer);
		});
	}
}

module.exports = View;
