import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {useLocation, Navigate} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

export function RequireAuth({children}: {children: JSX.Element}) {
    let auth = useSelector(getUserAuthData)
    let location = useLocation()

    console.log('10 auth', auth)

    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        )
    }
    return children
}