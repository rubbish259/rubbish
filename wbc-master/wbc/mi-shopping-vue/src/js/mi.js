var Foo = {template: '<div>foo</div>'};

// router
var router = new VueRouter({
	routes: [
		{path: '', redirect: '/home'},
		{path: '/foo', component: Foo}
	]
});

// vue
var app = new Vue({
	el: '#app',
	router: router
});