import React from 'react';

import styles from '../styles/share-style.css';
import facebookIcon from '../icons/facebook-icon.jsx';
import twitterIcon from '../icons/twitter-icon.jsx';
import emailIcon from '../icons/email-icon.jsx';
import messengerIcon from '../icons/messenger-icon.jsx';
import copyIcon from '../icons/copy-icon.jsx';
import embedIcon from '../icons/embed-icon.jsx';

//╳

const Share = ({closeModal}) => {

  return (
    <div id="share-container" className={styles['share-container']} onClick={closeModal}>
      <div id="share-page" className={styles['share-page']}>
        <div className={styles['content']}>
          <button className={styles['invisible-button']} onClick={closeModal}>╳</button>
        </div>
      </div>
    </div>
  )
}

export default Share;