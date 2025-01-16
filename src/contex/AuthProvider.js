import React, { createContext, useState } from 'react'
import { sigInUser } from '../api/auth'

const AuthContext = createContext()

const defaultAuthInfo = {
    profile: null,
    isLOggedIn: false,
    isPending: false,
    error: ''
}


export default function AuthProvider({ Children }) {
    const [authInfo, setauthInfo] = useState({ ...defaultAuthInfo })

    const handleLogin = async (email, password) => {
        setauthInfo({ ...authInfo, isPending: true })
        const { error, user } = await sigInUser({ email, password })
        if (error) {
            return setauthInfo({ ...authInfo, isPending: false, error })
        }
        setauthInfo({ profile: { ...authInfo }, isLoggedIn: true, isPending: false, error: " " })


        localStorage.setItem('auth-token', user.token)

    }

    return (
        <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout, isAuth }}>

            {Children}
        </AuthContext.Provider>
    )
}
