import React, { Component } from 'react'; // let's also import Component


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
     * Inits toggle manager
     */
    public init() {
        this.setState({isToShow: true });
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