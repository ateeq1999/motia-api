import { RoleGuard } from "../../components/RoleGuard";

export default function EventGuard() {
    return <RoleGuard allowedRoles={['SUPER_ADMIN', 'EVENT_ORGANIZER']} />;
}
