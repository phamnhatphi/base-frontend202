<template>
    <VBtn
        :class="{ [`custom-${classVariant}`]: true }"
        v-bind="attrs"
    >
        <slot></slot>
    </VBtn>
</template>

<script setup lang="ts">
import { computed, useAttrs } from '#imports';

defineOptions({
    inheritAttrs: false,
});

const attrs: Record<string, unknown> = useAttrs();
const classVariant = computed(() => attrs.variant ?? '');
</script>

<style scoped lang="scss">
/* large button */
.v-btn--size-large {
    width: 256px;
    height: 40px;
}

/* button outlined */
.custom-outlined {
    border-width: 1px;
    border-color: rgb(var(--v-theme-tertiary-darken-2));
    border-style: solid;
    border-radius: 8px;
    box-shadow: 1.414px 1.414px 3px 0px rgba(182, 182, 182, 0.3) !important;

    &:focus-visible, &:hover {
        border-width: 1px;
        border-color: rgb(var(--v-theme-tertiary-darken-3));
        border-style: solid;
        border-radius: 8px;
        background-color: rgb(var(--v-theme-tertiary-lighten-1));
    }

    &.text-success {
        border-width: 1px;
        border-color: rgb(var(--v-theme-success));
        border-style: solid;
        border-radius: 8px;
        background-color: white;
        color: rgb(var(--v-theme-success)) !important;

        &:hover,
        &:focus-visible {
            background-color: rgb(var(--v-theme-success))!important;
            border-width: 1px;
            border-color: rgb(var(--v-theme-success));
            border-style: solid;
            border-radius: 8px;
            color: white !important;
        }
    }

    &.text-primary {
        border-width: 1px;
        border-color: rgb(var(--v-theme-primary));
        border-style: solid;
        border-radius: 8px;
        background-color: white;
        color: rgb(var(--v-theme-primary)) !important;

        &:hover,
        &:focus-visible {
            background-color: rgb(var(--v-theme-primary))!important;
            border-width: 1px;
            border-color: rgb(var(--v-theme-primary));
            border-style: solid;
            border-radius: 8px;
            color: white !important;
        }
    }

    &.text-error {
        border-width: 1px;
        border-color: rgb(var(--v-theme-error));
        border-style: solid;
        border-radius: 8px;
        background-color: white;
        color: rgb(var(--v-theme-error)) !important;

        &:hover,
        &:focus-visible {
            background-color: rgb(var(--v-theme-error)) !important;
            color: rgb(var(--v-theme-error)) !important;
            color: white !important;
        }
    }
}

/* button, tonal */

.custom-tonal {
    background-color: rgb(var(--v-theme-tertiary-lighten-1));
    border-width: 1px;
    border-color: rgb(var(--v-theme-tertiary-darken-1));
    border-style: solid;
    box-shadow: 1.414px 1.414px 3px 0px rgba(182, 182, 182, 0.3) !important;

    :deep(.v-btn__overlay), :deep(.v-btn__underlay) {
        visibility: hidden;
    }

    :deep(.icon) {
        opacity: 0.5 !important;
        font-size: 14px;
    }

    &:hover,
    &:focus-visible {
        background-color: white !important;
        border-color: rgb(var(--v-theme-tertiary-darken-3));
    }

    &.text-primary {
        border-width: 1px;
        border-color: rgb(var(--v-theme-primary));
        border-style: solid;
        border-radius: 8px;
        background-color: rgb(var(--v-theme-primary)) !important;
        color: white !important;
        box-shadow: 1.414px 1.414px 3px 0px rgba(182, 182, 182, 0.3) !important;

        :deep(.icon) {
            opacity: 1 !important;
            font-size: 20px;
        }

        &:hover,
        &:focus-visible {
            border-width: 1px;
            border-color: rgb(var(--v-theme-primary));
            border-style: solid;
            border-radius: 8px;
            background-color: white !important;
            color: rgb(var(--v-theme-primary)) !important;
        }

    }
    &.text-success {
        border-width: 1px;
        border-color: rgb(var(--v-theme-success));
        border-style: solid;
        border-radius: 8px;
        background-color: rgb(var(--v-theme-success)) !important;
        color: white !important;
        box-shadow: 1.414px 1.414px 3px 0px rgba(182, 182, 182, 0.3) !important;

        :deep(.icon) {
            opacity: 1 !important;
            font-size: 20px;
        }

        &:hover,
        &:focus-visible {
            border-width: 1px;
            border-color: rgb(var(--v-theme-success));
            border-style: solid;
            border-radius: 8px;
            background-color: white !important;
            color: rgb(var(--v-theme-success)) !important;
        }

    }

    &.text-error :deep(.icon) {
        opacity: 1 !important;
    }

}

/* button, text */
.custom-text {
    border: thin solid transparent !important;
    background-color: transparent;
    box-shadow: none;

    :deep(.v-btn__overlay),
    :deep(.v-btn__underlay) {
        visibility: hidden;
    }

    &:hover,
    &:focus-visible {
        background-color: rgb(255, 255, 255) !important;
        border-color: rgb(184, 184, 184) !important;
    }
}
</style>
