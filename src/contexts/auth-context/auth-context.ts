import {createContext} from "react";

interface AuthContextState {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void;
}

const defaultValue: AuthContextState = {
    isAuth: false,
    setIsAuth: () => {}
}

const AuthContext = createContext<AuthContextState>(defaultValue);

export default AuthContext;
