import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STATE_KEY, actions } from '../state';

import loader from '../../../img/loader.gif'
import { throws } from 'assert';

const centerLoader = {
    position: "absolute",
    top: "50%",
    left: "45%",
}

class Todo extends Component{

    /**
     * The constructor for a React component is called before it is mounted
     * @param {OBJECT} props -  When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
     */
    constructor(props){
        super(props)
        console.log("Initial props -> ", this.props, this.state)
        this.state = { 
            title: "",
            description: "",
            priority: "",
            status: "",
            editIndex: null
        }

        // here we binding this context to below functions
        this.handleChange = this.handleChange.bind(this);
        this.createTodo = this.createTodo.bind(this)
        
    }

    /**
     * componentDidMount - invoked immediately after a component is mounted 
     * here we getting todo list from database
     */
    componentDidMount(){
        this.props.getTodos();
    }

    /**
     * componentDidUpdate - invoked immediately after updating occurs
     * @param {OBJECT} prevProps - previous props object
     */
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        console.log("triggered", this.props.clear, prevProps.clear)
        if (this.props.clear !== prevProps.clear) {
          if(this.props.clear) this.setState({ title: "", description: "", priority: "", status: "" })
        }
      }

    /**
     * handleChange - whenever changes in field this will update changes into state
     */
    handleChange(){
        const target = event.target;
        const value  = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })        
    }

    /**
     * createTodo - save todo item in database and bind in front end
     */
    createTodo(event){
        event.preventDefault()
        if(this.state.editIndex === null) this.props.createTodo(this.state);
        else this.props.updateTodo(this.state);
    }

    /**
     * editTodo - form fills the todo item for edit 
     * @param {INTEGER} index - todo index
     */
    editTodo(index){
        this.setState({ editIndex: index })
        let todo = this.props.todos[index]
        this.setState({ ...todo })
    }

    /**
     * deleteTodo - delete todo item by index
     * @param {INTEGER} index - todo index
     */
    deleteTodo(index){
        this.props.deleteTodo(index)
    }

    /**
     * return jsx template, props and state as html content in browser
     */
    render(){
        if(this.props.isLoading){
            return (
                <img src={loader} style={centerLoader}/>
            )
        } else {
            return (
                <div>
                    {this.props.error?
                        <div className="alert alert-danger" role="alert">
                           {this.props.error}
                        </div>: ""
                    }
                    <form className="form-horizontal" onSubmit={this.createTodo}>
                        <fieldset>

                            <legend>Todo Component</legend>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="title">Title</label>  
                                <div className="col-md-4">
                                    <input id="title" name="title" type="text" placeholder="Enter Title" className="form-control input-md" value={this.state.title} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="description">Description</label>
                                <div className="col-md-4">                     
                                    <textarea className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="priority">Priority</label>
                                <div className="col-md-4">
                                    <select id="priority" name="priority" className="form-control" value={this.state.priority} onChange={this.handleChange}>
                                    <option value="">--Select Priority --</option>
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="status">Status</label>
                                <div className="col-md-4">
                                    <select id="status" name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
                                    <option value="">--Select Status --</option>
                                    <option value="open">Open</option>
                                    <option value="close">Close</option>
                                    <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                <div className="col-md-4">
                                    <button type="submit" id="save" name="save" className="btn btn-primary">Save</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                    { this.props.todos.length > 0 ?
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.todos.map((todo, index) => {
                                    return <tr key={index}>
                                        <td>{todo.priority}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.status}</td>
                                        <td><button className="btn btn-sm btn-primary" onClick={this.editTodo.bind(this, index)}>Edit</button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={this.deleteTodo.bind(this, index)}>Delete</button></td>
                                    </tr>
                                })}
                                
                            </tbody>
                        </table>
                        : <span>Currently there is no todo</span>
                    }
                </div>
            )
        }
        
    }
}

function mapStateToProps(state){
    return {
        ...state[STATE_KEY]
    }
}

export default connect(mapStateToProps, { ...actions })(Todo);