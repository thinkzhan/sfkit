import * as ActionType from '../actions/detail';

const initialState = {
    desc: ''
};
export function detail(state = initialState, action) {
    switch (action.type) {
        case ActionType.GET_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}
