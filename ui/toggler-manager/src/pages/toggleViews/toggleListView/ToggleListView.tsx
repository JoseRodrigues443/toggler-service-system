import React, { Component } from 'react'; // let's also import Component

// SDK
import { ToggleClient, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import TogglerList from "../../../components/toggleComponents/list/TogglerList";
import CreateEditToggle from "../../../components/toggleComponents/createEdit/CreateEditToggle"

// bootstrap Components
import { Col, Row,Button } from 'react-bootstrap'


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
      <Row>
        <Col>
          <h1>Toggle List</h1>
        </Col>
        <Col xs lg="2">
          <Button href="/toggles/create">Add Toggle</Button>
        </Col>
      </Row>
      <br />
      <TogglerList toggles={this.state.toggles} />
    </>);
  }
}

export default ToggleListView;
