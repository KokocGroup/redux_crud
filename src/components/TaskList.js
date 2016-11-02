import React, {Component} from 'react'
import {Table, Button, Checkbox, ButtonToolbar} from 'react-bootstrap'
import { browserHistory } from 'react-router'

export default class TaskList extends Component {
    onComplete(task, e) {
        e.preventDefault();
        this.props.completeTask(task);
    }

    onDelete(task, e) {
        e.preventDefault();
        this.props.deleteTask(task);
    }

    onEdit(task, e) {
        e.preventDefault();
        browserHistory.push(`/edit/${task.pk}/`)
    }

    render() {
        const {tasks} = this.props;
        const styleLineThrough = {textDecoration: 'line-through'};

        return <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Действие</th>
            </tr>
            </thead>
            <tbody>
            {
                tasks.map((el) => <tr key={el.pk}>
                    <td><Checkbox checked={el.complete} onChange={this.onComplete.bind(this, el)}/></td>
                    <td style={el.complete ? styleLineThrough : null}>{el.title}</td>
                    <td>{el.description != 'undefined' ? el.description : ''}</td>
                    <td>
                          <ButtonToolbar>
                        <Button bsStyle='primary' bsSize='xsmall' onClick={this.onEdit.bind(this, el)}>Редактировать</Button>
                        <Button bsStyle='danger' bsSize='xsmall' onClick={this.onDelete.bind(this, el)}>Удалить</Button>
                              </ButtonToolbar>
                    </td>
                </tr>)
            }
            </tbody>
        </Table>
    }
}