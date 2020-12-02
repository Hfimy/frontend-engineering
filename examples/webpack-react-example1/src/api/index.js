import axios from 'axios';

axios.defaults.validateStatus = function validateStatus(status) {
  return status >= 200 && status < 400;
};

function checkStatus(response) {
  if (__ENV__ !== 'prod') {
    console.log(response);
  }
  if (response.status >= 200 && response.status < 400) {
    return response.data;
  }
  throw new Error();
}

function formatError(error) {
  return {
    ret: -999, // 前端自定义错误ret,如需详细显示错误信息可进一步扩展
    msg: '神秘力量正在干扰',
  };
}

export default {
  get(url, data = {}, withCredentials = false) {
    return axios({
      method: 'get',
      url,
      params: data,
      withCredentials,
    })
      .then(checkStatus)
      .catch(formatError);
  },
  post(url, data = {}, withCredentials = false, config = {}) {
    return axios({
      method: 'post',
      url,
      data,
      withCredentials,
      ...config,
    })
      .then(checkStatus)
      .catch(formatError);
  },
};
