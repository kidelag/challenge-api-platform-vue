import axios from "axios";
import router from "../router";
import { store } from "../store/store";

export const checkConnection = (
  withRedirectOnConnect,
  withRedirectOnCatch,
  from
) => {
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
          console.log("debug here", data);

          if (withRedirectOnConnect) router.push("/");
        })
        .catch(() => {
          if (withRedirectOnCatch) router.push("/");
        });
    } else {
      if (withRedirectOnCatch) router.push("/");
    }
  }
};
