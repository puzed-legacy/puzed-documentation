const hyperx = require('hyperx');
const sidebar = require('./sidebar');

function homePage (h, createPage) {
  const html = hyperx(h);

  createPage('/', 'Developer Docs - Puzed',
    html`
      <div class="with-sidebar">
        <div class="content thin">
          ${sidebar(h)}
          
          <section>
          <div><h2 id="general-information">General information</h2>
<p>Interfacing with the Puzed API server is done via a REST API over https.</p>

<h2 id="help-puzed">Help Puzed</h2>
<p>If you come across any bugs please help us by filing a Pull Request in github
on our <a href="https://www.github.com/puzed/puzed-documentation">documentation repo</a>.</p>
</div>
          </section>
        </div>
      </div>
    `
  );
}

function extraPages (h, createPage) {
  homePage(h, createPage);
}

module.exports = extraPages;
