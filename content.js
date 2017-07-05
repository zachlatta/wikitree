import db from './lib/db'

import Article from './lib/article'
import Link from './lib/link'

function currentArticle() {
  let currentUrl = window.location.origin + window.location.pathname

  return new Article(currentUrl)
}

function onArticleLinkClick(cb) {
  window.onclick = e => {
    if (e.target.localName == 'a') {
      cb(e, new Article(e.target.href))
    }
  }
}

// override link clicking to save clicked links
onArticleLinkClick((e, article) => {
  e.preventDefault()

  let link = new Link(currentArticle(), article)

  return db.links.save(link)
    .then(() => {
      window.location = article.url
    })
})
