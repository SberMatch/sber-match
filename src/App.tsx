import { ConfigProvider, Layout } from 'antd';
import React, {memo, useState} from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContext from "./contexts/auth-context";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#0958d9',
                  borderRadius: 4,
                  colorBgContainer: '#ffffff',
              },
          }}
      >
          <Layout>
              <AuthContext.Provider value={{isAuth, setIsAuth}}>
                  <RouterProvider router={router} />
              </AuthContext.Provider>
          </Layout>
      </ConfigProvider>
  );
};

export default memo(App);
