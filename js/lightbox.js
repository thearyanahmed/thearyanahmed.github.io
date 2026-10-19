// Opens images linked with data-lightbox in a modal dialog. Links sharing a data-lightbox value form
// one gallery, browsable with the arrow buttons or keys. The caption is the link's data-caption, or
// the image's alt text. Without js the link opens the image itself.
(() => {
    const links = [...document.querySelectorAll('a[data-lightbox]')]
    if (links.length === 0) { return }

    const dialog = document.createElement('dialog')
    dialog.className = 'lightbox'
    dialog.innerHTML = `
        <figure class="lightbox-figure">
            <img class="lightbox-image" alt="">
            <figcaption class="lightbox-caption"><span class="lightbox-alt"></span><span class="lightbox-count"></span></figcaption>
        </figure>
        <button type="button" class="lightbox-button lightbox-close" aria-label="Close">&times;</button>
        <button type="button" class="lightbox-button lightbox-prev" aria-label="Previous image">&lsaquo;</button>
        <button type="button" class="lightbox-button lightbox-next" aria-label="Next image">&rsaquo;</button>`
    document.body.appendChild(dialog)

    const image = dialog.querySelector('.lightbox-image')
    const alt = dialog.querySelector('.lightbox-alt')
    const count = dialog.querySelector('.lightbox-count')

    let gallery = []
    let index = 0

    function show(i) {
        index = (i + gallery.length) % gallery.length
        const link = gallery[index]
        const thumb = link.querySelector('img')

        image.src = link.href
        image.alt = thumb ? thumb.alt : ''
        alt.textContent = link.dataset.caption || image.alt
        count.textContent = gallery.length > 1 ? `${index + 1} / ${gallery.length}` : ''
        dialog.classList.toggle('single', gallery.length === 1)
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            // Only images still on the page: a tag filter may have hidden some.
            gallery = links.filter(l => l.dataset.lightbox === link.dataset.lightbox && !l.closest('[hidden]'))
            show(gallery.indexOf(link))
            dialog.showModal()
        })
    })

    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close())
    dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1))
    dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1))

    // Clicking anywhere outside the image closes it.
    dialog.addEventListener('click', e => {
        if (e.target === dialog || e.target.classList.contains('lightbox-figure')) {
            dialog.close()
        }
    })

    dialog.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { show(index - 1) }
        if (e.key === 'ArrowRight') { show(index + 1) }
    })

    dialog.addEventListener('close', () => image.removeAttribute('src'))
})()
