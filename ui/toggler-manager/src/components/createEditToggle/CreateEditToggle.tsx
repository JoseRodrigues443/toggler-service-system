import React, { Component } from 'react'; // let's also import Component

import { ToggleClient, Toggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import { Form } from 'react-bootstrap'


/**
 * Toggle manager
 */
export class CreateEditToggle extends Component {

    /**
     * Toggle client of toggler list
     */
    public readonly toggleClient = new ToggleClient();

    /**
     * Toggle of create edit toggle
     */
    public toggle: Toggle = new Toggle();


    /**
     * Renders toggle manager
     * @returns  
     */
    render() {
        return (
            <div>
                <h1>Create Toggle</h1>
                <Form>
                    <Form.Group controlId="formKey">
                        <Form.Label>Key</Form.Label>
                        <Form.Control value={this.toggle.key} type="text" placeholder="Enter Toggle Key Identifier" required />
                        <Form.Text className="text-muted">
                            Used used to identify the toggle
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={this.toggle.description} as="textarea" rows="3" placeholder="Ex: Toggle to manage authentication services..." />
                    </Form.Group>
                </Form>
            </div>
        );
    }

}

export default CreateEditToggle;