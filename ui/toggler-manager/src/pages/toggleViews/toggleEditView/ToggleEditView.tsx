import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import CreateEditToggle from "../../../components/toggleComponents/createEdit/CreateEditToggle";


/**
 * Toggle manager
 */
export class ToggleEditView extends Component<RouteComponentProps> {


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
      <CreateEditToggle id={(this.props.match.params as any).id} />
    </>);
  }
}

export default ToggleEditView;
