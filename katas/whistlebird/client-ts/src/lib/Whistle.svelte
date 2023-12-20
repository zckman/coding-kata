<script lang="ts">
  import Api from "$lib/Api";
  import type {Whistle} from "$lib/ApiResults";

  let message = '';
  let token = '';

  async function submitWhistle() {
    const whistle: Whistle = { message, token };
    await Api.postWhistle(whistle);
    //could automatically add whistle to list or refresh list
  }
</script>


<form on:submit|preventDefault={submitWhistle}>
    <div class="form-group">
        <label for="message">Whistle:</label>
        <textarea id="message"
                  class="form-control"
                  rows="3"
                  bind:value={message}
                  required
        ></textarea>
    </div>

    <div class="form-group">
        <label for="token">Token (optional):</label>
        <input id="token" class="form-control" bind:value={token} />
    </div>

    <button type="submit" class="btn btn-primary">Whistle</button>
</form>
