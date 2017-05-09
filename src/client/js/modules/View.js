class View {
	constructor(app) {
		this.app = app;
	}

	renderRanking(ranking) {
		ranking = ranking.sort((a, b) => {
			return a.ratio - b.ratio;
		})

		const $list = document.getElementById('ranking');
		ranking.forEach(caterer => {
			console.log(caterer);
			const $caterer = document.createElement('li');
			const content = `
			<div class="image-container">
				<img src="${caterer.image}" alt="${caterer.title}"/>
			</div>
			<h2>${caterer.title}</h2>
			<span>${caterer.ratio}</span>
			`;
			const zone = this.app.utils.calculateScoreZone(caterer.ratio);

			$caterer.classList.add('caterer');
			$caterer.classList.add(zone);
			$caterer.insertAdjacentHTML('beforeend', content);
			$list.appendChild($caterer);
		});
	}
}

module.exports = View;
