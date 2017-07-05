import Link from './link'

const storage = {
  get: key => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, data => {
	resolve(data[key])
      })
    })
  },

  set: (key, value) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, resolve)
    })
  }
}

class LinksStore {
  all() {
    return storage.get('links')
      .then(rawLinks => {
	rawLinks = rawLinks || {}

	return Object.keys(rawLinks).map(json => {
	  const rawObj = JSON.parse(json)

	  return Object.setPrototypeOf(rawObj, Link.prototype)
	})
      })
  }

  save(link) {
    return storage.get('links')
      .then(rawLinks => {
	rawLinks = rawLinks || {}

	const json = JSON.stringify(link)

	rawLinks[json] = true

	return storage.set('links', rawLinks)
      })
  }
}

class DB {
  constructor() {
    this.links = new LinksStore
  }
}

export default new DB()
