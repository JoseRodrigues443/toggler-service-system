import React, { Component } from 'react'; // let's also import Component

import { ToggleClient, Toggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import { Accordion, Card, Alert, Container, Button } from 'react-bootstrap'
import CreateEditToggle from "../createEditToggle/CreateEditToggle";


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
        const cards = this.buildCards()
        return <Accordion defaultActiveKey="0">
            {cards}
        </Accordion>
    }

    /**
     * Builds cards
     * @returns  
     */
    buildCards() {
        // no toggle then allow to create
        if (this.togglerList.length === 0) {
            return (
                <CreateEditToggle />
            )
        }
        return this.togglerList.map((toggle, index) => {
            return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                        {toggle.key}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                            {toggle.description}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        });
    }
}

export default TogglerList;