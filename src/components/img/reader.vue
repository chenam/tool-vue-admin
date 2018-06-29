<template>
	<!-- 主要内容 -->
		<div class="yueduBox">
			<!-- 阅读 -->
			<div class="reader">
				<div class="mImg J_img" data-rotate="0">
					<img @error="imgError" oncontextmenu="return false" ondragstart="return false" onselectstart="return false" data-rotate="0" :src="url" />
					<!-- 水印 -->
					<div class="mask J_shuiying" v-if="mask">
					</div>
				</div>
            <!-- lj缩略图 -->
            <div class="minBox J_slt">
                <img class="sltImg" @error="imgError" :src="url" oncontextmenu="return false" ondragstart="return false" onselectstart="return false" />
                <!-- <div class="mask"></div> -->
                <div class="mask2 J_sltMask pointer" :style="{width: CW2, height: CH2, left: CL2, top: CT2}"></div>
            </div>
			</div>
			<!-- 左箭头 -->
			<i class="el-icon-arrow-left left" @click="jiantou('left')"></i>
			<i class="el-icon-arrow-right right" @click="jiantou('right')"></i>
			<!--<div @click="jiantou('left')" class="left" :style="{backgroundImage : leftImg}"></div>-->
			<!-- 右箭头 -->
			<!--<div @click="jiantou('right')" class="right" :style="{backgroundImage : rightImg}"></div>-->
	</div>
</template>

<style lang="less" scoped>


.yueduBox{
	position: relative;
	/* 阅读 */
	.reader{
		overflow: hidden;
		position: relative;
		width: calc(~'100% - 120px');
		left: 60px;
		min-height: 200px;
		border: 1px solid #ccc;
		box-sizing: content-box;
		.mImg{
			position: absolute;
			left:0;
			top:0;
			transform: rotate(0deg);
			transform-origin: center center;
		}
	}
	.mask{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		opacity: .6;
		span{
			font-size: 22px;
			font-weight: bold;
			position: absolute;
			transform-origin: center center;
			left: 50%;
    	transform: translate(-50%);
		}
		.one{
			top: 10px;
		}
		.two{
			bottom: 10px;
		}
	}
	.left,.right{
		position: absolute;
		z-index: 100;
		width: 40px;
		height: 40px;
		margin-top: -20px;
		top: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		cursor: pointer;
	}
	.left{
		left: 10px;
	}
	.right{
		right: 10px;
	}
    /* 缩略图lj */
    .minBox {
        width: 200px;
        height: 200px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 200;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
        .mask2 {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #4b4431;
            opacity: .5;
            transform-origin: center center;
        }
    }
}

</style>

<style lang="less">
	.mask{
		overflow: hidden;
		.text{
			// border: 1px solid #9d2932;
			position: absolute;
			transform: rotate(-15deg);
			float: left;
			font-size: 30px;
			width: 200px;
			opacity: .5;
			font-weight: normal;
		}
	}
</style>

<script>

import $ from 'jquery';
import Viewer from 'imageviewer';
import 'imageviewer/dist/viewer.css'

