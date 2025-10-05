import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DesignRoutes } from "../modules/design/design.route";
import { CategoryRoutes } from "../modules/category/category.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/designs",
        route: DesignRoutes
    },
    {
        path: "/categories",
        route: CategoryRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})