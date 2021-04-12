<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="less">
.size {
    width: 100%;
    height: 100%;
}
html,
body {
    .size;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", Arial, sans-serif;
}

#app {
    .size;
}
</style>
