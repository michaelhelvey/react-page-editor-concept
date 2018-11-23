const mysql = require('mysql')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'myuser',
  password: 'mypass',
  database: 'editor_test'
})

const query = queryString =>
  new Promise((resolve, reject) => {
    pool.query(queryString, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  })

const getPages = async () => {
  const results = await query('select * from pages')
  return results
}

const getSinglePage = async id => {
  const results = await query('select * from pages where id = ' + id)
  return results[0]
}

const createPage = async params => {
  let paramsString = ''
  Object.keys(params).forEach((key, i) => {
    paramsString += `"${params[key]}" ${
      i < Object.keys(params).length - 1 ? ', ' : ''
    } `
  })
  const queryString = `insert into pages (${Object.keys(params).join(
    ','
  )}) values (${paramsString});`
  const newPage = await query(queryString)
  const results = getSinglePage(newPage.insertId)
  return results
}

const updatePage = async (id, params) => {
  let paramsString = ''
  Object.keys(params).forEach((key, i) => {
    paramsString += `${key} = "${params[key]}" ${
      i < Object.keys(params).length - 1 ? ', ' : ''
    } `
  })
  const queryString = `update pages set ${paramsString} where id = ${id}`
  console.log(queryString)
  await query(queryString)
  const results = getSinglePage(id)
  return results
}

const deletePage = async id => {
  const result = await query('delete from pages where id = ' + id)
  return result
}

module.exports = {
  getPages,
  getSinglePage,
  createPage,
  updatePage,
  deletePage
}
