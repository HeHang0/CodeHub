<template>
	<view>
		<!-- #ifdef MP -->
		<view class="header">
			<view class="logo-white-view">
				<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTUxMDI1OTQzNDgwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk1MC45MzAyODYgNTEycTAgMTQzLjQzMzE0My04My43NDg1NzEgMjU3Ljk3NDg1N3QtMjE2LjI4MzQyOSAxNTguNTczNzE0cS0xNS40MzMxNDMgMi44NTI1NzEtMjIuNjAxMTQzLTQuMDIyODU3dC03LjE2OC0xNy4xMTU0MjlsMC0xMjAuNTM5NDI5cTAtNTUuNDQyMjg2LTI5LjY5Ni04MS4xMTU0MjkgMzIuNTQ4NTcxLTMuNDM3NzE0IDU4LjU4NzQyOS0xMC4zMTMxNDN0NTMuNjg2ODU3LTIyLjMwODU3MSA0Ni4yOTk0MjktMzguMDM0Mjg2IDMwLjI4MTE0My01OS45NzcxNDMgMTEuNzAyODU3LTg2LjAxNnEwLTY5LjEyLTQ1LjEyOTE0My0xMTcuNjg2ODU3IDIxLjEzODI4Ni01Mi4wMDQ1NzEtNC41MzQ4NTctMTE2LjU4OTcxNC0xNi4wMTgyODYtNS4xMi00Ni4yOTk0MjkgNi4yOTAyODZ0LTUyLjU4OTcxNCAyNS4xNjExNDNsLTIxLjcyMzQyOSAxMy42Nzc3MTRxLTUzLjE3NDg1Ny0xNC44NDgtMTA5LjcxNDI4Ni0xNC44NDh0LTEwOS43MTQyODYgMTQuODQ4cS05LjE0Mjg1Ny02LjI5MDI4Ni0yNC4yODM0MjktMTUuNDMzMTQzdC00Ny42ODkxNDMtMjIuMDE2LTQ5LjE1Mi03LjY4cS0yNS4xNjExNDMgNjQuNTg1MTQzLTQuMDIyODU3IDExNi41ODk3MTQtNDUuMTI5MTQzIDQ4LjU2Njg1Ny00NS4xMjkxNDMgMTE3LjY4Njg1NyAwIDQ4LjU2Njg1NyAxMS43MDI4NTcgODUuNzIzNDI5dDI5Ljk4ODU3MSA1OS45NzcxNDMgNDYuMDA2ODU3IDM4LjI1MzcxNCA1My42ODY4NTcgMjIuMzA4NTcxIDU4LjU4NzQyOSAxMC4zMTMxNDNxLTIyLjgyMDU3MSAyMC41NTMxNDMtMjguMDEzNzE0IDU4Ljg4LTExLjk5NTQyOSA1LjcwNTE0My0yNS43NDYyODYgOC41NTc3MTR0LTMyLjU0ODU3MSAyLjg1MjU3MS0zNy40NDkxNDMtMTIuMjg4LTMxLjc0NC0zNS42OTM3MTRxLTEwLjgyNTE0My0xOC4yODU3MTQtMjcuNzIxMTQzLTI5LjY5NnQtMjguMzA2Mjg2LTEzLjY3NzcxNGwtMTEuNDEwMjg2LTEuNjgyMjg2cS0xMS45OTU0MjkgMC0xNi42MDM0MjkgMi41NnQtMi44NTI1NzEgNi41ODI4NTcgNS4xMiA3Ljk3MjU3MSA3LjQ2MDU3MSA2Ljg3NTQyOWw0LjAyMjg1NyAyLjg1MjU3MXExMi41ODA1NzEgNS43MDUxNDMgMjQuODY4NTcxIDIxLjcyMzQyOXQxNy45OTMxNDMgMjkuMTEwODU3bDUuNzA1MTQzIDEzLjE2NTcxNHE3LjQ2MDU3MSAyMS43MjM0MjkgMjUuMTYxMTQzIDM1LjEwODU3MXQzOC4yNTM3MTQgMTcuMTE1NDI5IDM5LjcxNjU3MSA0LjAyMjg1NyAzMS43NDQtMS45NzQ4NTdsMTMuMTY1NzE0LTIuMjY3NDI5cTAgMjEuNzIzNDI5IDAuMjkyNTcxIDUwLjgzNDI4NnQwLjI5MjU3MSAzMC44NjYyODZxMCAxMC4zMTMxNDMtNy40NjA1NzEgMTcuMTE1NDI5dC0yMi44MjA1NzEgNC4wMjI4NTdxLTEzMi41MzQ4NTctNDQuMDMyLTIxNi4yODM0MjktMTU4LjU3MzcxNHQtODMuNzQ4NTcxLTI1Ny45NzQ4NTdxMC0xMTkuNDQyMjg2IDU4Ljg4LTIyMC4zMDYyODZ0MTU5Ljc0NC0xNTkuNzQ0IDIyMC4zMDYyODYtNTguODggMjIwLjMwNjI4NiA1OC44OCAxNTkuNzQ0IDE1OS43NDQgNTguODggMjIwLjMwNjI4NnoiIHAtaWQ9IjExMDEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD48L3N2Zz4="></image>
				<view class="icon" @click="drawer.visible = true">
					<uni-icon type="bars" color="#C8C9CA" :size="22"></uni-icon>
				</view>
			</view>
		</view>
		<!-- #endif -->
		
		<view class="uni-padding-wrap">
			<view class="uni-card">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
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
				</view>
			</view>
			<view class="uni-card">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						<view class="uni-title">
							创建时间：
							<text>{{userData.created_at}}</text>
						</view>
						<view class="uni-title">
							更新时间：
							<text>{{userData.updated_at}}</text>
						</view>
						<view class="uni-title">
							空间占用：
							<text>{{userData.disk_usage}} KB</text>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-card">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						<view class="uni-timeline list-view">
							<view class="uni-timeline-item list-item" 
							:class="{'uni-timeline-first-item': (index==0 ? true : false),
									'uni-timeline-last-item': (index==events.length-1 ? true : false)}" 
								v-for="(item, index) in events" :key="item.id">
								<view class="uni-timeline-item-keynode">{{item.updateDate}}</view>
								<view class="uni-timeline-item-divider"></view>
								<view class="uni-timeline-item-content">
									<view class="uni-title">
										【{{item.type}}】{{item.event}}
										\n<text>{{item.subEvent ? '\n'+item.subEvent : ""}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-drawer :visible="drawer.visible" :mode="mode" @close="drawer.visible = false">
			<movable-area style="height: 100%;width:200%;">
				<movable-view class="drawer-back" style="width: 50%;" :x="drawer.x" animation="false" @touchend="drawerTouchend" :disabled="drawer.disabled" direction="horizontal" @change="drawerHTouchmove">
						<view class="drawer-user-avatar">
							<image :src="userData.avatar_url" mode="aspectFit" class="logoimg"></image>
							<view class="drawer-user-name">{{userData.name}}</view>
							<br />
							<text @tap="logOut" style="color:#FFFFFF6F;">注销</text>
						</view>
						<scroll-view scroll-y style="height: 100%;">
							<view class="uni-list" style="margin-top:153rpx;">
								<view class="uni-list-cell" v-for="item in repos" :key="item.key">
									<view class="uni-list-cell-navigate" @tap="repoSelect(item.key)">
										{{item.name}}
									</view>
								</view>
							</view>
						</scroll-view>
				</movable-view>
			</movable-area>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '../../components/uni-drawer.vue'
	import uniIcon from '../../components/uni-icon.vue'
	let authorization = ""
		uni.getStorage({
			key: 'Authorization',
			success: (res) => {
				console.info(res)
				authorization = res.data
			},
			complete() {
				console.log(authorization)
			}
		});
	const isApp = false
	// #ifndef  MP
	isApp = true
	// #endif
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		data() {
			return {
				drawer: {
					visible: false,
					x: 0,
					oldx: 0,
					disabled: false,
					needClose: false
				},
				mode: isApp ? "left" : "right",
				userData: {},
				repos: [],
				events: []
			}
		},
		mounted() {
			this.setUserData(() => {
				this.loadLocalData()
				setTimeout(() => {
					this.getRepos()
					this.getEvents()
				},1500)
				this.userData.created_at = this.userData.created_at.replace('T', ' ').replace('Z', '')
				this.userData.updated_at = this.userData.updated_at.replace('T', ' ').replace('Z', '')
			})
		},
		methods: {
			drawerHTouchmove(e){
				this.drawer.oldx = e.detail.x
				if(e.detail.x > 50){
					this.drawer.needClose = true
				}else{
					this.drawer.needClose = false
				}
			},
			drawerTouchend(w){
				if(this.drawer.needClose){
					this.drawer.needClose = false
					this.drawer.x = this.drawer.oldx
					this.drawer.visible = false
						setTimeout(() => {
							this.drawer.x = 0
						}, 550)
				}else{
					this.drawer.x = this.drawer.oldx
					setTimeout(() => {
						this.drawer.x = 0
					}, 100)
				}
			},
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
			loadLocalData(){
				uni.getStorage({
					key: this.userData.login+'Repos',
					success: (res) => {
						if(res.data && res.data.length > 0){
							this.setRepos(res.data)
						}
					}
				});
				uni.getStorage({
					key: this.userData.login+'Events',
					success: (res) => {
						if(res.data && res.data.length > 0){
							this.setEvents(res.data)
						}
					}
				});
			},
			getEvents(callback){
				uni.request({
					url: this.userData.events_url.replace("{/privacy}", ""),
					header: {
						'Authorization': authorization
					},
					success: (res) => {
						if(res && res.data && res.data.length > 0){
							uni.setStorage({
								key: this.userData.login+'Events',
								data: res.data
							});
							this.setEvents(res.data)
							callback && callback.success && callback.success()
						}else{
							uni.showToast({title:"居然没有获取到事件！", icon:'none'})
							callback && callback.fail && callback.fail()
						}
					},
					fail: (data) => {
						uni.showToast({title:"获取事件好像有问题！", icon:'none'})
						callback && callback.fail && callback.fail()
					},
					complete() {
						callback && callback.complete && callback.complete()
					}
				})
			},
			setEvents(data){
				if(data && data instanceof Array){
					var events = []
					data.forEach((item) => {
						var type = ""
						var subEvent = ""
						switch(item.type){
							case "WatchEvent":
								type = "查看"
								subEvent = item.payload.description
								break;
							case "CreateEvent":
								type = "创建"
								subEvent = item.payload.description
								break;
							case "PushEvent":
								type = "推送"
								subEvent = item.payload.commits[0].message
								break;
							case "ForkEvent":
								type = "Fork"
								subEvent = item.payload.forkee.description
								break;
							default:
								break
						}
						let thisEvent = {
								key: item.id,
								updateDate: item.created_at.substring(2,10),
								type: type,
								event: item.repo.name ? item.repo.name.replace(/^\s+|\s+$/gm,'') : "",
								subEvent: subEvent ? subEvent.replace(/^\s+|\s+$/gm,'') : ""
							}
						let isEquls = false;
						if(this.events.length > 0){
							let lastEvent = this.events[this.events.length - 1]
							if (lastEvent.updateDate == thisEvent.updateDate && 
								lastEvent.event == thisEvent.event && 
								lastEvent.subEvent == thisEvent.subEvent ){
									isEquls = true
								}
						}
						if (type != "" && !isEquls) {
							events.push(thisEvent)
						}
					});
					this.events.splice(0, this.events.length)
					this.events = events
				}
			},
			getRepos(){
				uni.request({
					url: this.userData.repos_url,
					header: {
						'Authorization': authorization
					},
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
				if (data && data instanceof Array){
					let repos = []
					data.forEach((item) => {
						repos.push({
							name: item.name,
							key: item.clone_url
						})
					});
					this.repos.splice(0, this.repos.length)
					this.repos = repos
				}
			},
			repoSelect(key){
				uni.showToast({title:key, icon:'none'})
			},
			logOut(){
				uni.redirectTo({url: '../login/index?logout=true'});
			}
		},
		onPullDownRefresh() {
			this.getEvents({
				fail: () => {
					uni.showToast({title:'刷新失败了！', icon:'none'})
				},
				complete: () => {
					uni.stopPullDownRefresh();
				}
			})
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
		position: fixed;
		display: flex;
		flex-direction: row;
		padding-bottom: 5px;
		align-items: center;
		background: #323232;
		width:100%;
		top:0;
		z-index: 2;
	}
	.uni-padding-wrap{
		padding:16rpx 30rpx;
		margin-top: 65rpx;
		/* #ifdef MP */
		height:calc(100% - 100rpx);
		/* #endif */
		/* #ifndef MP */
		height:100%;
		/* #endif */
		overflow-y:auto;
	}
	.uni-drawer-content{
		background: transparent !important;
	}
	.drawer-back{
		background: #222222;
		height: 100% !important;
		/* width:100% !important; */
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
		border-bottom: 1upx solid #C8C9CA;
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
	.uni-timeline-last-item .uni-timeline-item-divider {
		background-color:#BBB;
	}
	.uni-timeline-first-item .uni-timeline-item-divider {
		background-color:#1AAD19;
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
