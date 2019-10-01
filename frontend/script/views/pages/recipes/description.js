import Utils from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';

class ShowDescription extends Component {
    constructor() { 
        super();

        this.model = new Recipes();
    }
	
	getData() {
		return new Promise(resolve => this.model.getRecipe(this.request.id).then(recipe => resolve(recipe)));
	}

    render(recipe) {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                   ${this.createTitle(recipe)}
                </div>
                ${this.createDishDescriptionContainer(recipe)}
            `)
        });
    }

    getDishId() {
        return Utils.parseRequestURL().id;
    }

    createDishDescriptionContainer(recipe) {
        let str = '';
        return `
        <div class="showDishDescriptionContainer ${recipe.category}">
            ${str.concat(this.createDishContainer(recipe))}
        </div>
        `
    }

    createTitle(recipe) {
        return `
            <h2 class="">${recipe.dishName}</h2>
            <a class="categoryLink" href="/#/${recipe.category}">More dishes of this category...</a>
        `;
    }

    createDishContainer(recipe) {
        let ingNum = 1,
            htmlIng = '';

        while (recipe[`ingredient${ingNum}`]) {
            htmlIng = htmlIng.concat(this.createIngContainer(recipe, ingNum));
            ingNum++;
        }

        return `
            <div class="dishDescriptionContainer">
                <div class="dishImgAndDescriptionContainer">
                    <div class="dishDescriptionImgContainer"><img class="dishImg" src="images/cat.png" height="240px" width="240px"></div>
                    <div class="dishTextContent">
                        <div class="dishDescriptionTextContainer"><p class="disDescriptionText">Description: ${recipe.description}</p></div>
                        <div class="dishRequiredToolsContainer"><p class="dishRequiredToolsContainerText">Required tools: ${recipe.requiredTools}</p></div>
                    </div>
                </div>
                <div class="ingTitleTextContainer"><p class="ingTitleText">Ingredients:</p></div>
                ${htmlIng}
            </div>
        `;
    }

    createIngContainer(recipe, ingNum) {
        return `
            <div class="dishRequiredIngredientsContainer" data-ing-num="${ingNum}">
                <p class="dishIngredientName">${recipe[`ingredient${ingNum}`]['ingName']}</p>
                <p class="dishIngredientValue">${recipe[`ingredient${ingNum}`]['ingAmount']}</p>
                <p class="dishIngredientUnit">${recipe[`ingredient${ingNum}`]['ingUnit']}</p>
            </div> \n
        `;
    }
}

export default ShowDescription;