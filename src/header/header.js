module.exports = (nga, admin) => { 
  const headerTemplate = 
`<div class="navbar-header">
  <a class="navbar-brand" href="#" ng-click="appController.displayHome()">
    RoundAbout
  </a>
</div>
<p class="navbar-text navbar-right" id="logout">
    <span class="glyphicon glyphicon-user"></span>&nbsp;Logout
</p>
<script type="text/javascript" src="dpd.js"></script>    
<script type="text/javascript">    

logout = document.getElementById('logout');
logout.addEventListener('click', function(event) {
  dpd.users.logout(function(result, error) {
    if (error) alert(error.message);
    else location.pathname = '/index.html';
  });
})

</script>
    `;

admin.header(headerTemplate);

}
