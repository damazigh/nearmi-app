import { LNG_CHANGE } from '../type';

const initialState = {
    loggedIn: false,
    currentLanguage: 'en'
}

let newState = null;
function accountReducer(state = initialState, action) {
    switch(action.type) {
        case LNG_CHANGE:
            newState = Object.assign({}, state);
            newState.currentLanguage = action.lng;
            return newState
        default:
            return initialState;
    }
}
export default accountReducer;