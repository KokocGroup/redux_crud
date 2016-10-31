import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'
import * as taskActions from '../actions/TaskActions'

class App extends Component {
    render() {
        const {results, filterComplete} = this.props.tasks;
        const {addTask, completeTask, deleteTask, filterTask, getTasks} = this.props.taskActions;

        return <div>
            <TaskForm addTask={addTask} filterComplete={filterComplete} filterTask={filterTask} getTasks={getTasks}/>
            <Task tasks={results} filterComplete={filterComplete}  completeTask={completeTask} deleteTask={deleteTask}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)