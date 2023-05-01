import { Fragment, FunctionComponent, useRef, useState } from 'react';
import { ReactComponent as MoreIcon } from '../../../assets/more.svg';
import styles from './More.module.scss';
import Popover from '@mui/material/Popover';

const More: FunctionComponent = (): JSX.Element => {
  const anchorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Popover
        open={isOpen}
        anchorEl={anchorRef.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 10,
          horizontal: 0,
        }}
        classes={{ paper: styles.popoverClass }}
      >
        Popover Content
      </Popover>
      <button ref={anchorRef} className={styles.cellBtn} onClick={() => setIsOpen(true)}>
        <span>More</span>
        <MoreIcon className={styles.more} />
      </button>
    </Fragment>
  );
};

export default More;
