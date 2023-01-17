import axios from "axios";
import router from "./../router";
import { store } from "../store/store";

export const login = (username, password) => {
  console.log("debug", username, password);

  axios
    .post("https://localhost/auth", {
      username: username,
      password: password,
    })
    .then(({ data }) => {
      // Récupération du jeton de l'API
      console.log("debug login successfull", data);

      const { token, ...user } = data;

      store.setConnected(true);
      //   store.setUser(user);

      // Enregistrement du jeton dans le stockage local
      localStorage.setItem("TOKEN", token);
      // redirection vers la page d'accueil
      router.push("/");
    })
    .catch((error) => {
      // Gestion des erreurs
      console.log(error);
    });
};
