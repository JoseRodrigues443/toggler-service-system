import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import { ServiceClient, IService, Toggle } from "../../../sdk/togglerApiClient/TogglerApi"

// Components

import { Tab, Row, Col, Nav, Table } from 'react-bootstrap'

interface IServiceRelations {
    toggles: Toggle[]
}

/**
 * Service relation manager
 */
export class ServiceRelations extends Component<RouteComponentProps, IServiceRelations & IService> {

  /**
  * Creates an instance of create edit toggle.
  */
  constructor(props: any) {
    super(props);
    this.defineState()
  }

  /**
   * Service client of service create view
   */
  public readonly serviceClient = new ServiceClient();

  /**
   * Defines state
   */
  async defineState() {
    const serviceId = (this.props.match.params as any).id;
    this.state = {
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "",
      key: "",
      states: [],
      toggles: []
    }
    if (serviceId != null) {
      const service = await this.serviceClient.get(serviceId);
      this.setState({
        id: service.id,
        createdAt: service.createdAt,
        updatedAt: new Date(),
        description: service.description,
        key: service.key,
        states: service.states
      })
    }
  }

  render() {
    const toRender = this.buildView();
    return (
      <div className="ServiceRelations">
        {toRender}
      </div>
    );
  }

  buildTable() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.state.id}</td>
            <td>{this.state.key}</td>
          </tr>
        </tbody>
      </Table>
    )
  }


  buildView() {
    const table = this.buildTable()
    return <>
      <h1>Selected Service</h1>
      <hr />
      {table}
      <h1>
        Service Toggles
      </h1>
      <hr />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <h1>aaaaa</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <h1>bbbb</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  }
}

export default ServiceRelations;

