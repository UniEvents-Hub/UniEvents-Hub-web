'use client'

import { PropsWithChildren } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

export function ReduxProvider(props: PropsWithChildren) {
    return <Provider store={store}> {props.children}</Provider>;
}