import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap'

export default class AddTask extends Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTask(ReactDOM.findDOMNode(this.refs.textInput).value);
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return <Form inline onSubmit={::this.handleSubmit}>
            <FormGroup controlId='formInlineName'>
                <FormControl type='text' placeholder='Задача' ref='textInput'/>
            </FormGroup>
            {' '}
            <Button type='submit'>
                Добавить
            </Button>
        </Form>
    }
}
