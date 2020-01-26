<script>
  import { sanitizeHTML } from './utils.js';
  import Declaration from './Declaration.svelte';
  export let description;
  export let selector;
  export let declarations;

  const sanitizedDescription = description
    ? description
        .split('\n')
        .reduce((html, sentence) => `${html}// ${sanitizeHTML(sentence)}<br />`, '')
    : null;
</script>

<style>
  .rule-set,
  .rule-set__selector {
    font-family: monospace;
    line-height: 1rem;
  }
  .rule-set {
    border: 1px solid #3c3c3c;
    border-left: 0;
    border-right: 0;
    padding: 0.3rem;
    margin-top: -1px;
  }
  .rule-set__selector {
    color: #a7a7a7;
  }
</style>

<div class="rule-set">
  {#if sanitizedDescription}
    <div class="comment">
      {@html sanitizedDescription}
    </div>
  {/if}
  <div class="rule-set__selector">{selector} {'{'}</div>
  {#each declarations as declaration, i}
    <Declaration {...declaration} />
  {/each}
  <div>{'}'}</div>
</div>
