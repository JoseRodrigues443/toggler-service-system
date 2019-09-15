import React, { Component } from 'react'; // let's also import Component

// SDK
import { ServiceClient, Service } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import TogglerList from "../../../components/togglerList/TogglerList";
import CreateEditToggle from "../../../components/createEditToggle/CreateEditToggle"

// bootstrap Components
import { Col, Row,Button } from 'react-bootstrap'


type ServiceListViewState = {
  services: Service[]
}

/**
 * Toggle manager
 */
export class ServiceListView extends Component<{}, ServiceListViewState> {


  /**
   * Toggle client of toggler list
   */
  public readonly serviceClient = new ServiceClient();

  /**
   * Loads toggles
   */
  async loadToggles() {
    const togglerList = await this.serviceClient.getAll();
    this.setState({
      services: togglerList
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
      <div className="ServiceListView">
        {toRender}
      </div>
    );
  }
  buildView() {
    if (this.state == null || this.state.toggles == null || this.state.toggles.length === 0) {
      return <CreateEditService />;
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
