import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, UserRole } from 'entities/User';
import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMemo } from 'react';
import { getUserRoles } from 'entities/User/model/selectors/getUserRoles/getUserRoles';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()
    const userRoles = useSelector(getUserRoles)

    const hasRequiredRoles = useMemo(() => {
        if (!roles) return true
        return roles.some((role) => userRoles?.includes(role))
    }, [roles, userRoles])

    if (!auth || !hasRequiredRoles) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        )
    }
    return children
}
