import { RoleGuard } from "../../components/RoleGuard";

export default function VoucherGuard() {
    return <RoleGuard allowedRoles={['SUPER_ADMIN', 'EVENT_ORGANIZER', 'RESTAURANT_OWNER']} />;
}
