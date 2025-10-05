import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DesignRoutes } from "../modules/design/design.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { PricingPlanRoutes } from "../modules/pricingPlan/pricingPlan.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { PurchaseRoutes } from "../modules/purchase/purchase.routes";

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
    {
        path: "/pricing",
        route: PricingPlanRoutes
    },
    {
        path: "/reviews",
        route: ReviewRoutes
    },
    {
        path: "/purchases",
        route: PurchaseRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})