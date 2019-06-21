import React, { Component } from 'react';

import Toggle from '../../components/Toggle';
import ToggleRenderProps from '../../components/ToggleRenderProps';

export default class RenderProps extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                React render props

                <p>The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.</p>

                <div>
                    <h2>Normal Method</h2>
                    <Toggle></Toggle>
                </div>

                <div>
                    <h2>Render props</h2>
                    <ToggleRenderProps  render={({ toggle, on, message })=>(
                        <div>
                            {on &&  <h1>{message}</h1>}
                            <button onClick={toggle}>Show/Hide</button>
                        </div>
                    )} />
                </div>
                
                <div>
                    we can send some other template also in tooglerender props like below

                    <ToggleRenderProps render={()=>(
                        <ul>
                            <li>CSE</li>
                            <li>IT</li>
                            <li>ECE</li>
                            <li>EEE</li>
                            <li>Mech</li>
                            <li>Civil</li>
                        </ul>
                    )} />
                </div>
            </div>
        )
    }
}