
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

        var workHTML = "<a href=\""+ projSorted[i]["destination"] +"\" style=\"text-decoration: none; color: inherit;\"> \
                            <article class=\"project-card\"> \
                                <img src=\"" + projSorted[i]["image"] + "\" alt=\"" + projSorted[i]["title"] + "\"> \
                                <div class=\"project-content prevent-select\"> \
                                    <h3>" + projSorted[i]["title"] + "</h3> \
                                    <p> \
                                        " + projSorted[i]["description"] + " \
                                    </p> \
                                </div> \
                            </article> \
                        </a>"


        workList.innerHTML += workHTML;

    }
}


function changeOrder(button) {
    classes = this.sort;
    console.log(classes);
}

