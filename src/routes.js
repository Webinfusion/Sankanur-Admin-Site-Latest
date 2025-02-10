import LoginPage from "./components/LoginPage/LoginPage";
import Companies from "./components/Companies/Companies";
import PostEventNew from "./components/PostEventNew/PostEventNew";
import PreEventNew from "./components/PreEventNew/PreEventNew";
import PostEventTable from "./components/PostEventTable/PostEventTable";
import PretEventTable from "./components/PreEventTable/PreEventTable";

const routerData = [
    {
        name: '*',
        path: '*',
        component: <LoginPage/>
    },
    {
        name: 'Login',
        path: '/login',
        component: <LoginPage/>
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: <Companies/>
    },
    {
        name: 'Home Page',
        path: '/nursing/home',
        component: <>Nursing Home Page</>
    },
    {
        name: 'About Us',
        path: '/nursing/aboutus',
        component: <>Nursing About Us</>,
        divider: true
    },
    {
        name: 'Pre Event New',
        path: '/nursing/pre-event-new',
        component: <PreEventNew propsData={false}/>
    },
    {
        name: 'Pre Event Table',
        path: '/nursing/pre-event-table',
        component: <PretEventTable/>,
        divider: true
    },
    {
        name: null,
        path: '/nursing/pre-event-update',
        component: <PreEventNew propsData={true}/>
    },
    {
        name: 'Post Event New',
        path: '/nursing/post-event-new',
        component: <PostEventNew propsData={false}/>
    },
    {
        name: 'Post Event Table',
        path: '/nursing/post-event-table',
        component: <PostEventTable/>
    },
    {
        name: null,
        path: '/nursing/post-event-update',
        component: <PostEventNew propsData={true}/>
    },
]

export {routerData}