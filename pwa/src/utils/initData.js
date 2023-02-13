import { listCourses, store } from "../store/store";
import axios from "axios";

const getItems = () => {
  return new Promise((resolve, reject) => {
    const list = {};

    axios
      .get(process.env.API_URL + "/courses")
      .then(({ data }) => {
        axios
          .get(process.env.API_URL + "/user_courses")
          .then(({ data: userCourses }) => {
            console.log(userCourses);

            data["hydra:member"].map((item) => {
              list[item.id] = {
                id: item.id,
                title: item.title,
                description: item.description,
                content: item.content,
                possessed: false,
              };
            });

            resolve(list);
          });
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
