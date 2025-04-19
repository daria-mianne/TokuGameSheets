import { ErrorBanner } from "@components/banners";

export default {
    title: 'Components/Banners/ErrorBanner',
    component: ErrorBanner,
    tags: ['autodocs'],
};

export const Error = {
    args: {
        id: 'sample',
        message: 'This is an error!',
    }
};
