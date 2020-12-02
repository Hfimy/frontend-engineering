import style from './style.module.css';
import * as React from 'react';
import shareMinImg from '@common/imgs/share.min.jpg';
import shareImg from '@common/imgs/share.jpeg';
import { useHistory, useParams, useQuery } from '@hooks';

import Toast from '@components/Toast';

export default function PageB() {
  const history = useHistory();
  const params = useParams();
  const query = useQuery();

  console.log(history);
  console.log(params);
  console.log(query);

  React.useEffect(() => {
    Toast.info('hello toast');
  });

  return (
    <div className={style.container}>
      <h1 className={style.title}>页面B</h1>
      <img src={shareMinImg} alt='' />
      <img
        src={shareImg}
        alt=''
        onClick={() => {
          history.push('/PageA');
        }}
      />
    </div>
  );
}
