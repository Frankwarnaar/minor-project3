const express = require('express');

const router = express.Router()
	.get('/', getRanking)
	.get('/catererData/:id/:consumption/:productsSold', updateCatererData);

function getRanking(req, res) {
	res.render('ranking');
}

const caterers = []

function updateCatererData(req, res) {
	const id = req.params.id;
	const consumption = req.params.consumption / 20;
	const productsSold = req.params.productsSold;
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
		matchingCaterer.data.push(snapshot);

		const recentData = matchingCaterer.data.filter(datapoint => {
			return datapoint.timestamp > timestamp - 60 * 1000;
		});
		const averageConsumption = recentData.reduce((buffer, current) => {
			return buffer + current.consumption;
		}, 0) / recentData.length;
		const totalProductsSold = recentData[recentData.length - 1].productsSold - recentData[0].productsSold;
		matchingCaterer.efficiency = totalProductsSold / averageConsumption / recentData.length * 60;
	} else {
		caterers.push({
			id,
			data: [snapshot],
			efficiency: productsSold / consumption
		});
	}
}

module.exports = router;