<template>
	<div class="container">
		<image v-if="imageBg" class="bg-image" :src="imageBg" :style="styleBg" resize="cover"/>
		<div class="container" v-if="isShow">
			<scroller class="page" :style="pageStyle" @scroll="handleScroll">
				<refresh v-if="refresh==='on'" class="refresh" @refresh="handleRefresh" @pullingdown="handlePullDown" :display="refreshing ? 'show' : 'hide'">
					<div v-if="refreshSlot" ref="refreshSlot">
						<slot name="refreshSlot"></slot>
					</div>
					<loading-indicator v-if="!refreshSlot" class="indicator"></loading-indicator>
				</refresh>
				<div class="page-content" :style="{minHeight:(containerHeight+1) + 'px'}" ref="content">
					<slot></slot>
				</div>
				<loading v-if="load==='on'" class="loading" @loading="handleLoading" :display="loading ? 'show' : 'hide'">
					<div v-if="loadSlot" ref="loadingSlot">
						<slot name="loadingSlot"></slot>
					</div>
					<loading-indicator v-if="!loadSlot" class="indicator-loading"></loading-indicator>
				</loading>
			</scroller>
			<text v-if="toTop" class="top" @click="handleTop">&#xe76c;</text>
		</div>
		<div v-if="!isShow">
			<slot v-if="pageLoadSlot" name="pageLoading"></slot>
			<wxc-loading :show="!pageLoadSlot" type="default"></wxc-loading>
		</div>
	</div>
</template>

<script>
	import {
		WxcLoading
	} from 'weex-ui'
	const modal = weex.requireModule('modal')
	const dom = weex.requireModule('dom')
	export default {
		name: "Page",
		components: {
			WxcLoading: WxcLoading
		},
		props: {
			minusHeight:{
				type:Number,
				default (){
					return 0
				}
			},
			imageBg:{
				type:String,
				default(){
					return ''
				}
			},
			styleBg:{
				type:Object,
				default(){
					return {}
				}
			},
			stylePage:{
				type:Object,
				default(){
					return {}
				}
			},
			refresh:{
				type:String,
				default () {
					return ""
				}
			},
			load:{
				type:String,
				default () {
					return ""
				}
			},
			refreshing: {
				type: Boolean,
				default () {
					return false
				}
			},
			loading: {
				type: Boolean,
				default () {
					return false
				}
			},
			isShow: {
				type: Boolean,
				default () {
					return true
				}
			},
			refreshSlot: {
				type: Boolean,
				default () {
					return false
				}
			},
			loadSlot: {
				type: Boolean,
				default () {
					return false
				}
			},
			pageLoadSlot: {
				type: Boolean,
				default () {
					return false
				}
			},
			toTop: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		data() {
			return {
				deviceWidth: 750,
				deviceHeight: 0,
				firstLoad: false
			}
		},
		created() {
			if(this.toTop === true){
				dom.addRule('fontFace', {
					'fontFamily': "iconfont",
					'src': "url('http://at.alicdn.com/t/font_811848_8vtd3k91r3i.ttf')"
				})
			}
			this.$data.deviceHeight = WXEnvironment.deviceHeight
		},
		computed: {
			pageStyle(){
				let base = {
					"height":this.containerHeight
				}
				let imgBg = {
					"backgroundColor":"transparent",
					"height":this.containerHeight
				}
				let res = [base]
				if(Object.getOwnPropertyNames(this.stylePage).length > 0) res.push(this.stylePage)
				if(this.imageBg && this.imageBg!== "") res.push(imgBg)
				res = res.reduce((t,v,i)=>{return Object.assign(t,v)})
				return res
			},
			containerHeight() {
				if(this.minusHeight > 0) return this.$data.deviceHeight - this.minusHeight
				return this.$data.deviceHeight
			}
		},
		methods: {
			handleScroll(e) {
				this.$emit("scroll", e)
			},
			handlePullDown(e) {
				this.$emit("pullDown", e)
			},
			handleRefresh(e) {
				this.$emit("refreshing")
			},
			handleLoading(e) {
				this.$emit("loadining")
			},
			handleTop(e) {
				let content = this.$refs.content
				dom.scrollToElement(content)
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
	}
	
	.bg-image{
		position: absolute;
		top: 0;
		width: 750px;
		height: 1334px;
		opacity: 1;
	}

	.page {
		width: 750px;
		background-color: #f5f5f5;
		position: relative;
	}

	.page-content {
		position: relative;
	}

	.refresh {
		width: 750px;
		text-align: center;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 16px;
		padding-bottom: 16px;
		position: absolute;
	}

	.loading {
		width: 750px;
		text-align: center;
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.indicator {
		height: 40px;
		width: 40px;
		color: #fff;
	}

	.indicator-loading {
		height: 40px;
		width: 40px;
		color: #fff;
		margin-top: 16px;
		margin-bottom: 16px;
	}

	.top {
		font-family: iconfont;
		width: 80px;
		height: 80px;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		right: 20px;
		bottom: 20px;
		font-size: 40px;
		text-align: center;
		line-height: 80px;
		box-shadow: 0 0 6px #ccc;
		border-width: 1px;
		border-color: #ccc;
	}
</style>
