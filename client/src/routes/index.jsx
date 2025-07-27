import { createBrowserRouter } from 'react-router-dom'
import App from "../App"
import Home from '../pages/Home'
import SigninPage from '../pages/SigninPage'
import SignupPage from '../pages/SignupPage'
import CollabBoard from '../pages/collabBoard'
import TeamBoard from '../components/other/TeamBoard'
import MainTeamBoard from '../components/other/MainTeamBoard'
import TeamBoardEdit from '../components/other/TeamBoardEdit'
import MobileForCollabBoard from '../pages/MobileForCollabBoard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/board/:user',
                element: <CollabBoard />,
                children: [
                    {
                        path : '',
                        element : <MobileForCollabBoard/>
                    },
                    {
                        path: ':team',
                        element: <TeamBoard />,
                        children: [
                            {
                                path: '',
                                element: <MainTeamBoard />
                            },
                            {
                                path : 'edit',
                                element : <TeamBoardEdit/>
                            }
                        ]
                    },
                ]
                
            }
        ]
    },
    {
        path: "/login",
        element: <SigninPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    }
])

export default router