import { reactive } from "vue";

export const store = reactive({
  user: {
    isValid: false,
    isConnected: false,
    username: "",
    mail: "",
    firstname: "",
    lastname: "",
  },
  setConnected(isConnected) {
    this.user.isConnected = isConnected;
  },
  setValid(isValid) {
    this.user.isValid = isValid;
  },
  setUser(user) {
    this.user.username = user.username;
    this.user.mail = user.mail;
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
  },
});
