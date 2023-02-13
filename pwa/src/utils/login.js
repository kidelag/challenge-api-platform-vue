import axios from "axios";
import router from "./../router";
import { store } from "../store/store";

export const login = (mail, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_API_URL + "/auth", {
        mail: mail,
        password: password,
      })
      .then(({ data }) => {
        // Récupération du jeton de l'API

        const { token, ...user } = data;
        console.log("debug", data);

        store.setConnected(true);
        store.setUser(user);

        // Enregistrement du jeton dans le stockage local
        localStorage.setItem("TOKEN", `${user.user_id} ${token}`);
        // redirection vers la page d'accueil

        resolve();
      })
      .catch((error) => {
        // Gestion des erreurs
        reject(error);
      });
  });
};
