<template>
    <NuxtLayout name="public">
        <VSheet
            class="bg-white h-screen"
        >
            <div class="text-center">
                <h1
                    class="text-warning"
                    :style="{ 'font-size': mobile ? '6rem' : '10rem' }"
                    v-text="statusCode"
                ></h1>
                <p
                    class="wrap-text pb-5 pt-0 px-1"
                    :style="{ 'font-size': mobile ? '1rem' : '2rem' }"
                    v-text="description"
                >
                </p>
                <div>
                    <Button
                        variant="tonal"
                        class="px-6 mt-5"
                        prepend-icon="icon:icon-left"
                        @click="clearError({ redirect: '/' })"
                    >
                        戻る
                    </Button>
                </div>
            </div>
        </VSheet>
    </NuxtLayout>
</template>

<script setup lang="ts">
import Button from '@admin/components/Button.vue';
import { useDisplay } from 'vuetify';

import { clearError, onMounted, useHead, useRoute } from '#imports';

const props = defineProps({
    statusCode: {
        type: Number,
        default: 404,
    },
    statusMessage: {
        type: String,
        default: 'Not Found',
    },
    description: {
        type: String,
    },
    error: Object,
});

const route = useRoute();
const { mobile } = useDisplay();

const statusCode = Number(props.error?.statusCode || props.statusCode || 500);
const is404 = statusCode === 404;
const is403 = statusCode === 403;

const statusMessage = (is404
    ? 'Not Found'
    : is403
        ? 'Forbidden'
        : (props.statusMessage || props.error?.statusMessage || 'Internal Server Error')
);

const description = (is404
    ? `ページが見つかりませんでした。\n${route.fullPath}`
    : is403
        ? 'アクセス権限がありません。\nシステム管理者にご確認ください。'
        : (props.description || props.error?.message || props.error?.toString())
);

onMounted(() => {
    // Delay the title updating to make sure that
    // the title be updated correctly when navigating by web browser history back
    setTimeout(
        () => useHead({
            title: `${statusCode} - ${statusMessage}`,
        }),
        10,
    );
});
</script>
