
import Auth from "@/layout/auth.vue"
import Default from "@/layout/default.vue"
import LoginPage from "@/pages/auth/login.vue"
import DocumentsPage from "@/pages/documents.vue"

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
          requiresAuth: false
        }
      },
    ],
  },
  {
    path: "/",
    name: "Dashboard",
    component: Default,
    children: [
      {
        path: "/documents",
        name: "documents",
        component: DocumentsPage,
        meta:{
          requiresAuth: true,
          title: "Documents"
        }
      },
    ],
  }
];
