import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';

class ShowCategory extends Component {
    constructor() {
		super();
		
		this.model = new Recipes();
	}
	
	getData() {
		return new Promise(resolve => this.model.getCategoryList(this.request.resource).then(recipes => resolve(recipes)));
    }
    
    render(recipes) {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2 class="">${this.getClassName()}</h2>
                </div>
                <div class="categoryContainer ${this.request.resource} showCat">
                    ${recipes.map(recipe => this.createDishContainer(recipe)).join('\n ')}
                </div>
            `)
        });
    }

    getClassName() {
        let catName;
        switch(this.request.resource) {
            case 'mainCategory':
                catName = 'Main dishes';
                break;

            case 'soupCategory':
                catName = 'Soups';
                break;
            
            case 'garnCategory':
                catName = 'Garnishes';
                break;

            case 'salCategory':
                catName = 'Salads';
                break;

            case 'desCategory':
                catName = 'Desserts';
                break;
            
            case 'customCategory':
                catName = 'My recieps';
                break;
        }
        return catName;
    }

    createDishContainer(recipes) {
        return `
            <div class="dishContainerSmall" data-dish-id="${recipes.id}">
                <div class="dishImgContainer"><img class="dishImg" src="images/cat.png" height="240px" width="240px"></div>
                <div class="dishDesciptionContainer">
                    <h4 class="dishName">${recipes.dishName}</h4>
                    <p class="dishDesciption">${recipes.description}</p>
                    <a class="dishLink" href="/#/${recipes.category}/${recipes.id}">How to cook...</a>
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
                element.addEventListener('click', ShowCategory.prototype.changeStatusOnClick);
            }
        }
        removeButton.addEventListener('click', this.removeRecipe);
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
                    ShowCategory.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    ShowCategory.prototype.changeRemoveButtonState();
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
                    ShowCategory.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    ShowCategory.prototype.changeRemoveButtonState();
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
            ShowCategory.prototype.changeRemoveButtonState();
            new Recipes().removeRecipe(id);
        }
    }
}

export default ShowCategory;