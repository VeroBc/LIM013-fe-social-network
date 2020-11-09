export default () => {
  const viewNotFound = `
  <h1>Not found</h1>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position');
  sectionElement.innerHTML = viewNotFound;
  return sectionElement;
};
