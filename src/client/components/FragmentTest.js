import React, { Component, Fragment } from 'react'

export default class FragmentTest extends Component {
    render() {
        return (
            <Fragment>
                <p>Fragment will avoid using div or someother partent Component. 
                    if you inspect element it wont show any html tag. this wil be helpful in css design</p>
                    <button>Click me - no action</button>
            </Fragment>
        )
    }
}
