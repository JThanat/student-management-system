let id = {}

export default function (prefix = 'id') {
  if (!id.hasOwnProperty(prefix)) id[prefix] = 0
  id[prefix]++
  return `${prefix}-${id[prefix]}`
}
