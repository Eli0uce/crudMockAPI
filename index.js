// DISPLAY TABLE //
function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://6057e432c3f49200173ad08d.mockapi.io/employees");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["name"] + "</td>";
        trHTML += "<td>" + object["last_name"] + "</td>";
        trHTML += "<td>" + object["job_title"] + "</td>";
        trHTML += "<td>" + object["email"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-success" title="Edit" onclick="showUserEditBox(' +
          object["id"] +
          ')"><i class="fas fa-pencil fa-inverse"></i></button>';
        trHTML +=
          '<button type="button" class="btn btn-danger" title="Delete" onclick="showUserDeleteBox(' +
          object["id"] +
          ')"><i class="fas fa-trash fa-inverse"></i></button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

// OPEN CREATE MODAL //
function showUserCreateBox() {
  Swal.fire({
    title: "Nouvel Employé",
    html:
      '<input id="id" type="hidden">' +
      '<input id="name" class="swal2-input" placeholder="Prénom">' +
      '<input id="last_name" class="swal2-input" placeholder="Nom">' +
      '<input id="job_title" class="swal2-input" placeholder="Métier">' +
      '<input id="email" class="swal2-input" placeholder="Mail">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    },
  });
}

// CREATE //
function userCreate() {
  const name = document.getElementById("name").value;
  const last_name = document.getElementById("last_name").value;
  const job_title = document.getElementById("job_title").value;
  const email = document.getElementById("email").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://6057e432c3f49200173ad08d.mockapi.io/employees");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      name: name,
      last_name: last_name,
      job_title: job_title,
      email: email,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({title: "Success", text: "Employé créé", icon: "success"});
      loadTable();
    }
  };
}

// OPEN EDIT MODAL //
function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://6057e432c3f49200173ad08d.mockapi.io/employees/" + id
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: "Modifier l'Employé",
        html:
          '<input id="id" type="hidden" value="' +
          objects.id +
          '">' +
          '<input id="name" class="swal2-input" placeholder="Prénom" value="' +
          objects.name +
          '">' +
          '<input id="last_name" class="swal2-input" placeholder="Nom" value="' +
          objects.last_name +
          '">' +
          '<input id="job_title" class="swal2-input" placeholder="Métier" value="' +
          objects.job_title +
          '">' +
          '<input id="email" class="swal2-input" placeholder="Mail" value="' +
          objects.email +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

// EDIT //
function userEdit(id) {
  const name = document.getElementById("name").value;
  const last_name = document.getElementById("last_name").value;
  const job_title = document.getElementById("job_title").value;
  const email = document.getElementById("email").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "PUT",
    "https://6057e432c3f49200173ad08d.mockapi.io/employees/" + id
  );
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
      name: name,
      last_name: last_name,
      job_title: job_title,
      email: email,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({title: "Success", text: "Employé modifié", icon: "success"});
      loadTable();
    }
  };
}

// OPEN DELETE MODAL //
function showUserDeleteBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://6057e432c3f49200173ad08d.mockapi.io/employees/" + id
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: "Souhaitez-vous supprimer cet employé ?",
        focusConfirm: false,
        preConfirm: () => {
          userDelete(id);
        },
      });
    }
  };
}

// DELETE //
function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "https://6057e432c3f49200173ad08d.mockapi.io/employees/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({title: "Success", text: "Employé supprimé", icon: "success"});
      loadTable();
    }
  };
}
