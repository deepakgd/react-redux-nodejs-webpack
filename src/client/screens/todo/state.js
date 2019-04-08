import { dispatch } from "rxjs/internal/observable/range";
import axios from 'axios';

import { apiUrl } from '../../config';

// state key
export const STATE_KEY = 'todo';

// ------------------------
// Action types
// ------------------------

const LOADER = "LOADER";
const GET_TODOS_COMPLETED = "GET_TODOS_COMPLETED";
const GET_TODOS_ERROR = "GET_TODOS_ERROR";
const CREATE_TODO_COMPLETED = "CREATE_TODO_COMPLETED";
const CREATE_TODO_ERROR = "CREATE_TODO_ERROR";
const UPDATE_TODO_COMPLETED = "UPDATE_TODO_COMPLETED";
const UPDATE_TODO_ERROR = "UPDATE_TODO_ERROR"; 
const DELETE_TODO_COMPLETED = "DELETE_TODO_COMPLETED";
const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";

// Initial value for reducers
const initialValue = {
    todos: [],
    isLoading: false,
    error: "",
    clear: false // for form clear
}

// ------------------------
// Reducers
// ------------------------

export default function(state = initialValue, action){
    switch(action.type){
        case LOADER:
            return { ...state, isLoading: true, clear: false }
            break;
        case GET_TODOS_COMPLETED:
            return { ...state, isLoading: false, todos: action.payload.todos, error: "" }
            break;
        case GET_TODOS_ERROR:
            return { ...state, isLoading: false, todos: [], error: action.payload.error }
            break;
        case CREATE_TODO_COMPLETED:
            return { ...state, isLoading: false, todos: action.payload.todos, error: "", clear: true }
            break;
        case CREATE_TODO_ERROR:
            return { ...state, isLoading: false, error: action.payload.error, clear: false }
            break;
        case UPDATE_TODO_COMPLETED:
            return { ...state, isLoading: false, todos: action.payload.todos, error: "", clear: true }
            break;
        case UPDATE_TODO_ERROR:
            return { ...state, isLoading: false, error: action.payload.error, clear: false }
            break;
        case DELETE_TODO_COMPLETED:
            return { ...state, isLoading: false, todos: action.payload.todos, error: "" }
            break;
        case DELETE_TODO_ERROR:
            return { ...state, isLoading: false, error: action.payload.error }
            break;
        default:
            return state
    }
}


// ------------------------
// Action creators
// ------------------------

/**
 * getTodos - return todo list form backend
 */
function getTodos(){
    return (dispatch, getState) => {
        dispatch({ type: LOADER });
        axios(apiUrl+'/api/todos')
        .then(response => dispatch({ type: GET_TODOS_COMPLETED, payload: { todos: response.data.data } }))
        .catch(error=> dispatch({ type: GET_TODOS_ERROR, payload: { error: error.response.data.error.message } }))
    }
}

/**
 * createTodo - add new todo item in database and in front end
 * @param {OBJECT} localState - contains title, desc, priority, status content 
 */
function createTodo(localState){
    return (dispatch, getState) => {
        dispatch({ type: LOADER });
        const state = getState()[STATE_KEY];
        const payload = { title: localState.title, description: localState.description, priority: localState.priority, status: localState.status };
        axios.post(apiUrl+'/api/todo', payload)
        .then(response => {
            state.todos.push({ ...payload })
            dispatch({ type: CREATE_TODO_COMPLETED, payload: { todos: state.todos } })
        }).catch(error => dispatch({ type: CREATE_TODO_ERROR, payload: { error: error.response.data.error.message  } }))
    }
}

/**
 * updateTodo - update todo item in database by id
 * @param {OBJECT} localState  - contains title, desc, priority, status and _id
 */
function updateTodo(localState){
    return (dispatch, getState) => {
        dispatch({ type: LOADER })
        const state = getState()[STATE_KEY];
        axios({
            method: 'put',
            url: apiUrl+'/api/todo/'+localState._id,
            data: localState
        })
        .then(response=>{
            state.todos[localState.editIndex] = { ...localState };
            dispatch({ type: UPDATE_TODO_COMPLETED, payload: { todos: state.todos }});
        }).catch(error => dispatch({ type: UPDATE_TODO_ERROR, payload: { error: error.response.data.error.message } }));
    }
}

/**
 * deleteTodo - delete todo item by index
 * @param {INTEGER} index - todo index 
 */
function deleteTodo(index){
    return (dispatch, getState) => {
        dispatch({ type: LOADER })
        const state = getState()[STATE_KEY];
        const payload = state.todos[index]
        axios({
            method: 'delete',
            url: apiUrl+'/api/todo/'+payload._id
        })
        .then(response => {
            state.todos.splice(index, 1);
            dispatch({ type: DELETE_TODO_COMPLETED, payload: { todos: state.todos }});
        }).catch(error => dispatch({ type: DELETE_TODO_ERROR, payload: { error: error.response.data.error.message } }));
    }
}

export const actions = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}