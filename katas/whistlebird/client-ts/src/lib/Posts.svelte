<script lang="ts">
  import { onMount } from 'svelte';
  import Api from './Api';
  import Post from './Post.svelte';

  interface User {
    name: string;
    image: string;
  }

  interface PostData {
    user: User;
    message: string;
    created_at: string;
  }

  let posts: PostData[] = [];

  onMount(async () => {
    posts = await Api.getPosts();
  });
</script>


{#each posts as post (post.created_at)}
    <div class="post mb-4 mt-4 shadow-sm">
        <Post class="post" {post} />
    </div>
{/each}

<style lang="scss">
  .post {
  }
</style>
