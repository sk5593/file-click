<template>
    <div class="container">
        <div class="content">
            <header class="header">
                <img class="img_header" :src="IMGPrefix+'bg_form_m.png'" alt="" width="100%">
            </header>
            <main class="main_content">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // eslint-disable-next-line no-undef
            IMGPrefix: IMGPrefix
        }
    }
}
</script>

<style lang="scss" scoped>
    $maxWidth: 750px;
    $minWidth: 320px;
    .container {
        color: #333333;
    }
    .content {
        width: 100%;
        max-width: $maxWidth;
        min-width: $minWidth;
        margin: 0 auto;
        padding-bottom: 2.6rem;
    }
    .main_content {
        margin-top: -4.6rem;
        padding: 0 4.5rem;
    }
</style>
