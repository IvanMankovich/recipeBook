import Component from '../../../views/component.js';

import Recipes from '../../../models/recipes.js';
import Utils from '../../../helpers/utils.js';

class AddOwnRecipe extends Component {
    constructor() {
		super();
		
		this.model = new Recipes(); 
    }
    
	getData() {
		return new Promise(resolve => this.model.getRecipesList().then(recipes => resolve(recipes)));
	}

    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2>Create own recipe</h2>
                </div>
                <div class="formContainer">
                    <form class="creatingRecipeForm" id="creatingRecipeFormId">
                        <div class="dishNameFormContainer">
                            <label for="dishNameFieldValue">Dish name</label>
                            <input type="text" placeholder="Dish name" name="dishNameFieldValue" id="dishNameFieldValue" data-field-status="initial">
                        </div>

                        <div class="dishCategoryFormContainer">
                            <label for="dishCategoryFieldValue">Category</label>
                            <select id="dishCategoryFieldValue" name="dishCategoryFieldValue">
                                <option value="customCategory" selected>My recipes</option>
                                <option value="mainCategory">Main dishes</option>
                                <option value="soupCategory">Soups</option>
                                <option value="garnCategory">Garnishes</option>
                                <option value="salCategory">Salads</option>
                                <option value="desCategory">Desserts</option>
                            </select>
                        </div>

                        <div class="dishDesciptionFormContainer">
                            <label for="dishDesciptionFieldValue">Dish description</label>
                            <textarea name="dishDesciptionFieldValue" id="dishDesciptionFieldValue" placeholder="Short dish description. It will show in dishDescription" data-field-status="initial"></textarea>
                        </div>

                        <div class="requiredToolsFormContainer">
                            <label for="requiredToolsFieldValue">Required tools</label>
                            <textarea name="requiredToolsFieldValue" id="requiredToolsFieldValue" placeholder="Tools required for cooking dish. E.g. pot, pan, knife, spoon, rolling pin etc." data-field-status="initial"></textarea>        
                        </div>

                        <div class="ingredientFormContainer">
                            <div class="flexIngredientField">
                                <label for="ingredientFieldValue">Ingredient 1:</label>
                                <input type="text" name="ingredientFieldValue" id="ingredientFieldValue" placeholder="Ingredient 1" data-field-status="initial" data-ing-number="1">
                            </div>

                            <div class="flexAmountField">
                                <label for="ingredientFieldAmountValue">Amount:</label>
                                <input type="text" name="ingredientFieldAmountValue" id="ingredientFieldAmountValue" placeholder="5" data-field-status="initial" data-ing-number="1">
                            </div>

                            <div class="flexUnitField">
                                <label for="ingredientFieldAmountUnitValue">Unit:</label>
                                <select id="ingredientFieldAmountUnitValue" name="ingredientFieldAmountUnitValue" data-ing-number="1">
                                    <option value="Kilo" selected>Kilo</option>
                                    <option value="Gram">Gram</option>
                                    <option value="Liter">Liter</option>
                                    <option value="Mililiter">Mililiter</option>
                                    <option value="Piece">Piece</option>
                                    <option value="Teaspoonful">Teaspoonful</option>
                                    <option value="Tablespoonful">Tablespoonful</option>
                                    <option value="Cup">Cup</option>
                                </select>
                            </div>
                        </div>

                        <div class="addNewIngrBtnContainer">
                            <button name="addNewIngrBtn" class="disabledBtn" disabled>Add new ingredient</button>
                        </div>

                        <div class="actionFormContainer">
                            <div class="flexActionField">
                                <label for="actionTextValue">Action 1</label>
                                <textarea name="actionTextValue" id="actionTextValue" placeholder="Do something else" data-field-status="initial" data-act-number="1"></textarea>
                            </div>

