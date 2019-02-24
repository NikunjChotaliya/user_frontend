import { asyncActionNames } from '../Common/GlobalActionCreators';

const actionNamesUserListing = asyncActionNames("UserList");
const actionNamesSetUser = asyncActionNames("SetUser");

const INITIAL_STATE = { errors: null, data: [], user: '' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionNamesUserListing.success:
            return { ...state, data: action.payload }
        case actionNamesSetUser.success:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}