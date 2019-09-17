import React, { Component } from 'react'; // let's also import Component
import { ToggleStateClient, ToggleClient, ToggleState, IToggle, IToggleState } from "../../../sdk/togglerApiClient/TogglerApi"

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
    toggle: string,
    /**
     * Change output
     */
    onStateChange: (state: IToggleState) => void
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
     * Toggle state of toggler
     */
    public toggleState: IToggleState | null = null;

    /**
     * Creates an instance of toggler.
     * @param props 
     */
    constructor(props: ToggleManagerProp) {
        super(props);
        this.state = {
            isToShow: false // default is false
        }
    }

    /**
     * Inits toggle manager
     */
    public async init() {
        try {
            this.toggleState = await this.toggleStateClient.getRelation(this.props.toggle, this.props.service);
            if (this.toggleState) {
                this.setState({ isToShow: this.toggleState.value });
                this.props.onStateChange(this.toggleState);
            }
        } catch (error) {
            console.log(error);
            this.setState({ isToShow: false }); // does not exist, close
        }
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
        // if is to show, then return the children to send
        return this.state.isToShow === true ? this.props.children : null;
    }
}

export default Toggler;