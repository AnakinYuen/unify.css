export const sanitizeHTML = str => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

export const SMALL_MOBILE_DEVICE_WIDTH = 320;

export const getTextWidth = element => {
  const span = document.createElement('span');
  span.style.font = getComputedStyle(element).font;
  span.style.position = 'absolute';
  span.style.visibility = 'hidden';
  span.innerText = element.value;
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};

export const setNestedObject = (obj, path, keyValues = {}) => {
  if (Array.isArray(path[0])) {
    return path.reduce((o, p) => {
      return setNestedObject(o, p, keyValues);
    }, obj);
  }
  const newObj = { ...obj };
  let target = newObj;
  const paths = path.slice(0);
  const lastPath = paths.pop();
  for (let index of paths) {
    target = { ...target[index] };
  }
  target = target[lastPath];
  Object.entries(keyValues).forEach(([key, value]) => {
    target[key] = value;
  });
  return newObj;
};
