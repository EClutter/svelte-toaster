<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { setToastState } from '$lib/toast-state.svelte';
    import Toasts from '$lib/toaster.svelte';

	setToastState();
</script>

<Toasts /> 

{@render children()}
