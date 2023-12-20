<script lang="ts">
  import { onMount } from 'svelte';
  import Api from './Api';
  import Post from './Post.svelte';
  import postStore from './store';

  let posts;

  $: posts = $postStore;

  onMount(async () => {
    Api.getPosts().then((p) => {postStore.set(p)})
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
