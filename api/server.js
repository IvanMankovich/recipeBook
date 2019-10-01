const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dataFile = 'recipes.json',
	  dataFileReserve = 'reserve.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/recipes', (req, res) => {
	res.send(getRecipesFromDB());
});

app.post('/api/recipe', (req, res) => {
	const data = getRecipesFromDB(),
		recipe = req.body;

	recipe.id = shortId.generate();
	recipe.description = recipe.description || 'No Description';

	data.push(recipe);
    setRecipesToDB(data);

	res.send(recipe);
});

app.get('/api/:category', (req, res) => {
	const data = getRecipesFromDB(),
		recipes = [];
		data.forEach(recipe => recipe.category == req.params.category && recipes.push(recipe));
		
	res.send(recipes);
});

// --------------------search--------------------------
app.get('/api/search/:str', (req, res) => {
	const data = getRecipesFromDB(),
		recipes = [];
		data.forEach(recipe => recipe.dishName.toUpperCase().includes(req.params.str.toUpperCase()) && recipes.push(recipe));
		
	res.send(recipes);
});
// ----------------------------------------------

app.get('/api/recipe/:id', (req, res) => {
	const data = getRecipesFromDB(),
		recipe = data.find(recipe => recipe.id === req.params.id);

		recipe ? res.send(recipe) : res.send({});
});

app.delete('/api/category/:id', (req, res) => {
	const data = getRecipesFromDB(),
		  newData = data.filter(recipe => recipe.id !== req.params.id);

	setRecipesToDB(newData);

	res.sendStatus(204);
})

function getRecipesFromDB() {
	try {
		return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
	} catch (e) {
		return JSON.parse(fs.readFileSync(dataFileReserve, 'utf8'));
	}
}

function setRecipesToDB(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data));
}

app.listen(3000, () => console.log('Server has been started...'));