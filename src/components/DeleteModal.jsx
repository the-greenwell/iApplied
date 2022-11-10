import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const DeleteModal = ({show,onHide,jobTitle,jobId,deleteHandler}) => {
    return (
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                scrollable={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {jobTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h4>Are you sure you want to delete this application?</h4>
                    <div className='d-flex gap-2 justify-content-center'>
                        <Button className="btn-danger" onClick={()=>deleteHandler(jobId)}>Delete</Button>
                        <Button onClick={onHide}>Cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
}
