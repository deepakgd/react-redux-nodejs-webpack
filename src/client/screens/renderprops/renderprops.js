import React, { Component, Fragment } from 'react';

import Toggle from '../../components/Toggle';
import ToggleRenderProps from '../../components/ToggleRenderProps';
import ToggleChildrenRenderProps from '../../components/ToggleChildrenRenderProps';
import FragmentTest from '../../components/FragmentTest';
import Portal from '../../components/Portal';

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
                    <h2>Render props</h2>
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

                <div>
                    <h2>Children Render Props</h2>
                    <ToggleChildrenRenderProps>
                        {({on, toggle, message})=>(
                            <div>
                                {on && message}
                                <button onClick={toggle}>Show/Hide</button>
                            </div>
                        )}
                    </ToggleChildrenRenderProps>
                </div>

                <Fragment>
                    <h2>Fragment</h2>
                    <FragmentTest />
                </Fragment>

                <Fragment>
                    <hr />
                    <h2>Portal with plain text</h2>
                    <Portal>Printing from portal</Portal>
                </Fragment>

                <Fragment>
                    <hr />
                    <h2>Portal - accessing variable</h2>
                    <ToggleChildrenRenderProps>
                        {({on, toggle, message})=>(
                            <div>
                                <p>we are trying to access variable inside portal</p>
                                {on && message} - normal message from ToggleChildrenRenderProps
                                
                                <Portal>{on && message} - same message accessing inside portal</Portal>
                            </div>
                        )}
                    </ToggleChildrenRenderProps>
                    
                </Fragment>
            </div>
        )
    }
}