/**
 * The Tests for @montagejs/react-waline-client
 */
/**
 * @vitest-environment jsdom
 */
window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
    }));
// @ts-ignore
window.scrollTo = vi.fn();

import { render } from '@testing-library/react';
import React from 'react';
import ReactWalineClient from '@montagejs/react-waline-client';

describe('@montagejs/react-waline-client test suit', () => {
    it('when component mounted, ui should display normal', () => {
        const { debug, container } = render(
            <ReactWalineClient serverURL={'https://waline.bigdreamer.cc'} />,
        );
        expect(container.querySelector('.montage-react-waline-client_container')).toBeNotNull();
    });
});
