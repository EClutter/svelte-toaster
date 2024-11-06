export type Toast = {
    id: string;
    variant: 'default' | 'danger' | 'success' | 'info' | 'warning';
    title: string;
    message: string;
};
