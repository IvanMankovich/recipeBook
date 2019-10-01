import Component from '../../views/component.js';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`                 
                <a href="/" class="footerLinkHome">Recipe Book</a>
                <p class="copyrightText">All Rights Reserved</p>
                <a class="footerLink" href="#">Buy knives</a>
                <a class="footerLink" href="#">Buy ovens</a>
            `);
        });
    }
}

export default Footer;