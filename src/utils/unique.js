let id = {}

export const staticID = (name) => {
  if (!id.hasOwnProperty(name)) id[name] = unique(name)
  return id[name]
}

export default function unique (prefix = 'id') {
  if (!id.hasOwnProperty(prefix)) id[prefix] = 0
  id[prefix]++
  return `${prefix}-${id[prefix]}`
}
