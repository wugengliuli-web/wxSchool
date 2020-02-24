import {
    set_identityAuthentication,
    set_major,
    set_post,
    set_departant,
    set_teamName
} from '../constants/identityAuthentication'


export const setIdentityAuthentication = data => {
    return {
        type: set_identityAuthentication,
        data
    }
}


export const setMajor = data => {
    return {
        type: set_major,
        data
    }
}

export const setPost = data => {
    return {
        type: set_post,
        data
    }
}

export const setDepartant = data => {
    return {
        type: set_departant,
        data
    }
}

export const setTeamName = data => {
    return {
        type: set_teamName,
        data
    }
}