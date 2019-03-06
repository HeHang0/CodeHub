<template>
	<view class="uni-padding-wrap" style="width: auto;">
		<!-- <uParse :content="article" noData="" @preview="preview" @navigate="navigate" /> -->
		<textarea v-model="article" maxlength="-1" auto-height="true" style="width: 2000px;overflow-x:auto;"></textarea>
	</view>
</template>

<script>
	import { Base64 } from '../../components/base64/base64.js'
	import hljs from '../../components/highlight/highlight.js'
	import util from '../../common/util.js'
	import marked from '../../components/marked'
	import uParse from '../../components/uParse/src/wxParse.vue'
	const authorization = util.getAuthorization()
	let contentUrl = ""
	let isContentMD = false
	export default {
		components: {
			uParse
		},
		data() {
			return {
				article: '',
				loading: true
			}
		},
		onLoad() {  
		}, 
		mounted() {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let options = null
			// #ifdef H5
			options = util.parseQueryString(page.$el.baseURI)
			// #endif
			// #ifndef H5
			options = page.options
			// #endif
			
			if (options.url && options.title
				&& options.url.indexOf("http") == 0){
				contentUrl = options.url
				if(options.title.lastIndexOf(".md") == (options.title.length - 3)){
					isContentMD = true
				}
				uni.setNavigationBarTitle({title: options.title})
			}else{
				uni.navigateBack({delta:1})
				return
			}
			
			this.getContent()
		},
		methods: {
			getContent(){
				this.loading = true
				uni.request({
					url: contentUrl,
					header: {
						'Authorization': authorization,
					},
					success: (res) => {
						if(res && res.data){
							this.setContent(res.data)
						}else{
							uni.showToast({title:"居然没有获取到内容！", icon:'none'})
						}
					},
					fail: (data) => {
						uni.showToast({title:"获取内容好像有问题！", icon:'none'})
					}
				})
			},
			setContent(data){
				let content = ""
				if (data.encoding = "base64"){
					content = Base64.decode(data.content)
				}else{
					content = "# 出错了"
					isContentMD = true
				}
				hljs.initHighlighting()
				console.info(hljs.listLanguages())
				let a = hljs.highlightAuto(content).value
				console.log(a)
				this.article = a
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			}
		},
		onPullDownRefresh() {
			this.getContent()
		}

	}
</script>

<style>
	@import url("../../components/uParse/src/wxParse.css");
</style>
