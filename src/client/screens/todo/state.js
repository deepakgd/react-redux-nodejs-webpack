import { dispatch } from "rxjs/internal/observable/range";

// state key
export const STATE_KEY = 'todo';

// Action types
const GET_TODOS = "GET_TODOS";
const CLEAR_FORM = "CLEAR_FORM";


// Initial value for reducers
const initialValue = {
    todos: [],
    title: "",
    description: "",
    priority: "",
    status: ""
}

// Reducers
export default function(state = initialValue, action){
    switch(action.type){
        case GET_TODOS:
            return state
            break;
        default:
            return state
    }
}


// Action creators
function getTodos(localState){
    return (dispatch, getState) => {

    }
}

export const actions = {
    getTodos
}