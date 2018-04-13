<template>
  <div id="app">
    <el-container>
        <el-header class="app-header">Amy's tools</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    router
                >
                    <el-menu-item index="/">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-welcome"></use>
                        </svg>
                        <span slot="title">welcome</span>
                    </el-menu-item>
                    <el-menu-item index="/tree">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tree"></use>
                        </svg>
                        <span slot="title">树操作</span>
                    </el-menu-item>
                    <el-menu-item index="/img">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-img"></use>
                        </svg>
                        <span slot="title">图片查看</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-header{
    line-height: 60px;
    background: #F7F9F2;
}
.el-main{
    padding : 0px;
}
</style>
