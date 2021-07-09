const initialState = []

function spots(state = initialState, action){
    let nextState;

    switch(action.type){
        case "REFRESH_SPOTS":
            nextState = [
                ...state,
                action.value,
            ]
            
            return nextState || state
        
        default: 
            return state
    }
}

export default spots