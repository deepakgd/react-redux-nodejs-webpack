import React, { Component } from 'react'

export default class Toggle extends Component {

    constructor(props){
        super(props)
        this.state = {
            on: true
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({ on: !this.state.on })
    }

    render() {
        return (
            <div>
                {this.state.on && <h1>Toggle me</h1>}
                <button onClick={this.toggle}>show/hide</button>
            </div>
        )
    }
}
