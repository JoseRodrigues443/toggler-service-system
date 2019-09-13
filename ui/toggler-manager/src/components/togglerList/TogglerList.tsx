import React, { Component } from 'react'; // let's also import Component

import { ToggleClient, Toggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import { Accordion, Card } from 'react-bootstrap'


/**
 * Toggle manager
 */
export class TogglerList extends Component {

    /**
     * Toggle client of toggler list
     */
    public readonly toggleClient = new ToggleClient();

    /**
     * Toggler list of toggler list component
     */
    public togglerList: Toggle[] = [];

    /**
     * Loads toggles
     */
    async loadToggles() {
        this.togglerList = await this.toggleClient.getAll();
    }

    /**
     * Components did mount
     */
    componentDidMount() {
        this.loadToggles();
    }


    /**
     * Renders toggle manager
     * @returns  
     */
    render() {
        const cards = this.togglerList.map((toggle, index) => {
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                    {toggle.key}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        });
        return <Accordion defaultActiveKey="0">
            cards
        </Accordion>
    }
}

export default TogglerList;