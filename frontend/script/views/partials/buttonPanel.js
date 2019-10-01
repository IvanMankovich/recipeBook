import Component from '../../views/component.js';

class ButtonPanel extends Component {
    render() {
        const request = this.request;
        let html = this.createButtonHTML(request);
              
        return new Promise(resolve => {
            resolve(`
                ${html}
            `);
        });
    }

    createButtonHTML(request) {
        let result;
        switch (true) {
            case (request.resource == 'about' && !request.id && !request.action) || (request.resource == 'contact' && !request.id && !request.action):
                result = `<button class="button addRecipeButton fullBtn" onclick="location.href='/#/addOwnRecipe'">Add recipe</button>`;
                break;
            
            case (request.resource == 'search' && !request.id && !request.action) || (request.resource == '' && !request.id && !request.action) || ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && !request.id && !request.action):
                result = `<button class="button addRecipeButton" onclick="location.href='/#/addOwnRecipe'">Add recipe</button><button class="button removeRecipeButton disabledBtn" href="#" disabled>Remove recipe</button>`;
                break;

            case (request.resource == 'addOwnRecipe' && !request.id && !request.action):
                result = '<button type="submit" name="addRecBtn" class="button addRecipeButton fullBtn disabledBtn" disabled form="creatingRecipeFormId">Add recipe</button>';
                break;

            case ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && request.id && !request.action):
                result = `<button class="button addRecipeButton fullBtn" onclick="location.href='/#/${request.resource}/${request.id}/cooking'">Start cooking</button>`;
                break;

            case ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && request.id && request.action == 'cooking'):
                result = `<button class="button addRecipeButton fullBtn redBackgroundBtn" onclick="location.href='/#/${request.resource}/${request.id}'">Stop cooking</button>`;
                break;
        }
        return result;
    }
}

export default ButtonPanel;