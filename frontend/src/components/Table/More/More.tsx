import { FunctionComponent } from 'react';
import { ReactComponent as MoreIcon } from '../../../assets/more.svg';
import styles from './More.module.scss';

const More: FunctionComponent = (): JSX.Element => {
  return (
    <button className={styles.cellBtn} onClick={() => {}}>
      <span>More</span>
      <MoreIcon className={styles.more} />
    </button>
  );
};

export default More;
