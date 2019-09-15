import React, { Component } from 'react'; // let's also import Component
// SDK
import { Service } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import {
    Accordion, Card, Button, Badge, Row, Col
} from 'react-bootstrap'


type ServiceListProps = {
    toggles: Service[]
};
type ServiceListState = {};

/**
 * Toggle manager
 */
export class ServiceList extends Component<ServiceListProps, ServiceListState> {

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
    buildCards(services: Service[]) {
        return services.map((service, index) => {
            return (
                <Card key={service.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                        {service.key}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                            <Card.Text>
                                {service.description}
                            </Card.Text>
                            <Row>
                                <Col>
                                    <Button href={`/service/${service.id}/edit`}>
                                        Edit
                                    </Button>
                                </Col>
                                <Col xs lg="2">
                                    <Button href={`/service/${service.id}/relations`}>
                                        Service Toggles
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        });
    }
}

export default ServiceList;