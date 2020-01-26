<script>
  import { onMount } from 'svelte';
  import { json, showPopup, popupInput } from './store.js';
  import { SMALL_MOBILE_DEVICE_WIDTH, getTextWidth, setNestedObject } from './utils.js';
  export let property;
  export let value;
  export let comment = null;
  export let reference = null;
  export let options = null;
  export let variable = null;

  export let disable = false;

  export let path;

  let declarationChecked = !disable;

  let inputValue;
  let width = 0;
  let overflow = false;

  const updateTextWidth = () => {
    if (inputValue) {
      width = getTextWidth(inputValue);
      if (width > SMALL_MOBILE_DEVICE_WIDTH) {
        overflow = true;
      }
    }
  };

  const update = (value, comment, reference) => {
    const keyValue = {
      value,
      disable: !declarationChecked,
    };
    if (comment !== undefined) {
      keyValue.comment = comment;
    }
    if (reference !== undefined) {
      keyValue.reference = reference;
    }
    json.update(current => {
      return setNestedObject(current, path, keyValue);
    });
    updateTextWidth();
  };
  const openPopup = () => {
    showPopup.set(true);
    popupInput.set({ options, value, variable, update });
  };
  const updateValue = event => {
    update(event.target.value);
  };
  const onCheck = () => {
    json.update(current => {
      return setNestedObject(current, path, { disable: !declarationChecked });
    });
  };

  onMount(updateTextWidth);
</script>

<style>
  .declaration,
  .declaration-wrapper {
    font-family: monospace;
    display: flex;
  }
  .declaration {
    line-height: calc(1rem + 1px);
    align-items: center;
  }
  .declaration-wrapper {
    position: relative;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: baseline;
  }
  .declaration__checkbox {
    margin: 0 0.2em;
  }
  .declaration__checkbox:not(:checked) + .declaration-wrapper {
    text-decoration: line-through #b2b2b2;
  }
  @supports not (text-decoration: line-through #b2b2b2) {
    .declaration__checkbox:not(:checked) + .declaration-wrapper::after {
      content: '';
      border-bottom: 1px solid #b2b2b2;
      width: 100%;
      position: absolute;
      right: 0;
      top: 50%;
    }
  }
  @media (hover: hover) {
    .declaration__checkbox {
      opacity: 0;
    }
  }
  :global(.rule-set:hover) .declaration__checkbox,
  .declaration__checkbox:not(:checked) {
    opacity: 1;
  }
  .declaration__property,
  .declaration__value {
    font-family: monospace;
    line-height: 1rem;
  }
  .declaration__property {
    color: #5eadf5;
  }
  .declaration__value {
    border: 0;
    padding: 0;
    background: transparent;
    color: #eb75d9;
    font-size: 1rem;
    height: 1rem;
    min-width: 0.5625rem;
    max-width: 320px; /* SMALL_MOBILE_DEVICE_WIDTH */
  }
  span.declaration__value {
    color: #eb7575;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .declaration__value:hover:not(:focus) {
    box-sizing: content-box;
    border-bottom: 1px dashed #7f7f7f;
  }
  .declaration__value:focus {
    color: #000;
    background: #fff;
  }
  .icon-info:hover {
    position: relative;
    color: #fff;
  }
</style>

<div class="declaration">
  <input
    type="checkbox"
    class="declaration__checkbox"
    on:change={onCheck}
    bind:checked={declarationChecked} />
  <div class="declaration-wrapper">
    <span class="declaration__property">{property}</span>
    <span>:&nbsp;</span>
    {#if options || variable}
      <span class="declaration__value" on:click={openPopup}>
        {variable ? `var(${variable})` : value}
      </span>
    {:else}
      <input
        class="declaration__value"
        {value}
        bind:this={inputValue}
        on:keyup={updateTextWidth}
        on:change={updateValue}
        style="width:{width}px;{overflow ? 'text-overflow:ellipsis;' : ''}" />
    {/if}
    <span>;</span>
    {#if reference}
      <span class="icon-info" title={reference} />
    {/if}
    {#if comment}
      <span class="comment">&nbsp;// {comment}</span>
    {/if}
  </div>
</div>
