import axios from "axios";
import router from "../router";
import { store } from "../store/store";

export const checkConnection = (withRedirectOnConnect, from) => {
  // console.log("debug here", from);
  if (!store.user.isConnected) {
    const tokenRaw = localStorage.getItem("TOKEN");

    if (tokenRaw) {
      const [id, token] = tokenRaw.split(" ");

      axios
        .get("https://localhost/users/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          store.setConnected(true);
          store.setValid(data.valid);
          store.setUser(data);
          if (withRedirectOnConnect) router.push("/");
        })
        .catch(() => {
          if (withRedirectOnConnect) router.push("/");
        });
    } else {
      console.log("dbeug", withRedirectOnConnect);
      if (withRedirectOnConnect) router.push("/");
    }
  }
};
