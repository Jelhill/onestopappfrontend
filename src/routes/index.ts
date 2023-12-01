import * as reviews from '../pages';

const routData = [
    {
        id: 'route-001',
        path: '/',
        component: reviews.LandingPage,
        requiresAuth: true,
    },
    {
        id: 'route-002',
        path: '/login',
        component: reviews.Login,
        requiresAuth: true,
    },
    {
        id: 'route-003',
        path: '/signup',
        component: reviews.Signup,
        requiresAuth: true,
    },
    {
        id: 'route-004',
        path: '/carupload',
        component: reviews.CarUpload,
        requiresAuth: true,
    },   
    // {
    //     id: 'route-001',
    //     path: '/user/dashboard/uploads',
    //     component: reviews.Uploads,
    //     requiresAuth: true,
    // }
]

export default routData;
