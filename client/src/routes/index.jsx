import { createBrowserRouter } from 'react-router-dom'
import App from "../App"
import Home from '../pages/Home'
import SigninPage from '../pages/SigninPage'
import SignupPage from '../pages/SignupPage'
import CollabBoard from '../pages/collabBoard'
import TeamBoard from '../components/other/TeamBoard'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,

        children : [
            {
                path : '',
                element : <Home/>
            },
            {
                path : '/board/:user',
                element : <CollabBoard/>,
                children : [
                    {
                        path :'/board/:user/:team',
                        element : <TeamBoard/>
                    }
                ]
            }
        ]
    },
    {
        path : "/login",
        element : <SigninPage/>
    },
    {
        path : "/signup",
        element : <SignupPage/>
    }
])

export default router