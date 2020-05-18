$(document).ready(function () {
            $('#Buscar').on('keyup', function (e) {
                let nombre = e.target.value;
                // Haciendo la peticion de la Api de Github
                $.ajax({
                    // Variable url que que contiene la direccion de la Api Github con el nombre que le ingresemos    
                    url: 'https://api.github.com/users/' + nombre,
                    data: {
                        client_id: 'b9315bcd5a07fcd759d8',
                        client_secret: 'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
                    }
                }).done(function (user) {
                    $.ajax({
                        // Variable url que hace referencia a los repos del usuario ingresado
                        url: 'https://api.github.com/users/' + nombre + '/repos',
                        data: {
                            client_id: 'b9315bcd5a07fcd759d8',
                            client_secret: 'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
                            sort: 'created: asc',
                            per_page: 10
                        }
                    }).done(function (repos) {
                        $.each(repos, function (index, repo) {
                            $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-10">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
          `);
                        });
                    }); // Seccion del diseño donde se mostrara toda la informacion del usuario
                    $('#profile').html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Lista de Repositorios</h3>
        <div id="repos"></div>
        `);
                });
            });
    });
function getPDF() {
  var doc = new jsPDF();
 
  // We'll make our own renderer to skip this editor
  var specialElementHandlers = {
    '#getPDF': function(element, renderer){
      return true;
    },
    '.controls': function(element, renderer){
      return true;
    }
  };

  // All units are in the set measurement for the document
  // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
  doc.fromHTML($('.Contenido').get(0), 15, 15, {
    'width': 170, 
    'elementHandlers': specialElementHandlers
  });

  doc.save('Generated.pdf');
}
