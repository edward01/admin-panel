<template>
	<table>
		<thead>
		<tr>
			<th>Title</th>
			<th>Category</th>
			<th>Public</th>
			<th>Path</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="post in posts" :key="post._id">
			<td>
				<router-link :to="{name: 'editPost', params: {postId: post._id}}">
					{{post.title}}
				</router-link>
			</td>
			<td>
				<router-link :to="{name: 'editCategory', params: {categoryId: post.category._id}}">
					{{post.category.name}}
				</router-link>
			</td>
			<td><i v-if="post.isPublic" class="el-icon-check"/></td>
			<td>{{post.path}}</td>
			<td>
				<i @click.prevent="remove(post._id)" class="el-icon-delete"/>
			</td>
		</tr>
		</tbody>
	</table>
</template>
<script>
  import { usePostsList } from '../compositions/posts'

  export default {
    setup () {
      return usePostsList()
    }
  }
</script>
<style scoped lang="scss">
</style>
