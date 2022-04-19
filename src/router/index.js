import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HandymenView from '../views/HandymenView.vue'
import UserProfile from '../views/UserProfile.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateHandyman from '../views/CreateHandymanView.vue'
import RateWorker from '../views/RateWorker'
import ChangePass from '../views/ChangePass.vue'
import ChangeMail from '../views/ChangeMail.vue'
import UploadPhoto from '../views/UploadPhoto.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/handymen',
    name: 'handymen',
    component: HandymenView,
    children: [
      {
        path: ':id',
        name: 'handyman',
        component: () => import('../components/modals/WorkerProfileModal.vue'),
      },
    ],
  },
  { path: '/profile', name: 'profile', component: UserProfile },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/create', name: 'create', component: CreateHandyman },
  { path: '/rate/:workerId', name: 'rate', component: RateWorker },
  { path: '/users/avatar', name: 'avatar', component: UploadPhoto },
  {
    path: '/users/password',
    name: 'password',
    component: ChangePass,
  },
  {
    path: '/users/email',
    name: 'email',
    component: ChangeMail,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
