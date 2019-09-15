import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import CreateEditToggle from "../../../components/toggleComponents/createEdit/CreateEditToggle";


/**
 * Toggle manager
 */
export class ToggleCreateView extends Component<RouteComponentProps> {


  render() {
    const toRender = this.buildView();
    return (
      <div className="ToggleCreateView">
        {toRender}
      </div>
    );
  }
  buildView() {
    return (<>
      <CreateEditToggle/>
    </>);
  }
}

export default ToggleCreateView;
