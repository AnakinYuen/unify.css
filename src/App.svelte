<script>
  import { onMount } from 'svelte';
  import { json } from './store.js';
  import { generateStyleSheet } from './utils.js';
  import Logo from './Logo.svelte';
  import Popup from './Popup.svelte';
  import Category from './Category.svelte';

  let previewEle;
  let flexBasis = 'auto';
  let customProperties = [];

  const updatePreviewStyle = preview => {
    const style = preview.contentDocument.getElementById('style');
    if (style) {
      style.innerHTML = generateStyleSheet($json);
    }
  };

  onMount(() => updatePreviewHeight(previewEle));

  const updatePreviewHeight = preview => {
    const previewWindow = preview.contentWindow || preview.contentDocument.parentWindow;
    if (previewWindow.document.body) {
      preview.height =
        previewWindow.document.documentElement.scrollHeight ||
        previewWindow.document.body.scrollHeight;
      flexBasis = `${preview.height}px`;
    }
  };

  const onPreviewLoad = event => {
    updatePreviewHeight(event.target);
    updatePreviewStyle(event.target);
  };

  json.subscribe(obj => {
    const customPropertiesMap = new Map();
    const declarationWithCustomProperty = [];
    Object.keys(obj).forEach(key => {
      obj[key].forEach((ruleSets, rsIdx) => {
        ruleSets.declarations.forEach((declaration, dIdx) => {
          if (declaration.variable) {
            if (customPropertiesMap.has(declaration.variable)) {
              const d = customPropertiesMap.get(declaration.variable);
              customPropertiesMap.set(declaration.variable, {
                ...declaration,
                property: declaration.variable,
                variable: undefined,
                path: [d.path, [key, rsIdx, 'declarations', dIdx]],
              });
              declaration.path = [d.path, [key, rsIdx, 'declarations', dIdx]];
            } else {
              customPropertiesMap.set(declaration.variable, {
                ...declaration,
                property: declaration.variable,
                variable: undefined,
                path: [key, rsIdx, 'declarations', dIdx],
              });
              declaration.path = [key, rsIdx, 'declarations', dIdx];
            }
            declarationWithCustomProperty.push(declaration);
          } else {
            declaration.path = [key, rsIdx, 'declarations', dIdx];
          }
        });
      });
    });
    declarationWithCustomProperty.forEach(d => {
      d.path = customPropertiesMap.get(d.variable).path;
    });
    customProperties = Array.from(customPropertiesMap.values());

    if (previewEle) {
      updatePreviewStyle(previewEle);
    }
  });
</script>

<header>
  <Logo />
  <span class="icon-download" />
</header>
<div class="editor">
  <Popup />
  <Category
    category={'Global Scope'}
    ruleSets={[{ description: 'Global Scope Custom properties', selector: ':root', declarations: customProperties }]} />
  {#each Object.keys($json) as key}
    <Category category={key} ruleSets={$json[key]} />
  {/each}
</div>
<iframe
  title="preview"
  src="preview.html"
  on:load={onPreviewLoad}
  bind:this={previewEle}
  style="flex-basis:{flexBasis}" />
