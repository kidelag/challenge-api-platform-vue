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
        .get(process.env.API_URL + "/users/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          store.setToken(token);

          store.setConnected(true);
          store.setValid(data.valid);

          store.setUser({
            ...data,
            user_id: data.id,
            isAdmin: data.roles.includes("ROLE_ADMIN"),
          });
          // console.log("debug here", data);

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
