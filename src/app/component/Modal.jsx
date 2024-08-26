import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function CustomModal({ show, text,handleRestart }) {
    
    return (
        <>
            <Modal show={show} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="success" onClick={handleRestart}>
                        Restart
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;
