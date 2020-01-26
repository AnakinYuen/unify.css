<script>
  import { showPopup, popupInput } from './store.js';
</script>

<style>
  #popup-checkbox {
    display: none;
  }
  .popup {
    display: none;
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 1;
  }
  #popup-checkbox:checked + .popup {
    display: block;
  }
  .popup-input {
    font-family: monospace;
    background: #252525;
    width: calc(100% - 1rem);
    max-width: 500px;
    margin: auto;
    padding: 5px 0;
    box-shadow: 0 0 5px 0px #000;
  }
  .popup-input-wrapper {
    padding: 5px;
    padding-top: 0;
  }
  .popup-input-wrapper input {
    font-family: monospace;
    background: #3c3c3c;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    color: #fff;
    padding: 5px 10px;
    width: 100%;
  }
  .popup-input-wrapper input:focus {
    border-color: #175b89;
  }
  .popup-input-wrapper input::placeholder {
    color: #c7c7c7;
  }
  .popup-option {
    padding: 0 5px;
    color: #c8c8c8;
    display: flex;
    justify-content: space-between;
  }
  .popup-option .comment {
    flex-shrink: 0;
  }
  .popup-option__reference {
    font-family: "Roboto", sans-serif;
    margin-left: 5px;
    font-size: 0.6rem;
    color: #969696;
  }

  @media screen and (min-width: 768px) {
    .popup-input {
      margin-left: 25vw;
      transform: translateX(-50%);
      width: calc(50% - 1rem);
    }
  }
  @media (hover: hover) {
    .popup-option:hover {
      background: #062f4a;
    }
  }
</style>

<input type="checkbox" id="popup-checkbox" bind:checked={$showPopup}/>
<label class="popup" for="popup-checkbox">
  <div class="popup-input">
    <div class="popup-input-wrapper">
      <input type="text" placeholder="{$popupInput.variable || ''}" value={$popupInput.value} on:change={e => {
        $popupInput.update(e.target.value, '', '');
        showPopup.set(false);
        }}/>
    </div>
    {#if $popupInput.options}
      {#each $popupInput.options as option}
        <div class="popup-option" on:click={() => $popupInput.update(option.value, option.comment, option.reference)}>
          <span>
            <span>{option.value}</span>
            <span class="popup-option__reference">{option.reference}</span>
          </span>
          <span class="comment">{option.comment ? `// ${option.comment}` : ''}</span>
        </div>
      {/each}
    {/if}
  </div>
</label>