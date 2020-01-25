import { json } from './store.js';
import App from './App.svelte';

const getUnifyJson = async () => {
  const response = await fetch('./unify.json');
  const rawJson = await response.json();
  Object.keys(rawJson).forEach(key => {
    rawJson[key].forEach(ruleSets => {
      ruleSets.declarations.forEach(declaration => {
        declaration.disable = false;
        if (declaration.options) {
          declaration.options.unshift({
            value: declaration.value,
            comment: declaration.comment,
            reference: declaration.reference,
          });
        }
      });
    });
  });
  return rawJson;
};

getUnifyJson().then(rawJson => json.set(rawJson));

const app = new App({
  target: document.body,
});

export default app;
