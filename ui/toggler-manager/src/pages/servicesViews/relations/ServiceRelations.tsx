import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router';

// SDK
import {
  ServiceClient, IService, Toggle, ToggleClient, ToggleStateClient, IToggleState, ToggleState
} from "../../../sdk/togglerApiClient/TogglerApi"


// Components
import { CreateRelationModal } from "../../../components/serviceComponents/createEdit/CreateRelationModal";
import { EditRelationModal } from "../../../components/serviceComponents/createEdit/EditRelationModal";
import { Tab, Row, Col, Nav, Table, Button } from 'react-bootstrap';

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
   * Toggle client of service create view
   */
  public readonly toggleClient = new ToggleClient();

  /**
   * Toggle state client of service relations
   */
  public readonly toggleStateClient = new ToggleStateClient();



  /**
   * Toggles of service relations
   */
  private toggles: Toggle[] = [];

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
      const toggles = await this.toggleClient.getAll();
      const service = await this.serviceClient.getServiceStates(serviceId);
      const states = service.states;
      for (const toggle of toggles) {
        // not already added
        if (states && states.findIndex(s => s.toggleId === toggle.id) < 0) {
          this.toggles.push(toggle);
        }
      }

      this.setState({
        id: service.id,
        createdAt: service.createdAt,
        updatedAt: new Date(),
        description: service.description,
        key: service.key,
        states: states
      })
    }
  }

  handleSelectToggle = async (toggle: Toggle) => {
    if (toggle && toggle.id && this.state.id) {
      const state = new ToggleState({
        createdAt: new Date(),
        serviceId: this.state.id,
        toggleId: toggle.id,
        updatedAt: new Date(),
        value: false
      });
      await this.toggleStateClient.post(state);
      await this.defineState();
    }
  }

  handleChange = async (state: ToggleState, value: boolean) => {
    if (state && state.id && this.state.id) {
      state.value = value;
      await this.toggleStateClient.patch(state.id, state);
      await this.defineState();
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
    return (<>
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
      <CreateRelationModal toggles={this.toggles} onSelect={this.handleSelectToggle} />
    </>)
  }

  /**
   * Builds tabs
   * @returns
   */
  buildTabs() {
    const toggleStates = this.state.states;
    if (!toggleStates || toggleStates.length === 0) {
      return <h1>
        No Toggles available in this service
      </h1>;
    }
    const tabs = [];
    const tabsBody = [];
    for (const state of toggleStates) {
      if (state && state.toggle) {
        // tas selector
        tabs.push(
          <Nav variant="pills" className="flex-column" key={`${state.id}`}>
            <Nav.Item>
              <Nav.Link eventKey={`${state.id}`}>{state.toggle.key}</Nav.Link>
            </Nav.Item>
          </Nav>
        );
        // body to show
        tabsBody.push(
          <Tab.Content key={`${state.id}`}>
            <Tab.Pane eventKey={`${state.id}`}>
              <h3>Toggle Data</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{state.toggle.id}</td>
                    <td>{state.toggle.key}</td>
                    <td>{state.value ? 'True' : 'False'}</td>
                  </tr>
                </tbody>
              </Table>
              <EditRelationModal state={state} onChange={this.handleChange} />
            </Tab.Pane>
          </Tab.Content>
        );
      }
    }
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey={`${toggleStates[0].id}`}>
        <Row>
          <Col sm={3}>
            {tabs}
          </Col>
          <Col sm={9}>
            {tabsBody}
          </Col>
        </Row>
      </Tab.Container>
    )
  }


  buildView() {
    const table = this.buildTable()
    const tabs = this.buildTabs()
    return <>
      <h1>Selected Service</h1>
      <hr />
      {table}
      <h1>
        Service Toggles
      </h1>
      <hr />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        {tabs}
      </Tab.Container>
    </>
  }
}

export default ServiceRelations;

