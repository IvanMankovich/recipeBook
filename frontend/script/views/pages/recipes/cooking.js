import Utils from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';

class CookingList extends Component {
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

    afterRender() {
        this.setActions();
    }

    getDishId() {
        return Utils.parseRequestURL().id;
    }

    createDishDescriptionContainer(recipe) {
        return `
        <div class="showDishDescriptionContainer ${recipe.category}">
             ${this.createDishContainer(recipe)}
        </div>
        `
    }

    createTitle(elem) {
        return `
            <h2 class="">${elem.dishName}</h2>
        `;
    }

    createDishContainer(recipe) {
        let ingNum = 1,
            actNum = 1,
            htmlIng = '',
            htmlAct = '';

        while (recipe[`ingredient${ingNum}`]) {
            htmlIng = htmlIng.concat(this.createIngContainer(recipe, ingNum));
            ingNum++;
        }

        while (recipe[`action${actNum}`]) {
            htmlAct = htmlAct.concat(this.createActContainer(recipe, actNum));
            actNum++;
        }

        return `
            <div class="dishDescriptionContainer">
                <div class="dishImgAndDescriptionContainer">
                    <div class="dishDescriptionImgContainer"><img class="dishImg" src="images/cat.png" height="240px" width="240px" alt=""></div>
                    <div class="dishTextContent">
                        <div class="dishRequiredToolsContainer"><p class="dishRequiredToolsContainerText">Required tools: ${recipe.requiredTools}</p></div>
                        <div class="ingTitleTextContainer"><p class="ingTitleText">Ingredients:</p></div>
                        ${htmlIng}
                    </div>
                </div>
                <div class="actionsContainer">
                    ${htmlAct}
                </div>
            </div>
        `;
    }

    createIngContainer(recipe, ingNum) {
        return `
            <div class="dishRequiredIngredientsContainer" data-ing-num="${ingNum}">
                <p class="dishIngredientName">${recipe[`ingredient${ingNum}`]['ingName']}</p>
                <p class="dishIngredientValue">${recipe[`ingredient${ingNum}`]['ingAmount']}</p>
                <p class="dishIngredientUnit">${recipe[`ingredient${ingNum}`]['ingUnit']}</p>
            </div>
        `;
    }

    createActContainer(recipe, actNum) {
        if (recipe[`action${actNum}`]['timerValue']) {
            return `
                <div class="dishActionContainer${(actNum === 1) ? ' currentAction' : ''}" data-act-num="${actNum}">
                    <p class="actionText">${recipe[`action${actNum}`]['actionText']}</p>
                    <div class="timerBtn" data-timer-status="initial" data-timer-id="">
                        <img src="images/icons/clockWhite.png" height="20px" width="20px" alt="">
                        <p class="timerText">${recipe[`action${actNum}`]['timerValue']}</p>
                    </div>
                    <div class="checkboxContainer">
                        <input class="readyStateCheckbox" type="checkbox" data-act-num="${actNum}" ${actNum > 1 ? 'disabled' : ''}>
                    </div>
                </div> \n
            `;
        } else {
            return `
                <div class="dishActionContainer ${(actNum === 1) ? 'currentAction' : ''}" data-act-num="${actNum}">
                    <p class="actionText">${recipe[`action${actNum}`]['actionText']}</p>
                    <div class="checkboxContainer">
                        <input class="readyStateCheckbox" type="checkbox" data-act-num="${actNum}" ${actNum > 1 ? 'disabled' : ''}>
                    </div>
                </div>
            `;
        }
    }

    setActions() {
        const activeContainer = document.getElementsByClassName('dishActionContainer currentAction')[0],
              checkBoxStatus = activeContainer.getElementsByClassName('readyStateCheckbox')[0];
        if (activeContainer.getElementsByClassName('timerBtn')[0]) {
            const timerBox = activeContainer.getElementsByClassName('timerBtn')[0];
            timerBox.addEventListener('click', CookingList.prototype.startStopTimer);
        }
        checkBoxStatus.addEventListener('click', CookingList.prototype.changeContainersState);
    }

