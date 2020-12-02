import './style.less';

const info = (content = '', duration = 3000, cb?: Function) => {
  hide();

  const container = document.createElement('div');
  container.setAttribute('class', 'custom-light-toast-container');

  const mask = document.createElement('div');
  mask.setAttribute('class', 'custom-light-toast-mask');

  const box = document.createElement('div');
  box.setAttribute('class', 'custom-light-toast-box');

  const message = document.createElement('div');
  message.setAttribute('class', 'custom-light-toast-message');
  message.innerText = content;

  box.appendChild(message);
  mask.appendChild(box);
  container.appendChild(mask);
  document.body.appendChild(container);

  setTimeout(() => {
    hide();
    cb && cb();
  }, duration);
};

const loading = (content = '') => {
  hide();

  const container = document.createElement('div');
  container.setAttribute('class', 'custom-light-toast-container');

  const mask = document.createElement('div');
  mask.setAttribute('class', 'custom-light-toast-mask');

  const box = document.createElement('div');
  box.setAttribute('class', 'custom-light-toast-box');

  const loading = document.createElement('div');
  loading.setAttribute('class', 'custom-light-toast-loading');

  const message = document.createElement('div');
  message.setAttribute('class', 'custom-light-toast-message');
  message.innerText = content;

  box.appendChild(loading);
  box.appendChild(message);
  mask.appendChild(box);
  container.appendChild(mask);
  document.body.appendChild(container);
};

const hide = () => {
  const container = document.querySelector('.custom-light-toast-container');
  if (container) {
    container.remove();
  }
};

const Toast = Object.freeze({ info, loading, hide });

export default Toast;
