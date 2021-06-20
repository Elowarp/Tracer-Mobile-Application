const initialState = {show: true, message: "Recherche de la localisation"}

function changeLoading(state = initialState, action){
    let nextState;

    switch(action.type){
        case 'CHANGE_LOADING_MESSAGE':
            nextState = {
                ...state,
                show: action.value.show,
                message: action.value.message,
            }

            return nextState || state

        case 'HIDING_LOADING_MESSAGE':
            nextState = {
                ...state,
                show: false,
            }

            return nextState || state
        default:
            return state
    }
}

export default changeLoading