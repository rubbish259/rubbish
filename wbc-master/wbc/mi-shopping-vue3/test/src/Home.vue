<template>
	<div class="wp">
		<div class="search-wp">
			<router-link to="/search" class="search-link">
				<span class="icon-search"></span>
				<span class="text">搜索商品名称{{msg}}</span>
			</router-link>
			<div class="bottom"></div>
		</div>

		<div class="slider">
			<img src="./assets/img1.jpg">
		</div>

		<div class="list">
			<div class="ad">
				<img src="./assets/img2.jpg">
			</div>
			<ul class="items">
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
				<li><a href="javascript:;"><img src="./assets/img3.png"></a></li>
			</ul>
			<ul class="g-lists">
				<li v-for="list in gList">
					<div class="img-wp">
						<img src="./assets/img5.jpg">
					</div>
					<div class="detail">
						<p>{{list.name}}</p>
						<div>
							{{list.detail}}
						</div>
						<span>{{list.price}}元 起</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import $ from 'webpack-zepto';

	export default {
		data: function() {
			return {
				msg: 'test',
				gList: []
			}
		},
		/*beforeRouteEnter(to, from, next) {
			next();
		},
		beforeRouteLeave(to, from, next) {
			next();
		},*/
        mounted() {
        	this.getData();
        },
        methods: {
        	getData: function() {
        		// this
        		// let that = this;
        		let url = 'http://localhost/wbc/shopping2/api/goods_list.php?callback=?';
        		$.get(url, function(response) {
        			this.gList = response.data;
        			console.log(response);
        		}.bind(this), 'json');
        	}
        }
	}
</script>

<style>
	/*******************************************/
	html, body, ul, ol, li, p, h1, h2, h3, h4, h5, h6 {
		margin: 0;
		padding: 0;
	}

	ul, li, ol {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	/*******************************************/
	html, body, #app {
		height: 100%;
	}

	#app {
		position: relative;
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 40px;
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		border-top: 1px solid #e0e0e0;
		background-color: #fff;
	}

	.footer a {
		box-flex: 1;
		-webkit-box-flex: 1;
		display: block;
		text-align: center;
		width: 100%;
		font-size: 12px;
		color: #999;
	}

	.footer a.router-link-active {
		color: #FF5722;
	}

	.footer a[href$='/home'] i {
		background-position: 0 -126px;
	}

	.footer a[href$='/home'].router-link-active i {
		background-position: 0 -108px;
	}

	.footer a[href$='/classify'] i {
		background-position: 0 -18px;
	}

	.footer a[href$='/classify'].router-link-active i {
		background-position: 0 0px;
	}

	.footer a[href$='/cart'] i {
		background-position: 0 -53px;
	}

	.footer a[href$='/cart'].router-link-active i {
		background-position: 0 -36px;
	}

	.footer a[href$='/mine'] i {
		background-position: 0 -90px;
	}

	.footer a[href$='/mine'].router-link-active i {
		background-position: 0 -72px;
	}

	.footer i {
		background-image: url(./assets/nav.png);
		background-size: 18px;
		background-repeat: no-repeat;
		display: block;
		width: 18px;
		height: 18px;
		margin: 0 auto 2px;
	}

	.footer span {
		display: block;
	}

	/*******************************************/
	.wp {
		padding-bottom: 40px;
	}

	.search-wp {
		height: 40px;
		padding-bottom: 2px;
	}

	.search-wp .search-link {
		display: block;
		height: 32px;
		position: relative;
	}

	.search-wp .text {
		color: #9C9C9C;
		font-size: 13px;
		position: absolute;
	    top: 12px;
	    left: 35px;
	}

	.search-wp .bottom {
		border: 1px solid #E3E3E3;
		height: 5px;
		border-top: none;
		margin: 0 8px;
	}

	/*******************************************/
	.slider img {
		width: 100%;
		height: 160px;
	}

	.list:after {
		content: '';
		display: block;
		clear: both;
	}

	.list .ad {
		padding-top: 2px;
	}

	.list .ad img {
		width: 100%;
		height: 143px;
	}

	.list .items {
		overflow: hidden;
	}

	.list .items img {
		width: 103px;
		height: 136px;
	}

	.list .items li {
		float: left;
		margin: 1px 0;
	}

	.list .items li:nth-child(3n + 2) {
		margin: 1px 5px;
	}

	/************************************/
	.g-lists li {
		position: relative;
	}

	.g-lists .img-wp {
		width: 113px;
		height: 65px;
		position: absolute;
		top: 5px;
	}

	.g-lists .img-wp img {
		width: 100%;
	}

	.g-lists .detail {
		width: 200px;
    	margin-left: 116px;
	}

	.g-lists .detail p {
		font-size: 13px;
	}

	.g-lists .detail div {
		font-size: 12px;
		color: #999;
	}

	.g-lists .detail span {
		font-size: 13px;
		color: orange;
	}
</style>