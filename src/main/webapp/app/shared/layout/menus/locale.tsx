import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from 'app/config/translation';
import britain from '../../../../content/images/britain.png';
import portugal from '../../../../content/images/portugal.png';

export const LocaleMenu = ({ currentLocale, onClick }: { currentLocale: string; onClick: (event: any) => void }) =>
  Object.keys(languages).length > 1 ? (
    <NavDropdown
      // icon="flag"
      name={
        currentLocale ? (
          currentLocale == 'en' ? (
            <img width="25" height="25" src={britain} alt="great-britain" />
          ) : (
            <img width="25" height="25" src={portugal} alt="portugal" />
          )
        ) : undefined
      }
      className="d-inline-block"
      // style={{ backgroundColor: "transparent", boxShadow: "none !important", border: "none !important", width:"20px", height:"20px" }}
    >
      {locales.map(locale => (
        <DropdownItem key={locale} value={locale} onClick={onClick}>
          {locale == 'en' ? (
            <>
              <img width="28" height="28" className={'mr-1'} src={britain} alt="great-britain" />
              {languages['en'].name}
            </>
          ) : (
            <>
              <img width="28" height="28" className={'mr-1'} src={portugal} alt="portugal" />
              {languages['pt-pt'].name}
            </>
          )}
        </DropdownItem>
      ))}
    </NavDropdown>
  ) : null;
