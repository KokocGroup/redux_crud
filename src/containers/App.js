import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import User from '../components/User'
import Task from '../components/Task'
import * as taskActions from '../actions/TaskActions'

class App extends Component {
    render() {
        const {user, task} = this.props;

        return <div>
            <User name={user.name}/>
            <Task task={task}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        task: state.task
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)