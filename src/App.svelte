<script>
  import { json } from './store.js';
  import Logo from './Logo.svelte';
  import Popup from './Popup.svelte';
  import Category from './Category.svelte';

  let customProperties = [];
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
<iframe title="preview" src="preview.html" />
