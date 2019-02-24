<template>
	<view>
		<!-- #ifdef MP -->
		<view class="header">
			<view class="logo-white-view">
				<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTUxMDI1OTQzNDgwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk1MC45MzAyODYgNTEycTAgMTQzLjQzMzE0My04My43NDg1NzEgMjU3Ljk3NDg1N3QtMjE2LjI4MzQyOSAxNTguNTczNzE0cS0xNS40MzMxNDMgMi44NTI1NzEtMjIuNjAxMTQzLTQuMDIyODU3dC03LjE2OC0xNy4xMTU0MjlsMC0xMjAuNTM5NDI5cTAtNTUuNDQyMjg2LTI5LjY5Ni04MS4xMTU0MjkgMzIuNTQ4NTcxLTMuNDM3NzE0IDU4LjU4NzQyOS0xMC4zMTMxNDN0NTMuNjg2ODU3LTIyLjMwODU3MSA0Ni4yOTk0MjktMzguMDM0Mjg2IDMwLjI4MTE0My01OS45NzcxNDMgMTEuNzAyODU3LTg2LjAxNnEwLTY5LjEyLTQ1LjEyOTE0My0xMTcuNjg2ODU3IDIxLjEzODI4Ni01Mi4wMDQ1NzEtNC41MzQ4NTctMTE2LjU4OTcxNC0xNi4wMTgyODYtNS4xMi00Ni4yOTk0MjkgNi4yOTAyODZ0LTUyLjU4OTcxNCAyNS4xNjExNDNsLTIxLjcyMzQyOSAxMy42Nzc3MTRxLTUzLjE3NDg1Ny0xNC44NDgtMTA5LjcxNDI4Ni0xNC44NDh0LTEwOS43MTQyODYgMTQuODQ4cS05LjE0Mjg1Ny02LjI5MDI4Ni0yNC4yODM0MjktMTUuNDMzMTQzdC00Ny42ODkxNDMtMjIuMDE2LTQ5LjE1Mi03LjY4cS0yNS4xNjExNDMgNjQuNTg1MTQzLTQuMDIyODU3IDExNi41ODk3MTQtNDUuMTI5MTQzIDQ4LjU2Njg1Ny00NS4xMjkxNDMgMTE3LjY4Njg1NyAwIDQ4LjU2Njg1NyAxMS43MDI4NTcgODUuNzIzNDI5dDI5Ljk4ODU3MSA1OS45NzcxNDMgNDYuMDA2ODU3IDM4LjI1MzcxNCA1My42ODY4NTcgMjIuMzA4NTcxIDU4LjU4NzQyOSAxMC4zMTMxNDNxLTIyLjgyMDU3MSAyMC41NTMxNDMtMjguMDEzNzE0IDU4Ljg4LTExLjk5NTQyOSA1LjcwNTE0My0yNS43NDYyODYgOC41NTc3MTR0LTMyLjU0ODU3MSAyLjg1MjU3MS0zNy40NDkxNDMtMTIuMjg4LTMxLjc0NC0zNS42OTM3MTRxLTEwLjgyNTE0My0xOC4yODU3MTQtMjcuNzIxMTQzLTI5LjY5NnQtMjguMzA2Mjg2LTEzLjY3NzcxNGwtMTEuNDEwMjg2LTEuNjgyMjg2cS0xMS45OTU0MjkgMC0xNi42MDM0MjkgMi41NnQtMi44NTI1NzEgNi41ODI4NTcgNS4xMiA3Ljk3MjU3MSA3LjQ2MDU3MSA2Ljg3NTQyOWw0LjAyMjg1NyAyLjg1MjU3MXExMi41ODA1NzEgNS43MDUxNDMgMjQuODY4NTcxIDIxLjcyMzQyOXQxNy45OTMxNDMgMjkuMTEwODU3bDUuNzA1MTQzIDEzLjE2NTcxNHE3LjQ2MDU3MSAyMS43MjM0MjkgMjUuMTYxMTQzIDM1LjEwODU3MXQzOC4yNTM3MTQgMTcuMTE1NDI5IDM5LjcxNjU3MSA0LjAyMjg1NyAzMS43NDQtMS45NzQ4NTdsMTMuMTY1NzE0LTIuMjY3NDI5cTAgMjEuNzIzNDI5IDAuMjkyNTcxIDUwLjgzNDI4NnQwLjI5MjU3MSAzMC44NjYyODZxMCAxMC4zMTMxNDMtNy40NjA1NzEgMTcuMTE1NDI5dC0yMi44MjA1NzEgNC4wMjI4NTdxLTEzMi41MzQ4NTctNDQuMDMyLTIxNi4yODM0MjktMTU4LjU3MzcxNHQtODMuNzQ4NTcxLTI1Ny45NzQ4NTdxMC0xMTkuNDQyMjg2IDU4Ljg4LTIyMC4zMDYyODZ0MTU5Ljc0NC0xNTkuNzQ0IDIyMC4zMDYyODYtNTguODggMjIwLjMwNjI4NiA1OC44OCAxNTkuNzQ0IDE1OS43NDQgNTguODggMjIwLjMwNjI4NnoiIHAtaWQ9IjExMDEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD48L3N2Zz4="></image>
				<view class="icon" @click="showDrawer">
					<uni-icon type="bars" color="#C8C9CA" :size="22"></uni-icon>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="uni-padding-wrap" style="word-break:break-all;background: #FAFBFC;padding:16rpx 30rpx;border-bottom:1px #E9ECEF solid;">
			<view class="uni-media-list">
				<view class="user-info-avater">
					<image :src="userData.avatar_url"></image>
				</view>
				<view class="uni-media-list-body ha">
					<view class="uni-media-list-text-top media-user-name">{{userData.name}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{userData.login}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{userData.login}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">
						<uni-icon type="email" size="20" color="#666666"></uni-icon>
						{{' '+userData.email}}
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
		padding-bottom: 5px;
		align-items: center;
		background: #323232;
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
		color: #C8C9CA;
		float: left;
		margin:50rpx;
	}
	
	.media-user-name {
		font-size:35rpx;
		font-weight:900;
		margin-top:5rpx;
	}

	
	.uni-list{
		background-color: transparent;
		color: #C8C9CA;
	}
	.uni-list-cell view{
		line-height:48rpx;
	}
	.logo-white-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		height: 60rpx;
		padding: 0 5px;
		flex: 1;
	}
	.logo-white-view image{
		width: 65rpx;
		height: 65rpx;
		margin:0 auto;
	}
	.logo-white-view .icon{
		position: absolute;
		right: 10px;
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
