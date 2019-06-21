import React, { Component } from 'react'

export default class ToggleRenderProps extends Component {

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
        const { render } = this.props;

        return (
            <div>
                {render({ toggle: this.toggle, on: this.state.on, message: "Hello" })}
            </div>
        )
    }
}
