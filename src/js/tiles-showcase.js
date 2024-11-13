;(() => {
  const breakpoints = {
    md: 768,
    lg: 992,
  }

  const visibleInitially = {
    md: 4,
    lg: 6,
  }

  const getTiles = (section) =>
    Array.from(section.querySelectorAll('.col:has(.tile)'))

  const getButton = (section) => section.querySelector('button')

  const hideTile = (tile) => {
    tile.classList.add('d-none')
  }

  const showTile = (tile) => {
    tile.classList.remove('d-none')
  }

  const resetExpansion = (section) => {
    const breakpoint = Object.entries(breakpoints)
      .reverse()
      .find(([_, value]) => document.documentElement.clientWidth >= value)?.[0]

    const visible = visibleInitially[breakpoint] || 2

    const button = getButton(section)
    button.querySelector('i.bi').classList.replace('bi-dash-lg', 'bi-plus-lg')
    button.childNodes[button.childNodes.length - 1].textContent =
      'Alle Kategorien anzeigen'

    section.setAttribute('aria-expanded', 'false')

    const tiles = getTiles(section)
    tiles.forEach(hideTile)
    tiles.slice(0, visible).forEach(showTile)
  }

  const handleExpansion = (section) => {
    const button = getButton(section)
    button.querySelector('i.bi').classList.replace('bi-plus-lg', 'bi-dash-lg')
    button.childNodes[button.childNodes.length - 1].textContent =
      'Weniger Kategorien anzeigen'

    section.setAttribute('aria-expanded', 'true')

    const tiles = getTiles(section)
    tiles.forEach(showTile)
  }

  const handleShowMore = (section) => {
    const isExpanded = section.getAttribute('aria-expanded') === 'true'

    if (isExpanded) {
      resetExpansion(section)
    } else {
      handleExpansion(section)
    }
  }

  document.querySelectorAll('.tile-showcase').forEach((section) => {
    resetExpansion(section)
    getButton(section).addEventListener('click', () => handleShowMore(section))
  })
})()
