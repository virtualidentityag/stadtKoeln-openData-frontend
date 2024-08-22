/**
 * This is necessary due to a bug in Vite build process.
 * https://github.com/vitejs/vite/issues/3924
 *
 * When vite is building, it places the stylesheets with an incorrect order
 * causing styles to break when order matters.
 *
 * As a workaround, whenever a build happens, this script must be executed
 * to ensure that the stylesheets that start with certain prefix
 * are always placed at the top
 */

import fs from 'fs'
import path from 'path'

const buildDirectory = './dist'
const baseStylesheetPrefix = 'styles-'
const headRegex = /(<head[\s\S]*?>)([\s\S]*?)(<\/head>)/i
const stylesheetRegex =
  /<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["'][^"']+["']\s*\/?>/gi

const getOrderedStylesheets = (html) => {
  const stylesheets = html.match(stylesheetRegex) || []

  return stylesheets
    .reduce(
      (acc, stylesheet) => {
        if (stylesheet.includes(baseStylesheetPrefix)) {
          acc[0].push(stylesheet)
        } else {
          acc[1].push(stylesheet)
        }
        return acc
      },
      [[], []]
    )
    .join('\n\t\t')
}

const getNonStylesheetsContent = (html) => html.replace(stylesheetRegex, '')

const processHtmlHead = (html) =>
  html.replace(
    headRegex,
    (_, __, p2) =>
      `<head>${getNonStylesheetsContent(p2)}\t${getOrderedStylesheets(p2)}\n\t</head>`
  )

const processHtmlFile = (pathname) => {
  try {
    const content = fs.readFileSync(pathname, 'utf-8')

    const updated = processHtmlHead(content)

    fs.writeFileSync(pathname, updated)
    console.log(`File ${pathname} has been processed`)
  } catch (err) {
    console.error(`Error processing ${pathname}:`, err)
  }
}

const processDirectory = async (directory) => {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true })

    files.forEach((file) => {
      const pathname = path.join(directory, file.name)

      if (file.isDirectory()) {
        processDirectory(pathname)
      } else if (file.isFile() && path.extname(file.name) === '.html') {
        processHtmlFile(pathname)
      }
    })
  } catch {}
}

processDirectory(buildDirectory)
