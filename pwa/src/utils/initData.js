import { store } from "../store/store";

const getItems = () => {
  const items = [
    {
      id: 1,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: true,
    },
    {
      id: 2,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: false,
    },
    {
      id: 3,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: true,
    },
    {
      id: 4,
      title: "Cours de Php",
      description: "Cours pas ouf mais azy t'as pas le choix",
      possessed: false,
    },
  ];

  return items;
};

export const initData = () => {
  store.setCourses(getItems());
};
