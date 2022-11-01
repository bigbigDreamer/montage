import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { queryParse } from '../helper';

const useQuery = (): Record<string, unknown> => {
    const location = useLocation();

    return useMemo(() => queryParse(location?.search) || {}, [location?.search]);
};

export default useQuery;
