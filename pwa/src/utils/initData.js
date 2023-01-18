import { store } from "../store/store";

const getItems = () => {
  const items = [
    {
      id: 1,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: true,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    },
    {
      id: 2,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: false,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    },
    {
      id: 3,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: true,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    },
    {
      id: 4,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: false,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    },
  ];

  return items;
};

export const initData = () => {
  store.setCourses(getItems());
};
