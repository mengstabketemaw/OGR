import React, { useRef } from 'react';
import { useAppSelector } from 'app/config/store';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import axios from 'axios';

const TawkChatWidget = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isMobile = window.innerWidth <= 850;

  const ref = useRef();

  const removeTawk = (retry = 100) => {
    //Just try to remove tawk 100 times. otherwise just leave it.
    if (retry === 0) return;
    let iframes = document.getElementsByTagName('iframe');
    if (iframes.length > 2) {
      //Remove tawk chat wedget is the user is admin in mobile
      if (isAdmin && isMobile) {
        // @ts-ignore
        if (ref?.current?.hideWidget)
          // @ts-ignore
          ref.current?.hideWidget();
      }
    } else
      setTimeout(() => {
        removeTawk(retry - 1);
      }, 300);
  };

  const removeBrand = () => {
    if (isAuthenticated) sendMetadata();
    setTimeout(() => {
      let iframes = document.getElementsByTagName('iframe');
      if (iframes.length > 2) {
        let iframeDocument = iframes[1].contentDocument || iframes[1].contentWindow.document;
        const styleElement = iframeDocument.createElement('style');
        styleElement.type = 'text/css';

        const cssCode = '.tawk-branding { display: none !important; color: white !important;}';

        styleElement.appendChild(iframeDocument.createTextNode(cssCode));

        iframeDocument.head.appendChild(styleElement);
      }
    }, 500);
  };

  const sendMetadata = () => {
    //If the user is logged in set metadata to show the user information on the tawk admin dashboard
    axios
      .get('/api/notification/tawk')
      .then(({ data }) => {
        //The user is logged in, and we can set the chat as user properties
        if ('hash' in data) {
          // @ts-ignore
          ref.current.setAttributes(data, function (error) {});
        }
      })
      .catch(console.log);
  };

  if (isAdmin && isMobile) removeTawk();
  if (isAuthenticated) sendMetadata();

  return <TawkMessengerReact ref={ref} propertyId="6479a4bbad80445890f0988c" widgetId="1h1timva3" onLoad={removeBrand} />;
};

export default TawkChatWidget;