                            <div class="flexTimerCheckboxField">
                                <label for="timerForActionCheck">Timer</label>
                                <input type="checkbox" name="timerForActionCheck" id="timerForActionCheck" data-act-number="1">
                            </div>
                        </div>
                        <div class="addNewActBtnContainer">
                            <button name="addNewActBtn" class="disabledBtn" disabled>Add new action</button>
                        </div>
                    </form>
                </div>
            `)
        });
    }

    afterRender() {
        this.setActions();
    }

    ingCounter = 1;
    actCounter = 1;

    setActions() {
        const dishNameFieldValue = document.querySelector('[name=dishNameFieldValue]'),
            dishCategoryFieldValue = document.querySelector('[name=dishCategoryFieldValue]'),
            dishDesciptionFieldValue = document.querySelector('[name=dishDesciptionFieldValue]'),
            requiredToolsFieldValue = document.querySelector('[name=requiredToolsFieldValue]'),
            ingredientFieldValue = document.querySelector('[name=ingredientFieldValue]'),
            ingredientFieldAmountValue = document.querySelector('[name=ingredientFieldAmountValue]'),
            actionTextValue = document.querySelector('[name=actionTextValue]'),
            timerForActionCheck = document.querySelector('[name=timerForActionCheck]'),
        /** containers **/
            ingredientFormContainers = document.getElementsByClassName('ingredientFormContainer'),
            actionFormContainers = document.getElementsByClassName('actionFormContainer'),
        /** buttons **/
            addNewIngrBtn = document.querySelector('[name=addNewIngrBtn]'),
            addNewActBtn = document.querySelector('[name=addNewActBtn]'),
            formsData = document.getElementById('creatingRecipeFormId');
        /** counters **/

        this.setActionsOnTextElems(dishNameFieldValue, dishCategoryFieldValue, dishDesciptionFieldValue, requiredToolsFieldValue, ingredientFieldValue, actionTextValue);
        this.setActionsOnNumElems(ingredientFieldAmountValue);
        addNewIngrBtn.addEventListener('click', () => this.addNewIngredientFormContainer(ingredientFormContainers[ingredientFormContainers.length - 1]));
    
        addNewActBtn.addEventListener('click', () => this.addNewActionContainer(actionFormContainers[actionFormContainers.length - 1]));
    
        timerForActionCheck.addEventListener('click', () => this.showHideTimerForActionValueField(timerForActionCheck, timerForActionCheck.parentElement.nextElementSibling));
        timerForActionCheck.addEventListener('click', () => this.changeAddActBtnStatus());
        timerForActionCheck.addEventListener('click', () => this.changeAddRecBtnStatus());

        formsData.addEventListener('submit', event => this.sendData(event));
    }

    addNewIngredientFormContainer(lastIngredientFormContainer) {
        let html = `
            <div class="ingredientFormContainer">
                <div class="flexIngredientField">
                    <label for="ingredientFieldValue">Ingredient ${++this.ingCounter}:</label>
                    <input type="text" name="ingredientFieldValue" id="ingredientFieldValue" placeholder="Ingredient ${this.ingCounter}" data-field-status="initial" data-ing-number="${this.ingCounter}">
                </div>
    
                <div class="flexAmountField">
                    <label for="ingredientFieldAmountValue">Amount:</label>
                    <input type="text" name="ingredientFieldAmountValue" id="ingredientFieldAmountValue" placeholder="5" data-field-status="initial" data-ing-number="${this.ingCounter}">
                </div>
    
                <div class="flexUnitField">
                    <label for="ingredientFieldAmountUnitValue">Unit:</label>
                    <select id="ingredientFieldAmountUnitValue" name="ingredientFieldAmountUnitValue" data-ing-number="${this.ingCounter}">
                        <option value="Kilo" selected>Kilo</option>
                        <option value="Gram">Gram</option>
                        <option value="Liter">Liter</option>
                        <option value="Mililiter">Mililiter</option>
                        <option value="Piece">Piece</option>
                        <option value="Teaspoonful">Teaspoonful</option>
                        <option value="Tablespoonful">Tablespoonful</option>
                        <option value="Cup">Cup</option>
                    </select>
                </div>
            </div>
        `;
    
        lastIngredientFormContainer.insertAdjacentHTML('afterend', html);
        lastIngredientFormContainer = document.getElementsByClassName('ingredientFormContainer')[document.getElementsByClassName('ingredientFormContainer').length - 1];
        this.setActionsOnTextElems(lastIngredientFormContainer.querySelector('[name=ingredientFieldValue]'));
        this.setActionsOnNumElems(lastIngredientFormContainer.querySelector('[name=ingredientFieldAmountValue]'));
        document.querySelector('[name=addNewIngrBtn]').className = 'addNewIngrBtn disabledBtn';
        document.querySelector('[name=addNewIngrBtn]').disabled = true;
        this.changeAddRecBtnStatus();
    }
    
    addNewActionContainer(lastActionContainer) {
        let html = `
            <div class="actionFormContainer">
                <div class="flexActionField">
                    <label for="actionTextValue">Action ${++this.actCounter}</label>
                    <textarea name="actionTextValue" id="actionTextValue" placeholder="Do something else" data-field-status="initial" data-act-number="${this.actCounter}"></textarea>
                </div>
    
