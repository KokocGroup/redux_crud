import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import TaskEdit from './components/TaskEdit'
import configureStore from './store/configureStore'
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import './app.css'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <Route path='edit/:task_pk/' component={TaskEdit}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);