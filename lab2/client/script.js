let taskUUID = -1;

window.onload = async function() {
    const response = await clientRequest("/api", "GET");
    console.log(response);

    //for (let task in response) getTask(task);
    for (let i = 0; i < response.length; i++) getTask(response[i]);

    let addBtn = document.getElementById("addBtn").onclick = async function () {
        let task = {};
        task.name = document.getElementById("name").value;
        task.description = document.getElementById("description").value;
        task.dateTime = document.getElementById("dateTime").value;

        const response = await clientRequest("/api", "POST", task);

        if (response.message === "Unauthorized user"){
            alert("Ошибка 401 Пользователь не авторизован");
        } else {
            getTask(response);
            console.log(response);
        }
   };

   let updateBtn = document.getElementById("updateBtn").onclick = async () => {
       let task = {};

       task.uuid = taskUUID;
       task.name = document.getElementById("nameUpdate").value;
       task.description = document.getElementById("descriptionUpdate").value;
       task.dateTime = document.getElementById("dateTimeUpdate").value;

       const response = await clientRequest(`/api/tasks/${taskUUID}`, "PUT", task);

       if (response.message === "Unauthorized user") {
           alert("Ошибка 401, пользователь не авторизован");
       } else {
           const elem = document.getElementsByClassName(taskUUID.toString())[0];
           const elements = document.getElementsByClassName("task-card");

           for (let i = 0; i < elements.length; i++) {
               if (elements[i] === elem){
                   getTask(response, i);
               }
           }
       }
   };

   let searchBtn = document.getElementById("searchBtn").onclick = async function () {
        let filterObject = {};

        filterObject.name = document.getElementById("nameFilter").value;
        filterObject.description = document.getElementById("descriptionFilter").value;
        filterObject.fromDateTime = document.getElementById("fromDateTimeFilter").value;
        filterObject.toDateTime = document.getElementById("toDateTimeFilter").value;
        filterObject.sortOption = document.getElementById("sortOptionSelect").value;
        console.log(filterObject);

        const response = await clientRequest('/api/filter', "POST", filterObject);

        document.getElementById('tasks').innerHTML = '';

        for (let i = 0; i < response.length; i++) getTask(response[i]);
   };
};

function update(uuid, name, description, dateTime) {
    taskUUID = uuid;

    document.getElementById("nameUpdate").value = name;
    document.getElementById("descriptionUpdate").value = description;
    document.getElementById("dateTimeUpdate").value = dateTime;

    $('#update-Modal').modal('show');
    //$('#update-Modal').modal('toggle');
    //$('#update-Modal').modal();
}

async function delete(uuid) {
    const response = await clientRequest(`/api/tasks/${uuid}`, "DELETE");
    if (response.message !== "Unauthorized user")
        document.getElementsByClassName(uuid.toString())[0].remove();
    else {
        alert("Ошибка 401, пользователь не авторизован");
    }
}

async function auth(email, password, flag = false) {
    const user = {};
    user.email = email;
    user.password = password;

    console.log(user);
    let response;

    if (flag) {
        console.log("reg");
        response = await clientRequest("/register", "POST", user);
        document.getElementById('reg-auth-Modal').modal = "hide";
    } else {
        console.log("auth");
        response = await clientRequest("/login", "POST", user);
        console.log(response);
        console.log(get_cookie("token"));
        //token = response.token;
    }

    if(response.message) {
        document.getElementById('warning').style.display = "block";
        document.getElementById('warning').innerText = response.message;
        document.getElementById('auth-reg').style.display = "none";
    } else {
        document.getElementById('auth-reg').style.display = "block";

        if (flag)
            document.getElementById('auth-reg').innerText = "The user is registered";
        else
            document.getElementById('auth-reg').innerText = "The user is logged in";

        document.getElementById('warning').style.display = "none";

        document.getElementById('passwordField').value = "";
        document.getElementById('emailField').value = "";

    }

}

function get_cookie(cookie_name)
{
    let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

async function clientRequest(url, method, data = null) {
    try {
        let headers = {};
        headers['Authorization'] = get_cookie("token");//.replace("token=Bearer%20","");
        //console.log(headers['Authorization']);

        let body;

        if (data) {
            headers['Content-type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return await response.json();
    } catch (e) {
        console.warn(e.message);
    }
}

function getTask(task, position = null) {
    if (position === null) {
        const x = `<div class="col-6 py-md-2 ${task.uuid} task-card">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title" id="name">${task.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" id="description">${task.description}</h6>
                                <div id="dateTime">${new Date(Date.parse(task.dateTime))}</div>

                                <hr>

                                <button type="button" class="btn btn-primary" onclick="update('${task.uuid}','${task.name}','${task.description}', '${task.dateTime}')">Update</button>
                                <button type="button" class="btn btn-danger" id="deleteBtn" onclick="delete('${task.uuid}')">Delete</button>
                            </div>
                        </div> 
                    </div>`;
        document.getElementById('tasks').innerHTML += x;
    } else {
        document.getElementsByClassName('task-card')[position].innerHTML =
                        `<div class="card">
                            <div class="card-body">
                                <h5 class="card-title" id="name">${task.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" id="description">${task.description}</h6>
                                <div id="dateTime">${new Date(Date.parse(task.dateTime))}</div>

                                <hr>

                                <button type="button" class="btn btn-primary" onclick="update('${task.uuid}','${task.name}','${task.description}', '${task.dateTime}')">Update</button>
                                <button type="button" class="btn btn-danger" id="deleteBtn" onclick="delete('${task.uuid}')">Delete</button>
                            </div>
                        </div>`;
    }
}
