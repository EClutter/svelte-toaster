<script lang="ts">
    import { useToast } from "$lib/toast-state.svelte";
    
    const toast = useToast();
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 class="text-2xl font-bold text-center mb-8">Toast Notifications Demo</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                onclick={() => toast.default(
                    "Default Notification",
                    "This is a default toast message"
                )}
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
                Default Toast
            </button>

            <button
                onclick={() => toast.info(
                    "Info Notification",
                    "This is a helpful information message"
                )}
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
                Info Toast
            </button>

            <button
                onclick={() => toast.success(
                    "Success!",
                    "Operation completed successfully"
                )}
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
                Success Toast
            </button>

            <button
                onclick={() => toast.warning(
                    "Warning",
                    "Please review before proceeding"
                )}
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
                Warning Toast
            </button>

            <button
                onclick={() => toast.error(
                    "Error Occurred",
                    "Something went wrong. Please try again"
                )}
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
                Error Toast
            </button>
        </div>
    </div>
</div>