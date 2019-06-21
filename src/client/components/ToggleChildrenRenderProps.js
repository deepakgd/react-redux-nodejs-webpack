import React, { Component } from 'react'

export default class ToggleChildrenRenderProps extends Component {

    constructor(props){
        super(props);
        this.state = {
            on: true
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        const { children } = this.props;

        return (
            <div>
                {children({ toggle: this.toggle, on: this.state.on, message: "Hello world" })}
                <hr />
            </div>
        )
    }
}
