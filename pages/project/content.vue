<template>
	<view class="uni-padding-wrap">
		<uParse :content="article" @preview="preview" @navigate="navigate" />
	</view>
</template>

<script>
	import { Base64 } from 'js-base64'
	import marked from '../../components/marked'
	import uParse from '../../components/uParse/src/wxParse.vue'

	let contentUrl = ""
	let isContentMD = false
	export default {
		components: {
			uParse
		},
		data() {
			return {
				article: ''
			}
		},
		mounted() {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			if(page.options && page.options.url && page.options.title
				&& page.options.url.indexOf("http") == 0) {
				contentUrl = page.options.url
				if(page.options.title.lastIndexOf(".md") == (page.options.title.length - 3)){
					isContentMD = true
				}
				uni.setNavigationBarTitle({title: page.options.title})
			}else{
				uni.navigateBack({delta:1})
				return
			}
			this.getContent()
		},
		methods: {
			getContent(){
				uni.request({
					url: contentUrl,
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
				console.info(data)
				if (data.encoding = "base64"){
					content = Base64.decode(data.content)
				}else{
					content = "# 出错了"
					isContentMD = true
				}
				if(isContentMD){
					this.article = marked(content)
				}else{
					this.article = `<div>${content}</div>`
				}
			},
			escapeHTML(a){
				a = "" + a;
				return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
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
