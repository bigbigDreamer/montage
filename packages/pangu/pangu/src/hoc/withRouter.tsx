import type {
    ForwardRefExoticComponent,
    RefAttributes,
    PropsWithoutRef,
    ComponentType,
} from 'react';
import type { Location, Params, NavigateProps } from 'react-router-dom';
import { forwardRef, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

type WrapperComponentProps = {
    location: Location;
    params: Params;
    navigate: NavigateProps;
};

function withRouter<P, T = any>(
    component: ComponentType<P & WrapperComponentProps & RefAttributes<T>>,
): ForwardRefExoticComponent<PropsWithoutRef<P & WrapperComponentProps> & RefAttributes<T>> {
    const WrapperCom = component;
    return forwardRef<T, P & WrapperComponentProps>((props, ref) => {
        const location = useLocation();
        const params = useParams();
        const navigate = useNavigate();

        const wrapperProps = useMemo(
            () => ({
                location,
                params,
                navigate,
            }),
            [location, params, navigate],
        );

        return <WrapperCom {...props} {...wrapperProps} ref={ref} />;
    });
}

export default withRouter;
