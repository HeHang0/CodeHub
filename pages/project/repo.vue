<template>
	<view class="page">
			<view class="uni-list">
				<!-- <view class="uni-list-cell-divider">
					右侧带箭头
				</view> -->
				<view class="uni-list-cell contents" hover-class="uni-list-cell-hover"
					v-for="item in trees" :key="item.path">
					<view class="uni-list-cell-navigate" :class="{'uni-navigate-right':item.type=='tree'}" @tap="treeSelect(item)">
						<label>
							<view style="float:left;padding-top:6upx;">
								<image v-if="item.type=='tree'" src="../../static/img/repo/folder.svg"></image>
								<image v-else-if="item.type=='blob'" src="../../static/img/repo/file.svg"></image>
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
	export default {
		data() {
			return {
				trees: []
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
				treesUrl = page.options.trees
				uni.setNavigationBarTitle({title: page.options.title})
			}
			else{
				uni.navigateBack({delta:1})
				return
			}
			// #endif
			this.getTrees()
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
				this.trees.splice(0, this.trees.length)
				this.trees = data.tree.orderByDesc(m => m.type)
			},
			treeSelect(item){
				if(item.type == "tree"){
					uni.navigateTo({
						url: `./repo?trees=${item.url}&title=${item.path}`
					});
				}else if(item.type == "blob" && item.mode == "100644"){
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
	.contents image{
		fill: currentColor;
		margin-right: 16upx;
		width: 30upx;
		height: 30upx;
	}
</style>
