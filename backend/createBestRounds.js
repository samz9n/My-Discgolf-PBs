const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bestRounds.db');

db.serialize( () => {

	let sql = "CREATE TABLE bestRound (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "course text NOT NULL, " +
			  "score integer NOT NULL, " +
			  "holeinones integer NOT NULL, " +
			  "birdies integer NOT NULL, " +
			  "pars integer NOT NULL, " +
			  "bogeys integer NOT NULL, " +
              "doublebogeys integer NOT NULL, " +
              "tripleorworse integer NOT NULL )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Table created");
	}) 

	sql = "INSERT INTO `bestRound` (`id`, `course`, `score`, `holeinones`, `birdies`, `pars`, `bogeys`, `doublebogeys`, `tripleorworse`) "+
	" VALUES (1, 'TestCourse', '-5', '0', '4', '10', '2', '1', '0')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("row added");
	})

	sql = "INSERT INTO `bestRound` (`id`, `course`, `score`, `holeinones`, `birdies`, `pars`, `bogeys`, `doublebogeys`, `tripleorworse`) "+
	" VALUES (2, 'AnotherTestCourse', '5', '2', '6', '7', '2', '1', '1')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("row added");
	})

	db.each("SELECT id, course from bestRound", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.course);
	})

	db.close();
})