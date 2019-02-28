<template>
	<view style="height: 100%;">
	<view style="width: 100%;height: 200upx;position: fixed;top:0;left: 0;background: red;">
		
	</view>
	<scroll-view :scroll-y="scrollInfo.isPageScroll" lower-threshold="5"
	class="scroll-Y" @scrolltolower="pageScrollToLower" style="height: 100%;width: 100%;">
		<!-- #ifdef MP || H5 -->
		<view class="header">
			<view class="logo-white-view">
				<image src="../../static/img/common/git_logo.svg"></image>
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
					<view class="uni-card-content-inner user-info-date">
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
						
						<swiper class="swiper" :style="{'height': swiperHeight}">
							<swiper-item>
								<scroll-view :scroll-top="scrollInfo.eventScrollTop" :scroll-y="scrollInfo.isEventScroll" 
									upper-threshold="20"
									class="scroll-Y" @scrolltoupper="eventScrollToUpper" style="height: 100%;width: 100%;">
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
													<text>{{item.subEvent ? '\n'+item.subEvent : ""}}</text>
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</swiper-item>
							<swiper-item>
								<scroll-view :scroll-top="scrollInfo.eventScrollTop" :scroll-y="scrollInfo.isEventScroll" 
									upper-threshold="20"
									class="scroll-Y" @scrolltoupper="eventScrollToUpper" style="height: 100%;width: 100%;">
									<view class="uni-list">
										<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="item in repos" :key="item.key">
											<view class="uni-list-cell-navigate" @tap="repoSelect(item.key)">
												<label class="repos-title">
													{{item.name}}
												</label>
												<label class="repos-description">
													{{item.description}}
												</label>
												<view class="repos-other">
													<view class="language-circle" :style="{background:item.color}"></view>
													<label class="repos-language">
														{{item.language}}
													</label>
													<label class="repos-language">
														更新于{{item.updatedAtDescription}}
													</label>
												</view>
												<label v-if="item.license!=''" class="repos-license">
													<svg fill="currentColor" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7 4c-.83 0-1.5-.67-1.5-1.5S6.17 1 7 1s1.5.67 1.5 1.5S7.83 4 7 4zm7 6c0 1.11-.89 2-2 2h-1c-1.11 0-2-.89-2-2l2-4h-1c-.55 0-1-.45-1-1H8v8c.42 0 1 .45 1 1h1c.42 0 1 .45 1 1H3c0-.55.58-1 1-1h1c0-.55.58-1 1-1h.03L6 5H5c0 .55-.45 1-1 1H3l2 4c0 1.11-.89 2-2 2H2c-1.11 0-2-.89-2-2l2-4H1V5h3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1h3v1h-1l2 4zM2.5 7L1 10h3L2.5 7zM13 10l-1.5-3-1.5 3h3z"></path></svg>
													{{item.license}}
												</label>
											</view>
										</view>
									</view>
								</scroll-view>
							</swiper-item>
						</swiper>
						
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
							<view class="uni-list" style="margin-top:153upx;">
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
	</scroll-view>
	</view>
</template>

