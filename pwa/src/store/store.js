import { reactive, ref, toRaw } from "vue";

export const listCourses = ref({});

const initStore = {
  user: {
    isValid: false,
    isConnected: false,
    id: 0,
    mail: "",
    firstname: "",
    lastname: "",
    isAdmin: false,
    isTeacher: true,
    isTeacherValid: true,
    token: "",
  },
  courses: { list: {}, selected: null },
};

export const store = reactive({
  ...initStore,
  courses: {
    ...initStore.courses,
    list: listCourses,
  },
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
    this.user.isAdmin = user.isAdmin;
  },
  setToken(token) {
    this.user.token = token;
  },
  selectCourse(id) {
    this.courses.selected = id;
  },

  getCourses() {
    return Object.values(this.courses.list);
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

export const setBuyCourse = (id) => {
  const courses = toRaw(store.courses.list);
  console.log("debug", courses[1].possessed);
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));

  courses[courseIndex].possessed = true;

  store.courses.list.splice(courseIndex, 1, courses[courseIndex]);
};
