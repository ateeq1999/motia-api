import { RoleGuard } from "../../components/RoleGuard";

export default function AdminManagerGuard() {
    return <RoleGuard allowedRoles={['SUPER_ADMIN', 'FACILITY_MANAGER']} />;
}
