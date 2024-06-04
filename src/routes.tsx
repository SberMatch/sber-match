import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/auth";
import MainPage from "./pages/main";
import { CheckAuth, CheckNotAuth } from "./pages/auth/check-auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <CheckAuth>
            <MainPage />
        </CheckAuth>,
    },
    {
        path: "/login",
        element: <CheckNotAuth><AuthPage /></CheckNotAuth>,
    },
]);

export default router;