    changeContainersState() {
        const checkBoxStatus = document.getElementsByClassName('dishActionContainer currentAction')[0].getElementsByClassName('readyStateCheckbox')[0].checked,
              activeContainer = (checkBoxStatus === true) ? document.getElementsByClassName('dishActionContainer currentAction')[0] : document.getElementsByClassName('dishActionContainer currentAction')[0].previousElementSibling;
        if (checkBoxStatus === true) {
            // следующий бокс
            if (activeContainer.nextElementSibling) {
                activeContainer.nextElementSibling.className = 'dishActionContainer currentAction';
                activeContainer.nextElementSibling.lastElementChild.lastElementChild.disabled = false;
                activeContainer.nextElementSibling.lastElementChild.lastElementChild.addEventListener('click', CookingList.prototype.changeContainersState);
                // при наличии таймера
                if (activeContainer.nextElementSibling.getElementsByClassName('timerBtn')[0]) {
                    activeContainer.nextElementSibling.getElementsByClassName('timerBtn')[0].addEventListener('click', CookingList.prototype.startStopTimer);
                }
            } else {
                activeContainer.lastElementChild.lastElementChild.disabled = true;
                activeContainer.lastElementChild.lastElementChild.removeEventListener('click', CookingList.prototype.changeContainersState);
                CookingList.prototype.onDishReady();
            }
            // предыдущий бокс
            if (activeContainer.previousElementSibling) {
                activeContainer.previousElementSibling.className = 'dishActionContainer completeAction';
                activeContainer.previousElementSibling.lastElementChild.lastElementChild.disabled = true;
                activeContainer.previousElementSibling.lastElementChild.lastElementChild.removeEventListener('click', CookingList.prototype.changeContainersState);
                // при наличии таймера
                if (activeContainer.previousElementSibling.getElementsByClassName('timerBtn')[0]) {
                    activeContainer.previousElementSibling.getElementsByClassName('timerBtn')[0].removeEventListener('click', CookingList.prototype.startStopTimer);
                }
            }
            // нынешний бокс
            activeContainer.className = 'dishActionContainer completeAction';
            // при наличии таймера
            if (activeContainer.getElementsByClassName('timerBtn')[0]) {
                activeContainer.getElementsByClassName('timerBtn')[0].removeEventListener('click', CookingList.prototype.startStopTimer);
            }
        } else {
            // предыдущий бокс
            if (activeContainer.previousElementSibling) {
                activeContainer.previousElementSibling.className = 'dishActionContainer completeAction';
                activeContainer.previousElementSibling.lastElementChild.lastElementChild.disabled = false;
                activeContainer.previousElementSibling.lastElementChild.lastElementChild.addEventListener('click', CookingList.prototype.changeContainersState);
                // при наличии таймера
                if (activeContainer.previousElementSibling.getElementsByClassName('timerBtn')[0]) {
                    activeContainer.previousElementSibling.getElementsByClassName('timerBtn')[0].removeEventListener('click', CookingList.prototype.startStopTimer);
                }
            }
            // следующий бокс
            if (activeContainer.nextElementSibling) {
                activeContainer.nextElementSibling.className = 'dishActionContainer';
                activeContainer.nextElementSibling.lastElementChild.lastElementChild.disabled = true;
                activeContainer.nextElementSibling.lastElementChild.lastElementChild.removeEventListener('click', CookingList.prototype.changeContainersState);
                // при наличии таймера
                if (activeContainer.nextElementSibling.getElementsByClassName('timerBtn')[0]) {
                    activeContainer.nextElementSibling.getElementsByClassName('timerBtn')[0].removeEventListener('click', CookingList.prototype.startStopTimer);
                }
            }
            // нынешний бокс
            activeContainer.className = 'dishActionContainer currentAction';
            if (activeContainer.getElementsByClassName('timerBtn')[0]) {
                activeContainer.getElementsByClassName('timerBtn')[0].addEventListener('click', CookingList.prototype.startStopTimer);
            }
        }
    }

    startStopTimer() {
        CookingList.prototype.timer();
    }

    onDishReady() {
        const button = document.getElementsByClassName('button')[0];
        button.textContent = 'Enjoy';
        button.className = "button addRecipeButton fullBtn";
    }

    timer() {
        const status = document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerStatus,
            minValue = document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.lastElementChild.textContent,
            timerId = document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerId,
            timerHeaderText = document.getElementsByClassName('timerHeaderText')[0];
        let temp = minValue * 60;
        if (status == 'running') {
            timerHeaderText.textContent = '';
            clearTimeout(timerId);
            document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerStatus = 'initial';
        } else {
            const myTimer = setInterval(() => {
                if (temp != 0) {
                    if (temp % 60 < 10) {
                        timerHeaderText.textContent = `${Math.floor(temp / 60)} : 0${temp % 60}`; 
                    } else {
                        timerHeaderText.textContent = `${Math.floor(temp / 60)} : ${temp % 60}`;
                    }
                    temp--;
                    document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerStatus = 'running';
                    document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerId = myTimer;
                } else {
                    timerHeaderText.textContent = '0 : 00';
                    CookingList.prototype.timer();
                    document.getElementsByClassName('dishActionContainer currentAction')[0].lastElementChild.previousElementSibling.dataset.timerStatus = 'initial';
                    timerHeaderText.textContent = '';
                    alert('Time is up');
                }
            }, 1000);
        }
    }
}

export default CookingList;