import Component from '../../views/component.js';

class Contact extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2 class="">Contact</h2>
                </div>
                <div class="textInformationContainer">
                    <div class="contactTextContainer">
                        <p class="contactText">Some contact information.Some contact information.Some contact information.Some contact information.Some contact information.Some contact information.</p>
                    </div>
                </div>
            `);
        });
    }
}

export default Contact;