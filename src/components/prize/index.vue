<template>
    <div>
        <canvas class="item" id="wheelcanvas" width="422px" height="422px">你的浏览器还不支持canvas</canvas>
        <img class="pointer" src="../../assets/image/arrow.png"  v-on:click="pointer"/>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
import $ from 'jquery';
export default {
    components: {
	},
    created(){
        
    },
    mounted(){
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
                {value: '20Q币 ', color: '#FFFFFF'}, 
                {value: '30M免费流量包', color: '#FFF4D6'}, 
                {value: '100M免费流量包', color: '#FFFFFF'}, 
                {value: '2Q币', color: '#FFF4D6'}, 
                {value: 'VUE示例', color: '#FFFFFF'}
            ],
            startAngle: 0,
            outsideRadius: 192,
            textRadius: 155,
            insideRadius: 68,
        })
    },
    methods: {
        drawRouletteWheel(){
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
                this.rotateList.forEach((val, ind , arr) => {
                    var angle = self.startAngle + ind * arc;
                    ctx.fillStyle = val.color;
                    ctx.beginPath(); 
                    // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）;
                    // 规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
                    ctx.arc(211, 211, self.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, self.insideRadius, angle + arc, angle, true)
                    ctx.stroke();
                    // ctx.fill();
                    // ctx.save()
                })
            }
        },
        pointer(){

        }
    },
    
}
</script>
