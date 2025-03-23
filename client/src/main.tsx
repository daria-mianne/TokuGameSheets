if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("preact/debug");
}

import { render } from 'preact';
import { App } from './app.tsx';

render(<App />, document.getElementById('app')!);
