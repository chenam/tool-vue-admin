<template>
    <div>
        <div class="bread">
            <ul>
                <li
                    v-for="(item, index) in liList"
                    :class="{active : activeLi === index}"
                    :key="index"
                    @click='liSwitch(item, index)'
                >
                    {{item.value}}
                </li>
            </ul>
        </div>
        <template v-if="activeLi === 0">
            <canvasWheel></canvasWheel>
        </template>
        <template v-if="activeLi === 1">
            <cssWheel></cssWheel>
        </template>

    </div>
</template>
<style lang="less" scoped>
// 切换菜单样式
.bread{
    padding : 20px;
    ul{
        overflow: hidden;
    }
    li.active{
        background: #F7F9F2;
        border: 1px solid #30AB63;
    }
    li{
        float: left;
        padding : 10px;
        border-radius: 3px;
        margin-right: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
}
</style>
<script>
import canvasWheel from './module/canvas';
import cssWheel from './module/css';
export default {
    components: {
        canvasWheel,
        cssWheel
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
            rotateList: [
                {value: '70M免费流量包', color: '#FFF4D6'},
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
            ]
        })
    },
    methods: {
        liSwitch(item, index) {
            this.activeLi = index;
        }
    }
}
</script>
