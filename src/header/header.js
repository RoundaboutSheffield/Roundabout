module.exports = (nga, admin) => { 
  const headerTemplate = 
`<div class="navbar-header">
  <a class="navbar-brand" href="#" ng-click="appController.displayHome()">
    RoundAbout
  </a>
</div>
<p class="navbar-text navbar-right" id="logout" ng-click>
  <logout />
</p>
   `;

admin.header(headerTemplate);

}
