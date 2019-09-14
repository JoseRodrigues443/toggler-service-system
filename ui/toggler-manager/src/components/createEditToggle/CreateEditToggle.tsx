import React, { Component } from 'react'; // let's also import Component

import { ToggleClient, Toggle, IToggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import { Form, Button, Row, Col } from 'react-bootstrap'


/**
 * Toggle manager
 */
export class CreateEditToggle extends Component<{ id?: number }, IToggle> {

    /**
     * Toggle client of toggler list
     */
    public readonly toggleClient = new ToggleClient();

    /**
     * Creates an instance of create edit toggle.
     */
    constructor(props: any) {
        super(props);
        this.defineState()
    }

    async defineState() {
        this.state = {
            id: -1,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "",
            key: "",
            states: []
        }
        if (this.props.id != null) {
            const toggle = await this.toggleClient.get(this.props.id);
            this.setState({
                id: toggle.id,
                createdAt: toggle.createdAt,
                updatedAt: new Date(),
                description: toggle.description,
                key: toggle.key,
                states: toggle.states
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


    serviceCall() {
        if (this.props.id == null) {
            this.toggleClient.post(new Toggle({
                id: this.state.id,
                createdAt: this.state.createdAt,
                updatedAt: this.state.updatedAt,
                description: this.state.description,
                key: this.state.key
            }));
        } else {
            // update
            this.toggleClient.put(this.props.id, new Toggle({
                id: this.state.id,
                createdAt: this.state.createdAt,
                updatedAt: this.state.updatedAt,
                description: this.state.description,
                key: this.state.key
            }));
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
        return (
            <div>
                <h1>Create Toggle</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formKey">
                        <Form.Label column sm="2">
                            Key
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={this.state.key} onChange={this.handleKeyChange}
                                type="text" placeholder="Enter Toggle Key Identifier" required
                            />
                            <Form.Text className="text-muted">
                                Used used to identify the toggle
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

export default CreateEditToggle;