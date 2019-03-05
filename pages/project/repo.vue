<template>
	<view class="page">
			<view class="repo-branch uni-flex uni-row">
				<view class="uni-collapse" style="flex: 1;">
				    <view class="uni-list-cell-navigate uni-navigate-bottom" style="display: block;" :class="branch.collapseShow ? 'uni-active' : ''" @click="branch.collapseShow=!branch.collapseShow">
						<image src="../../static/img/repo/branch.svg"></image>
						<text>{{branch.defaultBranch}}</text>
				    </view>
				    <view class="uni-collapse-content" :class="branch.collapseShow ? 'uni-active' : ''">
						<view class="repo-branch-list">
				            <view class="uni-list-cell" hover-class="uni-list-cell-hover"
								v-for="item in branch.branches" :key="item">{{item}}</view>
						</view>
				    </view>
				</view>
				<view class="repo-commits vertical-center">
					<image style="margin: 0;" src="../../static/img/repo/commit.svg"></image>
					<text style="font-size: 24upx;color: #0366d6;">{{17}} commits</text>
				</view>
			</view>
			<view class="repo-path">
				<!-- <text v-for="item in paths" :key="item.trees">{{item.name}}/</text> -->
				<text>{{paths}}</text>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell repo-files" hover-class="uni-list-cell-hover"
					v-for="item in trees" :key="item.path">
					<view class="uni-list-cell-navigate" :class="{'uni-navigate-right':item.type=='folder'}" @tap="treeSelect(item)">
						<label style="color: #0366d6;">
							<view style="float:left;padding-top:6upx;">
								<image v-if="item.type=='folder'" src="../../static/img/repo/folder.svg"></image>
								<image v-else-if="item.type=='file'" src="../../static/img/repo/file.svg"></image>
								<image v-else-if="item.type=='media'" src="../../static/img/repo/media.svg"></image>
								<image v-else-if="item.type=='markup'" src="../../static/img/repo/markup.svg"></image>
								<image v-else-if="item.type=='binary'" src="../../static/img/repo/binary.svg"></image>
								<image v-else src="../../static/img/repo/binary.svg"></image>
							</view>
							
							{{item.path}}
						</label>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge.vue";
	import util from '../../common/util.js'
	const authorization = util.getAuthorization()
	let treesUrl = ""
	
	export default {
		data() {
			return {
				branch: {
					defaultBranch: "",
					branches: [],
					collapseShow: false
				},
				trees: [],
				paths: "",
				collapseShow: false
			}
		},
		mounted() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			
			let options = null
			// #ifdef H5
			options = util.parseQueryString(page.$el.baseURI)
			// #endif
			// #ifndef H5
			options = page.options
			// #endif
			if (options && options.trees && options.title
				&& options.trees.indexOf("http") == 0){
				treesUrl = options.trees
				this.branch.defaultBranch = options.branch
				uni.setNavigationBarTitle({title: options.title})
				if(options.crumbs){
					this.paths = options.crumbs+options.title+"/"
				}else{
					this.paths = options.title+"/"
				}
			}else{
				uni.navigateBack({delta:1})
				return
			}
			this.getTrees()
		},
		methods: {
			getTrees(){
				uni.request({
					url: treesUrl,
					header: {
						'Authorization': authorization,
					},
					success: (res) => {
						if(res && res.data && res.data && res.data.tree){
							this.setTrees(res.data)
						}else{
							uni.showToast({title:"居然没有获取到目录！", icon:'none'})
						}
					},
					fail: (data) => {
						uni.showToast({title:"获取目录好像有问题！", icon:'none'})
					}
				})
			},
			setTrees(data){
				let trees = data.tree.orderByDesc(m => m.type)
				trees.forEach((item) => {util.setFileType(item)})
				this.trees.splice(0, this.trees.length)
				this.trees = trees
			},
			treeSelect(item){
				if(item.type == "folder"){
					uni.navigateTo({
						url: `./repo?trees=${item.url}&title=${item.path}&branch=${this.branch.defaultBranch}&crumbs=${this.paths}`
					});
				}else if(item.url){
					uni.navigateTo({
						url: `./content?url=${item.url}&title=${item.path}`
					});
				}else{
					uni.showToast({title:item.path, icon:'none'})
				}
			},
			getBrunchs(branchUrl){
				uni.request({
					url: branchUrl,
					header: {
						'Authorization': authorization,
					},
					success: (res) => {
						if(res && res.data && res.data && res.data.length > 0){
							res.data.forEach((item) => {
								if(item.name != this.branch.defaultBranch){
									this.branch.branches.push(item.name)
								}
							})
						}else{
							uni.showToast({title:"居然没有获取到分支！", icon:'none'})
						}
					},
					fail: (data) => {
						uni.showToast({title:"获取分支好像有问题！", icon:'none'})
					}
				})
			}
		},
		components: {
			uniBadge
		},
		onPullDownRefresh() {
			this.getTrees()
		}
	}
</script>

<style>
	.repo-branch{
		/* height: 95upx; */
		/* padding-left: 30upx; */
		/* flex: 1; */
		/* display: flex; */
		align-items: center;
	}
	.repo-branch .uni-list-cell-navigate.uni-active {
		background: transparent;
	}
	.repo-branch image{
		/* fill: currentColor; */
		margin-right: 16upx;
		width: 30upx;
		height: 30upx;
	}
	.repo-branch .repo-branch-list{
		padding-left: 73upx;
	}
	.repo-branch .repo-branch-list .uni-list-cell {
		padding-left: 0;
	}
	.repo-branch .repo-branch-list .uni-list-cell::after {
		background-color: transparent;
	}
	
	.repo-commits{
		width: 200upx;
		height: 92upx;
		border-left: 1upx solid #eaecef;
		padding-left: 30upx;
	}
	
	.repo-path{
		height: 60upx;
		background-color: #f6f8fa;
		border-top: 1px solid #eaecef;
		padding: 0 30upx;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
	}
	.repo-path text{
		color: #586069;
		font-size:24upx;
	}
	.repo-files image{
		/* fill: currentColor; */
		margin-right: 16upx;
		width: 30upx;
		height: 30upx;
	}
</style>
