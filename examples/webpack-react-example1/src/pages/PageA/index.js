import style from './style.module.css';
import React, { useState, useEffect } from 'react';

import shareMinImg from '@common/imgs/share.min.jpg';
import shareImg from '@common/imgs/share.jpeg';

import { useHistory, useLocation, useRouteMatch } from '@hooks';

import { queryDemoList } from '@api/demo';

// test: css modules
export default function PageA(props) {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  console.log(history);
  console.log(location);
  console.log(match);

  useEffect(() => {
    queryDemoList().then(res => {
      console.log(res);
    });
  }, []);

  // test: HMR keep state
  const [count, setCount] = useState(0);
  const onAdd = () => setCount(count + 1);
  return (
    <div className={style.container}>
      <h1 className={style.title}>页面A</h1>
      <img src={shareMinImg} alt='' />
      <img
        src={shareImg}
        alt=''
        onClick={() => {
          history.push('/PageB/hello?a=1&b=2&&&&c=3');
        }}
      />
      <div>{count}</div>
      <button onClick={onAdd}>+</button>
    </div>
  );
}
