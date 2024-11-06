<script lang="ts">
    import type { Toast } from "$lib/types/types";
    import { getToastState } from "./toast-state.svelte";

    type Props = {
        toast: Toast;
    };

    let { toast }: Props = $props();
    const toastState = getToastState();
    let isPaused = $state(false);

    const TOAST_STYLES = {
        default: "bg-gray-500 text-white",
        danger: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
        success: "bg-green-500 text-white",
    };
</script>

<div
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    class={`
        relative 
        flex 
        h-auto 
        min-h-16 
        w-72 
        flex-col 
        justify-center 
        rounded-lg 
        shadow-lg 
        p-4 
        animate-in 
        slide-in-from-right-5 
        duration-200
        border-2
        border-transparent
        hover:border-black/25
        transition-colors
        ${TOAST_STYLES[toast.variant]}
    `}
    onmouseenter={() => {
        isPaused = true;
        toastState.pauseToast(toast.id);
    }}
    onmouseleave={() => {
        isPaused = false;
        toastState.resumeToast(toast.id);
    }}
>
    <div class="grid gap-1">
        <h3 class="font-semibold leading-none tracking-tight">
            {toast.title}
        </h3>
        <p class="text-sm opacity-90">
            {toast.message}
        </p>
    </div>

    <button
        class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onclick={() => toastState.remove(toast.id)}
    >
        <span class="sr-only">Close toast</span> X
    </button>
</div>