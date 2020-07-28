<template>

    <div class="m-content">
        <Header></Header>
        <div class="mblog">
            <h2>{{ blog.title }}</h2>
            <el-divider></el-divider>
            <div class="content markdown-body" v-html="blog.content"></div>

            <el-link icon="el-icon-edit" v-if="ownBlog" style="position: absolute;right: 0;bottom: 0"><router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link></el-link>
        </div>
    </div>
</template>

<script>
    import 'github-markdown-css/github-markdown.css'
    import Header from "../components/Header";
    export default {
        name: "BlogDetail",
        components:{
            Header
        },
        data(){
            return{
                blog:{
                    userId:null,
                    title:"",
                    content:"",
                    description:""
                },
                ownBlog:false
            }
        },
        methods:{
            getBlog() {
                const blogId = this.$route.params.blogId
                const _this = this
                this.$axios.get('/blog/' + blogId).then((res) => {
                    console.log(res)
                    console.log(res.data.data)
                    _this.blog = res.data.data
                    var MarkdownIt = require('markdown-it'),
                        md = new MarkdownIt();
                    var result = md.render(_this.blog.content);
                    _this.blog.content = result
                    // 判断是否是自己的文章，能否编辑
                    _this.ownBlog =  (_this.blog.userId === _this.$store.getters.getUser.id)
                });
            }
        },
        created() {
            this.getBlog()
        }
    }
</script>

<style scoped>
.mblog{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
    position: relative;
}
</style>