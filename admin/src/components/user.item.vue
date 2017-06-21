<template>
  <div class="user-item">
    <h1>{{username}}</h1>
    <h3>文章列表</h3>
    <el-form :inline = 'true'>
      <el-form-item>
        <el-button @click="addPost.visible=true">添加文章</el-button>
      </el-form-item>
      <!--编辑文章-->
      <el-form-item>
        <el-button @click="">编辑文章</el-button>
      </el-form-item>
      <!--删除文章-->
      <el-form-item>
        <el-button type="danger" @click="deletePost.visible=true">删除文章</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加文章" :visible="addPost.visible">
      <el-form>
        <el-form-item label="标题" label-width="50px">
          <el-input v-model="addPost.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="50px">
          <el-input v-model="addPost.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPost.visible=false">取消</el-button>
        <el-button type="primary" @click="handleAddPost">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示" :visible="deletePost.visible" size="tiny" :before-close="handleClose">
      <span>是否确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletePost = false">取 消</el-button>
        <el-button type="primary" @click="handleDeletePost">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="post" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"></el-table-column>
    </el-table>

    <h3>好友列表</h3>
    <el-form :inline="true">
      <el-form-item v-if="!addFriend.visible">
        <el-button @click="addFriend.visible=true">增加好友</el-button>
      </el-form-item>
      <el-form-item v-if="addFriend.visible">
        <el-select v-model="addFriend.friendId">
          <el-option v-for="u in allUser" :label="u.username" :value="u.id" :key="u.id" v-if="!isFriend(u.id)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="addFriend.visible">
        <el-button>确定</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="friend" border>
      <el-table-column prop="id" label="好友ID"></el-table-column>
      <el-table-column prop="username" label="好友名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {detail, addPost} from './user.item.api';
  import {get_all_user} from './user.api';
export default {
  name: 'user-item',
  data () {
    return {
      addPost: {
          visible: false,
          title: '',
          content: ''
      },
      deletePost: {
        visible: false,
      },
      addFriend: {
          visible: false,
          friendId: '-1'
      },
      id: '-1',
      username: '',
      nickname: '',
      logo: '',
      createdAt: '',
      updatedAt: '',
      post: [],
      friend: [],
      allUser: []
    }

  },
  methods: {
      fetch() {
        detail(this.id, (item)=>{
            this.username = item.username,
            this.nickname = item.nickname,
            this.logo = item.logo,
            this.createdAt = item.createdAt,
            this.updatedAt = item.updatedAt,
            this.post = item.post,
            this.friend = item.friend
        })
      },
      handleAddPost() {
          addPost(this.id, {
              title: this.addPost.title,
              content: this.addPost.content
          }, (item)=>{
              this.post.push(item);
              this.addPost.visible = false;
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val[0].id);

      },
      handleDeletePost() {

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      isFriend(id) {
          return !!this.friend.find((user)=>{
              return user.id == id;
          })
      }
  },
  mounted() {
      console.log(this.$router, this.$router);
      this.id = this.$route.params.id;
      this.fetch();

      get_all_user((list)=>{
          this.allUser = list
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
