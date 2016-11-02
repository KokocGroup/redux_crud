import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav, Pagination} from 'react-bootstrap'
import TaskList from '../components/TaskList'
import {browserHistory} from 'react-router'
import * as taskActions from '../actions/TaskActions'

class App extends Component {
    componentDidMount() {
        this.props.taskActions.getTasks(this.props.query);
    }

    componentWillUpdate(nextProps) {
        if (this.props.query != nextProps.query) {
            this.props.taskActions.getTasks(nextProps.query);
        }
    }

    onPageSelect(eventKey) {
        let query = {...this.props.query, page: eventKey};
        browserHistory.push({
            pathname: '/',
            query
        })
    }

    render() {
        const {tasks, query, countPage, currentPage} = this.props;
        const {completeTask, deleteTask} = this.props.taskActions;
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
                <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} query={query}/>
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
    const {results, current, count} = state.tasks;
    return {
        tasks: results,
        currentPage: current,
        countPage: count,
        query: ownProps.location.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)