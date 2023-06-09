import React, { useRef } from 'react';
import { useAppSelector } from 'app/config/store';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkChatWidget = () => {
  const ref = useRef();
  const removeBrand = () => {
    setTimeout(() => {
      const styleElement = document.createElement('style');
      styleElement.type = 'text/css';

      const cssCode = '.tawk-branding { color: red !important; font-weight: bold !important; }';

      styleElement.appendChild(document.createTextNode(cssCode));

      document.head.appendChild(styleElement);

      let iframes = document.getElementsByTagName('iframe');
      if (iframes.length > 2) {
        let iframeDocument = iframes[1].contentDocument || iframes[1].contentWindow.document;
        const styleElement = iframeDocument.createElement('style');
        styleElement.type = 'text/css';

        const cssCode = '.tawk-branding { display: none !important; color: white !important;}';

        styleElement.appendChild(iframeDocument.createTextNode(cssCode));

        iframeDocument.head.appendChild(styleElement);
        /*while(iframes[1].contentDocument.getElementsByClassName("tawk-branding").length > 0)
          iframes[1].contentDocument.getElementsByClassName("tawk-branding")[0].remove();*/
      }
    }, 500);
  };
  return <TawkMessengerReact ref={ref} propertyId="6479a4bbad80445890f0988c" widgetId="1h1timva3" onLoad={removeBrand} />;
};

export default TawkChatWidget;
