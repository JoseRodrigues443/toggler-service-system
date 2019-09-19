import React, { Component } from 'react'; // let's also import Component

import { IService, ServiceClient, Service } from "../../../sdk/togglerApiClient/TogglerApi";

// Components
import { Form, Button, Row, Col } from 'react-bootstrap'


/**
 * Toggle manager
 */
export class CreateEditService extends Component<{ id?: number }, IService> {

    /**
     * Service client of service list
     */
    public readonly serviceClient = new ServiceClient();

    /**
     * Creates an instance of create edit toggle.
     */
    constructor(props: any) {
        super(props);
        this.defineState()
    }

    async defineState() {
        this.state = {
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "",
            key: "",
            states: []
        }
        if (this.props.id != null) {
            const service = await this.serviceClient.get(this.props.id);
            this.setState({
                id: service.id,
                createdAt: service.createdAt,
                updatedAt: new Date(),
                description: service.description,
                key: service.key,
                states: service.states
            })
        }
    }

    /**
     * Handle submit of create edit toggle
     */
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (this.state.key != null && this.state.key.length > 0 && form.checkValidity() === true) {
            this.serviceCall()
        }
    }


    async serviceCall() {
        const service = new Service({
            id: this.state.id,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
            description: this.state.description,
            key: this.state.key
        });
        if (this.props.id == null) {
            const result = await this.serviceClient.post(service);
        } else {
            // update
            const result = await this.serviceClient.put(this.props.id, service);
        }
    }

    /**
     * Handles key change
     * @param event
     */
    handleKeyChange = (event: any) => {
        this.setState({ key: event.target.value });
    }

    /**
     * Handle description change of create edit toggle
     */
    handleDescriptionChange = (event: any) => {
        this.setState({ description: event.target.value });
    }




    /**
     * Renders toggle manager
     * @returns  
     */
    render() {
        const title = this.props.id ? <h1>Edit Service</h1> : <h1>Create Service</h1>;
        return (
            <div>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formKey">
                        <Form.Label column sm="2">
                            Key
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={this.state.key} onChange={this.handleKeyChange}
                                type="text" placeholder="Enter Service Key Identifier" required
                            />
                            <Form.Text className="text-muted">
                                Used used to identify the service
                            </Form.Text>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formDescription">
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                                as="textarea" rows="3"
                                placeholder="Ex: Toggle to manage authentication services..."
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}

export default CreateEditService;