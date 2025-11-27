import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),

    layout("routes/dashboard/layout.tsx", [
        route("dashboard", "routes/dashboard/home.tsx"),

        layout("routes/guards/admin-manager-guard.tsx", [
            route("dashboard/users", "routes/dashboard/users.tsx"),
            route("dashboard/facilities", "routes/dashboard/facilities.tsx"),
        ]),

        layout("routes/guards/voucher-guard.tsx", [
            route("dashboard/vouchers", "routes/dashboard/vouchers.tsx"),
        ]),

        layout("routes/guards/event-guard.tsx", [
            route("dashboard/events", "routes/dashboard/events.tsx"),
        ]),

        layout("routes/guards/restaurant-guard.tsx", [
            route("dashboard/restaurants", "routes/dashboard/restaurants.tsx"),
        ]),

        route("dashboard/settings", "routes/dashboard/settings.tsx"),
    ]),
] satisfies RouteConfig;
