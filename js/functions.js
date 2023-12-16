function toggleMobileMenu() {
    const el = document.getElementById('mobile-menu')

    if (! el ) { return ; }

    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden')
        el.classList.add('block')
    } else {
        el.classList.remove('block')
        el.classList.add('hidden')
    }
}