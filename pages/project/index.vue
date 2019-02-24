<template>
	<view>
		<view class="header">
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view>
			<!-- #ifdef MP -->
			<view class="icon" @click="showDrawer">
				<uni-icon type="bars" color="#666666" :size="22"></uni-icon>
			</view>
			<!-- #endif -->
		</view>
		<view class="uni-padding-wrap" style="margin-top:30upx;word-break:break-all">
			<view class="uni-media-list">
				<view class="user-info-avater">
					<image :src="userData.avatar_url"></image>
				</view>
				<view class="uni-media-list-body ha">
					<view class="uni-media-list-text-top">{{userData.name}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{userData.login}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{userData.login}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">
						<uni-icon type="email" size="20" color="#666666"></uni-icon>
						{{' '+userData.login}}
					</view>
				</view>
			</view>
		</view>
		<uni-drawer :visible="drawerVisible" :mode="mode" @close="drawerVisible = false">
			<view class="drawer-back">
				<view class="drawer-user-avatar">
					<image :src="userData.avatar_url" mode="aspectFit" class="logoimg"></image>
					<view class="drawer-user-name">{{userData.name}}</view>
				</view>
				<view class="uni-list" style="margin-top:155rpx;">
					<view class="uni-list-cell" v-for="item in repos" :key="item.key">
						<view class="uni-list-cell-navigate" @tap="repoSelect(item.key)">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '../../components/uni-drawer.vue'
	import uniIcon from '../../components/uni-icon.vue'
	const isApp = false
	// #ifndef  MP
	isApp = true
	// #endif
	
	console.log(isApp)
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		data() {
			return {
				drawerVisible: false,
				mode: isApp ? "left" : "right",
				userData: {},
				repos: []
			}
		},
		mounted() {
			this.setUserData(() => {
				this.loadLocalRepos()
				setTimeout(this.getRepos,1500)
			})
		},
		methods: {
			setUserData(success){
				uni.getStorage({
					key: 'userdata',
					success: (res) => {
						if(res.data && res.data.login){
							this.userData = res.data
							success()
						}else {
							uni.redirectTo({
								url: '../login/index'
							});
						}
					},
					fail: () => {
						uni.redirectTo({
							url: '../login/index'
						});
					}
				});
			},
			loadLocalRepos(){
				uni.getStorage({
					key: this.userData.login+'Repos',
					success: (res) => {
						if(res.data && res.data.length > 0){
							this.setRepos(res.data)
						}
					}
				});
			},
			getRepos(){
				uni.request({
					url: this.userData.repos_url,
					success: (res) => {
						if(res && res.data && res.data.length > 0){
							uni.setStorage({
								key: this.userData.login+'Repos',
								data: res.data
							});
							this.setRepos(res.data)
						}else{
							uni.showToast({title:"居然没有获取到项目！", icon:'none'})
						}
					},
					fail: (data) => {
						uni.showToast({title:"获取项目好像有问题！", icon:'none'})
					}
				})
			},
			setRepos(data) {
				data.forEach((item) => {
					this.repos.push({
						name: item.name,
						key: item.clone_url
					})
				});
			},
			repoSelect(key){
				uni.showToast({title:key, icon:'none'})
			},
			showDrawer() {
				this.drawerVisible = true;
			},
			item1() {
				this.drawerVisible = false;
				uni.showToast({
					title: 'item1'
				});
			},
			item2() {
				this.drawerVisible = false;
				uni.showToast({
					title: 'item2'
				});
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.drawerVisible = !this.drawerVisible
		},
		onBackPress() {
			// 返回按钮监听
			if (this.drawerVisible) {
				this.drawerVisible = false;
				return true;
			}
		}
	}
</script>

<style>
	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}
	
	.drawer-back{
		background: #222222;
		height: 100% !important;
		overflow-y:auto;
	}
	.user-info-avater {
		height:180rpx;
		width:180rpx;
		margin-right:35rpx;
	}
	.ha{
		height: auto !important;
	}
	.user-info-avater image{
		height:100%;
		width:100%;
	}

	.drawer-user-avatar{
		height: 155rpx;
		width: 100%;
		background: #323232;
		position: absolute;
		z-index: 999;
		top:0;
	}
	
	.logoimg {
		width: 125rpx;
		height: 125rpx;
		margin: 15rpx;
		margin-left: 50rpx;
		border-radius: 50%;
		float: left;
	}
	
	.drawer-user-name{
		color: white;
		float: left;
		margin:50rpx;
	}
	
	.uni-list{
		background-color: transparent;
		color: white;
	}
	.uni-list-cell view{
		line-height:48rpx;
	}
	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
</style>
