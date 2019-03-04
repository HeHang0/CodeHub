<template>
	<view class="page">
			<view class="repo-branch">
				<image src="../../static/img/repo/branch.svg"></image>
				<text>master</text>
			</view>
			<view class="repo-path">
				<text v-for="item in paths" :key="item.trees">{{item.name}}/</text>
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
	let treesUrl = ""
			let isS = false
	export default {
		data() {
			return {
				trees: [],
				paths: []
			}
		},
		mounted() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			
			
			// #ifdef H5
			let options = util.parseQueryString(page.$el.baseURI)
			if (options.trees && options.title
				&& options.trees.indexOf("http") == 0){
				treesUrl = options.trees
				uni.setNavigationBarTitle({title: options.title})
			}else{
				uni.navigateBack({delta:1})
				return
			}
			// #endif
			
			// #ifndef H5
			if(page.options && page.options.trees && page.options.title
				&& page.options.trees.indexOf("http") == 0) {
					console.log(page.options.trees)
				treesUrl = page.options.trees
				uni.setNavigationBarTitle({title: page.options.title})
			}
			else{
				uni.navigateBack({delta:1})
				return
			}
			// #endif
			uni.getStorage({
				key: 'repo',
				success: (res) => {
					if(res && res.data ){
						isS = true
						this.setTrees(res.data)
					}else {
						this.getTrees()
					}
				},
				fail: () => {
					this.getTrees()
				}
			});
			let patt = /\/\/api.github.com\/repos\/([\s\S]+)\/git\/trees/i //
			if(patt.test(treesUrl)){
				console.info(patt.exec(treesUrl)[1])
				let paths = patt.exec(treesUrl)[1].split("/")
				if(paths.length > 1){
					for (let i = 1; i < paths.length; i++) {
						this.paths.push({
							name: paths[i],
							trees: `https://api.github.com/repos/${paths.slice(1, i+1).join("/")}/git/trees/master`
						})
					}
				}
			}
		},
		methods: {
			getTrees(){
				uni.request({
					url: treesUrl,
					header: {
						'Authorization': "Basic SGVIYW5nMDpoaGQ5NTEwMTI=",
					},
					success: (res) => {
						if(res && res.data && res.data && res.data.tree){
							this.setTrees(res.data)
							uni.setStorage({
								key: 'repo',
								data: res.data
							});
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
				this.trees = data.tree;return
				let trees = data.tree.orderByDesc(m => m.type)
				trees.forEach((item) => {util.setFileType(item)})
				this.trees.splice(0, this.trees.length)
				this.trees = trees
			},
			treeSelect(item){
				if(item.type == "folder"){
					uni.navigateTo({
						url: `./repo?trees=${item.url}&title=${item.path}`
					});
				}else if(item.url){
					uni.navigateTo({
						url: `./content?url=${item.url}&title=${item.path}`
					});
				}else{
					uni.showToast({title:item.path, icon:'none'})
				}
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
		height: 95upx;
		padding-left: 30upx;
		flex: 1;
		display: flex;
		align-items: center;
	}
	.repo-branch image{
		/* fill: currentColor; */
		margin-right: 16upx;
		width: 30upx;
		height: 30upx;
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
