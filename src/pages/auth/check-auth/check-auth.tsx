import React, {FC, memo, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {getHmacSHA1EncryptedValue} from "../../../utils/crypto";
import AuthContext from "../../../contexts/auth-context";

export const CheckAuth: FC<PropsWithChildren> = memo(({ children }) => {
    const location = useLocation();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const sessionIsAuth = !!sessionStorage.getItem(getHmacSHA1EncryptedValue('b2knd1fg4d'));

    useEffect(() => {
        if (!sessionIsAuth) {
            return;
        }

        setIsAuth(true)
    }, [setIsAuth, sessionIsAuth]);

    if (!isAuth && !sessionIsAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{children}</>;
});

export const CheckNotAuth: FC<PropsWithChildren> = memo(({ children }) => {
    const location = useLocation();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const sessionIsAuth = !!sessionStorage.getItem(getHmacSHA1EncryptedValue('b2knd1fg4d'));

    useEffect(() => {
        if (!sessionIsAuth) {
            return;
        }

        setIsAuth(true);
    }, [setIsAuth, sessionIsAuth]);

    if (!isAuth && !sessionIsAuth) {
        return <>{children}</>;
    }

    return <Navigate to="/" state={{ from: location }} />;
});
