import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STATE_KEY, actions } from '../state';

class Todo extends Component{
    constructor(props){
        super(props)
        console.log("Initial props -> ", this.props, this.state)
        this.state = { ...this.props }
    }

    render(){
        return (
            <div>Todo Component</div>
        )
    }
}

function mapStateToProps(state){
    return {
        ...state[STATE_KEY]
    }
}

export default connect(mapStateToProps, { ...actions })(Todo);