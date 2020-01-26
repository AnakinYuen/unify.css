<script>
  import RuleSet from './RuleSet.svelte';
  export let category;
  export let ruleSets = [];
  const checkboxId = `checkboxId_${category.toLocaleLowerCase()}`;
</script>

<style>
  .category-checkbox {
    display: none;
  }
  label {
    display: block;
    background: #222;
    border: 1px solid #3c3c3c;
    border-left: 0;
    border-right: 0;
    user-select: none;
    line-height: 2rem;
    padding: 0 0.3rem;
    font-weight: 500;
    cursor: pointer;
  }
  .category__rules {
    height: 0;
    overflow: hidden;
  }
  .category-checkbox:checked ~ .category__rules {
    height: auto;
  }
  .category--global-scope :global(input[type='checkbox']) {
    visibility: hidden;
  }
</style>

<section class={category === 'Global Scope' ? 'category--global-scope' : ''}>
  <input class="category-checkbox" type="checkbox" checked id={checkboxId} />
  <label for={checkboxId}>{category}</label>
  <div class="category__rules">
    <div class="rules-wrapper">
      {#each ruleSets as ruleSet, i}
        <RuleSet {...ruleSet} />
      {/each}
    </div>
  </div>
</section>
