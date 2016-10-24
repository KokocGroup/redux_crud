import React, {Component} from 'react'

export default class Page extends Component {
    render() {
        const {task} = this.props;
        return <p>У тебя {task.results.length} фото.</p>
    }
}

Page.propTypes = {

};