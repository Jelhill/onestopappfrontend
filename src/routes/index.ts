import * as reviews from '../pages';

const routData = [
    {
        id: 'route-001',
        path: '/',
        component: reviews.LandingPage,
        requiresAuth: false,
    },
    {
        id: 'route-002',
        path: '/login',
        component: reviews.Login,
        requiresAuth: false,
    },
    {
        id: 'route-003',
        path: '/signup',
        component: reviews.Signup,
        requiresAuth: false,
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
    },
    {
        id: 'route-007',
        path: '/page-not-found',
        component: reviews.NotFound,
        requiresAuth: false,
    },
    {
        id: 'route-008',
        path: '/unauthorized',
        component: reviews.Unauthorized,
        requiresAuth: false,
    },
    {
        id: 'route-009',
        path: '/cart',
        component: reviews.Cart,
        requiresAuth: true,
    }
    
]

export default routData;
