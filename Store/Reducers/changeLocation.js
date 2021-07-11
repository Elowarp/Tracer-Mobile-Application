const initialState = { 
    location: { // Location of the middle of France
        latitude: 46.227638,
        longitude: 2.213749,
    }
}

function changeLocation(state = initialState, action){
    let nextState;

    switch(action.type){
        case "CHANGE_LOCATION":
            nextState= {
                ...state,
                location: action.value,
            }
            return nextState || state
        
        default: 
            return state
    }
}

export default changeLocation