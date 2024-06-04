import {memo, useCallback, useContext} from 'react';
import {Button, Flex, Form, Input, Layout, Typography} from "antd";
import { FormFields } from './types';
import { CRYPTO_LOGIN } from '../../constants';
import crypto from 'crypto-js';
import cl from './auth.module.scss';
import {getHmacSHA1EncryptedValue} from "../../utils/crypto";
import AuthContext from "../../contexts/auth-context";

const AuthPage = () => {
    const { setIsAuth } = useContext(AuthContext);
    const finishHandler = useCallback(({login, password}: FormFields) => {
        if (!login || !password) {
            return;
        }

        if (crypto.HmacSHA1(login, password).toString() !== CRYPTO_LOGIN) {
            return;
        }

        sessionStorage.setItem(getHmacSHA1EncryptedValue('b2knd1fg4d'), `b2knd1fg4d${Math.random()}`)
        setIsAuth(true);
    }, [setIsAuth])

    return (
        <Layout.Content className={cl.wrapper}>
            <Form
                name="auth"
                className={cl.form}
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={finishHandler}
            >
                <Flex vertical>
                    <Typography.Title level={2}>Авторизация</Typography.Title>
                    <Form.Item<FormFields>
                        label="Логин"
                        name="login"
                        className={cl.formItem}
                        rules={[{ required: true, message: 'Введите логин' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FormFields>
                        label="Пароль"
                        name="password"
                        className={cl.formItem}
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Layout.Content>
    );
};

export default memo(AuthPage);
