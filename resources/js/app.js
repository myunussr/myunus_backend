require('./bootstrap');

import Vue from 'vue/dist/vue';

window.Vue = Vue;

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

import Toasted from 'vue-toasted';
Vue.use(Toasted)

import App from './App.vue';
Vue.use(VueAxios, axios);

import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


import IndexComponent from './components/articles/Index.vue';
import CreateComponent from './components/articles/Create.vue';
import EditComponent from './components/articles/Edit.vue';
import RegisterComponent from './components/users/Register.vue';
import LoginComponent from './components/users/Login.vue';
import ForgotPasswordComponent from './components/users/ForgotPassword.vue';
import ResetPasswordComponent from './components/users/ResetPassword.vue';

const routes = [
    {
        name: 'articles',
        path: '/',
        component: IndexComponent
    },
    {
        name: 'create',
        path: '/create',
        component: CreateComponent
    },
    {
        name: 'register',
        path: '/register',
        component: RegisterComponent
    }, 
    {
        name: 'login',
        path: '/login',
        component: LoginComponent
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditComponent
    },
    {
        name: 'forgot',
        path: '/forgot-password',
        component: ForgotPasswordComponent
    },
    {
        name: 'reset',
        path: '/reset-password',
        component: ResetPasswordComponent
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');