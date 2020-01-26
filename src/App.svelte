<script>
  import { json } from './store.js';
  import Logo from './Logo.svelte';
  json.subscribe(console.log);
</script>

<header>
  <Logo />
  <span class="icon-download" />
</header>
<div class="editor" />
<iframe title="preview" src="preview.html" />
