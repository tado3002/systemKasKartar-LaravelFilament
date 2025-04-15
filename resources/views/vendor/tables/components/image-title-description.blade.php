<div class="flex items-start gap-3">
    @if($getImagePath())
        <div class="flex-shrink-0">
            <img
                src="{{ asset('storage/' . $getImagePath()) }}"
                alt="{{ $getState() }}"
                class="{{ $getImageSize() }} object-cover rounded"
            >
        </div>
    @endif

    <div class="grid gap-0.5">
        <span class="font-medium text-gray-900 dark:text-white">
            {{ $getState() }}
        </span>
        @if($getDescription())
            <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ $getDescription() }}
            </span>
        @endif
    </div>
</div>
