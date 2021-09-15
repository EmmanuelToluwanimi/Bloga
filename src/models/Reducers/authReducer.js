import { ACTIONS } from "./action";

export const authReducer = (currentUser, action) => {
    switch (action.type) {
        case ACTIONS.GET_CURRENT_USER:
            return currentUser = action.payload.user
        case ACTIONS.SET_USER:
            return currentUser = action.payload.user

        default:
            return currentUser;
    }
}

