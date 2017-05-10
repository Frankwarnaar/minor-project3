class View {
	constructor(app) {
		this.app = app;
	}

	renderRanking(ranking) {
		ranking = ranking.sort((a, b) => {
			return a.score - b.score;
		});

		const $list = document.getElementById('ranking');
		if ($list) {
			$list.innerHTML = null;
			ranking.forEach((caterer,index) => {
				const $caterer = document.createElement('li');
				if(typeof caterer.score === 'number'){
					caterer.score = (caterer.score).toFixed(2)
				}else{
					caterer.score = 0
				}
				const zone = this.app.utils.calculateScoreZone(caterer.score);
				const content = `
				<span class="caterer-place"># ${(index+1)}</span>
				<div class="caterer-block">
				<div class="caterer-inner">
					<span class="display-sm subtitle-head">Food/Drink stand</span>
					<span>${caterer.title}</span>
				</div>
				<div class="caterer-inner">
					<span class="display-sm subtitle-head">Products per kWh</span>
					<span>${caterer.score}</span>
				</div>
				<div class="caterer-inner">
					<span class="display-sm subtitle-head">Target</span>
					<span>${caterer.average}</span>
				</div>
				<div class="caterer-inner">
					<span class="display-sm subtitle-head">Sustainability</span>
					<span>${zone}</span>
				</div>
				</div>
				`;

				$caterer.classList.add('caterer');
				// $caterer.classList.add(zone);
				$caterer.insertAdjacentHTML('beforeend', content);
				$list.appendChild($caterer);
			});
		}
	}
}

module.exports = View;
