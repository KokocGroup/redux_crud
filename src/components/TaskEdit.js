import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as taskActions from '../actions/TaskActions'
import {Modal, Form, Col, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {browserHistory} from 'react-router'

class TaskEdit extends Component {

    onCloseModal() {
        let {query} = this.props;
        browserHistory.push({
            pathname: '/',
            query
        })
    }

    onSave(e) {
        e.preventDefault();
        const data = {
            title: ReactDOM.findDOMNode(this.refs.titleInput).value,
            description: ReactDOM.findDOMNode(this.refs.descriptionInput).value,
        };
        if (this.props.task) {
            this.props.taskActions.updateTask(this.props.task, data)
        } else {
            this.props.taskActions.addTask(data)
        }

        let {query} = this.props;
        browserHistory.push({
            pathname: '/',
            query
        })
    }

    render() {
        const {task} = this.props;

        return <Modal show={true} onHide={::this.onCloseModal} bsSize='large'>
            <Form horizontal onSubmit={::this.onSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование аудита</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>
                            Название:
                        </Col>
                        <Col sm={9}>
                            <FormControl type='text' placeholder='Название' defaultValue={!task || task.title == 'undefined' ? '' : task.title} ref='titleInput'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>
                            Описание:
                        </Col>
                        <Col sm={9}>
                            <FormControl componentClass='textarea'
                                         rows='3'
                                         placeholder='Описание'
                                         defaultValue={!task || task.description == 'undefined' ? '' : task.description}
                                         ref='descriptionInput'
                            />
                        </Col>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.onCloseModal}>Закрыть</Button>
                    <Button type='submit'>Сохранить</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    }
}


function mapStateToProps(state, ownProps) {
    return {
        task: state.tasks.results.filter((el) => el.pk == ownProps.params.task_pk)[0],
        query: ownProps.location.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)