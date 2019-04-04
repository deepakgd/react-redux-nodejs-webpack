import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './app/App';

if (module.hot) {
    module.hot.accept();
    //clear console on hot reload
    window.addEventListener('message', console.clear());
}

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(
//     <Provider store={configureStore()}>
//       <App />
//     </Provider>,
//     document.getElementById('root')
// )