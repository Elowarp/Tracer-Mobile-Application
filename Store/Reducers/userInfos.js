const initialState = {token: '', username: '', bio: '', profile_pic: ''}

function userInfos(state = initialState, action){
    let nextState;

    switch(action.type){
        case 'SET_TOKEN':
            nextState = {
                ...state,
                token: action.value.token
            }
            
            return nextState || state

        case 'DELETE_TOKEN':
            nextState = {
                ...state,
                token: ''
            }

            return nextState || state
        
        case 'UPDATE_USER_INFOS':
            nextState = {
                ...state,
                username: action.value.username, 
                bio: action.value.bio || "",
                profile_pic: action.value.bio || "",
            }

            return nextState || state

        default:
            return state
    }
}

export default userInfos