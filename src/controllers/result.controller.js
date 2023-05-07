export async function getResults(req, res) {
  const result = res.locals.result
  try {
    res.send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}
