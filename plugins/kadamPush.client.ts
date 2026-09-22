export default defineNuxtPlugin(() => {
    if (process.server) return

    const route = useRoute()
    const browserWindow = window as Window & Record<string, any>
    const recommendedPushAdPaths = ['/', '/torrent/']

    function shouldLoadPushAd(path: string) {
        return recommendedPushAdPaths.some((allowedPath) => {
            if (allowedPath === '/') return path === '/'
            return path.startsWith(allowedPath)
        })
    }

    function loadPushAd() {
        if (!shouldLoadPushAd(route.path)) return
        if (document.getElementById('kadam-push-ad-script')) return

        const pushUrlKey = String.fromCharCode(112, 117, 115, 104, 95, 117, 114, 108)
        const configKey = String.fromCharCode(119, 112, 110, 67, 111, 110, 102, 105, 103)

        browserWindow[configKey] = {
            utm_source: 'kd',
            utm_campaign: 449827,
            utm_content: '',
            domain: window.location.host,
            delay: 0,
            nextTimeout: 3,
            ical: 0,
            sw_name: 'sw.js',
            proto: window.location.protocol
        }
        browserWindow[configKey][pushUrlKey] = 'https://qepolax.com/18845.js'

        const script = document.createElement('script')
        script.id = 'kadam-push-ad-script'
        script.async = true
        script.setAttribute('data-cfasync', 'false')
        script.src = browserWindow[configKey][pushUrlKey]
        document.head.appendChild(script)
    }

    loadPushAd()
    watch(() => route.path, loadPushAd)
})