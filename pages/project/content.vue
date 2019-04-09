<template>
	<view>
		<view class="hljs">
			<view style="width: max-content;line-height: 1.4;padding: 0.5em;">
				<rich-text type="text" :nodes="article"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import {Base64} from '../../components/base64/base64.js'
	import hljs from '../../components/highlight/lib/index.js'
	import hljsStyle from '../../components/highlight/styles/github-gist.js'
	import util from '../../common/util.js'
	const authorization = util.getAuthorization()
	hljs.setHilightStyle(hljsStyle)
	export default {
		data() {
			return {
				article: '',
				loading: true,
				contentUrl: "",
                tagFlag: ""
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

			if (options.url && options.title &&
				options.url.indexOf("http") == 0) {
				this.contentUrl = options.url
				uni.setNavigationBarTitle({
					title: options.title
				})
			} else {
				uni.navigateBack({
					delta: 1
				})
				return
			}
			uni.startPullDownRefresh()
            // #ifdef H5
            let cc = document.getElementsByClassName("hljs")
            if(cc && cc.length > 0){
                this.tagFlag = cc[0].attributes[0].name
            }
            // #endif
		},
		methods: {
			getContent() {
				this.loading = true
				uni.request({
					url: this.contentUrl,
					header: {
						'Authorization': authorization,
					},
					success: (res) => {
						if (res && res.data) {
							this.setContent(res.data)
						} else {
							uni.showToast({
								title: "居然没有获取到内容！",
								icon: 'none'
							})
						}
					},
					fail: (data) => {
						uni.showToast({
							title: "获取内容好像有问题！",
							icon: 'none'
						})
					}
				})
			},
			setContent(data) {
				let content = ""
				if (data.encoding = "base64") {
					content = Base64.decode(data.content)
					content = `${hljs.highlightAuto(content, undefined, this.tagFlag).value}`
					content = this.formatHtml(content)
				} else {
					content = "# 出错了"
				}
				this.article = content;
				uni.stopPullDownRefresh()
			},
			formatHtml(html) {
				html = html.replace(/[\n]/gi, '<br />');
				html = html.replace(/    /gi, '<span style="padding-left:2em;"></span>');
				html = html.replace(/[\t]/gi, '<span style="padding-left:2em;"></span>');
				return html;
			}
		},
		onPullDownRefresh() {
			this.getContent()
		}

	}
</script>

<style>
	.hljs {
		font-family: Consolas, Liberation Mono, Courier, monospace;
        overflow-x: auto;
	}

	page {
		background: #fff !important;
	}
</style>
