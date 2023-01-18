import axios from "axios";
import router from "./../router";
import { store } from "../store/store";

export const login = (mail, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://localhost/auth", {
        mail: mail,
        password: password,
      })
      .then(({ data }) => {
        // Récupération du jeton de l'API

        const { token, ...user } = data;

        store.setConnected(true);
        store.setUser(user);

        // Enregistrement du jeton dans le stockage local
        localStorage.setItem("TOKEN", `${user.user_id} ${token}`);
        // redirection vers la page d'accueil
        router.push("/");
        resolve();
      })
      .catch((error) => {
        // Gestion des erreurs
        reject(error);
      });
  });
};
