import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import CreateEditService from "../../../components/serviceComponents/createEdit/CreateEditService";


/**
 * Toggle manager
 */
export class ServiceRelations extends Component<RouteComponentProps> {


  render() {
    const toRender = this.buildView();
    return (
      <div className="ServiceRelations">
        {toRender}
      </div>
    );
  }
  buildView() {
    return (<h1>1111</h1>);
  }
}

export default ServiceRelations;
