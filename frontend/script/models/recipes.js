class Recipes {
    getRecipesList() {
    	return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/recipes', true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
    }

    addRecipe(newRecipe) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/recipe', true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newRecipe));
		});
	}

	getCategoryList(category) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/${category}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	searchDish(str) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/search/${str}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	getRecipe(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/recipe/${id}`, true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	removeRecipe(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('DELETE', `http://localhost:3000/api/category/${id}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Recipes;