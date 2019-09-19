import React, { Component } from 'react';

// client
import { ToggleState, IToggleState, ToggleStateClient, ServiceClient, ToggleClient, Toggle, Service } from '../../sdk/togglerApiClient/TogglerApi';

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap';
// json view

import ReactJson from 'react-json-view'

// components
import { Toggler } from "../../components/toggleComponents/toggle/Toggler";
import { EditRelationModal } from "../../components/serviceComponents/createEdit/EditRelationModal";




/**
 * Toggle manager
 */
export class Example extends Component<{}, IToggleState> {

  /**
   * Service client of example
   */
  private readonly serviceClient = new ServiceClient();

  /**
   * Toggle client of example
   */
  private readonly toggleClient = new ToggleClient();

  /**
   * Toggle state client of example
   */
  private readonly toggleStateClient = new ToggleStateClient();

  /**
   * Toggle state of example
   */
  public toggleState: ToggleState | null = null;


  public async init() {
    let service: Service | null = null;
    let toggle: Toggle | null = null;
    try {
      toggle = await this.createToggle();
    } catch (error) {
      console.log(error);
    }
    try {
      service = await this.createService();
    } catch (error) {
      console.log(error);
    }
    try {
      toggle = await this.createToggle();
    } catch (error) {
      console.log(error);
    }
    try {
      this.toggleState = await this.createToggleState(service, toggle);
      this.setState(this.toggleState);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Creates toggle state
   * @param service 
   * @param toggle 
   * @returns toggle state 
   */
  public async createToggleState(service: Service | null, toggle: Toggle | null): Promise<ToggleState | null> {
    if (service && service.id && toggle && toggle.id) {
      return await this.toggleStateClient.post(
        new ToggleState({
          serviceId: service.id,
          toggleId: toggle.id,
          value: false
        })
      );
    } else {
      alert("Alert error on example scenario creation");
    }
    return Promise.resolve(null);
  }

  handleChange = async (state: ToggleState, value: boolean) => {
    if (state && state.id && this.state.id) {
      state.value = value;
      await this.toggleStateClient.patch(state.id, state);
    }
  }


  /**
   * Creates service
   * @returns  
   */
  public async createService(): Promise<Service> {
    return await this.serviceClient.post(
      new Service({
        key: "TestService",
        description: "Test Service"
      })
    );
  }

  /**
   * Creates toggle
   * @returns  
   */
  public async createToggle(): Promise<Toggle> {
    return await this.toggleClient.post(
      new Toggle({
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Test Toggle",
        key: "isToShowTest"
      })
    );
  }

  /**
   * Components did mount
   */
  componentDidMount() {
    this.init()
  }

  /**
   * Determines whether state change on
   */
  onStateChange = (state: IToggleState) => {
    this.toggleState = state as any;
  }

  /**
   * Renders toggle manager
   * @returns
   */
  render() {
    return (
      <div className="Example">
        <Container>
          <h3>Toggler Service Example</h3>
          <hr />
          <Row>
            <Col>
              The component <strong>>Example Component 1</strong> dot not uses the toggler component to hide/show using the <strong>Toggle Pattern</strong>
            </Col>
            <Col>
              <Button block>Example Component 1</Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              The component <strong>>Example Component 2</strong> uses the toggler to hide/show using the <strong>Toggle Pattern</strong>
              <ul>
                <li>
                  Service: <strong>TestService</strong>
                </li>
                <li>
                  Toggle: <strong>isToShowTest</strong>
                </li>
              </ul>
            </Col>
            <Col>
              <Toggler service="TestService" toggle="isToShowTest" onStateChange={this.onStateChange}>
                <Button block variant="success">Example Component 2</Button>
              </Toggler>
            </Col>
          </Row>
          <hr />
          <br />
          <EditRelationModal state={this.toggleState as ToggleState} onChange={this.handleChange} />
          <br />
          {/* <EditRelationModal toggleStateId="1"/> */}
          <br /> <br />
          <h4>Toggle State JSON:</h4>
          <hr />
          {this.toggleState != null ? <ReactJson src={this.toggleState as any} /> : null}
        </Container>
      </div>
    );
  }
}


export default Example;