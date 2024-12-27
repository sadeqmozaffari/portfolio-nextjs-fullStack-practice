import {useTranslations} from 'next-intl';
import setLanguageValue from '../../../actions/set-language-action';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const handleChangeLanguage = () => {
    const newLocale = t('lang') === 'en' ? 'fa' : 'en';
    const html: HTMLElement | null = document.getElementById('html');
    if (html) {
      html.setAttribute('dir', newLocale === 'en' ? 'ltr' : 'rtl');
      html.setAttribute('lang', newLocale);
    }

    setLanguageValue(newLocale);
  };
  return (
    <li>
      <label className="relative m-0 block h-7.5 w-14 rounded-full text-center ">
        <div
          className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer
        opacity-0  !text-black  dark:text-white "
          onClick={handleChangeLanguage}
        ></div>
        {t('lang') === 'en' ? 'فارسی' : 'English'}
      </label>
    </li>
  );
}
