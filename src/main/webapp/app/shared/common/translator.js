import { translate } from 'react-jhipster';

export const trans = (key, v) => {
  const returnValue = translate(key + '.' + v);
  return returnValue.startsWith('translation-not-found[') ? v : returnValue;
};