                <div class="flexTimerCheckboxField">
                    <label for="timerForActionCheck">Timer</label>
                    <input type="checkbox" name="timerForActionCheck" id="timerForActionCheck" data-act-number="${this.actCounter}">
                </div>
            </div>
        `;
    
        lastActionContainer.insertAdjacentHTML('afterend', html);
        lastActionContainer = document.getElementsByClassName('actionFormContainer')[document.getElementsByClassName('actionFormContainer').length - 1];
        this.setActionsOnTextElems(lastActionContainer.querySelector('[name=actionTextValue]'));
        lastActionContainer.querySelector('[name=timerForActionCheck]').addEventListener('click', () => this.showHideTimerForActionValueField(lastActionContainer.querySelector('[name=timerForActionCheck]'), lastActionContainer.querySelector('[name=timerForActionCheck]').parentElement.nextElementSibling));
        document.querySelector('[name=addNewActBtn]').className = 'addNewActBtn disabledBtn';
        document.querySelector('[name=addNewActBtn]').disabled = true;
        this.changeAddRecBtnStatus();
    }
    
    checkText(element, text, maxLength, minLength) {
        if (text.trim() == '' || text.length < 2 || text.length > maxLength || text.length < minLength) {
            element.classList.add('faulty');
            element.dataset.fieldStatus = "incorrect";
        } else {
            element.classList.remove('faulty');
            element.dataset.fieldStatus = "correct";
        }
    };
    
    checkValue(element, value, maxValue, minValue) {
        if (!/^\d{1,4}$/.test(value) || Number.isInteger(value) || value > maxValue || value <= minValue) {
            element.classList.add('faulty');
            element.dataset.fieldStatus = "incorrect";
        } else {
            element.classList.remove('faulty');
            element.dataset.fieldStatus = "correct";
        }
    };
    
    setActionsOnTextElems(...elements) {
        elements.forEach(element => element.addEventListener('keyup', () => this.checkText(element, element.value, 400, 2)));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddIngrBtnStatus()));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddActBtnStatus()));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddRecBtnStatus()));
    }
    
    setActionsOnNumElems(...elements) {
        elements.forEach(element => element.addEventListener('keyup', () => this.checkValue(element, element.value, 1000, 0)));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddIngrBtnStatus()));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddActBtnStatus()));
        elements.forEach(element => element.addEventListener('keyup', () => this.changeAddRecBtnStatus()));
    }
    
    showHideTimerForActionValueField(checkBox, timerForActionValueField) {
        if (!timerForActionValueField || timerForActionValueField.className != 'flexTimerValueField') {
            checkBox.checked = true;
            let html = `
                <div class="flexTimerValueField">
                    <label for="timerForActionValue">Min</label>
                    <input name="timerForActionValue" id="timerForActionValue" type="text" placeholder="0" data-field-status="initial" data-act-number="${checkBox.dataset.actNumber}">
                </div>
            `;
            checkBox.parentElement.insertAdjacentHTML('afterend', html);
            let timerForActionValueField = checkBox.parentElement.nextElementSibling.children[1];
            timerForActionValueField.addEventListener('keyup', () => this.checkValue(timerForActionValueField, timerForActionValueField.value, 300, 0));
            timerForActionValueField.addEventListener('keyup', () => this.changeAddActBtnStatus());
            timerForActionValueField.addEventListener('keyup', () => this.changeAddRecBtnStatus());
            this.changeAddActBtnStatus();
            this.changeAddRecBtnStatus();
    
        } else {
            checkBox.checked = false;
            timerForActionValueField.parentElement.children[2].remove();
            this.changeAddActBtnStatus();
            this.changeAddRecBtnStatus();
        }
    }

    changeAddIngrBtnStatus() {
        const ingFields = document.querySelectorAll('[name=ingredientFieldValue]'),
            ingAmountFields = document.querySelectorAll('[name=ingredientFieldAmountValue]'),
            addNewIngrBtn = document.querySelector('[name=addNewIngrBtn]');
        for (let elem of ingFields) {
            if (elem.dataset.fieldStatus === 'initial' || elem.dataset.fieldStatus === 'incorrect') {
                addNewIngrBtn.className = 'addNewIngrBtn disabledBtn';
                addNewIngrBtn.disabled = true;
                this.changeAddRecBtnStatus();
                return;
            }
        }
        for (let elem of ingAmountFields) {
            if (elem.dataset.fieldStatus === 'initial' || elem.dataset.fieldStatus === 'incorrect') {
                addNewIngrBtn.className = 'addNewIngrBtn disabledBtn';
                addNewIngrBtn.disabled = true;
                this.changeAddRecBtnStatus();
                return;
            }
        }
        addNewIngrBtn.className = 'addNewIngrBtn';
        addNewIngrBtn.disabled = false;
        this.changeAddRecBtnStatus();
    }

    changeAddActBtnStatus() {
        const actFields = document.querySelectorAll('[name=actionTextValue]'),
            timerValueFields = document.querySelectorAll('[name=timerForActionValue]'),
            addNewActBtn = document.querySelector('[name=addNewActBtn]');
        for (let elem of actFields) {
            if (elem.dataset.fieldStatus === 'initial' || elem.dataset.fieldStatus === 'incorrect') {
                addNewActBtn.className = 'addNewActBtn disabledBtn';
                addNewActBtn.disabled = true;
                this.changeAddRecBtnStatus();
                return;
            }
        }
        for (let elem of timerValueFields) {
            if (elem.dataset.fieldStatus === 'initial' || elem.dataset.fieldStatus === 'incorrect') {
                addNewActBtn.className = 'addNewActBtn disabledBtn';
                addNewActBtn.disabled = true;
                this.changeAddRecBtnStatus();
                return;
            }
        }
        addNewActBtn.className = 'addNewActBtn';
        addNewActBtn.disabled = false;
        this.changeAddRecBtnStatus();
    }

    changeAddRecBtnStatus() {
        const addRecBtn = document.querySelector('[name=addRecBtn]'),
            addNewActBtn = document.querySelector('[name=addNewActBtn]'),
            addNewIngrBtn = document.querySelector('[name=addNewIngrBtn]'),
            faultyIncorrectFields = document.getElementsByClassName('faulty'),
            initialAndIncorrectFields = document.querySelector('[data-field-status=initial]');
        if (addNewIngrBtn.disabled == false && addNewActBtn.disabled == false && !faultyIncorrectFields.length && !initialAndIncorrectFields) {
            addRecBtn.className = 'button addRecipeButton fullBtn';
            addRecBtn.disabled = false;
        } else {
            addRecBtn.className = 'button addRecipeButton fullBtn disabledBtn';
            addRecBtn.disabled = true;
        }
    }

    sendData() {
        event.preventDefault();
        const newData = this.formatData();
        this.model.addRecipe(newData).then(html => {
            alert('Recipe was successfully created');
            this.render().then(html => {
                document.getElementsByClassName('mainContainer')[0].innerHTML = html;
                this.afterRender();
            });
        });
        document.querySelector('[name=addRecBtn]').className = 'button addRecipeButton fullBtn disabledBtn';
        document.querySelector('[name=addRecBtn]').disabled = true;
    }

    formatData() {
        const dishName = document.querySelector('[name=dishNameFieldValue]'),
            category = document.querySelector('[name=dishCategoryFieldValue]'),
            description = document.querySelector('[name=dishDesciptionFieldValue]'),
            requiredTools = document.querySelector('[name=requiredToolsFieldValue]'),
            ingFieldsValues = document.querySelectorAll('[name=ingredientFieldValue]'),
            ingFieldsAmountValues = document.querySelectorAll('[name=ingredientFieldAmountValue]'),
            ingFieldsAmountUnitValues = document.querySelectorAll('[name=ingredientFieldAmountUnitValue]'),
            actFieldsValues = document.querySelectorAll('[name=actionTextValue]'),
            actTimerFieldVaues = document.querySelectorAll('[name=timerForActionValue]');

        const newRecipe = {};
        newRecipe.id = Utils.generateID();
        newRecipe.dishName = dishName.value;
        newRecipe.category = category.value;
        newRecipe.description = description.value;
        newRecipe.requiredTools = requiredTools.value;
        for (let elem of ingFieldsValues) {
            newRecipe[`ingredient${elem.dataset.ingNumber}`] = {};
            newRecipe[`ingredient${elem.dataset.ingNumber}`]['ingName'] = elem.value;
        }
        for (let elem of ingFieldsAmountValues) {
            newRecipe[`ingredient${elem.dataset.ingNumber}`].ingAmount = elem.value;
        }
        for (let elem of ingFieldsAmountUnitValues) {
            newRecipe[`ingredient${elem.dataset.ingNumber}`].ingUnit = elem.value;
        }
        for (let elem of actFieldsValues) {
            newRecipe[`action${elem.dataset.actNumber}`] = {};
            newRecipe[`action${elem.dataset.actNumber}`].actionText = elem.value;
            newRecipe[`action${elem.dataset.actNumber}`].timerEnabled = false;
            newRecipe[`action${elem.dataset.actNumber}`].timerValue = null;
        }
        for (let elem of actTimerFieldVaues) {
            newRecipe[`action${elem.dataset.actNumber}`].timerEnabled = true;
            newRecipe[`action${elem.dataset.actNumber}`].timerValue = elem.value;
        }
        return newRecipe;
    }
}

export default AddOwnRecipe;