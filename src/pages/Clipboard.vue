<template>
    <main-layout>
        <p>Clipboard page</p>
        <input type="text" id="success_form_input" readonly="readonly" v-model="link"/>
        /*button上的这个ref需要命名一个，名字自己取，下面会讲解为什么*/
        <button ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">复制</button>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    export default {
        components: {
            MainLayout
        },
        data() {
            return {
                copyBtn: null, //存储初始化复制按钮事件
                link: 8
            }
        },
        mounted() {
            /*这里使用了刚开始注册到vue原型上的clipboard(使用注册到vue原型的插件的方法就是：this + 注册时命名名字)
            *这里需要用到刚才给button命名的ref的名字，因为这是vue提供的获取DOM的方法，虽然可以通过引入jQuery来获取，但是不推荐这样做，具体原因可以看官方文档和网上论坛搜索
            *这里是在挂载到DOM节点时将button按钮传入clipboard并存储起来，具体原因下面会有详述
            */
            this.copyBtn = new this.clipboard(this.$refs.copy);
        },
        methods: {
            copyLink() {
                /*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/
                let _this = this;
                let clipboard = _this.copyBtn;
                clipboard.on('success', function() {
                    _this.$message({ /*这是使用了element-UI的信息弹框*/
                        message: '复制成功！',
                        type: 'success'
                    });
                    _this.$confirm('确认')
                });
                clipboard.on('error', function() {
                    _this.$message({
                        message: '复制失败，请手动选择复制！',
                        type: 'error'
                    });
                });
            }
        }
    }
</script>
