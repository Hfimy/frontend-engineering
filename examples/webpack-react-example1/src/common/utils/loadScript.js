/**
 * 动态加载脚本资源
 * @param {string} url
 * @param {Function} cb
 */
export function loadScript(url, cb) {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  // IE-script.onreadystatechange others-script.onload
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        cb && cb();
      }
    };
  } else {
    script.onload = () => {
      cb && cb();
    };
  }

  script.src = url;
  document.querySelector('head').appendChild(script);
}

/**
 * loadscript的promise版本
 * @param {string} url
 * @returns {Promise}
 */
export function loadScriptP(url) {
  return new Promise(resolve => {
    loadScript(url, resolve);
  });
}
