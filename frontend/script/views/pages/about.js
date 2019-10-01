import Component from '../../views/component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="containerName sticky">
                    <h2 class="">About</h2>
                </div>
                <div class="textInformationContainer">
                    <div class="aboutTextContainer">
                        <p class="aboutText">Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book. Some information about recipe book.</p>
                    </div>
                </div>
            `);
        });
    }
}

export default About;