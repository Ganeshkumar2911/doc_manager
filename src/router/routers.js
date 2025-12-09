
import Auth from "@/layout/auth.vue"
import LoginPage from "@/pages/auth/login.vue"

export default [
  {
    path: "/",
    component: Auth,
    children: [
      {
        path: "/login",
        name: "Login",
        component: LoginPage,
        meta:{
          
        }
      },
    ],
  },
];
