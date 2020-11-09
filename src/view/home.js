export default () => {
  const viewHome = `
  <h1>Q&A LABORATORIA</h1>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('position');
  sectionElement.innerHTML = viewHome;
  return sectionElement;
};
