import { getContext, onDestroy, setContext } from 'svelte';
import type { Toast } from './types/types';

export class ToastState {
    toasts = $state<Toast[]>([]);
    private timeouts = new Map<string, number>();
    private remainingDurations = new Map<string, number>();
    private startTimes = new Map<string, number>();

    add(title: string, message: string, variant: Toast['variant'] = 'default', duration = 5000) {
        const id = crypto.randomUUID();
        this.toasts.push({ id, variant, title, message });
        this.remainingDurations.set(id, duration);
        this.startTimeout(id);
    }

    private startTimeout(id: string) {
        const duration = this.remainingDurations.get(id) ?? 0;
        this.startTimes.set(id, Date.now());
        
        this.timeouts.set(id, setTimeout(() => this.remove(id), duration));
    }

    pauseToast(id: string) {
        const timeout = this.timeouts.get(id);
        const startTime = this.startTimes.get(id);
        
        if (timeout && startTime) {
            clearTimeout(timeout);
            this.remainingDurations.set(
                id, 
                (this.remainingDurations.get(id) ?? 0) - (Date.now() - startTime)
            );
            this.timeouts.delete(id);
            this.startTimes.delete(id);
        }
    }

    resumeToast(id: string) {
        if (this.remainingDurations.has(id)) {
            this.startTimeout(id);
        }
    }

    remove(id: string) {
        clearTimeout(this.timeouts.get(id));
        this.timeouts.delete(id);
        this.remainingDurations.delete(id);
        this.startTimes.delete(id);
        this.toasts = this.toasts.filter(t => t.id !== id);
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