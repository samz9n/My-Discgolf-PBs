const express = require('express');
const app = express();

var helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('bestRounds.db');

app.listen(8080, () => {
	console.log('Node works in localhost:8080');
});

app.get('/', (req, res, next) => {
	return res.status(200).json({ error: false, message: 'Success' });
});

//GET ALL ROUNDS
app.get('/round/all', (req, res, next) => {
	db.all('SELECT * FROM bestRound', (error, results) => {
		if (error) throw error;

		return res.status(200).json(results);
	}); // db.all
});

//GET ONE ROUND BY ID
app.get('/round/one/:id', (req, res, next) => {
	let id = req.params.id;
	db.get('SELECT * FROM bestRound where id=?', [ id ], (error, result) => {
		if (error) throw error;

		if (typeof result === 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	}); // db.get
});

//ADD ROUND
app.post('/round/add', (req, res, next) => {
	let round = req.body;

	db.run(
		'INSERT INTO bestRound (course,score,holeinones,birdies,pars,bogeys,doublebogeys,tripleorworse) values (?, ?, ?, ?, ?, ?, ?,?)',
		[
			round.course,
			round.score,
			round.holeinones,
			round.birdies,
			round.pars,
			round.bogeys,
			round.doublebogeys,
			round.tripleorworse
		],
		(error, result) => {
			if (error) throw error;

			return res.status(200).json({ count: 1 });
		}
	);
});

//DELETE SELECTED ROUND
app.get('/round/delete/:id', (req, res, next) => {
	let id = req.params.id;

	db.run('DELETE FROM bestRound WHERE id = ?', [ id ], function(error, result) {
		if (error) throw error;

		return res.status(200).json({ count: this.changes });
	});
});

//EDIT ONE ROUND BY ID
app.put('/round/edit/:id', (req, res, next) => {
	let data = {
		score: req.body.score,
		holeinones: req.body.holeinones,
		birdies: req.body.birdies,
		pars: req.body.pars,
		bogeys: req.body.bogeys,
		doublebogeys: req.body.doublebogeys,
		tripleorworse: req.body.tripleorworse
	};
	let id = req.params.id;
	db.run(
		`UPDATE bestRound SET
           score = ?, 
           holeinones = ?,
		   birdies = ?,
		   pars = ?,
		   bogeys = ?,
		   doublebogeys = ?,
		   tripleorworse = ? 
           WHERE id = ?`,
		[
			data.score,
			data.holeinones,
			data.birdies,
			data.pars,
			data.bogeys,
			data.doublebogeys,
			data.tripleorworse,
			id
		],
		function(err, result) {
			if (err) {
				return res.status(400).json({error: err.message});
			}
			return res.status(200).json({
				data: data,
				changes: this.changes
			});
		}
	);
});

app.get('*', (req, res, next) => {
	return res.status(404).json({ error: true, message: 'Nothing to fetch' });
});
