
function sortProjects(projectsList, order = "desc") {

    const dir = order === "desc" ? -1 : 1;

    return projectsList.sort(
        (a, b) => (new Date(a.date) - new Date(b.date)) * dir
    );

}

function displayProjects(projects, order = "desc", limit = 0) {

    var projSorted = sortProjects(projects, order);

    if(limit == 0) {
        limit = projSorted.length;
    }

    var workList = document.getElementById("work-list");

    for(let i = 0; i < limit; i++) {
        
        var workHTML = "<div class=\"work\"> \
                        <span class=\"helper\"></span> \
                        <img src=\"" + projSorted[i]["image"] + "\" alt=\"" + projSorted[i]["title"] + "\"></img> \
                        <div class=\"layer\"> \
                            <h3>" + projSorted[i]["title"] + "</h3> \
                            <div class=\"tag-holder\">"

        for(let j = 0; j < projSorted[i]["tags"].length; j++) {
            workHTML += "<div class=\"tag\">" + projSorted[i]["tags"][j] + "</div>";
        }

        workHTML += "</div> \
                            <p>" + projSorted[i]["description"] + "</p> \
                            <a class=\"projectLink\" href=\"" + projSorted[i]["destination"] + "\"><i class=\"fa-solid fa-up-right-from-square\"></i></a> \
                        </div> \
                    </div>";

        workList.innerHTML += workHTML;

    }
}


function changeOrder(button) {
    classes = this.sort;
    console.log(classes);
}

