import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home.vue';
import Cart from './Cart.vue';
import Classify from './Classify.vue';
import Mine from './Mine.vue';

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [{
		path: '/home', component: Home, alias: ''
	}, {
		path: '/classify', component: Classify
	}, {
		path: '/cart', component: Cart
	}, {
		path: '/mine', component: Mine
	}, {
		path: '', redirect: '/home'
	}]
});

var app = new Vue({
	el: '#app',
	router: router
});