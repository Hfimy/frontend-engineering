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
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/favicon.ico';
    iframe.onload = function () {
      setTimeout(() => {
        iframe.remove();
      }, 0);
    };
    document.body.appendChild(iframe);
  }
}
