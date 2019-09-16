import React, { Component } from 'react'; // let's also import Component
import { ToggleStateClient, ToggleClient, ToggleState } from "../../../sdk/togglerApiClient/TogglerApi"

type ToggleManagerState = {
    isToShow: boolean
}

type ToggleManagerProp = {
    /**
     * The service to access
     */
    service: string,
    /**
     * The toggle to access
     */
    toggle: string
}

/**
 * Toggle manager
 */
export class Toggler extends Component<ToggleManagerProp, ToggleManagerState> {

    /**
     * Toggle state client of toggler
     */
    private readonly toggleStateClient = new ToggleStateClient();

    /**
     * Inits toggle manager
     */
    public async init() {
        const toggleState: ToggleState = await this.toggleStateClient.getRelation(this.props.toggle, this.props.service);
        this.setState({ isToShow: toggleState.value });
    }

    /**
     * Components did mount
     */
    componentDidMount() {
        this.init();
    }

    /**
     * Renders toggle manager
     * @returns  
     */
    render() {
        // if is to show
        return this.state.isToShow === true ? this.props.children : null;
    }
}

export default Toggler;