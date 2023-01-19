import { listCourses, store } from "../store/store";
import axios from "axios";

const getItems = () => {
  return new Promise((resolve, reject) => {
    const list = {};

    axios
      .get("https://localhost/courses")
      .then(({ data }) => {
        data["hydra:member"].map((item) => {
          list[item.id] = {
            id: item.id,
            title: item.title,
            description: item.description,
            content: item.content,
            possessed: true,
            pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
          };
        });

        resolve(list);
      })
      .catch((err) => {
        console.log("debug init data", err);
        reject(err);
      });
  });
};

export const initData = async () => {
  const courses = await getItems();

  listCourses.value = courses;
};
