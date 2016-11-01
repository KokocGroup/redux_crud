import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap'
import TaskList from '../components/TaskList'
import AddTask from '../components/AddTask'
import * as taskActions from '../actions/TaskActions'

class App extends Component {
    componentDidMount() {
        this.props.taskActions.getTasks();
    }

    render() {
        const {tasks, filterComplete} = this.props;
        const {addTask, completeTask, deleteTask, filterTask} = this.props.taskActions;

        return <div>
            <Navbar fixedTop inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='/'>Redux CRUD</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href='#'>Link</NavItem>
                    <NavItem eventKey={2} href='#'>Link</NavItem>
                    <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <div className='container theme-showcase' role='main'>
                <AddTask addTask={addTask} filterComplete={filterComplete} filterTask={filterTask}/>
                <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask}/>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    const {results, filterComplete} = state.tasks;
    return {
        filterComplete: filterComplete,
        tasks: !filterComplete ? results : results.filter((el) => !el.complete)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)