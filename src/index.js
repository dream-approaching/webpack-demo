import _ from 'lodash';
import './style.css';
import Logo from './logo.png';
import Data from './data.xml';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['hello', 'webpack'], ' ');
  element.classList.add('hello');

  const img = new Image();
  img.src = Logo;

  element.appendChild(img);
  console.log(Data);

  return element;
}

document.body.appendChild(component());
