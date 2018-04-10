<template>
	<span class="tree-expand">
	    <span
            class="tree-label"
            v-show="dataBack.isEdit"
        >
			<el-input
                class="edit"
                size="mini"
                autofocus
                v-model.trim="dataBack.title"
                placeholder="title"
                :ref="'treeInput'+dataBack.num"
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)">
            </el-input>
		</span>
		<span v-show="!dataBack.isEdit" class='right-w4' :title='dataBack.title'>
			<span>{{dataBack.title}}</span>
		</span>
        <span class='action-wrapper'>
            <template v-if='!dataBack.isEdit'>
                <i
                    class='icon-wrapper el-icon-edit'
                    @click.stop='nodeEdit(STORE, DATA, NODE)'
                ></i>
                <i
                    class='icon-wrapper el-icon-delete'
                    @click.stop='nodeDel(STORE, DATA, NODE)'
                ></i>
                <i
                    class='icon-wrapper el-icon-plus'
                    @click.stop='nodeAdd(STORE, DATA, NODE)'
                ></i>
            </template>
            <template v-if='dataBack.isEdit'>
                <span class="icon-check" @click.stop='nodeCheck(STORE, DATA, NODE)'>保存</span>
                <span class="icon-cancel" @click.stop='nodeCancel(STORE, DATA, NODE)'>取消</span>
            </template>
        </span>
        <span
            v-show="dataBack.isEdit"
            class='right-w1'
            :style='{width : widthW1 + "px"}'
        >
            <el-input
                class="edit-w1"
                size="mini"
                v-model.trim="dataBack.c"
                placeholder="c"
                :ref="'c'+dataBack.num"
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
        </span>
        <span
            v-show="dataBack.isEdit"
            class='right-w2'
            :style='{width : widthW1 + "px"}'
        >
            <el-input
                class="edit-w1"
                size="mini"
                v-model.trim="dataBack.b"
                :ref="'b'+dataBack.num"
                placeholder="b"
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
        </span>
        <span
            v-show='dataBack.isEdit'
            class='right-w3'
            :style='{width : widthW2 + "px"}'
        >
            <el-input
                class="edit-w1"
                size="mini"
                v-model.trim="dataBack.a"
                placeholder="a"
                :ref="'a'+dataBack.num"
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
        </span>
        <span class='right-w1' v-show="!dataBack.isEdit" :style='{width : widthW1 + "px"}'>
            <span>{{dataBack.c}}</span>
        </span>
        <span class='right-w2' v-show="!dataBack.isEdit" :style='{width : widthW1 + "px"}'>
            <span>{{dataBack.b}}</span>
        </span>
        <span class='right-w3' v-show="!dataBack.isEdit" :style='{width : widthW2 + "px"}'>
            <span>{{dataBack.a}}</span>
        </span>
	</span>
</template>

<script>

	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE', 'maxNum', 'widthD'],
        data() {
            return ({
                dataBack: {}
            })
        },
        watch: {
            DATA: {
                handler(newData, oldData) {
                    // console.log(newData,'newData')
                    this.$nextTick(() => {
                        const {...DATA} = newData;
                        this.dataBack = DATA;
                    });
                },
                deep: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                const {...data} = this.DATA;
                this.dataBack = data;
            });
        },
        computed: {
            // b和c
            widthW1() {
                return this.widthD * 0.15;
            },
            // 作者
            widthW2() {
                return this.widthD * 0.15;
            }
        },
		methods: {
			nodeAdd(s, d, n) { // 新增
				this.$emit('nodeAdd', s, d, n)
			},
			nodeEdit(s, d, n) { // 编辑
				this.$emit('nodeEdit', s, d, n);
			},
			nodeDel(s, d, n) { // 删除
				this.$emit('nodeDel', s, d, n)
			},
			nodeEditPass(s, d, n) { // 编辑完成
			},
            nodeCheck(s, d, n) { // 编辑确定
                // 校验
                if (!this.dataBack.title) {
                    this.$message.warning('title不能为空');
                    return;
                };
                this.$emit('nodeCheck', s, d, n, this.dataBack);
            },
            nodeCancel(s, d, n) { // 编辑取消
                console.log(this.DATA);
                this.dataBack.title = this.DATA.title;
                this.dataBack.a = this.DATA.a;
                this.dataBack.b = this.DATA.b;
                this.dataBack.c = this.DATA.c;
                this.$emit('nodeCancel', s, d, n)
            },
			nodeEditFocus() {
				// 阻止点击节点的事件冒泡
			}
		}
	}
</script>

<style lang='less' scoped>
@theme-color:#9d2932;
	.tree-expand .tree-label.tree-new{
		font-weight:600;
	}
	.tree-expand .tree-label{
		font-size:0.9em;
	}
	.tree-expand .tree-label .edit{
		width:25%;
	}
	.tree-expand .tree-btn{
		display:none;
		float:right;
		margin-right:20px;
	}
	.tree-expand .tree-btn i{
		color:#8492a6;
		font-size:0.9em;
		margin-right:3px;
	}
    .tree-expand{
        width :100%;
        .left{
            float : left;
        }
        .right{
            float: right;
        }
        .mb15{
            margin-bottom : 15px;
        }
        .action-wrapper{
            float: right;
            font-size: 0px;
            width : 55px;
            margin-left :2px;
        }
        .icon-wrapper{
            display: inline-block;
            width: 15px;
            height: 15px;
            padding-top: 3px;
            // margin-right :2px;
            vertical-align: middle;
            background-repeat : no-repeat;
            cursor: pointer;
            font-size : 14px;
            font-weight: normal;
            color : @theme-color;
        }
        .icon-check,.icon-cancel{
            display : inline-block;
            font-size: 12px;
            color: @theme-color;
            padding-top :3px;
        }
        .icon-check{
            margin-right :3px;
        }
        .right-w1,.right-w2,.right-w3{
            float : right ;
            // width : 60px;
            // min-width :60px;
            width : 80px;
            margin-right :0px;
            >span{
                display: inline-block;
                min-height:13px;
            }
        }
        .right-w2{
            margin-right :10px;
        }
        // 作者
        .right-w3{
            width : 15%;
            margin-right :10px;
        }
        .right-w4{
            display : inline-block;
            width : 28%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
            span{
                display : inline-block;
                width :100%;
                // white-space:nowrap;
                // overflow:hidden;
                // text-overflow:ellipsis;
            }
        }
        .edit-w1{
            width : 100%;
        }
    }
</style>
<style lang="less">
.mulu-set-wrapper{
    .el-tree{
        border:none;
        font-size :13px;
        .el-input--mini .el-input__inner{
            height :22px;
            line-height :22px;
        }
    }
    .el-tree-node.is-expanded>.el-tree-node__children{
        width : 100%;
    }
    .el-tree__empty-text{
        font-size : 15px;
    }
}
</style>
