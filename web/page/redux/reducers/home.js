import * as ActionType from '../actions/home';

const initialState = {
    information: ''
};
export function home(state = initialState, action) {
    switch (action.type) {
        case ActionType.GET_ABOUT_DATA_SUCCESS:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}
