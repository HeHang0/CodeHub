<template>
	<view class="cell">
		<view>
			<view class="logoview is-margin10 is-margin-buttom-100">
				<image v-bind:src="loginimg" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content" :class="{'content-loaded': login.loaded}">
			<view>
				<view class="is-margin15">
					<input v-bind:readonly="login.loading" v-model="login.username" placeholder="用户名" class="is-input"/>
				</view>
				<view class="is-margin15">
					<input v-bind:readonly="login.loading" type="password" v-model="login.password" placeholder="密码" class="is-input"/>
				</view>

				<view class="loginbtn is-margin15">
					<button :loading="login.loading" @tap="handlerLogin"> {{ login.loading ? "登录中...":"登 录"}} </button>
				</view>

				<view class="is-margin15" style="height: 88upx;">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { Base64 } from 'js-base64'

	export default {
		data() {
			return {
				login: {
					loading: false,
					username:"",
					password:"",
					loaded: false
				},
				loginimg: "../../static/img/common/logo.png"
			};
		},
		methods:{
			handlerLogin:function(){
				if(this.login.username == "" || 
					this.login.password == ""){
						uni.showToast({title:"没有输入呀！", icon:'none'})
						return
					}
				this.login.loading = true
				let authorization = 'Basic '+Base64.encode(`${this.login.username}:${this.login.password}`)
				uni.request({
					url: 'https://api.github.com/user',
					header: {
						'Authorization': authorization,
					},
					success: (res) => {
						if(res && res.data && res.data.login){
							this.loginimg = res.data.avatar_url
							uni.setStorage({
								key: 'Authorization',
								data: authorization
							});
							uni.setStorage({
								key: 'userdata',
								data: res.data,
								success: function () {
									uni.redirectTo({
										url: '../project/index'
									});
								},
								fail: () => {
									uni.showToast({title:"不知道为什么出错了！", icon:'none'})
								}
							});
						}else{
							uni.showToast({title:"输错了吧，没成功！", icon:'none'})
						}
					},
					fail: (data) => {
						uni.showToast({title:"输错了吧，没成功！", icon:'none'})
					},
					complete: (data) => {
						this.login.loading = false
					}
				})
			}
		},
		mounted() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			if(page.options && page.options.logout) {
				this.login.loaded = true
				uni.clearStorage()
				return
			}
			uni.getStorage({
				key: 'userdata',
				success: (res) => {
					if(res && res.data && res.data.login){
						uni.redirectTo({
							url: '../project/index'
						});
					}else {
						setTimeout(() => {
							this.login.loaded = true
						},1000)
					}
				},
				fail: () => {
					setTimeout(() => {
						this.login.loaded = true
					},1000)
				}
			});
		}
	}
</script>

<style>
	page {
		height: 100%;
		background-color: #FFFFFF;
		display: table;
	}
	.cell{
		display: table-cell;
		vertical-align: middle;
	}
	.content {
		width: 85%;
		margin: 0 auto;
		height: 0;
		opacity: 0;
		transition: height 2s, opacity 2s linear 0.1s;
	}
	.content-loaded{
		height: 444upx !important;
		opacity: 1 !important;
	}
	.loginbtn button {
		margin-top: 20upx;
		height: 88upx;
		width: 100%;
		line-height: 88upx;
		color: #ffffff;
		font-size: 32upx;
		border-radius: 44upx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #24292e;
		opacity: 0.8;
	}

	button:after {
		border: 2upx solid #f2f2f2;
	}

	.logoview{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.logoimg {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}
	
	.is-margin15{
		margin: 30upx 0;
	}
	.is-margin-buttom-100{
		margin-bottom: 100upx;
	}
	

	.is-input {
		height: 80%;
		width: 100%;
		line-height: 80%;
		padding: 12upx;
		color: #353535;
		font-size: 32upx;
		box-sizing: border-box;
		appearance: none;
		border: 2upx solid #24292e;
		box-shadow: none;
		border-radius: 44upx;
		outline: 0;
		display: block;
		padding-left: 30upx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
</style>
