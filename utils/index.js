export const stringifyRouterQuery = query => {
  let search = ''
  Object.entries(query).forEach(
    ([key, value], index) => (search += `${index ? '&' : '?'}${key}=${value}`)
  )
  return search
}
