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
    {
        id: 'route-005',
        path: '/createseller',
        component: reviews.CreateSeller,
        requiresAuth: true,
    },
    {
        id: 'route-006',
        path: '/seller/dashboard/:sellerId',
        component: reviews.AppView,
        requiresAuth: true,
    }
    
]

export default routData;
