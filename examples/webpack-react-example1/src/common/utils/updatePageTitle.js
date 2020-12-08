/**
 * 更新页面标题
 * @param {string} title
 */
export function updatePageTitle(title) {
  if (title === undefined || title === null || document.title === title) {
    return;
  }
  document.title = title;
  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  if (isIOS) {
    const i = document.createElement('iframe');
    i.style.display = 'none';
    i.src = '/favicon.ico';
    i.onload = function () {
      setTimeout(() => {
        i.remove();
      }, 0);
    };
    document.body.appendChild(i);
  }
}
