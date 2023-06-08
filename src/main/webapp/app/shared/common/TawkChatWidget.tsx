import React, { useRef } from 'react';
import { useAppSelector } from 'app/config/store';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkChatWidget = () => {
  const ref = useRef();
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  /*ref.current.setAttributes({
    'id'    : 'A1234',
    'store' : 'Midvalley'
  });*/
  return <TawkMessengerReact ref={ref} propertyId="6479a4bbad80445890f0988c" widgetId="1h1timva3" />;
  // else
  //   return <TawkMessengerReact propertyId="6479a4bbad80445890f0988c" widgetId="1h2a6hf7d"/>;
};

export default TawkChatWidget;
