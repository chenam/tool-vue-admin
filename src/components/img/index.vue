<template>
	<div>
        <!--阅读区-->
        <div class='reader-wrapper'>
			<h6 class='reader-title'>
            	图片查看
        	</h6>
            <reader ref="reader" :url="url" @zoomChange="zoomChange" @inputfanye="inputfanye"/>
			<caozuo
				class='caozuo'
                ref="caozuo"
                :max="max"
                :bfb="bfb"
                :url="url"
                @zoom="zoom"
                @xuanzhuan="xuanzhuan"
                @quanping="quanping"
                @inputfanye="inputfanye"
            />
            <div class="hide quanpingImgBox">
                <img v-for="(item,index) in readerUrlList" :data-url="item" class="J_readerImg" :key="index"/>
            </div>
			<div class="slide-wrapper-w" v-show='smallReaderUrlList.length > 0'>
				<div class='slide-wrapper'>
					<ul :style='{width : (smallReaderUrlList.length * 102 - 8) + "px"}'>
						<li
							v-for="(item,index) in smallReaderUrlList"
							:style='{backgroundImage : "url(" + item + ")"}'
							:key='index'
							:class='{active : pageIndex == (index + 1)}'
							@click='activeSwitch(item,index)'
						>
						</li>
					</ul>
				</div>
			</div>
        </div>
	</div>
</template>

<style lang="less" scoped>
@theme-color:#30AB63;
.reader-wrapper{
    width: 600px;
	border :1px solid #ccc;
    margin-bottom: 20px;
    .reader-title{
        height: 38px;
        line-height: 38px;
        background : #faf9f7;
        text-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        margin-bottom : 25px;
    }
	.caozuo{
		padding-top :20px;
	}
	.slide-wrapper-w{
		margin : 0 10px;
	}
	.slide-wrapper{
		width : 100%;
		overflow-x: auto;
		ul{
			height : 150px;
		}
		li{
			box-sizing: content-box;
			width :90px;
			height : 120px;
			float : left;
			margin-left : 8px;
			background-size : cover;
			border : 2px solid transparent;
			cursor: pointer;
			&.active{
				border-color : @theme-color;
			}
			&:first-child{
				margin-left : 0px;
			}
		}
	}
}

</style>

<script>
import $ from 'jquery';
import reader from './reader.vue';
import caozuo from './caozuo.vue';
import niceScroll from 'jquery.nicescroll';
// import errImg from 'src/assets/image/error-default.png';

