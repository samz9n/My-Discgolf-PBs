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
	}) // db.all
})

//GET ONE ROUND BY ID
app.get('/round/one/:id', (req, res, next) => {
	let id = req.params.id;
	db.get('SELECT * FROM bestRound where id=?', [id], (error, result) => {
		if (error) throw error;

		if (typeof (result) === 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	}) // db.get
})

//ADD ROUND
app.post('/round/add', (req, res, next) => {
	let round = req.body;

	db.run('insert into bestRound (course,score,holeinones,birdies,pars,bogeys,doublebogeys,tripleorworse) values (?, ?, ?, ?, ?, ?, ?,?)',
		[round.course, round.score, round.holeinones, round.birdies, round.pars, round.bogeys, round.doublebogeys, round.tripleorworse], (error, result) => {
			if (error) throw error;

			return res.status(200).json({ count: 1 });
		});
})

//FOR IMAGES
/* const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './images'); // Mihin kansioon ladataan
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);  // Millä tiedostonimellä
	}
});

const upload = multer({ storage: storage });

app.post('/round/add', upload.single('kuva'), (req, res, next) => {
	let round = req.body;

	let kuvaNimi = null;
	if (req.file) {
		kuvaNimi = req.file.originalname;
	}

	db.run('insert into round (otsikko,paiva,paikka,saa,kuva,kuvaus) values (?, ?, ?, ?, ?, ?)',
		[round.otsikko, round.paiva, round.paikka, round.saa, kuvaNimi, round.kuvaus], (error, result) => {
			if (error) throw error;

			return res.status(200).json({ count: 1 });
		});
})
 */
/* app.get('/download/:nimi', (req, res, next) => {
	var file = './images/' + req.params.nimi;
	res.download(file);
}); */

//DELETE SELECETD ROUND
app.get('/round/delete/:id', (req, res, next) => {
	let id = req.params.id;

	db.run('DELETE FROM round WHERE id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json({ count: this.changes });
	})

})

app.get('*', (req, res, next) => {
	return res.status(404).json({ error: true, message: 'Nothing to fetch' });
})
