<script lang="ts">
  import Api from "$lib/Api";
  import type {UserAuth} from "$lib/ApiResults";

  let name = '';
  let password = '';
  let password2 = '';
  let token;

  async function submit() {
    const auth: UserAuth = {name, password}
    await Api.register(auth)
    token = await Api.token(auth)
  }
</script>

<form on:submit|preventDefault={submit}>
    <label for="message">Name:</label>
    <input id="message" required bind:value={name} />

    <label for="password1">Password:</label>
    <input id="password1" required type="password" bind:value={password} />

    <label for="password2">Password:</label>
    <input id="password2" required type="password" bind:value={password2} />

    <button type="submit" disabled={password !== password2 || password.length === 0}>Register</button>
</form>
{#if token}
    Token <code>{token}</code>
    <button on:click={navigator.clipboard.writeText(token)}>copy</button>
{/if}
