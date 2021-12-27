const sortByEarliestCreated = (a, b) => {
  return new Date(a.createdAt) - new Date(b.createdAt)
}

const sortByMostRecent = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
}

const sortTitleAtoZ = (a, b) => {
  return a.title[0].localeCompare(b.title[0])
}

const sortTitleZtoA = (a, b) => {
  return b.title[0].localeCompare(a.title[0])
}

const sortByAuthorAtoZ = (a, b) => {
  return a.createdBy.name.localeCompare(b.createdBy.name)
}

const sortByAuthorZtoA = (a, b) => {
  return b.createdBy.name.localeCompare(a.createdBy.name)
}

export {
  sortByEarliestCreated,
  sortByMostRecent,
  sortByAuthorAtoZ,
  sortByAuthorZtoA,
  sortTitleAtoZ,
  sortTitleZtoA,
}
