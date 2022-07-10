import { useCallback, useState } from 'react';

// Returning a new object reference guarantees that a before-and-after
//   equivalence check will always be false, resulting in a re-render, even
//   when multiple calls to forceUpdate are batched.

// the code from: https://github.com/CharlesStover/use-force-update/blob/master/src/use-force-update.ts

export default function useForceUpdate(): () => void {
    const [ , dispatch ] = useState<{}>(Object.create(null));

    // Turn dispatch(required_parameter) into dispatch().
    return useCallback(
        (): void => {
            dispatch(Object.create(null));
        },
        [dispatch],
    );
}
