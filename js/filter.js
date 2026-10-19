// Tag filter for /projects and /memories. The chips are links (?tag=golden-hour) with data-filter,
// so a filtered view can be shared: the tag in the url is applied on load. A page can open on a tag
// other than 'all' with data-default on the chips' parent (the page is then built already filtered).
//   [data-tags]          an item, with its space separated tag ids
//   [data-filter-group]  hidden when none of the items inside it is visible (sections, albums)
//   [data-filter-for]    hidden when the element with that id is hidden (timeline links)
//   [data-filter-view]   shown only while its tag is picked (a tag laid out as an album of its own)
(() => {
    const chips = [...document.querySelectorAll('[data-filter]')]
    if (chips.length === 0) { return }

    const fallback = chips[0].parentElement.dataset.default ?? 'all'
    const items = [...document.querySelectorAll('[data-tags]')]
    const groups = [...document.querySelectorAll('[data-filter-group]')]
    const followers = [...document.querySelectorAll('[data-filter-for]')]
    const views = [...document.querySelectorAll('[data-filter-view]')]

    function apply(tag) {
        const active = chips.some(c => c.dataset.filter === tag) ? tag : fallback

        chips.forEach(chip => {
            if (chip.dataset.filter === active) {
                chip.setAttribute('aria-current', 'true')
            } else {
                chip.removeAttribute('aria-current')
            }
        })

        items.forEach(item => {
            item.hidden = active !== 'all' && !item.dataset.tags.split(' ').includes(active)
        })

        groups.forEach(group => {
            group.hidden = !group.querySelector('[data-tags]:not([hidden])')
        })

        views.forEach(view => {
            view.hidden = view.dataset.filterView !== active
        })

        followers.forEach(el => {
            const target = document.getElementById(el.dataset.filterFor)
            el.hidden = !target || target.hidden
        })
    }

    chips.forEach(chip => {
        chip.addEventListener('click', e => {
            e.preventDefault()

            const url = new URL(location.href)
            if (chip.dataset.filter === fallback) {
                url.searchParams.delete('tag')
            } else {
                url.searchParams.set('tag', chip.dataset.filter)
            }
            history.replaceState(null, '', url)

            apply(chip.dataset.filter)
        })
    })

    apply(new URLSearchParams(location.search).get('tag') ?? fallback)
})()
