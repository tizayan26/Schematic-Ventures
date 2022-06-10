$(document).ready(function(){
    var result = shadowRootPopup.getElementById('crm_result');
    var ceo_linkedin = window.location.href;

    const onProgress = (evt) => {
        shadowRootPopup.getElementById('progress_add').innerHTML = `${evt.totalPercent}%`;
        shadowRootPopup.getElementById('progress_update').innerHTML = `${evt.totalPercent}%`;
      };
      shadowRootPopup.getElementById('file_add').addEventListener('change', (event) => fileUpload(event));
      shadowRootPopup.getElementById('file_update').addEventListener('change', (event) => fileUpload(event));
      function fileUpload(event){
          const files = event.target.files[0];
          const token = {};
 
      
          client.upload(files, { onProgress }, {}, token)
            .then(res => {
              file_obj = [
                {
                    url: res.url,
                }
            ]
            console.log(file_obj)
            })
            .catch(err => {
              console.log(err)
            });
      }

    setTimeout(function(){
        const Airtable = require('airtable');
        const base = new Airtable({apiKey: API_KEY}).base(BASE);
        var edit_content = shadowRootPopup.getElementById('edit_content');
        var entry_content = shadowRootPopup.getElementById('entry_content')
        var home_content = shadowRootPopup.getElementById('home_content');
        var close_a = shadowRootPopup.getElementById('close_add');
        var close_e = shadowRootPopup.getElementById('close_edit');
        var msg = shadowRootPopup.getElementById('msg');
        

        function getLinkedInList(ceo_linkedin){
            result.innerHTML = '';
            msg.style.display = 'block';
            msg.innerHTML = `<div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`;
            var formula = '';
    
            if(ceo_linkedin!=null || ceo_linkedin.ceo_linkedin.match('^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$') != null){
                formula += `{CEO LinkedIn}='${ceo_linkedin}'`;           
                console.log(formula);
            
                base('Schematic_Pipeline').select({
                    filterByFormula : formula,
                    view: "Main View"
                })
                .eachPage(function page(records, fetchNextPage) {
                    // This function (`page`) will get called for each page of records
                    if(records.length>0){
                        chrome.storage.local.get(['lmatch'], function(result) {
                            console.log('Value currently is ' + result.lmatch);
                            if(result.lmatch){
                                $('#shadow-wrapper-popup-sv').slideToggle("slow");
                            }
                        });
                        msg.innerHTML = '';
                        msg.style.display = 'none';
                        records.forEach(function(record) {
                            // try {
                            var li = document.createElement('li');
                            // var span = document.createElement('span');
                            var icon = `<span class="icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                            <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                            </svg></span>`;
                    
                            li.innerHTML = record.get('CEO LinkedIn')+icon;
                            li.className = 'edit';
                            li.onclick = function() {
                                updateRecord(record);
                            }
                            // span.textContent = `Match: ${record.get('CEO LinkedIn')}`;
                            // li.appendChild(span);
                            result.appendChild(li);
                            console.log('Retrieved', record.get('CEO LinkedIn'));
                        // } catch(e){ console.log('error inside eachPage => ',e)}
                        });
                
                    }else{
                        msg.style.display = 'block';
                        msg.innerText = 'no existing linkedin matches were found!';
                        var li = document.createElement('li');
                        // var span = document.createElement('span');
                        var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                        </svg></span>`;
                        li.innerHTML = ceo_linkedin + icon;
                        li.className = 'add';
                        li.onclick = function(){
                            addRecord(ceo_linkedin);
                        }
                        // span.textContent = ceo_linkedin;
                        // li.appendChild(span);
                        result.appendChild(li);
                    }
                    
                    fetchNextPage();
            
                }, function done(err) {
                    if (err) { console.error(err); return; }
                });

                var li = document.createElement('li');
                var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                </svg></span>`;
                li.innerHTML = 'Blank Record' + icon;
                li.className = 'add';
                li.onclick = function(){
                    addRecord();
                }
             
                result.appendChild(li);
            }else{
                msg.innerText = 'No link found!';
            }
        }
    
        
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
                if(record1.get('CEO Email') !== undefined)
                shadowRootPopup.getElementById('ceo_email').value = record1.get('CEO Email');
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
                if(record1.get('Description') !== undefined)
                shadowRootPopup.getElementById('desc').value =  record1.get('Description');
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
                            "Description": shadowRootPopup.getElementById('desc').value,
                            "CEO LinkedIn": shadowRootPopup.getElementById('ceo_linkedin').value,
                            "Status": "",
                            "Sourced By": {
                              "id": "usryeWEW8DpNhtoMn",
                              "email": "alexey@schematicventures.com",
                              "name": "Alex Freed"
                            },
                            "CEO Email": shadowRootPopup.getElementById('ceo_email').value,
                            "Description": "",
                            "Startup Name": shadowRootPopup.getElementById('startup_name').value
                          }
                        }];
                    if(file_obj!=null)
                    obj[0].fields["Attachments"] = file_obj;
                    base('Schematic_Pipeline').update(obj, function(err, records) {
                        if (err) {
                          console.error(err);
                          shadowRootPopup.getElementById('btn_update').innerHTML = `Save Record <span class="icon btn-icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                          <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                          </svg></span>`;
                          shadowRootPopup.getElementById('btn_update').disabled = false;
                          shadowRootPopup.getElementById('update-msg').innerText = 'ERROR! '+err;
                          return;
                        }else{
                            shadowRootPopup.getElementById('btn_update').innerHTML = `Save Record <span class="icon btn-icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                            <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                            </svg></span>`;
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

        function addRecord(ceo_linkedin=null){
            entry_content.style.display = "block";
            home_content.style.display = "none";
            edit_content.style.display = "none";
            close_a.onclick = backToHome;
            // shadowRootPopup.getElementById('ceo_email_new').value =  email;
            // var url_new = email.substring(email.lastIndexOf("@") +1);
            // shadowRootPopup.getElementById('startup_name_new').value = url_new;
            // shadowRootPopup.getElementById('url_new').value = url_new;
            shadowRootPopup.getElementById('ceo_linkedin_new').value = ceo_linkedin == null ? '' : ceo_linkedin;
            shadowRootPopup.getElementById('source_new').value = ceo_linkedin == null ? '' : window.location.href;
            
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
                        "Description": shadowRootPopup.getElementById('desc_new').value,
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

        
        getLinkedInList(ceo_linkedin);

        let lastUrl = location.href; 
        new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
        }).observe(document, {subtree: true, childList: true});

        function onUrlChange() {
            console.log('URL changed!', location.href);
            getLinkedInList(location.href);
        }

        let searchResult = (keyword) => {
            if(keyword.split('').length>1){
                while (result.hasChildNodes()) {
                    result.removeChild(result.firstChild);
                }
                // formula = `FIND('${keyword}',{Startup Name})`;
                formula = `SEARCH(LOWER('${keyword}'), LOWER({Startup Name})) > 0`;
                // formula = `REGEX_MATCH({Startup Name},'${keyword}')`;
            
                console.log(formula);
            
                base('Schematic_Pipeline').select({
                    filterByFormula : formula,
                    view: "Main View"
                })
            
                .eachPage(function page(records, fetchNextPage) {
                    if(records.length>0){
                        chrome.storage.local.get(['lmatch'], function(result) {
                            console.log('Value currently is ' + result.lmatch);
                            if(result.lmatch){
                                $('#shadow-wrapper-popup-sv').slideToggle("slow");
                            }
                        });
                        msg.remove();
                        while (result.hasChildNodes()) {
                            result.removeChild(result.firstChild);
                        }
                        records.forEach(function(record) {
                            var li = document.createElement('li');
                            li.className = 'edit';
                            var span = document.createElement('span');
                            var icon = `<span class="icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                            <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                            </svg></span>`;
                            li.innerHTML = record.get('Startup Name')+icon;
                            li.onclick = function() {
                                updateRecord(record);
                            }
                            li.appendChild(span);
                            result.appendChild(li);
                            console.log('Retrieved', record.get('Startup Name'));
                        
                        });
                      
                    }else{
                        msg.innerText = 'No Matching Records Found';
                    }
                    fetchNextPage();
                    
                }, function done(err) {
                    if (err) { console.error(err); return; }
                });
            }
            else if(keyword.split('').length==0){
                while (result.hasChildNodes()) {
                    result.removeChild(result.firstChild);
                }
                getLinkedInList(ceo_linkedin);
            }
        }
      
        $(shadowRootPopup.getElementById('search')).keyup(function() {
            searchResult(this.value);
        });
     
    },3000);
})