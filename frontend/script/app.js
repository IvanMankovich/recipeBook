import Utils from './helpers/utils.js';

import Header from './views/partials/header.js';
import ButtonPanel from './views/partials/buttonPanel.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Contact from './views/pages/contact.js';
import Error404 from './views/pages/error404.js';

import ShowAll from './views/pages/recipes/showAll.js';
import ShowCategory from './views/pages/recipes/showCategory.js';
import Search from './views/pages/recipes/search.js';
import ShowDescription from './views/pages/recipes/description.js';
import CookingList from './views/pages/recipes/cooking.js';
import AddOwnRecipe from './views/pages/recipes/addOwnRecipe.js';

const Routes = {
    '/': ShowAll,
    '/about': About,
    '/contact': Contact,
    '/search': Search,
    '/addOwnRecipe': AddOwnRecipe,
    '/category': ShowCategory,
    '/category/:id': ShowDescription,
    '/category/:id/cooking': CookingList,
};

function router() {
    const headerContainer = document.getElementsByTagName('header')[0],
          mainContainer = document.getElementsByClassName('mainContainer')[0],
          buttonPanelContainer = document.getElementsByClassName('buttonPanel')[0],
          footerContainer = document.getElementsByTagName('footer')[0],
          header = new Header(),
          buttonPanel = new ButtonPanel(),
          footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });

    const request = Utils.parseRequestURL(),
        parsedURL =  parseURL(request),
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
		page.render(data).then(html => {
			mainContainer.innerHTML = html;
			page.afterRender();
		});
    });

    buttonPanel.render().then(html => {
        buttonPanelContainer.innerHTML = html;
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });
}

function parseURL(request) {
    if (request.resource !== '') {
        if ('about contact search addOwnRecipe'.includes(request.resource)) {
            if (!request.id && !request.action) {
                return `/${request.resource}`;
            } else {
                return `error`;
            }
        } else {
            if ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && !request.id && !request.action) {
                return `/category`;
            } else if ('mainCategory soupCategory garnCategory salCategory desCategory customCategory'.includes(request.resource) && !request.id && request.action) {
                return `error`;
            } else {
                if (!request.action) {
                    return `/category/:id`;
                } else {
                    if (request.action === 'cooking') {
                        return `/category/:id/cooking`;
                    } else {
                        return `error`;
                    }
                }
            }
        }
    } else {
        if (!request.id && !request.action && request.resource === '') {
            return `/`;
        } else {
            return `error`;
        }
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);