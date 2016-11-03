import React, {Component} from 'react'
import {Alert} from 'react-bootstrap'

export default class TaskAlert extends Component {

    render() {
        const {error, taskErrorDismiss} = this.props;

        return <div>
            {
                error ?
                    <Alert bsStyle='danger' onDismiss={taskErrorDismiss}>
                        <p>{error}</p>
                    </Alert>
                    :
                    null
            }
        </div>
    }
}