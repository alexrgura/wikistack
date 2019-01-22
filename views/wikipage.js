const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
<hr/><hr/>
  <h3>${page.Title}
      <small> (<a href="/wiki/${page.slug}/similar">Similar</a>)</small>
  </h3>
  <h4>by <a href="/users/${author.id}">${author.Name}</a>
          Contact at ${author.Email}</h4>
  <hr/>
  <div class="page-body">${page.Content}</div>
  <hr/>
  <div class = "page-body">${page.status}</div>
  <a href="/wiki/${page.slug}/edit" class="btn btn-primary">edit this page</a>
  <a href="/wiki/${page.slug}/delete" class="btn btn-danger">delete this page</a>
`);
