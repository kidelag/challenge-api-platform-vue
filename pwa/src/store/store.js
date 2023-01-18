import { reactive, toRaw } from "vue";

const initStore = {
  user: {
    isValid: false,
    isConnected: false,
    id: 0,
    mail: "",
    firstname: "",
    lastname: "",
  },
  courses: [],
};

export const store = reactive({
  ...initStore,
  setConnected(isConnected) {
    this.user.isConnected = isConnected;
  },
  setValid(isValid) {
    this.user.isValid = isValid;
  },
  setUser(user) {
    this.user.id = user.user_id;
    this.user.mail = user.mail;
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
  },
  setCourses(courses) {
    this.courses = courses;
  },
  reset() {
    this.user.isValid = false;
    this.user.isConnected = false;
    this.user.id = 0;
    this.user.mail = "";
    this.user.firstname = "";
    this.user.lastname = "";
  },
});

export const getCourse = (id) => {
  const storeJS = toRaw(store);
  const course = storeJS.courses.find((course) => {
    return course.id === parseInt(id);
  });

  console.log("debug", storeJS.courses);

  return course;
};
