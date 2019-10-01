import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';

class Search extends Component {
    constructor() {
		super();
		
		this.model = new Recipes();
	}
    
    render(recipes) {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2 class="">Search results</h2>
                </div>
                <div class="categoryContainer customCategory showCat">
                    ${recipes.map(recipe => this.createDishContainer(recipe)).join('\n ')}
                </div>
            `)
        });
    }

    createDishContainer(recipe) {
        return `
            <div class="dishContainerSmall" data-dish-id="${recipe.id}">
                <div class="dishImgContainer"><img class="dishImg" src="images/cat.png" height="240px" width="240px"></div>
                <div class="dishDesciptionContainer">
                    <h4 class="dishName">${recipe.dishName}</h4>
                    <p class="dishDesciption">${recipe.description}</p>
                    <a class="dishLink" href="/#/${recipe.category}/${recipe.id}">How to cook...</a>
                </div>
            </div>
        `;
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const containers = document.getElementsByClassName('dishContainerSmall'),
              removeButton = document.getElementsByClassName('removeRecipeButton')[0];
        if (containers) {
            for (let element of containers) {
                element.addEventListener('click', Search.prototype.changeStatusOnClick);
            }
        }
        if (document.getElementsByClassName('removeRecipeButton')[0]) {
            removeButton.addEventListener('click', this.removeRecipe);
        }
    }

    changeStatusOnClick() {
        const target = event.target;
        if (target.tagName != 'A') {
            if (event.currentTarget.className == 'dishContainerSmall') {
                if (document.getElementsByClassName('dishContainerSmall activeDishContainerSmall')) {
                    const containers = document.getElementsByClassName('dishContainerSmall activeDishContainerSmall');
                    if (containers) {
                        for (let container of containers) {
                            container.className = 'dishContainerSmall';
                        }
                    }
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    Search.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    Search.prototype.changeRemoveButtonState();
                }
            } else {
                if (document.getElementsByClassName('dishContainerSmall activeDishContainerSmall')) {
                    const containers = document.getElementsByClassName('dishContainerSmall activeDishContainerSmall');
                    if (containers) {
                        for (let container of containers) {
                            container.className = 'dishContainerSmall';
                        }
                    }
                    event.currentTarget.className = 'dishContainerSmall';
                    Search.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    Search.prototype.changeRemoveButtonState();
                }
            }
        }
    }

    changeRemoveButtonState() {
        const removeButton = document.getElementsByClassName('removeRecipeButton')[0];
        if (document.getElementsByClassName('dishContainerSmall activeDishContainerSmall')[0]) {
            if (removeButton.className == 'button removeRecipeButton disabledBtn') {
                removeButton.className = 'button removeRecipeButton';
                removeButton.disabled = false;
            }
        } else {
            removeButton.className = 'button removeRecipeButton disabledBtn';
            removeButton.disabled = true;
        }
    }

    removeRecipe() {
        if (confirm('Are you sure?')) {
            let id = document.getElementsByClassName('dishContainerSmall activeDishContainerSmall')[0].dataset.dishId;
            document.getElementsByClassName('dishContainerSmall activeDishContainerSmall')[0].remove();
            Search.prototype.changeRemoveButtonState();
            new Recipes().removeRecipe(id);
        }
    }

}

export default Search;