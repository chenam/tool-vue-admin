<template>
    <div>
        <div class="banner">
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in rotateList" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                {{item.value}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href='https://blog.csdn.net/landl_ww/article/details/78467991' target="_blank">参考链接1</a>
        </div>
        
        
        
    </div>
</template>
<style lang="less" scoped>

.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 18.4375rem;
  height: 18.4375rem;
  background: url("../img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 5.3125rem;
  height: 5.3125rem;
  cursor: pointer;
}
.wheel-pointer {
  width: 5.3125rem;
  height: 5.3125rem;
  background: url("../img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: 0;
  left: 8.3125rem;
  transform: rotate(20deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 2.8rem;
  left: 10.8rem;
  transform: rotate(67deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 6.4rem;
  left: 10.6rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 9rem;
  left: 8.2125rem;
  transform: rotate(-210deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 9.2125rem;
  left: 4.4rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 6.3875rem;
  left: 1.9rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 2.8rem;
  left: 1.8125rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 4.5rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}
.prize-pic img {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
}
</style>
<style lang='less'>
html{font-size:14px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:16px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:18px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:20px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:24px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:28px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:28px}}
@media screen and (min-width:800px){html{font-size:28px}}
</style>
<script>
// import $ from 'jquery';
export default {
    components: {
	},
    created() {
    },
    mounted() {
    },
    data() {
        return ({
            liList: [
                {value: 'canvas圆盘抽奖'},
                {value: 'css圆盘抽奖'}
            ],
            activeLi: 0,
            // 
            rotateList: [
                {
                    icon: require("../img/bean_500.png"), // 奖品图片
                    count: 10, // 奖品数量
                    value: "易趣豆", // 奖品名称
                    isPrize: 1 // 该奖项是否为奖品
                },
                {
                    icon: require("../img/bean_five.png"),
                    count: 5,
                    value: "豆",
                    isPrize: 1
                },
                {
                    icon: require("../img/bean_one.png"),
                    count: 10,
                    value: "易趣豆",
                    isPrize: 1
                },
                {
                    icon: require("../img/point_five.png"),
                    count: 5,
                    value: "积分",
                    isPrize: 1
                },
                {
                    icon: require("../img/point_ten.png"),
                    count: 10,
                    value: "积分",
                    isPrize: 1
                },
                {
                    icon: require("../img/bean_500.png"),
                    count: 10,
                    value: "易趣豆",
                    isPrize: 1
                },
                {
                    icon: require("../img/give_up.png"),
                    count: 0,
                    value: "未中奖",
                    isPrize: 0
                },
                {
                    icon: require("../img/bean_500.png"),
                    count: 10,
                    value: "易趣豆",
                    isPrize: 1
                }
            ],
            startAngle: 0,
            outsideRadius: 192,
            textRadius: 155,
            insideRadius: 68,
            click_flag: true, //是否可以旋转抽奖，
            start_rotating_degree: 0, //初始旋转角度，
            rotate_angle_pointer: 0, //指针将要旋转的度数,
            rotate_angle: 0, //将要旋转的角度,
            rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制,
            rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        })
    },
    methods: {
        liSwitch(item,index){
            this.activeLi = index;
        },
        rotate_handle() {
            // 
            this.rotating();
        },
        rotating(index) {
            if (!this.click_flag) {
                return;
            };
            // 可能旋转到的角度
            let arcs = [];
            
            this.rotateList.forEach((val, ind, arr) => {
                let _arcs = (2 * ind + 1) * 180 / arr.length;
                arcs.push(_arcs); 
            });
            console.log(arcs);
            var _random = Math.random();
            var random = Math.ceil(_random * arcs.length) //随机下标
            var result_index = index || random; // 最终要旋转到哪一块，对应prize_list的下标
            var rand_circle = 6; // 附加多转几圈，6
            var during_time = 5; // 默认为1s
            this.click_flag = false; // 旋转结束前，不允许再次触发
            
            // 转动圆盘
            var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 -
            arcs[result_index - 1] -
            this.start_rotating_degree % 360 + 720; // 这里为计算旋转的角度，考虑第一次旋转后的结果
            this.rotate_angle = "rotate(" + rotate_angle + "deg)";
            console.log(arcs,'ss')

            this.start_rotating_degree = rotate_angle;
            console.log(this.rotate_angle,result_index - 1,_random);
            setTimeout(() => {
                let _item = this.rotateList[result_index - 1];
                if(_item.isPrize){
                    alert(_item.count + _item.value);
                }else{
                    alert(_item.value);
                }
                
                this.click_flag = true;
                // that.game_over(this.i);
            }, during_time * 1000 + 1500); // 延时，保证转盘转完
        }
    }
}
</script>
