<template>
	<!-- 主要内容 -->
		<div class="caozuoBox">
			<!-- 操作 -->
			<div class="handle">
				<div class="left">
				</div>
				<div class="right clearfix">
					<!--<template v-if="fileType !== 'sp' && fileType !== 'yp'">
						<span>
							<el-button @click="prev" class="el-button-reset prev">上一页</el-button>
						</span>
						<span>
							<el-button @click="next" class="el-button-reset next">下一页</el-button>
						</span>
					</template>-->
					<a @click="satmpMsg" class="mBtn">打印</a>
					<template>
						<span>
							<input v-model="value" @input="change" @keyup.enter="fanye" class="mInput" />
						</span>
						<span>/</span>
						<span class="max">{{xiazaiMax}}</span>
						<span class="fangda">
							<i class="el-icon-zoom-in" @click="fangda"></i>
						</span>
						<span class="suoxiao">
							<i class="el-icon-zoom-out" @click="suoxiao"></i>
						</span>
						<span class="bfb">{{bfb}}%</span>
					</template>

					<template>
							<span @click="xuanzhuan" class="xuanzhuanBox">
							<i class="el-icon-refresh"></i>
							<span>旋转</span>
						</span>
					</template>
					<template>
						<span @click="quanping">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-full"></use>
							</svg>
							<span>全屏</span>
						</span>
					</template>

				</div>
			</div>
	</div>
</template>

<style lang="less" scoped>
@theme-color:#972831;
@title-color:#333;
@bg-color:#faf9f7;
@text-color:#666;
@link-color:#177cb0;

.caozuoBox{
	padding-bottom: 20px;
	.verticalAlign{
		display: inline-block;
		vertical-align: middle;
	}
	.icon{
		font-size: 20px;
	}
	/* 操作 */
	.handle{
		line-height: 30px;
		/*overflow: hidden;*/
		height: 34px;
		.icon{
			cursor: pointer;
			font-size: 20px;
		}
		.right{
			float: right;
			margin-right :70px;
			.max{
				width: 25px;
			}
			.icon{
				display: inline-block;
				vertical-align: middle;
				margin-top: -3px;
			}
			.mInput{
				float:left;
				width: 34px;
				height: 30px;
				outline: none;
				border: 1px solid #9a9899;
				text-align: center;
			}
			>span{
				float:left;
				margin-right: 10px;
			}
			.suoxiao,.fangda{
				cursor: pointer;
				/*margin-top: 12px;*/
			}
			.mBtn:hover{
				color: #fff;
				background-color: #30AB63;
			}
			.bfb{
				width: 40px;
				overflow: hidden;
			}
			.xuanzhuanBox{
				cursor: pointer;
			}
			.img{
				display: inline-block;
				margin-top: -5px;
				cursor: pointer;
			}
		}
	}
}

</style>

<script>

let vrifyNumber = function (val, max) {
	let reg = /^[1-9]*[1-9][0-9]*$/;
	if (reg.test(val)) {
		if (val <= max) {
			return true;
		}
	}
}

export default{
	props: [
		// 百分比
		'bfb',
		// 最大数量
		'max'
	],
	components: {
	},
	mounted: function() {
	},
	data: function() {
		return ({
			queryFileCode: '',
			periodInfo: '',
			// 当前页数
			value: '1',
			// 下载最大数
			xiazaiMax: this.max,
			popupWin: '',
		});
	},
	watch: {
		max: function() {
			this.xiazaiMax = this.max;
		}
	},
	methods: {
		// 点击目录逻辑
		prev: function() {
			this.$parent.inputfanye('left');
		},
		next: function() {
			this.$parent.inputfanye('right');
		},
		// 点击放大
		fangda: function() {
			this.$emit('zoom', 1);
		},
		// 点击缩小
		suoxiao: function() {
			this.$emit('zoom', -1);
		},
		// 点击全屏
		quanping: function() {
			this.$emit('quanping');
		},
		// 翻页change
		change: function(e) {
			let val = e.target.value;
			if (!val) {
				return;
			}
			if (!vrifyNumber(val, this.xiazaiMax)) {
				if (this.xiazaiMax === 0) {
					this.value = '0';
				} else {
					this.value = '1';
				}
			}
		},
		// input 回车事件
		fanye: function() {
			this.$emit('inputfanye', 'input', this.value);
		},
		// 点击旋转
		xuanzhuan: function() {
			this.$emit('xuanzhuan');
		},

		// 点击摘录
		zhailv: function() {
			// alert('摘录');
		},
		satmpMsg() {
			if (this.popupWin.closed == false) {
				//  this.$message.error('您有未关闭的窗口！');
				alert('您有未处理的打印窗口！');
			}else{
				this.popupWin = window.open('', '_blank', 'width=800,height=600,z-look=yes');
				const headstr = '<html><head><title></title><style media="print">.wrapper{page-break-after: always;}div{-webkit-text-size-adjust:none;font-size:12px;font-family:"SimHei",黑体;}.warning{-webkit-text-size-adjust:none;font-size:10px;font-family:"SimHei",黑体;}</style></head><body>';
				const footstr = "</body></html>";
				const str = "<div><img src=" + this.url +"><div>";
				this.popupWin.document.write(headstr + str + footstr);
				this.popupWin.document.close();
				this.popupWin.print();
				this.popupWin.close();
			}
		}

	}
}

</script>