export default{
	props: ['url'],
	components: {

	},
	watch: {
		url: function() {
			// 隐藏图片 解决 闪动问题
			$('.J_img').addClass('hide');
			let _this = this;
			// 保存图片 width
			let width;
			// 移除默认添加的 style
			$('.mImg').removeAttr('style');
			// 设置 容器 高度
			$('.mImg img').on('load', function() {
				$('.reader').css({
					height: $(window).height() - 140
				});

				_this.imgWidth = parseInt($('.mImg').width());
				width = parseInt($('.mImg').width());
				_this.imgHeight = parseInt($('.mImg').height());
                // lj缩略框大小reader框
                if (parseInt($('.mImg').width()) > parseInt($('.mImg').height())) {
                    // _this.maskroam = 200 / parseInt($('.mImg').width());
                    _this.CMW2 = 200;
                    _this.CMH2 = parseInt($('.mImg').height()) * 200 / parseInt($('.mImg').width());
                    $('.minBox').css({
                        height: parseInt($('.mImg').height()) * 200 / parseInt($('.mImg').width())
                    });
                } else {
                    // _this.maskroam = 200 / parseInt($('.mImg').height());
                    _this.CMW2 = parseInt($('.mImg').width()) * 200 / parseInt($('.mImg').height());
                    _this.CMH2 = 200;
                    $('.minBox').css({
                        width: parseInt($('.mImg').width()) * 200 / parseInt($('.mImg').height())
                    });
                };
				$('.J_img').css({
					width: _this.imgWidth,
					height: _this.imgHeight
				});

				var boxW = $('.yueduBox').width();
				// 设置图片位置
				if (width < boxW) {
					$('.mImg').css({
						left: (boxW - width) / 2
					});
				}
				// 初始化图片相关
				initImg();
				// 显示图片 解决闪动问题
				$('.J_img').removeClass('hide');
				// 判断如果当前是error图片 不显示缩略图
				if ($('.J_img img').attr('src').indexOf('reader-img-error') !== -1) {
					$('.J_slt').addClass('hide');
				} else {
					$('.J_slt').removeClass('hide');
				}
			});
			var initshuiYing = () => {
				let position = [
					{left: 20, top: 20},
					{left: 20, top: 30},
					{left: 40, top: 40},
					{left: 40, top: 80},
					{left: 60, top: 40}
				];
				let random = [];
				var init = () => {
					let shuiying = $('<span class="J_shuiyingText text red">amy</span>');
					let left = Math.round(Math.random() * $('.J_img').width() - 135 + 0)
					let top = Math.round(Math.random() * $('.J_img').height() - 0 + 0)
					let type = true;
					let num = Math.round(Math.random() * 4);
					random.map((v, k) => {
						if (num === v) {
							type = false;
							return;
						}
					});
					if (!type) {
						init();
						return;
					}
					random.push(num);
					shuiying.css({
						left: position[num].left + '%',
						top: position[num].top + '%'
					});
					$('.J_shuiying').append(shuiying);
				};
				var init2 = () => {
					let shuiying = $('<span class="J_shuiyingText text red">amy</span>');
					let imgW = $('.mImg').width();
					let imgH = $('.mImg').height();
					let arr = [];
					// 255 85
					let i = Math.ceil(imgW / 668);
					let k = Math.ceil(imgH / 200);
					for (let a = 0; a < i; a++) {
						let mw = a * 700;
						for (let b = 0; b < k; b++) {
							let mh = b * 500;
							arr.push({
								left: mw,
								top: mh
							});
						}
					}
					let aaa = [];
					for (let i = 0; i < 30; i++) {
						let ran = +Math.round(Math.random() * arr.length + 0).toFixed(0);
						if (aaa.length === 0) {
							aaa.push(ran);
						} else {
							let type = true;
							aaa.map((v, k) => {
								if (v !== ran) {

								} else {
									type = false;
								}
							});
							if (type) {
								aaa.push(ran);
							} else {
								aaa.push(+Math.round(Math.random() * arr.length + 0).toFixed(0));
							}
						}
					}
					let bbb = [];
					arr.map((v, k) => {
						aaa.map((v1, k1) => {
							if (v1 === k) {
								bbb.push(v);
							}
						});
					});
					// bbb增加随机水印 arr全屏铺满水印
					arr.map((v, k) => {
						let shuiying = $('<span class="J_shuiyingText text red">amy</span>');
						shuiying.css({
							left: v.left + 'px',
							top: v.top + 'px'
						});
						$('.J_shuiying').append(shuiying);
					});
				};
				setTimeout(() => {
					$('.J_shuiying').html('');
					// 添加水印
					/* init();
					init(); */
					init2();
					/* init();
					init(); */
				}, 100)
			};
			var initImg = () => {
				this.mask = true;
				$('.J_img').removeClass('visibility-hide');
				let width = $('.mImg').width();
				let height = $('.mImg').height();
				// 初始化 图片大小
				_this.zoombfb = 1;
				_this.bfb = 100;

				var top = '-' + ((height - $('.reader').height()) / 2);
				var left = '-' + ((width - $('.reader').width()) / 2);
				this.$emit('zoomChange', _this.bfb);
				// 设置图片位置
				$('.mImg').css({
					left: left + 'px',
					top: top + 'px',
					transform: `scale(${_this.zoombfb})`
				});
				// 设置水印位置
				initshuiYing();
                setTimeout(() => {
                    /*
                    DMW1 = MW1 * _this.zoombfb
                    CW2 = MW2 * CW1 / DMW1
                    */
                    // let DMML1 = parseInt($('.mImg').css('left')) - parseInt($('.mImg').width()) * _this.zoombfb / 2 + (parseInt($('.mImg').width()) / 2);
                    let DMML1 = parseInt($('.mImg').width()) * _this.zoombfb / 2 - (parseInt($('.mImg').width()) / 2) - parseInt($('.mImg').css('left'));
                    let DMMT1 = parseInt($('.mImg').height()) * _this.zoombfb / 2 - (parseInt($('.mImg').height()) / 2) - parseInt($('.mImg').css('top'));
                    _this.ML1 = parseInt($('.mImg').css('left'));
                    _this.MT1 = parseInt($('.mImg').css('left'));
                    _this.CW2 = parseInt($('.minBox').width()) * parseInt($('.reader').width()) / (parseInt($('.mImg').width()) * _this.zoombfb) + 'px';
                    _this.CH2 = parseInt($('.minBox').height()) * parseInt($('.reader').height()) / (parseInt($('.mImg').height()) * _this.zoombfb) + 'px';
                    _this.CL2 = DMML1 / (parseInt($('.mImg').width()) * _this.zoombfb) * parseInt($('.minBox').width()) + 'px';
                    _this.CT2 = DMMT1 / (parseInt($('.mImg').height()) * _this.zoombfb) * parseInt($('.minBox').height()) + 'px';
                });
			};
		}
	},
	mounted: function() {
		window.Zmessage = this.$message;
		this.init();
	},
	data: function() {
		return ({
			mask: true,
			// leftImg : `url('${leftImg}')`,
			// rightImg : `url('${rightImg}')`,
			// 当前是否 可以缩放
			scaleType: true,
			// 保存 原始图片 width
			imgWidth: 0,
			// 保存 原始图片 height
			imgHeight: 0,
			// 保存百分比
			bfb: 100,
			zoombfb: 1,
            // lj
            CW2: 0,
            CH2: 0,
            CL2: 0,
            CT2: 0,
            ML1: 0,
            MT1: 0
		});
	},
	methods: {
		imgError: function() {
			// this.$parent.url = readerErrImg;
			$('.J_img img').on('load', function() {
				setTimeout(() => {
					if ($('.J_img img').attr('src') && ($('.J_img img').attr('src').indexOf('reader-img-error') !== -1)) {
						// error图片位置
						$('.J_img').css({
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)'
						});
					}
				}, 0);
			});
		},
		// 初始化
		init: function() {
			let _this = this;
			// 当前是否 可以拖拽
			let dragType = false;

			// 记录当前点击 位于事件源的位置
			let titleY = null;
			let titleX = null;
			let ax = 0;
			let ay = 0;

			// 绑定滚轮 事件
			$('.reader').on('mousewheel DOMMouseScroll', function(e) {
				e.preventDefault();
				if (!_this.scaleType) {
					return;
				}
				if (!_this.mask) {
					return;
				}
				let ev = e || window.event;
				let delta = (ev.originalEvent.wheelDelta && (ev.originalEvent.wheelDelta > 0 ? 1 : -1)) || (ev.originalEvent.detail && (ev.originalEvent.detail > 0 ? -1 : 1));
				_this.setZoom(delta);
			});

			// 鼠标按下

			$('.J_img').on('mousedown', function(e) {
				e.preventDefault();
				dragType = true;
				titleY = e.clientY;
	      titleX = e.clientX;
	      ax = parseInt($('.J_img').css('left'));
	      ay = parseInt($('.J_img').css('top'));
	      // console.log(titleY);
			});

			// 鼠标松开
			$('.J_img').on('mouseup', function(e) {
				e.preventDefault();
				dragType = false;
			});

			// 鼠标 移动
			$('.J_img').on('mousemove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				if ($('.J_img img').attr('src').indexOf('reader-img-error') !== -1) {
					return;
				}
				if (dragType) {
					let x = e.clientX - titleX;
					let y = e.clientY - titleY;
					$('.J_img').css({
						left: x + ax + 'px',
						top: y + ay + 'px'
					});
                    setTimeout(() => {
                        let DMML1 = parseInt($('.mImg').width()) * _this.zoombfb / 2 - (parseInt($('.mImg').width()) / 2) - parseInt($('.mImg').css('left'));
                        let DMMT1 = parseInt($('.mImg').height()) * _this.zoombfb / 2 - (parseInt($('.mImg').height()) / 2) - parseInt($('.mImg').css('top'));
                        _this.ML1 = parseInt($('.mImg').css('left'));
                        _this.MT1 = parseInt($('.mImg').css('top'));
                        _this.CW2 = parseInt($('.minBox').width()) * parseInt($('.reader').width()) / (parseInt($('.mImg').width()) * _this.zoombfb) + 'px';
                        _this.CH2 = parseInt($('.minBox').height()) * parseInt($('.reader').height()) / (parseInt($('.mImg').height()) * _this.zoombfb) + 'px';
                        _this.CL2 = DMML1 / (parseInt($('.mImg').width()) * _this.zoombfb) * parseInt($('.minBox').width()) + 'px';
                        _this.CT2 = DMMT1 / (parseInt($('.mImg').height()) * _this.zoombfb) * parseInt($('.minBox').height()) + 'px';
                    });
				}
			});

			// 鼠标 在body移动时 移除dragType状态
			$('body').on('mousemove', function() {
				dragType = false;
                sltType = false;
			});
            // lj缩略图相关 事件，逻辑
            var sltType = false;
            (function () {
                let titleX = null;
                let titleY = null;
                let ax = null;
                let ay = null;
                let bx = null;
                let by = null;
                // 缩略图 按下
                $('.J_sltMask').on('mousedown', function (e) {
                    e.preventDefault();
                    titleY = e.clientY;
                    titleX = e.clientX;
                    bx = parseInt(_this.CL2);
                    by = parseInt(_this.CT2);
                    ax = parseInt($('.mImg').css('left'));
                    ay = parseInt($('.mImg').css('top'));
                    sltType = true;
                });
                // 缩略图 松开
                $('.J_sltMask').on('mouseup', function (e) {
                    e.preventDefault();
                    sltType = false;
                });
                $('.J_sltMask').on('mousewheel DOMMouseScroll', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                // 缩略图 移动
                $('.J_sltMask').on('mousemove', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (sltType) {
                        let x = e.clientX - titleX;
                        let y = e.clientY - titleY;
                        // _this.CL2 = bx + x + 'px';
                        // _this.CT2 = by + y + 'px';
                        // $('.J_img').css({
                        //     left: _this.ML1 + 'px',
                        //     top: _this.MT1 + 'px'
                        // });
                        let CL2 = bx + x;
                        let CT2 = by + y;
                        if (
                        	/* _this.CMW2 >= (CW2 + CL2) && CL2 >= 0 && _this.CMH2 >= (CH2 + CT2) && CT2 >= 0 || */
                        	(_this.CMW2 >= (parseInt(_this.CW2) + CL2) && x > 0) || (CL2 >= 0 && x < 0)) {
                        	_this.CL2 = CL2 + 'px';
                        	_this.ML1 = ax - x * (parseInt($('.mImg').width()) * _this.zoombfb) / parseInt($('.minBox').width());
													$('.J_img').css({
														left: _this.ML1 + 'px'
													});
                        };
                        if (
                        	(_this.CMH2 >= (parseInt(_this.CH2) + CT2) && y > 0) || (CT2 >= 0 && y < 0)) {
	                        _this.CT2 = CT2 + 'px';
                        	_this.MT1 = ay - y * (parseInt($('.mImg').height()) * _this.zoombfb) / parseInt($('.minBox').height());
													$('.J_img').css({
														top: _this.MT1 + 'px'
													});
                        };
                    }
                });
            })();
		},
		setZoom: function(type) {
            const _this = this;
			// 如果图片没有加载 完成 退出
			if (!$('.J_img').width()) {
				return;
			}
			// 如果是error图片 退出
			if ($('.J_img img').attr('src').indexOf('reader-img-error') !== -1) {
				return;
			}
			// let img = $('.J_img');
			// let bw = this.imgWidth * 0.1;
			// let bh = this.imgHeight * 0.1;
			// 向下滚
			if (type < 0) {
				if (this.bfb <= 10) {
					return;
				}

				let scale = +(this.zoombfb - 0.05);
				let aaa = 50;
				let DMML1 = parseInt($('.mImg').width()) * scale / 2 - (parseInt($('.mImg').width()) / 2) - parseInt($('.mImg').css('left'));
 				let DMMT1 = parseInt($('.mImg').height()) * scale / 2 - (parseInt($('.mImg').height()) / 2) - parseInt($('.mImg').css('top'));
 				if ((DMML1 <= 0 - $('.reader').width() + aaa) || (DMML1 >= $('.J_img img').width() * scale - aaa)) {
 					return;
 				}
 				if ((DMMT1 <= 0 - $('.reader').height() + aaa) || (DMMT1 >= $('.J_img img').height() * scale - aaa)) {
 					return;
 				}

				this.bfb = this.bfb - 5;
				this.zoombfb = +(this.zoombfb - 0.05);
				/* img.css({
	      	width : Math.round( ( parseInt(img.css("width")) - bw ).toFixed(0) ),
	      	height : Math.round( ( parseInt(img.css("height")) - bh ).toFixed(0) )
      	}); */
			// 向上滚
			} else {
				if (this.bfb >= 200) {
					return;
				}
				this.bfb = this.bfb + 5;
				this.zoombfb = +(this.zoombfb + 0.05);
				/* img.css({
	      	width : Math.round( ( parseInt(img.css("width")) + bw ).toFixed(0) ),
	      	height : Math.round( ( parseInt(img.css("height")) + bh ).toFixed(0) )
      	}); */
			}
			// 获得百分比
			// let bfb = Math.round( ( parseInt(img.css("height")) / this.imgHeight ) * 100 );
			// this.resetImgWeiZhi(type);
			let rotate = +$('.J_img').attr('data-rotate');
			$('.J_img').css({
				transform: `rotate(${rotate}deg) ` + 'scale(' + this.zoombfb + ')'
			});
            let DMML1 = parseInt($('.mImg').width()) * _this.zoombfb / 2 - (parseInt($('.mImg').width()) / 2) - parseInt($('.mImg').css('left'));
            let DMMT1 = parseInt($('.mImg').height()) * _this.zoombfb / 2 - (parseInt($('.mImg').height()) / 2) - parseInt($('.mImg').css('top'));
            _this.ML1 = parseInt($('.mImg').css('left'));
            _this.MT1 = parseInt($('.mImg').css('left'));
            _this.CW2 = parseInt($('.minBox').width()) * parseInt($('.reader').width()) / (parseInt($('.mImg').width()) * _this.zoombfb) + 'px';
            _this.CH2 = parseInt($('.minBox').height()) * parseInt($('.reader').height()) / (parseInt($('.mImg').height()) * _this.zoombfb) + 'px';
            _this.CL2 = DMML1 / (parseInt($('.mImg').width()) * _this.zoombfb) * parseInt($('.minBox').width()) + 'px';
            _this.CT2 = DMMT1 / (parseInt($('.mImg').height()) * _this.zoombfb) * parseInt($('.minBox').height()) + 'px';
            this.$emit('zoomChange', this.bfb);
		},
		// 重置 图片位置
		resetImgWeiZhi: function(type) {
			let img = $('.J_img');
			let imgLeft = parseInt(img.css('left'));
			let imgTop = parseInt(img.css('top'));
			let imgWidth = img.width();
			let imgHeight = img.height();
			let boxW = $('.yueduBox').width();
			let status = true;
			if (imgTop < 0) {
				console.log('上面遮盖');
				status = false;
			}
			if (imgTop > $('.reader').height()) {
				console.log('下面遮盖');
				status = false;
			}
			if (imgLeft < 0) {
				console.log('左边遮盖');
				status = false;
			}
			if (imgLeft > boxW) {
				console.log('右边遮盖');
				status = false;
			}
			if (status) {
				console.log('没有遮盖');
			}
		},
		// 点击 左右箭头
		jiantou: function(type) {
			if (type === 'left') {
				this.$emit('inputfanye', 'left');
			} else {
				this.$emit('inputfanye', 'right');
			}
		},
		// 旋转 方法
		rotate: function() {
			let rotate = +$('.J_img').attr('data-rotate');
			console.log(rotate);

			$('.J_img').css({
				transform: `rotate(${rotate + 90}deg) ` + 'scale(' + this.zoombfb + ')'
			}).attr('data-rotate', rotate + 90);
		},
		// 重置 旋转
		rotateReset: function() {
			$('.J_img').css({
				transform: `0`
			}).attr('data-rotate', 0);
		},
		// 显示全屏 方法
		open: function() {
			if ($('.J_img img').attr('src').indexOf('reader-img-error') !== -1) {
				return;
			}
			let _this = this;
			_this.scaleType = false;
			$('.quanpingImgBox').viewer({
				url: 'data-url',
				fullscreen: false,
				// 全屏 不自动播放
				interval: false,
				// 不显示 缩略图
				navbar: false,
				// 不显示 图片名称
				title: false,
				// 显示后的回调
				shown: function() {
					// $('.J_img').viewer('toggle');
				},
				// 加载图片 回调
				viewed: function() {
					// 暂时 全屏翻页 阅读器图片不更新
					return;
					// 获取当前index图片，去除图片时间戳
					let dataSrc = $('.viewer-canvas img').attr('data-src').split('?')[0];
					let index = null;
					// 模糊匹配 当前图片，获取当前index
					$('.quanpingImgBox').find('[data-url]').each(function(k, e) {
						let t = $(e);
						if (t.attr('data-url').indexOf(dataSrc) !== -1) {
							index = t.index() + 1;
						}
					});
					_this.$parent.inputfanye('input', index);
				},
				hide: function() {
					// 关闭浮层 删除dom
					$(this).viewer('destroy');
					_this.scaleType = true;
					$('body').removeClass('viewer-open');
				}
			})/* .viewer('show') */;
			// 打开对应数据
			$('.J_readerImg').eq(this.$parent.pageIndex - 1).trigger('click');
		}
	}
}

</script>

