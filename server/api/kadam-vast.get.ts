const KADAM_VAST_URL = 'https://hdacode.com/get_data?blockID=449829&format=vast'

export default defineEventHandler(async (event) => {
    setHeader(event, 'content-type', 'application/xml; charset=utf-8')
    setHeader(event, 'cache-control', 'no-store')

    return await $fetch<string>(KADAM_VAST_URL, {
        responseType: 'text'
    })
})