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
                    });
                });
            });