export default {
    components: {
        reader, caozuo, niceScroll
	},
    data() {
        return ({
            // 当前显示的百分比
            bfb: 100,
            // 阅读图片url
			url: '',
            // 当前页数
			pageIndex: 1,
            // 全屏 阅读url list
			readerUrlList: [],
			// 缩略图 url list
			smallReaderUrlList: [],
            max: 2
        })
    },
	created: function() {
	},
	mounted: function() {
        this.getImg();
        $(document).ready(
            function() {
                $('.slide-wrapper').niceScroll('ul', {
                    cursorcolor: '#30AB63',
                    // touchbehavior: true,
                    horizrailenabled: true,
                    usetransition: true,
                    hwacceleration: true,
                    autohidemode: false,
                    nativeparentscrolling: false,
                    railoffset: 'top'
                });
            }
        );
    },
	methods: {
        // 根据当前页数 获取图片
		getImg: function(bool, page) {
			// bool : 是否刷新缩略图 true : 不刷新 ； false : 刷新（划重点）
			// page : 指定页数
            const self = this;
			if (page) {
				this.pageIndex = page;
			};
            setTimeout(() => {
                let data = {
                    imgUrls: [
                        'http://ovdlbb5hr.bkt.clouddn.com/a.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/b.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/c.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/d.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/e.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/f.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/g.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/h.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/i.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/j.jpg'
                    ],
                    imgUrlsSmall: [
                        'http://ovdlbb5hr.bkt.clouddn.com/a.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/b.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/c.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/d.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/e.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/f.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/g.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/h.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/i.jpg',
                        'http://ovdlbb5hr.bkt.clouddn.com/j.jpg'
                    ],
                    totalPage: 10
                };
                if (data.imgUrls && data.totalPage > 0) {
                    this.max = data.totalPage;
                    this.url = data.imgUrls[this.pageIndex - 1]; /* + '@h_600' */
                    // 获取全屏翻页 图片list
                    this.readerUrlList = data.imgUrls;
                    if (!bool) {
                        this.smallReaderUrlList = data.imgUrlsSmall;
                    };
                    this.$nextTick(() => {
                        $('.slide-wrapper').getNiceScroll().show()
                        $('.slide-wrapper').getNiceScroll().resize()
                    });
                };
                this.$nextTick(() => {
                    self.$refs.caozuo.value = self.pageIndex;
                })
            }, 500)
		},
		// 点击切换当前图片
		activeSwitch (item, index) {
			// console.log($('.slide-wrapper ul').css('transform').replace(/[^0-9\-,.]/g,'').split(',')[4])
			this.pageIndex = index + 1;
			this.getImg(true);
		},
        // 点击缩放 按钮
		zoom: function(type) {
			this.$refs.reader.setZoom(type);
		},
        // 每次缩放 change
		zoomChange: function(bfb) {
			this.bfb = bfb;
		},
        // 操作 input 翻页 左右翻页
		inputfanye: function(type, val) {
			// 滚动距离的负数
			let _sw = $('.slide-wrapper ul').css('transform').replace(/[^0-9\-,.]/g, '').split(',')[4];
			// console.log($('.slide-wrapper ul').css("transform").replace(/[^0-9\-,]/g,''))
			// 容器宽
			let _bw = $('.slide-wrapper-w').width();

			// 输入翻页
			if (type === 'input') {
				this.pageIndex = +val;
				let _ld1 = (102 * this.pageIndex - 8) + parseFloat(_sw);
				let _ld2 = (102 * (this.pageIndex - 1) - 8) + parseFloat(_sw);
				if (_ld1 > _bw) { // 在容器右侧
					// 滚动距离
					// let _sd = (102 * this.pageIndex - 8) - _bw;
					// $(".slide-wrapper").getNiceScroll(0).doScrollLeft(_sd); // Scroll X Axis

					let _sd = 102 * (this.pageIndex - 1) - 8;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd);
				} else if (_ld2 < 0) { // 在容器左侧
					let _sd = 102 * (this.pageIndex - 1) - 8;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd);
				}
			// 点击 左箭头
			} else if (type === 'left') {
				this.pageIndex = this.pageIndex - 1;
				// 判断当前页是否在容器内
				// 公式左侧 ： (102 * (当前页 - 1) - 8)- 滚动距离 >= 0
				// 公式右侧 ： (102 * 当前页 - 8) - 滚动距离 <= 容器宽
				// 公式左边的数据
				let _ld1 = (102 * this.pageIndex - 8) + parseFloat(_sw);
				let _ld2 = (102 * (this.pageIndex - 1) - 8) + parseFloat(_sw);
				if (_ld1 > _bw) { // 在容器右侧
					// 滚动距离
					let _sd = (102 * this.pageIndex - 8) - _bw;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd); // Scroll X Axis
				} else if (_ld2 < 0) { // 在容器左侧
					let _sd = 102 * (this.pageIndex - 1) - 8;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd);
				}
			// 点击 右箭头
			} else if (type === 'right') {
				this.pageIndex = this.pageIndex + 1;
				// 判断当前页是否在容器内
				// 公式左侧 ： (102 * (当前页 - 1) - 8)- 滚动距离 >= 0
				// 公式右侧 ： (102 * 当前页 - 8) - 滚动距离 <= 容器宽

				// 公式左边的数据
				let _ld1 = (102 * this.pageIndex - 8) + parseFloat(_sw);
				let _ld2 = (102 * (this.pageIndex - 1) - 8) + parseFloat(_sw);
				if (_ld1 > _bw) { // 在容器右侧
					// 滚动距离
					let _sd = (102 * this.pageIndex - 8) - _bw;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd); // Scroll X Axis
				} else if (_ld2 < 0) { // 在容器左侧
					let _sd = 102 * (this.pageIndex - 1) - 8;
					$('.slide-wrapper').getNiceScroll(0).doScrollLeft(_sd);
				}
			}

			// 判断 是否超过限制
			if (this.pageIndex < 1) {
				this.pageIndex = 1;
				this.$message.info('已经是第一页了');
				return;
			} else if (this.pageIndex > this.max) {
				this.pageIndex = this.max;
				this.$message.info('已经是最后一页了');
				return;
			}
			this.getImg(true);
			// 设置 操作的 value
			this.$refs.caozuo.value = this.pageIndex;
		},
        // 操作 点击全屏
		quanping: function() {
			this.$refs.reader.open();
		},
        // 操作 点击旋转
		xuanzhuan: function() {
			this.$refs.reader.rotate();
		}
	}
}
</script>
