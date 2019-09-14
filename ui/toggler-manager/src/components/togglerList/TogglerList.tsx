import React, { Component } from 'react'; // let's also import Component
// SDK
import { Toggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import { Accordion, Card, Alert, Container, Button } from 'react-bootstrap'


type TogglerListProps = {
    toggles: Toggle[]
};
type TogglerListState = {};

/**
 * Toggle manager
 */
export class TogglerList extends Component<TogglerListProps, TogglerListState> {

    /**
     * Renders toggle manager
     * @returns  
     */
    render() {
        const toggles = this.props.toggles;
        const cards = this.buildCards(toggles)
        return <Accordion defaultActiveKey="0">
            {cards}
        </Accordion>
    }

    /**
     * Builds cards
     * @returns  
     */
    buildCards(toggles: Toggle[]) {
        return toggles.map((toggle, index) => {
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