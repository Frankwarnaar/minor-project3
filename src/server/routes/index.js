const express = require('express');

const router = express.Router()
	.get('/', getRanking)
	.get('/dashboard/:id', getDashboard)
	.get('/catererData/:id/:consumption/:productsSold', updateCatererData);

function getRanking(req, res) {
	res.render('ranking', {
		title: 'Sustainable leaderboard'
	});
}

class Caterer {
	constructor(title, id, average) {
		this.title = title;
		this.id = id;
		this.average = average;
		this.data = [];
	}
}

const caterers = [
	new Caterer('Sandwiches', 'FFB3', 24.38),
	new Caterer('Snackbar', '03EE', 17.43),
	new Caterer('Kebab', 'D935', 12.98)
];

function updateCatererData(req, res) {
	const id = req.params.id;
	const consumption = req.params.consumption / 100;
	const productsSold = Number(req.params.productsSold);
	const timestamp = (new Date()).getTime();
	const matchingCaterer = caterers.find(caterer => {
		return caterer.id === id;
	});
	const snapshot = {
		timestamp,
		productsSold,
		consumption
	}

	if (matchingCaterer) {

		const recentData = matchingCaterer.data.filter(datapoint => {
			return datapoint.timestamp > timestamp - 60 * 1000;
		});
		recentData.push(snapshot);
		const averageConsumption = recentData.reduce((buffer, current) => {
			return buffer + current.consumption;
		}, 0) / recentData.length;
		const totalProductsSold = recentData[recentData.length - 1].productsSold - recentData[0].productsSold;
		matchingCaterer.efficiency = totalProductsSold / averageConsumption / recentData.length * 60;
		snapshot.efficiency = totalProductsSold / averageConsumption / recentData.length * 60;
		matchingCaterer.score = matchingCaterer.efficiency / matchingCaterer.average;
		snapshot.score = matchingCaterer.efficiency / matchingCaterer.average;

		matchingCaterer.data.push(snapshot);
	} else {
		const efficiency = prodoctsSold / consumption;
		caterers.push({
			id,
			data: [snapshot],
			efficiency,
		});
	}
	req.io.emit('publishRanking', caterers);
	res.send(caterers);
}

function getDashboard(req, res) {
	res.render('dashboard', {
		id: req.params.id,
		title: 'Personal dashboard'
	});
}

module.exports = router;