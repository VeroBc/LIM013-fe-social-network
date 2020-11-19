import { components } from '../view/components.js';

export const changeView = (route) => {
  window.location.hash = route;
  const container = document.getElementById('container');
  container.innerHTML = '';
  let chosenRoute = '';
  switch (route) {
    case '': chosenRoute = container.appendChild(components.signup());
      break;
    case '#/': chosenRoute = container.appendChild(components.signup());
      break;
    case '#/home': chosenRoute = container.appendChild(components.home());
      break;
    case '#/signup': chosenRoute = container.appendChild(components.signup());
      break;
    case '#/signin': chosenRoute = container.appendChild(components.signin());
      break;
    case '#/profile': chosenRoute = container.appendChild(components.profile());
      break;
    default: chosenRoute = container.appendChild(components.signin());
      break;
  }
  return chosenRoute;
};
