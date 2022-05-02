

// function appendStyles() {
//     var link = document.createElement('link');
//     link.rel = "stylesheet";
//     link.href = chrome.runtime.getURL('assets/css/material-icons.css');
//     document.head.appendChild(link);
// }

function loadPopup() {
    const html = document.createElement('html');
    var head = document.createElement('head');

    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
    head.appendChild(link);


    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL('assets/css/style.css');
    head.appendChild(link);

    // var link = document.createElement('link');
    // link.rel = "stylesheet";
    // link.href = 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css';
    // head.appendChild(link);

    var body = document.createElement('body');
  
    html.appendChild(head);
    html.appendChild(body);
    var html_content = `
    <div class="container container-sv">
    <div class="row pt-3 pb-1">
        <div class="col-sm-1">
            <img class="logo" src="${chrome.extension.getURL('assets/icons/sv-16x16.png')}" /> 
        </div>
        <div class="col-sm-7">
            <div class="blue-logo-bar"></div>
        </div>
        <div class="col-sm-3">
        <span class="top-right-head">Deal CRM</span>
        </div>
    </div>
    <div class="row search-section">
    <input type="text" placeholder="Search By Startup Name"/>
    </div>
    <!-- start home -->
    <div id="home_content">
        <div class="row">
            <div class="col-sm">
                <div class="form-group">
                    <div class="msg" id="msg"></div>
                    <ul id="crm_result" class="result-list">
                    </ul>
                </div>


            </div>
        </div>
    </div>
    <!-- end home -->
    <!-- start entry -->
    <div id="entry_content">
        <span class="close" id="close_add">&times;</span>
        <div class=" row">
            <div class="col-sm">
                <div class="form-group">
                    <label class="form-text">CEO Email</label>
                    <input type="email" class="form-control" id="ceo_email_new" placeholder="Enter CEO Email">
                </div>
                <div class="form-group">
                    <!--small class="form-text text-muted">Startup Name</small-->
                    <label class="form-text">Startup Name</label>
                    <input type="text" class="form-control" id="startup_name_new" placeholder="Enter company name">
                </div>
                <div class="form-group">
                    <label class="form-text">Lead</label>
                    <input type="text" class="form-control" id="lead_new" placeholder="Enter Lead">
                    <small class="form-text text-muted">Use comma seperated string for mutiple values</small>
                </div>
                <div class="form-group">
                    <label class="form-text">Vertical</label>
                    <input type="text" class="form-control" id="vertical_new" value="Supply Chain" placeholder="Enter Vertical">
                    <small class="form-text text-muted">Use comma seperated string for mutiple values</small>
                </div>

                <div class="form-group">
                    <select class="form-select" id="stage_new">
                        <option value="Lead" selected>Lead</option>
                        <option value="Prospecting">Prospecting</option>
                        <option value="Active">Active</option>
                        <option value="No Meeting - Response">No Meeting - Response</option>
                        <option value="No Meeting - No Response">No Meeting - No Response</option>
                        <option value="Passed">Passed</option>
                        <option value="First Meeting - Pending">First Meeting - Pending</option>
                        <option value="Second Meeting - Pending">Second Meeting - Pending</option>
                        <option value="Second Meeting - Complete">Second Meeting - Complete</option>
                        <option value="Future Reconnect">Future Reconnect</option>
                        <option value="Dilligence">Dilligence</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Send Pass">Send Pass</option>
                        <option value="First Meeting - Complete">First Meeting - Complete</option>
                        <option value=""> </option>
                    </select>
                    <!--small class="form-text text-muted">Stage</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">URL</label>
                    <input type="text" class="form-control" id="url_new" placeholder="Enter URL">
                    <!--small class="form-text text-muted">URL</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">CEO LinkedIn</label>
                    <input type="text" class="form-control" id="ceo_linkedin_new" placeholder="Enter CEO LinkedIn">
                    <!--small class="form-text text-muted">CEO LinkedIn</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">Source</label>
                    <input type="text" class="form-control" id="source_new" placeholder="Enter Source">
                    <!--small class="form-text text-muted">Source</small-->
                </div>
                <div class="form-group">
                <label class="form-text">Attachment</label>
                <input id="file_add" type="file" />
                <!--div class="controls">
                  <button id="cancel">Cancel</button>
                  <button id="pause">Pause</button>
                  <button id="resume">Resume</button>
                </div-->
                <div>Progress: <span id="progress_add"></span></div>
                </div>
                <button class="btn btn-primary" id="btn_add">Add Record</button>
                <small class="form-text text-muted" id="add-msg"></small>
            </div>
        </div>
    </div>
    <!-- end entry -->
    <!-- start edit -->
    <div id="edit_content">
        <span class="close" id="close_edit">&times;</span>
        <div class=" row">
            <div class="col-sm">
                <div class="form-group">
                    <label class="form-text">CEO Email</label>
                    <input type="email" class="form-control" id="ceo_email" placeholder="Enter CEO Email">
                </div>
                <div class="form-group">
                    <!--small class="form-text text-muted">Startup Name</small-->
                    <label class="form-text">Startup Name</label>
                    <input type="text" class="form-control" id="startup_name" placeholder="Enter company name">
                </div>
                <div class="form-group">
                    <label class="form-text">Lead</label>
                    <input type="text" class="form-control" id="lead" placeholder="Enter Lead">
                    <small class="form-text text-muted">Use comma seperated string for mutiple values</small>
                </div>
                <div class="form-group">
                    <label class="form-text">Vertical</label>
                    <input type="text" class="form-control" id="vertical" value="Supply Chain" placeholder="Enter Vertical">
                    <small class="form-text text-muted">Use comma seperated string for mutiple values</small>
                </div>

                <div class="form-group">
                    <select class="form-select" id="stage">
                        <option value="Lead">Lead</option>
                        <option value="Prospecting">Prospecting</option>
                        <option value="Active">Active</option>
                        <option value="No Meeting - Response">No Meeting - Response</option>
                        <option value="No Meeting - No Response">No Meeting - No Response</option>
                        <option value="Passed">Passed</option>
                        <option value="First Meeting - Pending">First Meeting - Pending</option>
                        <option value="Second Meeting - Pending">Second Meeting - Pending</option>
                        <option value="Second Meeting - Complete">Second Meeting - Complete</option>
                        <option value="Future Reconnect">Future Reconnect</option>
                        <option value="Dilligence">Dilligence</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Send Pass">Send Pass</option>
                        <option value="First Meeting - Complete">First Meeting - Complete</option>
                        <option value=""> </option>
                    </select>
                    <!--small class="form-text text-muted">Stage</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">URL</label>
                    <input type="text" class="form-control" id="url" placeholder="Enter URL">
                    <!--small class="form-text text-muted">URL</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">CEO LinkedIn</label>
                    <input type="text" class="form-control" id="ceo_linkedin" placeholder="Enter CEO LinkedIn">
                    <!--small class="form-text text-muted">CEO LinkedIn</small-->
                </div>
                <div class="form-group">
                    <label class="form-text">Source</label>
                    <input type="text" class="form-control" id="source" placeholder="Enter Source">
                    <!--small class="form-text text-muted">Source</small-->
                </div>
                <div class="form-group">
                <label class="form-text">Attachment</label>
                <input id="file_update" type="file" />
                <div>Progress: <span id="progress_update"></span></div>
                </div>
                <button class="btn btn-primary" id="btn_update">Update Record</button>
                <small class="form-text text-muted" id="update-msg"></small>
            </div>
        </div>
    </div>
    <!-- end edit -->
</div>
`;
    body.innerHTML = html_content; 
  
    var script = document.createElement('script');
    script.type = 'javascript';
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    body.appendChild(script); 

    shadowRootPopup.appendChild(html);
    shadowRootPopup.getElementById('home_content').style.display = "block";
    shadowRootPopup.getElementById('edit_content').style.display = "none";
    shadowRootPopup.getElementById('entry_content').style.display = "none";

}

