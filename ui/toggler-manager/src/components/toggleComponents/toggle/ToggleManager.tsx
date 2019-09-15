import React, { Component } from 'react'; // let's also import Component


type ToggleManagerState = {
    key?: string
}

/**
 * Toggle manager
 */
export class ToggleManager extends Component<{}, ToggleManagerState> {

    /**
     * Inits toggle manager
     */
    public init() {
        // this.setState({
        //     key: null
        // });
        this.setState({ key: "" });
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
        return <p>The current time is {this.state.key}</p>
    }
}

export default ToggleManager;