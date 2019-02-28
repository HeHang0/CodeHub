<template>
	<view class="page">
			<view class="uni-list">
				<!-- <view class="uni-list-cell-divider">
					右侧带箭头
				</view> -->
				<view class="uni-list-cell" hover-class="uni-list-cell-hover"
					v-for="item in trees" :key="item.path">
					<view class="uni-list-cell-navigate" :class="{'uni-navigate-right':item.type=='tree'}" @tap="treeSelect(item)">
						{{item.path}} - {{item.type}} - {{item.mode}} - {{item.size}}
					</view>
				</view>
								<!-- <view class="uni-list-cell" v-for="item in repos" :key="item.trees">
									<view class="uni-list-cell-navigate" @tap="repoSelect(item)">
										{{item.name}}
									</view>
								</view> -->
<!-- 							"path": ".gitignore",
								"mode": "100644",
								"type": "blob",
								"sha": "28bc4d6c05be4839801ace93bfa5dddf6d6d275c",
								"size": 28,
								"url": "https://api.github.com/repos/HeHang0/CodeHub/git/blobs/28bc4d6c05be4839801ace93bfa5dddf6d6d275c"
 -->			</view>
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge.vue";
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
			if(page.options && page.options.trees && page.options.title
				&& page.options.trees.indexOf("http") == 0) {
				treesUrl = page.options.trees
				uni.setNavigationBarTitle({title: page.options.title})
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
					success: (res) => {
						if(res && res.data && res.data){
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

</style>
