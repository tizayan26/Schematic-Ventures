if (document.readyState === "complete"){
    init();
}
else{
    window['onload'] = function () {
        init();
    }
}
function init(){
    const onProgress = (evt) => {
        shadowRootPopup.getElementById('progress_add').innerHTML = `${evt.totalPercent}%`;
        shadowRootPopup.getElementById('progress_update').innerHTML = `${evt.totalPercent}%`;
      };
      shadowRootPopup.getElementById('file_add').addEventListener('change', (event) => fileUpload(event));
      shadowRootPopup.getElementById('file_update').addEventListener('change', (event) => fileUpload(event));
      function fileUpload(event){
          const files = event.target.files[0];
          const token = {};
        //   const cancel = shadowRootPopup.getElementById('cancel');
        //   const pause = shadowRootPopup.getElementById('pause');
        //   const resume = shadowRootPopup.getElementById('resume');
      
        //   [cancel, resume, pause].forEach((btn) => {
        //     const id = btn.id;
        //     btn.addEventListener('click', () => {
        //       token[id]();
        //     });
        //   });
      
          client.upload(files, { onProgress }, {}, token)
            .then(res => {
            //   console.log('success: ', res)
              file_obj = [
                {
                    // size: res['_file'].size,
                    url: res.url,
                    // type:  res['_file'].type,
                    // filename:  res['_file'].name,
                }
            ]
            console.log(file_obj)
            })
            .catch(err => {
              console.log(err)
            });
      }
    var result = shadowRootPopup.getElementById('crm_result');
    setTimeout(function(){
        // $('#shadow-wrapper-popup-sv').slideToggle("slow");
        const Airtable = require('airtable');
        const base = new Airtable({apiKey: API_KEY}).base(BASE);
        var edit_content = shadowRootPopup.getElementById('edit_content');
        var entry_content = shadowRootPopup.getElementById('entry_content')
        var home_content = shadowRootPopup.getElementById('home_content');
        var close_a = shadowRootPopup.getElementById('close_add');
        var close_e = shadowRootPopup.getElementById('close_edit');
        var msg = shadowRootPopup.getElementById('msg');
    
        
        function backToHome(){
            home_content.style.display = "block";
            edit_content.style.display = "none";
            entry_content.style.display = "none";
            shadowRootPopup.getElementById('update-msg').innerText = ''
            shadowRootPopup.getElementById('add-msg').innerText = ''
        }

        function updateRecord(record){
            home_content.style.display = "none";
            entry_content.style.display = "none";
            edit_content.style.display = "block";
            close_e.onclick = backToHome;
            base('Schematic_Pipeline').find(record.id, function(err, record1) {
                if (err) { console.error(err); return; }
                console.log('Retrieved', record1.id);
                if(record1.get('Startup Name') !== undefined)
                shadowRootPopup.getElementById('startup_name').value = record1.get('Startup Name');
                if(record1.get('Lead') !== undefined)
                shadowRootPopup.getElementById('lead').value = record1.get('Lead');
                if(record1.get('Vertical') !== undefined)
                shadowRootPopup.getElementById('vertical').value =  record1.get('Vertical');
                if(record1.get('Stage')!==undefined){
                    // shadowRootPopup.getElementById('stage').querySelector(`option[value=${record1.get('Stage')}]`).selected = 'selected';
                    shadowRootPopup.getElementById('stage').value = record1.get('Stage');
                }else{
                    // shadowRootPopup.getElementById('stage').querySelector(`option[value=Lead]`).selected = 'selected';
                    shadowRootPopup.getElementById('stage').value = 'Lead';
                }
                var url = record1.get('CEO Email').substring(record1.get('CEO Email').lastIndexOf("@") +1);
                shadowRootPopup.getElementById('url').value = record1.get('URL') === undefined ? url : record1.get('URL') ;
                if(record1.get('CEO LinkedIn') !== undefined)
                shadowRootPopup.getElementById('ceo_linkedin').value = record1.get('CEO LinkedIn');
                shadowRootPopup.getElementById('source').value = record1.get('Source') === undefined ? window.location.href : record1.get('Source');
                shadowRootPopup.getElementById('btn_update').onclick = function(){
                    this.innerHTML = `
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Updating Record...`;
                    this.disabled = true;
                    var vertical = shadowRootPopup.getElementById('vertical').value;
                    var vertical_arr = vertical.split(',');
                    var lead_str = shadowRootPopup.getElementById('lead').value;
                    var lead_arr = lead_str.split(',');
                  
                    var obj = [
                        {
                          "id": record1.id,
                          "fields": {
                            "Source": shadowRootPopup.getElementById('source').value,
                            "Vertical": vertical_arr,
                            "Stage": shadowRootPopup.getElementById('stage').value,
                            "Lead": lead_arr,
                            "URL": shadowRootPopup.getElementById('url').value,
                            "CEO LinkedIn": shadowRootPopup.getElementById('ceo_linkedin').value,
                            "Status": "",
                            "Sourced By": {
                              "id": "usryeWEW8DpNhtoMn",
                              "email": "alexey@schematicventures.com",
                              "name": "Alex Freed"
                            },
                            "CEO Email": record1.get('CEO Email'),
                            "Description": "",
                            "Startup Name": shadowRootPopup.getElementById('startup_name').value
                          }
                        }];
                    if(file_obj!=null)
                    obj[0].fields["Attachments"] = file_obj;
                    base('Schematic_Pipeline').update(obj, function(err, records) {
                        if (err) {
                          console.error(err);
                          shadowRootPopup.getElementById('btn_update').innerHTML = 'Update Record';
                          shadowRootPopup.getElementById('btn_update').disabled = false;
                          shadowRootPopup.getElementById('update-msg').innerText = 'ERROR! '+err;
                          return;
                        }else{
                            shadowRootPopup.getElementById('btn_update').innerHTML = 'Update Record';
                            shadowRootPopup.getElementById('btn_update').disabled = false;
                            shadowRootPopup.getElementById('update-msg').innerText = 'Updated Successfully!';
                        }
                        records.forEach(function(record) {
                          console.log(record.get('Lead'));
                        });
                      })
                }
            });
        }
    
        msg.innerHTML = `<div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
      
        
         var website_url = window.location.hostname;
         var body = document.body.innerHTML;
         var emails = extractEmails(body);
    
        if(website_url!=null){
            // var formula = `SEARCH("${website_url}", {URL}) >= 0`;
            var formula = `OR({URL}='${website_url}',{URL}='${window.location.protocol+'//'+website_url}', {URL}='${window.location.protocol+'//'+website_url.replace('www.','')}')`;
    
            console.log(formula);
        
            base('Schematic_Pipeline').select({
                filterByFormula : formula,
                view: "Main View"
            })
            // .all(function(records){
            .eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
                result.innerHTML('<li>test</li>');
                if(records.length>0){
                    msg.innerHTML = '';
                    records.forEach(function(record) {
                        // try {
                        var li = document.createElement('li');
                        var span = document.createElement('span');
                        li.textContent = record.get('Startup Name');
    
                        li.onclick = function() {
                            updateRecord(record);
                        }
                        span.textContent = `Match: ${record.get('URL')}`;
                        li.appendChild(span);
                        result.appendChild(li);
                        console.log('Retrieved', record.get('URL'));
                    // } catch(e){ console.log('error inside eachPage => ',e)}
                    });
                }else{
                    msg.innerText = 'No Matching Records Found';
                   
                    var url_new = window.location.protocol+'//'+website_url.replace('www.','');
               
                    // emails.forEach((email) => {
                        for(var i=0; i<emails.length; i++){
                            var url_from_email = emails[i].substring(emails[i].lastIndexOf("@") +1);
                            if(url_from_email == window.location.protocol+'//'+website_url.replace('www.','')){
                                var new_email = emails[i];
                            }else{
                                var new_email = '';
                            }
                        }
                    // });
                    var li = document.createElement('li');
                    var span = document.createElement('span');
                    li.textContent = 'New Record';
                    li.onclick = function(){
                        entry_content.style.display = "block";
                        home_content.style.display = "none";
                        edit_content.style.display = "none";
                        close_a.onclick = backToHome;
                        shadowRootPopup.getElementById('ceo_email_new').value =  new_email;
                       
                        shadowRootPopup.getElementById('startup_name_new').value = url_new;
                        shadowRootPopup.getElementById('url_new').value = url_new;
                        shadowRootPopup.getElementById('source_new').value = window.location.href;
                      
                        shadowRootPopup.getElementById('btn_add').onclick = function(){
                            this.innerHTML = `
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Adding Record...`;
                            this.disabled = true;
                            var vertical = shadowRootPopup.getElementById('vertical_new').value;
                            var vertical_arr = vertical.split(',');
                            var lead_str = shadowRootPopup.getElementById('lead_new').value;
                            var lead_arr = lead_str.split(',');
                            var obj = [
                                {
                                  "fields": {
                                    "Source": shadowRootPopup.getElementById('source_new').value,
                                    "Vertical": vertical_arr,
                                    "Stage": shadowRootPopup.getElementById('stage_new').value,
                                    "Lead": lead_arr,
                                    "URL": shadowRootPopup.getElementById('url_new').value,
                                    "CEO LinkedIn": shadowRootPopup.getElementById('ceo_linkedin_new').value,
                                    "Status": "",
                                    "Sourced By": {
                                      "id": "usryeWEW8DpNhtoMn",
                                      "email": "alexey@schematicventures.com",
                                      "name": "Alex Freed"
                                    },
                                    "CEO Email": shadowRootPopup.getElementById('ceo_email_new').value,
                                    "Description": "",
                                    "Startup Name": shadowRootPopup.getElementById('startup_name_new').value,
                                  }
                                }];
                                if(file_obj!=null)
                                obj[0].fields["Attachments"] = file_obj;
                                base('Schematic_Pipeline').create(obj, function(err, records) {
                                    if (err) {
                                      console.error(err);
                                      shadowRootPopup.getElementById('add-msg').innerHTML = 'ERROR! '+err;
                                      shadowRootPopup.getElementById('btn_add').innerHTML = 'Add Record';
                                      shadowRootPopup.getElementById('btn_add').disabled = false;
                                      return;
                                    }else{
                                        shadowRootPopup.getElementById('btn_add').innerHTML = 'Add Record';
                                        shadowRootPopup.getElementById('btn_add').disabled = false
                                        shadowRootPopup.getElementById('add-msg').innerHTML = 'Added Successfully!';
                                        records.forEach(function (record) {
                                            console.log(record.getId());
                                            updateRecord(record);
                                        });
                                    }
                                  
                                  });
                        }
                    }
                    span.textContent = url_new;
                    li.appendChild(span);
                    result.appendChild(li);
                }
             
                fetchNextPage();
        
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }else{
            msg.innerText = 'No Emails Found';
        }
      
     
    },3000);
}