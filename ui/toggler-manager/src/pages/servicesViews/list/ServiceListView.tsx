import React, { Component } from 'react'; // let's also import Component

// SDK
import { ServiceClient, Service } from "../../../sdk/togglerApiClient/TogglerApi"

// Components
import ServiceList from "../../../components/serviceComponents/list/ServiceList";
import CreateEditService from "../../../components/serviceComponents/createEdit/CreateEditService"

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
  async loadServices() {
    const togglerList = await this.serviceClient.getAll();
    this.setState({
      services: togglerList
    });
  }

  /**
   * Components did mount
   */
  componentDidMount() {
    this.loadServices();
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
    if (this.state == null || this.state.services == null || this.state.services.length === 0) {
      return <CreateEditService />;
    }
    return (<>
      <Row>
        <Col>
          <h1>Service List</h1>
        </Col>
        <Col xs lg="2">
          <Button href="/services/create">Add Service</Button>
        </Col>
      </Row>
      <br />
      <ServiceList toggles={this.state.services} />
    </>);
  }
}

export default ServiceListView;
