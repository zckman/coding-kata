<script lang="ts">
  export let post;
</script>

<div class="media">
    <div class="mr-3" style="width: 100px">
    {#if post?.user?.image}
        <img src="{post?.user?.image}" class="img-fluid" alt={post?.user?.name}>
    {/if}
    </div>
    <div class="media-body">
        <h5 class="mt-0">{post?.user?.name ?? '?????????'}</h5>
        <p>{post.created_at}</p>
        <p>{post.message}</p>
    </div>
</div>
