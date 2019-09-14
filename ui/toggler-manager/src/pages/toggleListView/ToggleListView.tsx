import React, { Component } from 'react'; // let's also import Component

// SDK
import { ToggleClient, Toggle } from "../../sdk/togglerApiClient/TogglerApi"

// Components
import TogglerList from "../../components/togglerList/TogglerList";
import CreateEditToggle from "../../components/createEditToggle/CreateEditToggle";


type ToggleListViewState = {
  toggles: Toggle[]
}

/**
 * Toggle manager
 */
export class ToggleListView extends Component<{}, ToggleListViewState> {


  /**
   * Toggle client of toggler list
   */
  public readonly toggleClient = new ToggleClient();

  /**
   * Loads toggles
   */
  async loadToggles() {
    const togglerList = await this.toggleClient.getAll();
    this.setState({
      toggles: togglerList
    });
  }

  /**
   * Components did mount
   */
  componentDidMount() {
    this.loadToggles();
  }

  render() {
    const toRender = this.buildView();
    return (
      <div className="ToggleListView">
        {toRender}
      </div>
    );
  }
  buildView() {
    if (this.state == null || this.state.toggles == null || this.state.toggles.length === 0) {
      return <CreateEditToggle />;
    }
    return (<>
      <h1>Toggle List</h1>
      <TogglerList toggles={this.state.toggles} />
    </>);
  }
}

export default ToggleListView;
