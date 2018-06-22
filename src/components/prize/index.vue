<template>
    <div class="banner">
        <div class="turnplate">
            <canvas class="item" id="wheelcanvas" width="422px" height="422px">你的浏览器还不支持canvas</canvas>
            <img class="pointer" src="../../assets/image/arrow.png"  v-on:click="pointer"/>
        </div>
    </div>
</template>
<style lang="less" scoped>
.awardRotate{
    background: rgb(230, 45, 45);
    height :100%;
    max-width: 375px;
    margin: 0px auto;
  }
  ul,ol{list-style-type:none;}
  select,input,img,select{vertical-align:middle;}
  input{ font-size:12px;}
  a{ text-decoration:none; color:#000;}
  a:hover{color:#c00; text-decoration:none;}
  .clear{clear:both;}

  /* 大转盘样式 */
  .banner{display:block;width:40%;;margin-left:auto;margin-right:auto;margin-bottom: 20px; padding-top:120px;}
  .banner .turnplate{display:block;width:100%;position:relative;}
  .banner .turnplate canvas.item{width:100%;}
  .banner .turnplate img.pointer{position:absolute;width:31.5%;height:42.5%;left:34.6%;top:23%;cursor: pointer}
</style>
<script>
// import $ from 'jquery';
export default {
    components: {
	},
    created() {
    },
    mounted() {
        this.drawRouletteWheel();
    },
    data() {
        return ({
            rotateList: [
                {value: '50M免费流量包', color: '#FFF4D6'},
                {value: '50M免费流量包', color: '#FFFFFF'},
                {value: '10Q币', color: '#FFF4D6'},
                {value: '谢谢参与', color: '#FFFFFF'},
                {value: '5Q币', color: '#FFF4D6'},
                {value: '10M免费流量包', color: '#FFFFFF'},
                {value: '20M免费流量包', color: '#FFF4D6'},
                {value: '20Q币123456789', color: '#FFFFFF'},
                {value: '30M免费流量包', color: '#FFF4D6'},
                {value: '100M免费流量包', color: '#FFFFFF'},
                {value: '2Q币', color: '#FFF4D6'},
                {value: 'VUE示例', color: '#FFFFFF'}
            ],
            startAngle: 0,
            outsideRadius: 192,
            textRadius: 155,
            insideRadius: 68
        })
    },
    methods: {
        drawRouletteWheel() {
            const self = this;
            var canvas = document.getElementById('wheelcanvas');
            if (canvas.getContext) {
                // 根据奖品个数计算圆周角度
                var arc = Math.PI / (this.rotateList.length / 2);
                var ctx = canvas.getContext('2d')
                // //设置对象起始点和终点
                // ctx.moveTo(10,10);
                // ctx.lineTo(200,200);
                // //设置样式
                // ctx.lineWidth = 2;
                // ctx.strokeStyle = "#F5270B";
                // //绘制
                // ctx.stroke();
                // 在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422, 422)

                ctx.strokeStyle = '#FFBE04'
                ctx.font = '16px Microsoft YaHei'
                this.rotateList.forEach((val, ind, arr) => {
                    var angle = self.startAngle + ind * arc;
                    ctx.fillStyle = val.color;
                    ctx.beginPath();
                    // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）;
                    // 规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
                    ctx.arc(211, 211, self.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, self.insideRadius, angle + arc, angle, true)
                    ctx.stroke();
                    ctx.fill();
                    ctx.save();
                    // ----绘制奖品开始----
                    ctx.fillStyle = '#E5302F';
                    var text = val.value;
                    var lineHeight = 17;
                    // translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * self.textRadius, 211 + Math.sin(angle + arc / 2) * self.textRadius)

                    // rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf('M') > 0) { // 流量包
                        var texts = text.split('M');
                        texts.forEach((val, ind, arr) => {
                            ctx.font = ind === 0 ? 'bold 1.25em Microsoft YaHei' : '1em Microsoft YaHei';
                            if (ind === 0) {
                                // fillText	在画布上绘制"被填充的"文本。
                                // measureText 返回包含指定文本宽度的对象
                                ctx.fillText(val + 'M', -ctx.measureText(val + 'M').width / 2, ind * lineHeight)
                            } else {
                                ctx.fillText(val, -ctx.measureText(val).width / 2, ind * lineHeight)
                            }
                        })
                    } else if (text.indexOf('M') === -1 && text.length > 6) { // 奖品长度超过一定范围
                        text = text.substring(0, 6) + '||' + text.substring(6);
                        var textst = text.split('||');
                        textst.forEach((val, ind, arr) => {
                            ctx.fillText(val, -ctx.measureText(val).width / 2, ind * lineHeight)
                        })
                    } else {
                        // 在画布上绘制填色的文本。文本的默认颜色是黑色
                        // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
                    }

                    ctx.restore()
                    // 绘制奖品结束
                })
            }
        },
        pointer() {

        }
    }
}
</script>
