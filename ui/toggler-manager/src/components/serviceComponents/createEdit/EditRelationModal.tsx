import React, { Component, useState } from 'react'; // let's also import Component

import { IService, ServiceClient, Service, Toggle, ToggleState } from "../../../sdk/togglerApiClient/TogglerApi";

// Components
import { Button, Modal, Form } from 'react-bootstrap';

type Props = {
  state: ToggleState,
  onChange: (state: ToggleState, value: boolean) => void;
}

export const EditRelationModal: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event: any) => {
    console.log(event.target)
    if (event && event.target && event.target.checked != null) {
      setShow(false);
      props.onChange(props.state, event.target.checked);
    }
  }

  const form = props.state != null && props.state.value != null ?
    <Form>
      <Form.Check onChange={handleChange}
        type="checkbox"
        defaultChecked={props.state.value}
        label="Value"
      />
    </Form> : <p>No State Loaded</p>;

  return (
    <>
      <Button variant="info" block onClick={handleShow}>
        Edit Relation
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Value of the Toggle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
