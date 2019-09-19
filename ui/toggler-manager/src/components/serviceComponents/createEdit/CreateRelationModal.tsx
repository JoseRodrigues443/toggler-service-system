import React, { Component, useState } from 'react'; // let's also import Component

import { IService, ServiceClient, Service, Toggle } from "../../../sdk/togglerApiClient/TogglerApi";

// Components
import { Button, Modal, Form } from 'react-bootstrap';

type Props = {
  toggles: Toggle[],
  onSelect: (selected: Toggle) => void;
}

export const CreateRelationModal: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event: any) => {
    if (event && event.target && event.target.value) {
      const selected = props.toggles.find(t => t.id == event.target.value);
      if (selected) {
        setShow(false);
        props.onSelect(selected);
      }
    }
  }
  const options = props.toggles.map(toggle => {
    return <option key={`${toggle.id}`} value={toggle.id}>
      {toggle.key}
    </option>
  });
  return (
    <>
      <Button variant="info" block onClick={handleShow}>
        Add relation
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Relation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Select toggle</Form.Label>
            <Form.Control as="select" onChange={handleChange}>
              <option></option>
              {options}
            </Form.Control>
          </Form.Group>
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
