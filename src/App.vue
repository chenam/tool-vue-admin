<template>
  <div id="app">
    <el-container>
        <el-header class="app-header">Amy's tools</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    router
                    unique-opened
                    :default-openeds="openeds"
                >
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" :key="index" v-if="item.isPull">
                            <template slot="title"><i :class="item.iconCls + ' iconfont'"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="item.path + '/' + child.path" v-if="!child.hidden"  :key="child.name">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item
                            :index="item.path + '/' + item.children[0].path"
                            :key="index"
                            v-if='!item.isPull && item.children && item.children.length > 0'
                            :class="$route.path.split('/').indexOf(item.path.replace('/','')) > -1 ? 'is-active' : ''"
                        >
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-menu-item
                            :index="item.path"
                            :key="index"
                            v-if='(!item.isPull && !item.children) || (!item.isPull && item.children && item.children.length === 0)'
                            :class="$route.path === item.path ? 'is-active' : ''"
                        >
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            // 默认打开的左侧菜单
            openeds: []
        }
    },
    mounted () {
        const openeds = [];
        for (let i = 0; i < this.$router.options.routes.length; i++) {
            if (this.$route.path.indexOf(this.$router.options.routes[i].path) > -1) {
                openeds.push(i + '');
                break;
            };
            if (openeds.length > 0) {
                break;
            };
        };
        this.openeds = openeds;
        // console.log(this.$router);
        // console.log(this.$route.path)
    }
}
</script>

<style lang='less'>
.app-header{
    line-height: 60px;
    background: #F7F9F2;
}
.el-main{
    padding : 0px;
}
.el-menu-vertical-demo {
    .is-active{
        outline: 0;
        background-color: rgb(234, 247, 239);
    }
}
</style>
