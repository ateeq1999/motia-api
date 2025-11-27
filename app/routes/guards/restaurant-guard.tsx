import { RoleGuard } from "../../components/RoleGuard";

export default function RestaurantGuard() {
    return <RoleGuard allowedRoles={['SUPER_ADMIN', 'RESTAURANT_OWNER']} />;
}
