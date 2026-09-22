export default defineNuxtPlugin(() => {
    if (process.server) return

    function loadSocialBar() {
        if (document.getElementById('adsterra-socialbar-script')) return

        const socialBarScript = document.createElement('script')
        socialBarScript.id = 'adsterra-socialbar-script'
        socialBarScript.src = 'https://venisonglum.com/ac/1c/81/ac1c81cc3977f198ee8d04d77d453472.js'
        socialBarScript.async = true
        document.body.appendChild(socialBarScript)
    }

    loadSocialBar()
})
