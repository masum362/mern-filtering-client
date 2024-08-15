import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import UserAuth from '../components/userAuth/UserAuth';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Error page</div>,
        children: [
            {
                path: "/",
                element: <UserAuth><Home /></UserAuth>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    }
])


export { router }