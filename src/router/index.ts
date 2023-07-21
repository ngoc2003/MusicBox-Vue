import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaylistView from '../views/PlaylistView.vue'
import AlbumView from '../views/AlbumView.vue'
import LoginView from '../views/LoginView.vue'
import CallBackView from '../views/CallBackView.vue'
import ArtistView from '../views/ArtistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallBackView
    },
    {
      path: '/artist/:artistId',
      name: 'artist-song',
      component: ArtistView
    },
    {
      path: '/playlist/:playlistId',
      name: 'playlist',
      component: PlaylistView
    },
    {
      path: '/album/:albumId',
      name: 'album',
      component: AlbumView
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/category/:categoryId',
      name: 'category-detail',
      component: () => import('../views/CategoryDetailView.vue')
    },
    {
      path: '/like',
      name: 'me-like',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
