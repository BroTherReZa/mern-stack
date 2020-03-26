const typeRequire = 'REQUIRE'

export const validatorRequire = () =>({
    type:typeRequire
})

// check all validation 
export const validate = (value,validators) => {
    let isValid = true
    for (const validator of validators){
        if(validator.type === typeRequire){
            isValid = isValid && value.trim().length > 0
        }
    }
    return isValid
}