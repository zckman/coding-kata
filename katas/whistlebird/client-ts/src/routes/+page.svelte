<script>
  import Posts from '../lib/Posts.svelte';
  import Whistle from '../lib/Whistle.svelte';
</script>

<section>
    <div class="text-center">
        <div>
            <h2>
                Whistle your thoughts. Be heard. Connect.
            </h2>
            <a class="lead" href="/register">Join the whistling revolution today!</a>
        </div>
    </div>
    <Whistle></Whistle>
</section>
<section>
    <h2>Whistles</h2>
    <Posts></Posts>
</section>
