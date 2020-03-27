import { useReducer, useCallback } from 'react'

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]:{
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }
        default :
        return state
    }
}

export const useForm = (initialInputState, initialValidation) => {
    const [formState, dispatch] = useReducer( formReducer, {
        inputs: initialInputState,
        isValid: initialValidation
    })
    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    },[])
    return [formState,inputHandler]
}