<script>
	import uniDrawer from '../../components/uni-drawer.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import util from '../../common/util.js'
	let authorization = ""
		uni.getStorage({
			key: 'Authorization',
			success: (res) => {
				authorization = res.data
			}
		});
	let isApp = false
	const systemInfo = uni.getSystemInfoSync()
	let swiperHeight = (systemInfo.windowHeight-87)+"px"
	console.log(systemInfo)
	
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
				scrollInfo: {
					eventScrollTop: 0,
					isEventScroll: false,
					isPageScroll: true
				},
				mode: "right",//isApp ? "left" : "right",
				userData: {},
				repos: [],
				events: [],
				swiperHeight: swiperHeight
			}
		},
		mounted() {
			this.setUserData(() => {
				this.loadLocalData()
				setTimeout(() => {
					this.getRepos()
					this.getEvents()
				},1500)
				this.userData.created_at = util.UTCStrToDateStr(this.userData.created_at)
				this.userData.updated_at = util.UTCStrToDateStr(this.userData.updated_at)
			})
	// #ifdef H5
	let headerHeight = document.getElementsByClassName("header")[0].offsetHeight
	let windowTop = document.getElementsByClassName("uni-page-head")[0].offsetHeight
	this.swiperHeight = (systemInfo.windowHeight-headerHeight-windowTop-(systemInfo.windowHeight*0.015))+"px"//
	// #endif
		},
		methods: {
			eventScrollToUpper(e){
				this.scrollInfo.isPageScroll = true
				this.scrollInfo.isEventScroll = false
			},
			pageScrollToLower(e){
				this.scrollInfo.isEventScroll = true
				this.scrollInfo.isPageScroll = false
				this.scrollInfo.eventScrollTop = 10
			},
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
					let lastEvent = null
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
							if (lastEvent && lastEvent.updateDate == thisEvent.updateDate && 
								lastEvent.event == thisEvent.event && 
								lastEvent.subEvent == thisEvent.subEvent ){
									isEquls = true
								}
							lastEvent = thisEvent
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
							key: item.clone_url,
							description: item.description,
							language: item.language,
							forksCount: item.forks_count,
							starCount: item.stargazers_count,
							updatedAt: item.updated_at,
							updatedAtDescription: util.UTCStrToDescription(item.pushed_at),
							fork: item.fork,
							color: util.languageToColor(item.language),
							license: item.license ? item.license.name : ''
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
		padding-bottom: 5upx;
		align-items: center;
		background: #323232;
		width:100%;
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		z-index: 2;
	}
	.uni-padding-wrap{
		padding: 0;
		height: 100%;
		width: 100%;
		/* #ifdef H5 */
		margin-top: 80upx;
		/* #endif */
		/* overflow-y:auto; */
	}
	.uni-padding-wrap .uni-card:first-child{
		/* #ifdef MP */
		margin-top: 90upx;
		/* #endif */
	}
	.uni-padding-wrap .uni-card{
		margin-left:30rpx;
		margin-right:30rpx;
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
		height:180upx;
		width:180upx;
		margin-right:35upx;
	}
	.ha{
		height: auto !important;
	}
	.user-info-avater image{
		height:100%;
		width:100%;
	}

	.drawer-user-avatar{
		height: 155upx;
		width: 100%;
		background: #323232;
		border-bottom: 1upx solid #C8C9CA;
		position: absolute;
		z-index: 999;
		top:0;
	}
	
	.logoimg {
		width: 125upx;
		height: 125upx;
		margin: 15upx;
		margin-left: 50upx;
		border-radius: 50%;
		float: left;
	}
	
	.drawer-user-name{
		color: #C8C9CA;
		float: left;
		margin:50upx;
	}
	
	.media-user-name {
		font-size:35upx;
		font-weight:900;
		margin-top:5upx;
	}

	.uni-media-list {
		padding: 0 !important;
	}
	.uni-list{
		background-color: transparent;
		color: #C8C9CA;
	}
	.swiper .uni-list::before{
		/* background-color: transparent; */
		left: 30upx;
	}
	.swiper .uni-list::after{
		/* background-color: transparent; */
		left: 30upx;
	}
	.uni-list-cell view{
		line-height:48upx;
	}
	.uni-list-cell-hover{
		background-color: #e6f3fd8f;
	}
	.uni-list-cell-hover .uni-label{
		background-color: transparent;
	}
	.logo-white-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		height: 60upx;
		padding: 0 5upx;
		flex: 1;
	}
	.logo-white-view image{
		width: 65upx;
		height: 65upx;
		margin:0 auto;
	}
	.logo-white-view .icon{
		position: absolute;
		right: 10upx;
	}
	.user-info-date .uni-title:first-child{
		padding-top: 0;
	}
	.user-info-date .uni-title:last-child{
		padding-bottom: 0;
	}
	.uni-timeline-last-item .uni-timeline-item-divider {
		background-color:#BBB;
	}
	.uni-timeline-first-item .uni-timeline-item-divider {
		background-color:#1AAD19;
	}
	
	.uni-card .repos-title {
		color: #007AFF;
		font-size: 36upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		display: block;
	}
	.uni-card .repos-description {
		color: black;
		font-size: 30upx;
		font-weight: lighter;
	}
	.uni-card .repos-other {
		margin-top: 10upx;
		display: flex;
	}
	.uni-card .repos-other .language-circle{
		width: 20upx;
		height: 20upx;
		border-radius: 50%;
		margin: auto 0;
	}
	.uni-card .repos-other .repos-language{
		margin-left: 20upx;
		color: black;
		font-size: 26upx;
		font-weight: lighter;
		padding-top: 5upx;
	}
	.uni-card .repos-license{
		color: black;
		font-size: 20upx;
		font-weight: lighter;
	}
	.uni-card .repos-license svg{
		margin-right: 16upx;
	}
	
	.uni-list-cell-navigate{
		display: block;
	}
	.input {
		flex: 1;
		padding: 0 5upx;
		height: 24upx;
		line-height: 24upx;
		font-size: 16upx;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10upx;
	}
</style>
