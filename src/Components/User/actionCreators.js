import { asyncActionNames, buildAsyncActions } from '../Common/GlobalActionCreators';
import { HTTP } from '../../services';

const actionNamesUserListing = asyncActionNames("UserList");
const actionCreatorsUserListing = buildAsyncActions(actionNamesUserListing);
const actionNamesSetUser = asyncActionNames("SetUser");
const actionCreatorsSetUser = buildAsyncActions(actionNamesSetUser);

export function get_user_data() {
    return function (dispatch) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await HTTP("get", "get_user_list");
                result = result.data
                dispatch(actionCreatorsUserListing.success(result.data));
                resolve(true);
            }
            catch (ex) {
                console.log(ex);
                reject(true);
            }
        })
    }
}

export function add_update_user(values) {
    return function (dispatch) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await HTTP("post", "add_update_user", values);
                resolve(result.data);
            }
            catch (ex) {
                console.log(ex);
                reject({ status: false, data: "Error in addUpdateUser" });
            }
        })
    }
}

export function delete_user(id) {
    return function (dispatch) {
        return new Promise(async (resolve, reject) => {
            try {
                await HTTP("delete", "delete_user", { id });
                resolve(true);
            }
            catch (ex) {
                console.log(ex);
                reject(true);
            }
        })
    }
}

export function set_user(user) {
    return function (dispatch) {
        return new Promise(async (resolve, reject) => {
            if (user) {
                let dob = user.dob.split("-")
                let day = dob[0], month = dob[1], year = dob[2]
                user.day = day
                user.month = month
                user.year = year
            }
            dispatch(actionCreatorsSetUser.success(user));
            resolve(true);
        })
    }
}
