const processBranches = (branches) =>
  branches
    .map((branch) => `<li><a href='./${branch}/'>${branch}</a></li>`)
    .join('')

const main = () => {
  const branches = process.argv.slice(2)
  console.log(
    `
<html>
  <head>
    <title>Stadt Koeln - Open Data</title>
    <link rel='stylesheet' href='/src/styles/styles.scss'>
  </head>
  <body>
    <h1>Deployed Branches</h1>
    <ul>
      ${processBranches(branches)}
    </ul>
  </body>
</html>
`.trim()
  )
}

main()
