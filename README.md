# Svelte 5 Toast Component

A simple toast notification system for Svelte 5, based on [Huntabyte's](https://github.com/huntabyte) original toast component. Just using this as a testing ground. 

## Features
- 5 variants (default, info, success, warning, error)
- Auto-dismiss
- Pause on hover
- TypeScript support

## Usage

```typescript
// In your root layout
import { setToastState } from '$lib/toast-state.svelte';
setToastState();

// In any component
import { useToast } from "$lib/toast-state.svelte";

const toast = useToast();

toast.default("Title", "Message");
toast.info("Title", "Message");
toast.success("Title", "Message");
toast.warning("Title", "Message");
toast.error("Title", "Message");
```