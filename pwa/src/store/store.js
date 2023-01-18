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
  courses: { array: [], selected: null },
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
    this.courses.array = courses;
  },
  selectCourse(index) {
    this.courses.selected = index;
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

export const selectCourse = (id) => {
  const courses = toRaw(store.courses.array);
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));

  store.selectCourse(courseIndex);
};

export const setBuyCourse = (id) => {
  const courses = toRaw(store.courses.array);
  console.log("debug", courses[1].possessed);
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));

  courses[courseIndex].possessed = true;

  store.courses.array.splice(courseIndex, 1, courses[courseIndex]);
};
