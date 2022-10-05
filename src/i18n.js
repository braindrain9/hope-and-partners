import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'uk',
  fallbackLocale: 'uk',
  messages: {
    en: {
      about: 'about me',
      allAchievements: 'Achievements and Honors',
      allAchievementsStyled: 'Achievements <br> and <span class="orange-color">Honors</span>',
      back: 'back',
      backToHome: 'Back to home',
      cases: 'cases',
      close: 'close',
      contactUs: 'contact us',
      detailed: 'more detailed',
      here: 'here',
      howToFindUs: 'how to find us?',
      home: 'home',
      menu: 'Menu',
      notFound: 'The page you are looking for does not exist.',
      ourCases: 'our cases',
      ourPartners: 'our partners',
      ourServices: 'our services',
      partners: 'partners',
      services: 'services',
      updatedAt: 'last updated at'
    },
    uk: {
      about: 'про мене',
      allAchievements: 'Досягнення і Відзнаки',
      allAchievementsStyled: 'Досягнення <br> та <span class="orange-color">Відзнаки</span>',
      back: 'назад',
      backToHome: 'Повернутись на головну',
      cases: 'кейси',
      close: 'закрити',
      contactUs: 'напишіть нам листа',
      detailed: 'детальніше',
      here: 'тут',
      howToFindUs: 'де нас знайти?',
      home: 'на головну',
      menu: 'Меню',
      notFound: 'Сторінка, яку Ви шукаєте, не існує.',
      ourCases: 'наші кейси',
      ourPartners: 'наші партнери',
      ourServices: 'наші послуги',
      partners: 'партнери',
      services: 'послуги',
      updatedAt: 'останній апдейт'
    }
  }
});
