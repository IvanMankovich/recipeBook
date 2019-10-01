import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';

class ShowAll extends Component {
    constructor() {
		super();
		
		this.model = new Recipes();
	}
	
	getData() {
		return new Promise(resolve => this.model.getRecipesList().then(recipes => resolve(recipes)));
    }
    
    render(recipes) {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2 class="mainDish">Main dishes</h2>
                    <a class="categoryLink" href="/#/mainCategory">More dishes...</a>
                </div>
                <div class="categoryContainer mainCategory">
                    ${recipes.map(elem => (elem.category == 'mainCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>

                <div class="containerName sticky">
                    <h2 class="soup">Soups</h2>
                    <a class="categoryLink" href="/#/soupCategory">More dishes...</a>
                </div>
                <div class="categoryContainer soupCategory">
                    ${recipes.map(elem => (elem.category == 'soupCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>

                <div class="containerName sticky">
                    <h2 class="garn">Garnishes</h2>
                    <a class="categoryLink" href="/#/garnCategory">More dishes...</a>
                </div>
                <div class="categoryContainer garnCategory">
                    ${recipes.map(elem => (elem.category == 'garnCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>

                <div class="containerName sticky">
                    <h2 class="sal">Salads</h2>
                    <a class="categoryLink" href="/#/salCategory">More dishes...</a>
                </div>
                <div class="categoryContainer salCategory">
                    ${recipes.map(elem => (elem.category == 'salCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>

                <div class="containerName sticky">
                    <h2 class="des">Desserts</h2>
                    <a class="categoryLink" href="/#/desCategory">More dishes...</a>
                </div>
                <div class="categoryContainer desCategory">
                    ${recipes.map(elem => (elem.category == 'desCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>

                <div class="containerName sticky">
                    <h2 class="customDishes">My recipes</h2>
                    <a class="categoryLink" href="/#/customCategory">More dishes...</a>
                </div>
                <div class="categoryContainer customCategory">
                    ${recipes.map(elem => (elem.category == 'customCategory') ? this.createDishContainer(elem) : '').join('\n ')}
                </div>
            `)
        });
    }

    createDishContainer(elem) {
        return `
            <div class="dishContainerSmall" data-dish-id="${elem.id}">
                <div class="dishImgContainer"><img class="dishImg" src="images/cat.png"></div>
                <div class="dishDesciptionContainer">
                    <h4 class="dishName">${elem.dishName}</h4>
                    <p class="dishDesciption">${elem.description}</p>
                    <a class="dishLink" href="/#/${elem.category}/${elem.id}">How to cook...</a>
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
                element.addEventListener('click', ShowAll.prototype.changeStatusOnClick);
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
                    ShowAll.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    ShowAll.prototype.changeRemoveButtonState();
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
                    ShowAll.prototype.changeRemoveButtonState();
                } else {
                    event.currentTarget.className = 'dishContainerSmall activeDishContainerSmall';
                    ShowAll.prototype.changeRemoveButtonState();
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
            ShowAll.prototype.changeRemoveButtonState();
            new Recipes().removeRecipe(id);
        }
    }
}

export default ShowAll;