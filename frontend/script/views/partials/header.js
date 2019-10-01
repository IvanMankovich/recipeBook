import Component from '../../views/component.js';

import Recipes from '../../models/recipes.js';

import Search from '../../views/pages/recipes/search.js';

class Header extends Component {
    constructor() {
		super();
		
		this.model = new Recipes();
    }
    
    render() {
        const request = this.request;
        let html = this.createButtonHTML(request);

        return new Promise(resolve => {
            resolve(`
                ${html}
            `);
        });
    }

    getData() {
		return new Promise(resolve => new Recipes().searchDish(document.getElementsByClassName('searchField')[0].value).then(recipes => resolve(recipes)));
    }

    createButtonHTML(request) {
        let result;
        switch (true) {
            case (request.resource == 'about' && !request.id && !request.action) || (request.resource == 'contact' && !request.id && !request.action):
                result = `
                    <a href="/" class="logo"><img src="images/logo/logo_2min.png"></a>
                    <form class="searchBar">
                        <input class="searchField" type="text" name="search" placeholder="Search..">
                    </form>
                    <a href="/#/about" class="about">ABOUT</a> 
                    <a href="/#/contact" class="contact">CONTACT</a>
                `;
                break;
            
            case (request.resource == 'search' && !request.id && !request.action) || (request.resource == '' && !request.id && !request.action) || ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && !request.id && !request.action):
                result = `
                    <a href="/" class="logo"><img src="images/logo/logo_2min.png"></a>
                    <form class="searchBar">
                        <input class="searchField" type="text" name="search" placeholder="Search..">
                    </form>
                    <a href="/#/about" class="about">ABOUT</a> 
                    <a href="/#/contact" class="contact">CONTACT</a>
                `;
                break;

            case (request.resource == 'addOwnRecipe' && !request.id && !request.action):
                result = `
                    <a href="/" class="logo"><img src="images/logo/logo_2min.png"></a>
                    <a href="/#/about" class="about">ABOUT</a> 
                    <a href="/#/contact" class="contact">CONTACT</a>
                `;                
                break;

            case ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && request.id && !request.action):
                result = `
                    <a href="/" class="logo"><img src="images/logo/logo_2min.png"></a>
                    <form class="searchBar">
                        <input class="searchField" type="text" name="search" placeholder="Search..">
                    </form>
                    <a href="/#/about" class="about">ABOUT</a> 
                    <a href="/#/contact" class="contact">CONTACT</a>
                `;
                break;

            case ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && request.id && request.action == 'cooking'):
                result = `<a href="/" class="logo"><img src="images/logo/logo_2min.png"></a><div class="timerHeader"><p class="timerHeaderText"></p></div>`;
                break;
            default:
                result = `
                    <a href="/" class="logo"><img src="images/logo/logo_2min.png"></a>
                    <form class="searchBar">
                        <input class="searchField" type="text" name="search" placeholder="Search..">
                    </form>
                    <a href="/#/about" class="about">ABOUT</a> 
                    <a href="/#/contact" class="contact">CONTACT</a>
                `;
        }
        return result;
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        if (document.getElementsByClassName('searchBar')[0]) {
            const searchField = document.getElementsByClassName('searchBar')[0];
            searchField.addEventListener('submit', this.getResult);
        }
    }

    getResult() {
        event.preventDefault();
        if (document.getElementsByClassName('searchField')[0].value) {
            if (document.getElementsByClassName('searchField')[0].value != '') {
                new Promise(resolve => {
                    resolve (Header.prototype.getData())
                }).then(recipes => Search.prototype.render(recipes)).then(html => document.getElementsByClassName('mainContainer')[0].innerHTML = html).then(() => Search.prototype.afterRender());
                document.getElementsByClassName('searchField')[0].value = '';
            }
        }
    }
}

export default Header;