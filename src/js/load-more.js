;(() => {
  const getButton = (section) => section.querySelector('button')
  const getArea = (section) => section.querySelector('[load-more-area]')
  const getCurrentPage = (area) => parseInt(area.getAttribute('data-page'))
  const getPerPage = (area) => parseInt(area.getAttribute('data-per-page'))
  const getTotal = (area) => parseInt(area.getAttribute('data-total'))

  const init = (section) => {
    const area = getArea(section)
    const perPage = getPerPage(area)
    const total = area.children.length

    area.setAttribute('data-total', total)
    area.setAttribute('data-page', 1)
    Array.from(area.children)
      .slice(perPage)
      .forEach((child) => child.classList.add('d-none'))
  }

  const handleLoadMore = (section) => {
    const area = getArea(section)
    const currentPage = getCurrentPage(area)
    const perPage = getPerPage(area)
    const total = getTotal(area)

    const start = currentPage * perPage
    const end = Math.min(start + perPage, total)

    Array.from(area.children)
      .slice(start, end)
      .forEach((child) => child.classList.remove('d-none'))

    area.setAttribute('data-page', currentPage + 1)

    if (end >= total) {
      getButton(section).classList.add('d-none')
    }
  }

  document.querySelectorAll('[load-more-section]').forEach((section) => {
    init(section)
    getButton(section).addEventListener('click', () => handleLoadMore(section))
  })
})()
