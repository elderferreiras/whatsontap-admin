import React, {Component, Fragment} from 'react';
import {Modal, Button, Spinner} from 'react-bootstrap';
import BeerForm from '../BeerForm/BeerForm';

class BeerCreate extends Component {
    render() {
        let body = <BeerForm beerId={this.props.beerId}/>;

        if (this.props.loading) {
            body = (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

        return (
            <Fragment>
                <Modal show={this.props.show} onHide={this.props.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.action} Beer</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {body}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.hide}>Close</Button>
                        <Button variant="primary" onClick={this.props.save}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default BeerCreate;