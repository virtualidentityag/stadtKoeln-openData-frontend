function updateDarkmodeIcons() {
  const isDarkmode = document.documentElement.hasAttribute('data-bs-theme')

  document.querySelectorAll('[toggle-dark-mode] i').forEach((icon) => {
    const remove = isDarkmode ? 'bi-moon-fill' : 'bi-sun-fill'
    const add = isDarkmode ? 'bi-sun-fill' : 'bi-moon-fill'

    icon.classList.remove(remove)
    icon.classList.add(add)
  })
}

function removeDarkmode() {
  document.documentElement.removeAttribute('data-bs-theme')
  localStorage.removeItem('theme')
  updateDarkmodeIcons()
}

function setDarkmode() {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
  localStorage.setItem('theme', 'dark')
  updateDarkmodeIcons()
}

function toggleDarkmode() {
  if (document.documentElement.hasAttribute('data-bs-theme')) {
    removeDarkmode()
  } else {
    setDarkmode()
  }
}

function loadTheme() {
  const theme = localStorage.getItem('theme')

  if (theme) {
    setDarkmode()
  } else {
    removeDarkmode()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateDarkmodeIcons()
  document.querySelectorAll('[toggle-dark-mode]').forEach((button) => {
    button.addEventListener('click', toggleDarkmode)
  })
})

loadTheme()
