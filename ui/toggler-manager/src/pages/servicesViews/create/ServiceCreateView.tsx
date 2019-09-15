import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import CreateEditService from "../../../components/serviceComponenets/createEdit/CreateEditService";


/**
 * Toggle manager
 */
export class ServiceCreateView extends Component<RouteComponentProps> {


  render() {
    const toRender = this.buildView();
    return (
      <div className="ServiceCreateView">
        {toRender}
      </div>
    );
  }
  buildView() {
    return (<>
      <CreateEditService/>
    </>);
  }
}

export default ServiceCreateView;
