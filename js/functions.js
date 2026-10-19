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

document.querySelectorAll('[data-toggle="mobile-menu"]').forEach(el => {
    el.addEventListener('click', toggleMobileMenu)
})

document.querySelectorAll('[data-alert]').forEach(el => {
    el.addEventListener('click', () => alert(el.dataset.alert))
})

document.querySelectorAll('#offset').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.add('glitch')
        setTimeout(() => el.classList.remove('glitch'), 500)
    })
})
