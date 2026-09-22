<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const { data, error } = await useAsyncData(
  `torrent-id-only-${route.params.id}`,
  () => $fetch(`${config.public.apiBase}/torrent/get/${route.params.id}/placeholder`)
)

if (error.value?.statusCode === 404 || !data.value?.slugged_title) {
  throw createError({ statusCode: 404, statusMessage: 'Torrent not found' })
}

await navigateTo(`/torrent/${route.params.id}/${data.value.slugged_title}`, {
  redirectCode: 301,
})
</script>

<template>
  <div />
</template>
