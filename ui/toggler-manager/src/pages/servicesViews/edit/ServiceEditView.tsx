import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import CreateEditService from "../../../components/serviceComponents/createEdit/CreateEditService";


/**
 * Toggle manager
 */
export class ServiceEditView extends Component<RouteComponentProps> {


  render() {
    const toRender = this.buildView();
    return (
      <div className="ToggleListView">
        {toRender}
      </div>
    );
  }
  buildView() {
    return (<>
      <CreateEditService id={(this.props.match.params as any).id} />
    </>);
  }
}

export default ServiceEditView;
