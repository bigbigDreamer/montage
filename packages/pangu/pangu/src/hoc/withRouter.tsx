import { forwardRef, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRouter, useQuery } from '../hook';

import type {
    ForwardRefExoticComponent,
    RefAttributes,
    PropsWithoutRef,
    ComponentType,
} from 'react';
import type { Location, Params, NavigateProps } from 'react-router-dom';
import type { UseRouterHookReturnProps } from '../hook';

export type WrapperComponentProps = {
    location: Location;
    params: Params;
    navigate: NavigateProps;
    router: UseRouterHookReturnProps;
    query: Record<string, unknown>;
};

function withRouter<P, T = any>(
    component: ComponentType<P & WrapperComponentProps & RefAttributes<T>>,
): ForwardRefExoticComponent<PropsWithoutRef<P & WrapperComponentProps> & RefAttributes<T>> {
    const WrapperCom = component;
    return forwardRef<T, P & WrapperComponentProps>((props, ref) => {
        const location = useLocation();
        const params = useParams();
        const navigate = useNavigate();
        const router = useRouter();
        const query = useQuery();

        const wrapperProps = useMemo(
            () => ({
                location,
                params,
                navigate,
                router,
                query,
            }),
            [location, params, navigate, router, query],
        );

        return <WrapperCom {...props} {...wrapperProps} ref={ref} />;
    });
}

export default withRouter;
