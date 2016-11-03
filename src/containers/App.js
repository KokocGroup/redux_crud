import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav, Pagination} from 'react-bootstrap'
import TaskList from '../components/TaskList'
import TaskAlert from '../components/TaskAlert'
import TaskDeleteAlert from '../components/TaskDeleteAlert'
import {browserHistory} from 'react-router'
import * as taskActions from '../actions/TaskActions'

class App extends Component {
    componentDidMount() {
        this.props.taskActions.getTasks(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.query.page != nextProps.query.page) {
            this.props.taskActions.getTasks(nextProps.query);
        }
    }

    onPageSelect(eventKey) {
        let query = {...this.props.query, page: eventKey};
        if (eventKey == 1) {
            delete query['page']
        }
        browserHistory.push({
            pathname: '/',
            query
        })
    }

    render() {
        const {tasks, query, countPage, currentPage, error, deleteTaskAlert} = this.props;
        const {completeTask, deleteTask, taskErrorDismiss, taskDeleteAlert, taskDeleteDismiss} = this.props.taskActions;
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
                <TaskAlert error={error} taskErrorDismiss={taskErrorDismiss} />
                <TaskDeleteAlert task={deleteTaskAlert} taskDeleteDismiss={taskDeleteDismiss} deleteTask={deleteTask}/>
                <TaskList tasks={tasks} completeTask={completeTask} taskDeleteAlert={taskDeleteAlert} query={query}/>
                <Pagination
                    boundaryLinks
                    bsSize='small'
                    items={countPage}
                    maxButtons={5}
                    activePage={currentPage}
                    onSelect={::this.onPageSelect}
                />
                {this.props.children}
            </div>
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    const {results, current, count, error, deleteTaskAlert} = state.tasks;
    const {query} = ownProps.location;
    return {
        tasks: results,
        currentPage: current,
        countPage: count,
        deleteTaskAlert,
        error,
        query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)