/**
 * 更新页面标题
 * @param {string} title
 */
export function updatePageTitle(title) {
  if (title === undefined || title === null || document.title === title) {
    return;
  }
  document.title = title;
  let mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe');
    iframe.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    iframe.style.display = 'none';
    iframe.onload = function () {
      setTimeout(function () {
        iframe.remove();
      }, 0);
    };
    document.body.appendChild(iframe);
  }
}
