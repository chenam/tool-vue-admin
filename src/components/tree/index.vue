<!--
    author:amin
    desc:目录配置
    期刊： 目录名 - 作者 - 开始页码 - 结束页码
    图书： 目录名 - 开始页码 - 结束页码
-->
<template>
	<div class="mulu-set-wrapper">
        <h6 class='mulu-title'>
                树的增删改查
        </h6>
        <div class='mulu-set-main'>
            <div class='clearfix mb15'>
                <span class='left w1' >title</span>
                <span class='right w4' :style='{width : widthW1 + "px"}'>c</span>
                <span class='right w3' :style='{width : widthW1 + "px"}'>b</span>
                <span class='right w2' :style='{width : widthW2 + "px"}'>a</span>
            </div>
            <div v-loading='blockLoading' class='tree-wrapper'>
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    highlight-current
                    node-key="num"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    @node-click="handleNodeClick"
                    draggable
                    :allow-drag='isAllowDrag'
                    :allow-drop='isAllowDrop'
                >
                </el-tree>
                <div class='addTop'>
                    <a href='javascript:;' @click="handleAddTop">添加一级</a>
                </div>
            </div>
        </div>
	</div>
</template>
<style lang="less" scoped>
.mulu-set-wrapper{
    padding-bottom : 20px;
    margin-bottom: 20px;
    border :1px solid #ccc;
    .mulu-title{
        height: 38px;
        line-height: 38px;
        background : #faf9f7;
        text-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        margin-bottom : 25px;
    }
    .left{
        float : left;
    }
    .right{
        float: right;
    }
    .w1{
        font-size : 13px;
        width : 25%;
        margin-left : 24px;
    }
    .w2{
        font-size : 13px;
        width :15%;
        white-space:nowrap;
        // min-width :75px;
        margin-right: 10px;
    }
    .w3{
        font-size : 13px;
        width :15%;
        white-space:nowrap;
        // min-width :50px;
        margin-right :10px;
    }
    .w4{
        font-size : 13px;
        width :15%;
        white-space:nowrap;
        // min-width :50px;
        margin-right :57px;
    }
    .mb15{
        margin-bottom : 15px;
    }
    .addTop{
        margin-left : 24px;
        margin-bottom: 20px;
        padding-top:20px;
        a{
            color : #9d2932;
        }
    }
}
</style>
<style lang="less">
.mulu-set-wrapper{
    .el-tree{
        border:none;
    }
}
</style>

<script>
import $ from 'jquery';
import TreeRender from './index_render.vue'
export default {
    props: {
    },
    computed: {
        // 开始页码和结束页码
        widthW1() {
            return this.widthD * 0.15;
        },
        // 作者
        widthW2() {
            return this.widthD * 0.15
        }
    },
	mounted: function() {
        const self = this;
        this.widthD = $('.mulu-set-wrapper').width();
        $(window).resize(function() {
            self.widthD = $('.mulu-set-wrapper').width();
        });
	},
	data() {
		return ({
            maxNum: 1, // 新增节点开始id
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            widthD: '',
            blockLoading: false
		})
	},
    updated() {
        this.widthD = $('.mulu-set-wrapper').width();
    },
	methods: {
        // 获取目录数据
        getMuluData() {
            const self = this;
            let _num = 0;
            let addV = function(arr) {
                arr.forEach((val, ind, arr) => {
                    // isAdd 用来标记是否是新增好的。
                    if (val.children && val.children.length !== 0) { // children 有值
                        val.num = ++_num;
                        self.maxNum = _num;
                        val.isAdd = true;
                        val.isEdit = false;
                        addV(val.children);
                    } else {
                        val.isEdit = false;
                        val.num = ++_num;
                        val.isAdd = true;
                        self.maxNum = _num;
                    }
                })
            };
            addV([]);
            this.treeData = [];
        },
        handleAdd(s, d, n) {
            if (n.level >= 6) {
                this.$message.warning('最多只支持六级目录！')
                return false;
            };
            // 添加数据
            let _obj = {
                key: ++this.maxNum,
                title: '',
                a: '',
                b: '',
                c: '',
                isEdit: true,
                isAdd: false,
                children: []
            };
            if (d.children) {
                d.children.push(_obj);
            } else {
                d.children = [];
                d.children.push(_obj);
            };
            // 展开节点
            if (!n.expanded) {
                n.expanded = true;
            }
        },

        handleDel(s, d, n) {
            // s.remove(d);
            let delNode = () => {
                let list = n.parent.data.children || n.parent.data;// 节点同级数据
                let _index = 99999;// 要删除的index
                list.map((c, i) => {
                    if (d.key === c.key) {
                        _index = i;
                    }
                });
                list.splice(_index, 1);
            };
            if (d.children && d.children.length !== 0) {
                this.$confirm('此节点有子级，确认删除？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delNode()
                }).catch(() => {
                    return false;
                })
            } else {
                delNode();
            };
        },
        handleEdit(s, d, n) {
            d.isEdit = true;
        },
        nodeCancel(s, d, n) {
            if (d.isAdd) {
                d.isEdit = false;
            } else {
                let delNode = () => {
                    let list = n.parent.data.children || n.parent.data;// 节点同级数据
                    let _index = 99999;// 要删除的index
                    list.map((c, i) => {
                        if (d.key === c.key) {
                            _index = i;
                        }
                    });
                    list.splice(_index, 1);
                };
                delNode();
            }
        },
        nodeCheck(s, d, n, data) {
            d.title = data.title;
            d.a = data.a;
            d.b = data.b;
            d.c = data.c;
            d.isEdit = false;
            d.isAdd = true;
            console.log(this.treeData);
        },
        handleNodeClick(d, n, s) {
        },
        handleAddTop() {
            this.treeData.push({
                key: ++this.maxNum,
                title: '',
                isEdit: true,
                isAdd: false,
                b: '',
                c: '',
                children: []
            })
        },
        // 是否允许拖动
        isAllowDrag(node) {
            if (node.data.isAdd) {
                return true;
            } else {
                return false;
            }
        },
        // 能否被放置
        isAllowDrop(draggingNode, dropNode) {
            if (dropNode.data.isAdd) {
                return true;
            } else {
                return false;
            }
        },
        renderContent(h, { node, data, store }) {
            const self = this;
            return h(TreeRender, {
                props: {
                    DATA: data,
                    NODE: node,
                    STORE: store,
                    widthD: self.widthD
                },
                on: {
                    nodeAdd: (s, d, n) => self.handleAdd(s, d, n),
                    nodeEdit: (s, d, n) => self.handleEdit(s, d, n),
                    nodeDel: (s, d, n) => self.handleDel(s, d, n),
                    nodeCheck: (s, d, n, data) => self.nodeCheck(s, d, n, data),
                    nodeCancel: (s, d, n) => self.nodeCancel(s, d, n)
                }
            });
        }
}
}
</script>
