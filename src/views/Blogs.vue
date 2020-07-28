<template>
    <div>
        <Header></Header>
        <div class="block">
            <el-timeline>
                <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
                    <el-card>
                        <h4>
                            <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
                            {{blog.title}}
                            </router-link>
                        </h4>
                        <el-button @click="del(blog.id)" style="float: right;" type="danger" plain icon="el-icon-delete" circle></el-button>
                        <el-button @click="cplink(blog.id)" style="float: right; margin-right: 10px" type="success" plain icon="el-icon-link" circle></el-button>
                        <el-button @click="edit(blog.id)" style="float: right;" type="primary" plain icon="el-icon-edit" circle></el-button>
                        <p>
                            {{blog.description}}
                        </p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>

            <el-pagination class="mpage"
                    background
                    layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           :total="total"
                           @current-change="page"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "Blogs",
        components:{Header},
        data(){
            return{
                blogs:{},
                currentPage:1,
                total:0,
                pageSize:5
            }
        },
        methods:{
            page(currentPage){
                const _this=this
                this.$axios.get("/blogs?currentPage="+currentPage).then(res=>{
                    _this.blogs=res.data.data.records
                    _this.currentPage=res.data.data.currentPage
                    _this.total=res.data.data.total
                    _this.pageSize=res.data.data.size
                })
            },
            //通过id删除指定文章[v]
            del(id){
                //判断用户是否登录:无登录则跳转到登录页
                const token = this.$store.getters.getUser;
                const _this=this
                if(token){
                    //弹框提示
                    this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //通过id删除指定文章
                        this.$axios.get("/blog/delete/"+id).then(res=>{
                            if(res.data.code===200){
                                this.$message({type: 'success', message: '删除成功!'});
                                //刷新页面并重新加载数据
                                _this.$router.go(0);
                            }else {
                                this.$message({type: 'error', message: '删除失败!'});
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除~'
                        });
                    });
                }else {
                    this.$message({type: 'error', message: '您没有权限！!'});
                }
            },
            //复制文章链接[v]
            dataProcessing (id) {
                this.linkUrl = window.location.href + '/' + id
            },
            cplink: function (id) {
                const _this=this
                this.dataProcessing(id)
                const lk = this.linkUrl;
                this.$copyText(this.linkUrl).then(function (e) {
                    _this.$message.success("链接复制成功 : "+lk);
                }, function (e) {
                    _this.$message.success("链接复制失败 !");
                })
            },
            edit:function (id) {
                //判断用户是否登录:无登录则跳转到登录页
                const token = this.$store.getters.getUser;
                if(token){
                    this.$router.push({name:'BlogEdit',params: {blogId:id}})
                }else{
                    this.$message({type: 'error', message: '您没有权限！!'});
                }
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
.mpage{
    margin: 0 auto;
    text-align: center;
}
</style>