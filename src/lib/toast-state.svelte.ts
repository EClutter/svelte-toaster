import { getContext, onDestroy, setContext } from 'svelte';
import type { Toast } from './types/types';

export class ToastState {
    toasts = $state<Toast[]>([]);
    toastToTimeoutMap = new Map<string, number>();

    constructor() {
        onDestroy(() => {
            for (const timeout of this.toastToTimeoutMap.values()) {
                clearTimeout(timeout);
            }
            this.toastToTimeoutMap.clear();
        });
    }

    add(title: string, message: string, variant: Toast['variant'] = 'default', durationMs = 5000) {
        const id = crypto.randomUUID();
        this.toasts.push({ id, variant, title, message });

        this.toastToTimeoutMap.set(
            id,
            setTimeout(() => {
                this.remove(id);
            }, durationMs)
        );
    }

    remove(id: string) {
        const timeout = this.toastToTimeoutMap.get(id);
        if (timeout) {
            clearTimeout(timeout);
            this.toastToTimeoutMap.delete(id);
        }
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
    }
}

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
    return setContext(TOAST_KEY, new ToastState());
}

export function getToastState() {
    return getContext<ReturnType<typeof setToastState>>(TOAST_KEY);
}

export function useToast() {
    const toastState = getToastState();
    
    return {
        default: (title: string, message: string) => 
            toastState.add(title, message, 'default'),
        success: (title: string, message: string) => 
            toastState.add(title, message, 'success'),
        error: (title: string, message: string) => 
            toastState.add(title, message, 'danger'),
        warning: (title: string, message: string) => 
            toastState.add(title, message, 'warning'),
        info: (title: string, message: string) => 
            toastState.add(title, message, 'info')
    };
}