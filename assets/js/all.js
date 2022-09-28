if (document.readyState === "complete"){
    init();
}
else{
    window['onload'] = function () {
        init();
    }
}

function init(){
    shadowRootPopup.getElementById('search').focus();
    shadowRootPopup.getElementById('startup_name_new').focus();
    const onProgress = (evt) => {
        // console.log(evt);
        // if(evt.totalPercent===0){
        //     var spin_msg = `<div class="spinner-border text-primary" role="status">
        //     <span class="visually-hidden">Uploading...</span></div>`;
        //     shadowRootPopup.getElementById('progress_add').innerHTML = spin_msg;
        //     shadowRootPopup.getElementById('progress_update').innerHTML = spin_msg;
        // }else if(evt.totalPercent===100){
        //     var final_msg =  `${file_obj.length} file uploaded.`;
        //     shadowRootPopup.getElementById('progress_add').innerHTML = final_msg;
        //     shadowRootPopup.getElementById('progress_update').innerHTML = final_msg;
        // }
        // shadowRootPopup.getElementById('progress_add').innerHTML = `${evt.totalPercent}%`;
        // shadowRootPopup.getElementById('progress_update').innerHTML = `${evt.totalPercent}%`;
        var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>`;
        shadowRootPopup.getElementById('progress_add').innerHTML = spinner;
        shadowRootPopup.getElementById('progress_update').innerHTML = spinner;
      };
      shadowRootPopup.getElementById('file_add').addEventListener('change', (event) => fileUpload(event));
      shadowRootPopup.getElementById('file_update').addEventListener('change', (event) => fileUpload(event));
      function fileUpload(event){
          const files = event.target.files[0];
          const token = {};
     
          client.upload(files, { onProgress }, { filename: files.name }, token)
            .then(res => {
                // console.log(res._file.name);
            if (file_obj === null){
              file_obj = [
                {
                    url: res.url,
                    filename: res._file.name

                }
            ]
            }else{
                file_obj.push({url: res.url})
            }
            console.log(file_obj)
            shadowRootPopup.getElementById('progress_add').innerHTML = `${file_obj.length} file uploaded`;
            shadowRootPopup.getElementById('progress_update').innerHTML = `${file_obj.length} file uploaded`;
            })
            .catch(err => {
              console.log(err);
              shadowRootPopup.getElementById('progress_add').innerHTML = `Upload Error: ${err}!`;
              shadowRootPopup.getElementById('progress_update').innerHTML = `Upload Error: ${err}!`;
            });
      }
    var result = shadowRootPopup.getElementById('crm_result');
    setTimeout(function(){
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
                if(record1.get('CEO Email') !== undefined)
                shadowRootPopup.getElementById('ceo_email').value = record1.get('CEO Email');
                if(record1.get('Startup Name') !== undefined)
                shadowRootPopup.getElementById('startup_name').value = record1.get('Startup Name');
                if(record1.get('Lead') !== undefined)
                shadowRootPopup.getElementById('lead').value = record1.get('Lead');
                if(record1.get('Vertical') !== undefined)
                shadowRootPopup.getElementById('vertical').value =  record1.get('Vertical');
                if(record1.get('Stage')!==undefined){
                    shadowRootPopup.getElementById('stage').value = record1.get('Stage');
                }else{
                    shadowRootPopup.getElementById('stage').value = 'Lead';
                }
                if(record1.get('Description') !== undefined)
                shadowRootPopup.getElementById('desc').textContent =  record1.get('Description');
                if(record1.get('CEO Email') !== undefined)
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
                            "Status": shadowRootPopup.getElementById('status').value,
                            "Sourced By": JSON.parse(shadowRootPopup.getElementById('source_by').value),
                            "CEO Email": shadowRootPopup.getElementById('ceo_email').value,
                            "Description": shadowRootPopup.getElementById('desc').value,
                            "Startup Name": shadowRootPopup.getElementById('startup_name').value
                          }
                        }];
                    console.log(record1.fields["Attachments"]);
                    if(file_obj!=null){
                        if(record1.fields["Attachments"] === undefined){
                            obj[0].fields["Attachments"] = file_obj;
                        }else{
                            var new_attach_array = [];
                            record1.fields["Attachments"].forEach((eobj)=>{
                                var update_obj = {id: eobj.id }
                                new_attach_array.push(update_obj);
                            });
                            file_obj.forEach((obj)=>{
                                console.log(obj);
                                new_attach_array.push(obj);
                            });
                            // obj[0].fields["Attachments"] = record1.fields["Attachments"].push(file_obj[0])
                            obj[0].fields["Attachments"] = new_attach_array;
                        }
                    }
                    console.log(obj[0].fields["Attachments"]);
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
                            shadowRootPopup.getElementById('btn_update').innerHTML = `Save Record<span class="icon btn-icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                            <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                            </svg></span>`;
                            shadowRootPopup.getElementById('btn_update').disabled = false;
                            shadowRootPopup.getElementById('update-msg').innerText = 'Updated Successfully!';
                        }
                        // records.forEach(function(record) {
                        //   checkDropbox(record.get('ID')+'-'+record.get('Startup Name'));
                        //   console.log(record.get('Lead'));
                        // });
                      })
                }
            });
        }

        function addRecord(blank=false,new_email,url_new){
            entry_content.style.display = "block";
            home_content.style.display = "none";
            edit_content.style.display = "none";
            close_a.onclick = backToHome;
            if(!blank){
                shadowRootPopup.getElementById('ceo_email_new').value =  new_email;
                chrome.storage.local.get(['poplead','orlead'], function(result) {
                    if(result.poplead!=undefined){
                        if(result.poplead){
                            shadowRootPopup.getElementById('lead_new').value = result.orlead;
                        }else{
                            shadowRootPopup.getElementById('lead_new').value = 'Alex'; 
                        }
                    }else{
                        shadowRootPopup.getElementById('lead_new').value = 'Alex'; 
                    }
                });
                chrome.storage.local.get(['popver','orver'], function(result) {
                    if(result.popver!=undefined){
                        if(result.popver){
                            shadowRootPopup.getElementById('vertical_new').value = result.orver;
                        }else{
                            shadowRootPopup.getElementById('vertical_new').value = 'Supply Chain'; 
                        }
                    }else{
                        shadowRootPopup.getElementById('vertical_new').value = 'Supply Chain'; 
                    }
                });
                chrome.storage.local.get(['popstg','orstg'], function(result) {
                    if(result.popstg!=undefined){
                        if(result.popstg){
                            shadowRootPopup.getElementById('vertical_new').value = result.orstg;
                        }else{
                            shadowRootPopup.getElementById('vertical_new').value = 'Lead'; 
                        }
                    }else{
                        shadowRootPopup.getElementById('vertical_new').value = 'Lead'; 
                    }
                });

                chrome.storage.local.get(['popsn','orsn'], function(result) {
                    if(result.popsn!=undefined){
                        if(result.popsn){
                            shadowRootPopup.getElementById('startup_name_new').value = (result.orsn!='') ? result.orsn : document.title;
                        }else{
                            shadowRootPopup.getElementById('startup_name_new').value = ''; 
                        }
                    }else{
                        shadowRootPopup.getElementById('startup_name_new').value = document.title; 
                    }
                });
                chrome.storage.local.get(['popurl','orurl'], function(result) {
                    if(result.popurl!=undefined){
                        if(result.popurl){
                            shadowRootPopup.getElementById('url_new').value = (result.orurl!='') ? result.orurl : url_new;
                        }else{
                            shadowRootPopup.getElementById('url_new').value = '';
                        }
                    }else{
                        shadowRootPopup.getElementById('url_new').value = url_new;
                    }
                });
                chrome.storage.local.get(['popdesc','ordesc'], function(result) {
                    if(result.popdesc!=undefined){
                        if(result.popdesc){
                            shadowRootPopup.getElementById('desc_new').value = (result.ordesc!='') ? result.ordesc : '';
                        }else{
                            shadowRootPopup.getElementById('desc_new').value = '';
                        }
                    }
                });
                chrome.storage.local.get(['popstat','orstat'], function(result) {
                    if(result.popstat!=undefined){
                        if(result.popstat){
                            shadowRootPopup.getElementById('desc_new').value = (result.orstat!='') ? result.orstat : '';
                        }else{
                            shadowRootPopup.getElementById('desc_new').value = '';
                        }
                    }
                });
                chrome.storage.local.get(['popsrc','orsrc'], function(result) {
                    if(result.popstat!=undefined){
                        if(result.popstat){
                            shadowRootPopup.getElementById('source_new').value = (result.orsrc!='') ? result.orsrc : window.location.href;
                        }else{
                            shadowRootPopup.getElementById('source_new').value = '';
                        }
                    }
                });
            }else{
                shadowRootPopup.getElementById('ceo_email_new').value =  '';
                shadowRootPopup.getElementById('startup_name_new').value = '';
                shadowRootPopup.getElementById('url_new').value = '';
                shadowRootPopup.getElementById('source_new').value = '';
                shadowRootPopup.getElementById('status_new').value = '';
            }
          
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
                        "Status": shadowRootPopup.getElementById('status_new').value,
                        "Sourced By": JSON.parse(shadowRootPopup.getElementById('source_by_new').value),
                        "CEO Email": shadowRootPopup.getElementById('ceo_email_new').value,
                        "Startup Name": shadowRootPopup.getElementById('startup_name_new').value,
                      }
                    }];
                    if(file_obj!=null){
                        var new_attach_array = [];
                        file_obj.forEach((obj)=>{
                            console.log(obj);
                            new_attach_array.push(obj);
                        });
                        obj[0].fields["Attachments"] = new_attach_array;
                    }
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
                                // checkDropbox(record.get('ID')+'-'+record.get('Startup Name'));
                                console.log(record.getId());
                                updateRecord(record);
                            });
                        }
                      
                      });
            }
        }

        function init(){
            msg.innerHTML = `<div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>`;

            var body = document.body.innerHTML;
            var emails = extractEmails(body);
            var website_url = window.location.hostname;
            var tab_index = 0;
            if(website_url!=null){
                var formula = `OR({URL}='${website_url}',{URL}='${window.location.protocol+'//'+website_url}',{URL}='${window.location.protocol+'//'+website_url+'/'}', {URL}='${window.location.protocol+'//'+website_url.replace('www.','')}', {URL}='${window.location.protocol+'//'+website_url.replace('www.','')+'/'}')`;
                console.log(formula);
            
                base('Schematic_Pipeline').select({
                    filterByFormula : formula,
                    view: "Main View"
                })
                .eachPage(function page(records, fetchNextPage) {
                    if(records.length>0){
                        chrome.storage.local.get(['wmatch'], function(result) {
                            console.log('Value currently is ' + result.wmatch);
                            if(result.wmatch){
                                $('#shadow-wrapper-popup-sv').slideToggle("slow");
                            }
                        });
                        // msg.remove();
                        msg.style.display  = 'none';
                       
                        records.forEach(function(record) {
                            var li = document.createElement('li');
                            li.className = 'edit';
                            li.tabIndex = tab_index;
                            var span = document.createElement('span');
                            var icon = `<span class="icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4001 10.6578H13.3235V13.9234H1.15846V1.75836H4.424V0.681747H0.0819092V14.9999H14.4L14.4001 10.6578Z" fill="#007DED"/>
                            <path d="M5.14174 7.177L4.06512 11.0167L7.90482 9.94008L15.0818 2.78102L12.3008 3.05176e-05L5.14174 7.177ZM7.34864 8.98916L5.60821 9.47364L6.09269 7.73322L10.4168 3.40908L11.6728 4.66502L7.34864 8.98916ZM12.4264 3.91143L11.1704 2.65549L12.3008 1.52508L13.5568 2.78102L12.4264 3.91143Z" fill="#007DED"/>
                            </svg></span>`;
                            li.innerHTML = record.get('URL')+icon;
        
                            li.onclick = function() {
                                updateRecord(record);
                            }
                            li.appendChild(span);
                            result.appendChild(li);
                            console.log('Retrieved', record.get('URL'));
                        
                        });
                        fetchNextPage();
                    }else{
                        msg.innerText = 'No Matching Records Found';
                        if(emails!=null){
                            emails = getUnique(emails);
                            console.log(emails);
                            for(var i=0; i<emails.length; i++){
                                var url_from_email = emails[i].substring(emails[i].lastIndexOf("@") +1);
                                var new_email = (url_from_email == website_url.replace('www.','')) ? emails[i] : '';
                                console.log(url_from_email +'='+ website_url.replace('www.',''))
                            }
                            var url_new = window.location.protocol+'//'+website_url.replace('www.','');
                            var li = document.createElement('li');
                            li.tabIndex = tab_index;
                            var span = document.createElement('span');
                            var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                            </svg></span>`;
                            li.innerHTML = url_new + icon;
                            li.className = 'add';
                            li.onclick = function(){
                                addRecord(false,new_email,url_new);
                            }
                            result.appendChild(li);
                        }else{
                            var url_new = window.location.protocol+'//'+website_url.replace('www.','');
                            var li = document.createElement('li');
                            li.tabIndex = tab_index;
                            var span = document.createElement('span');
                            var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                            </svg></span>`;
                            li.innerHTML = url_new + icon;
                            li.className = 'add';
                            li.onclick = function(){
                                addRecord(false,'',url_new);
                            }
                            result.appendChild(li);
                        }
                        
                    }

                    /*Bank entry*/
                    var li = document.createElement('li');
                    li.tabIndex = tab_index;
                    var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                    </svg></span>`;
                    li.innerHTML = 'Blank Record' + icon;
                    li.className = 'add';
                    li.onclick = function(){
                        addRecord(true);
                    }
                    result.appendChild(li);
                
            
                }, function done(err) {
                    if (err) { console.error(err); return; }
                });
            }else{
                msg.innerText = 'No Website Found';
            }
        }
    
        init();

        let searchResult = (keyword) => {
            msg.style.display  = 'block';
            msg.innerHTML = `<div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>`;
            var tab_index = 0;
            if(keyword.split('').length>1){
                while (result.hasChildNodes()) {
                    result.removeChild(result.firstChild);
                }
                formula = `SEARCH(LOWER('${keyword}'), LOWER({Startup Name})) > 0`;
                console.log(formula);
            
                base('Schematic_Pipeline').select({
                    filterByFormula : formula,
                    view: "Main View"
                })
                .eachPage(function page(records, fetchNextPage) {
                    if(records.length>0){
                        chrome.storage.local.get(['wmatch'], function(result) {
                            console.log('Value currently is ' + result.wmatch);
                            if(result.wmatch){
                                $('#shadow-wrapper-popup-sv').slideToggle("slow");
                            }
                        });
                        // msg.remove();
                        msg.innerText = '';
                        msg.style.display  = 'none';
                        while (result.hasChildNodes()) {
                            result.removeChild(result.firstChild);
                        }
                        records.forEach(function(record) {
                            var li = document.createElement('li');
                            li.tabIndex = tab_index;
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
                        fetchNextPage();
                    }else{
                        msg.style.display  = 'block';
                        msg.innerText = 'No Matching Records Found';

                        var li = document.createElement('li');
                        li.tabIndex = tab_index;
                        var icon = `<span class="icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 0C6.01055 0 5.61361 0.396919 5.61361 0.886387V5.61361H0.886387C0.396935 5.61361 0 6.01053 0 6.5C0 6.98947 0.396919 7.38639 0.886387 7.38639H5.61361V12.1136C5.61361 12.6031 6.01053 13 6.5 13C6.98947 13 7.38639 12.6033 7.38639 12.1136V7.38639H12.1136C12.6031 7.38639 13 6.98947 13 6.5C13 6.01053 12.6031 5.61361 12.1136 5.61361H7.38639V0.886387C7.38639 0.396935 6.98967 0 6.5 0Z" fill="#767676"/>
                        </svg></span>`;
                        li.innerHTML = keyword + icon;
                        li.className = 'add';
                        li.onclick = function(){
                            addRecord(true);
                        }
                        result.appendChild(li);
                    }
                }, function done(err) {
                    if (err) { console.error(err); return; }
                });
            }
            // else if(keyword.split('').length==0){
            else if(keyword.length==0){
            while (result.hasChildNodes()) {
                    result.removeChild(result.firstChild);
                }
                init();
            }
        }
      
        // $(shadowRootPopup.getElementById('search')).keyup(function() {
        //     searchResult(this.value);
        // });
        shadowRootPopup.getElementById('search').addEventListener("search", function(){
            searchResult(this.value);
        });
        shadowRootPopup.getElementById('submit_search').addEventListener("click", function(){
            searchResult(shadowRootPopup.getElementById('search').value)
        });
        shadowRootPopup.getElementById('reboot').addEventListener("click",function(){
            shadowRootPopup.getElementById('reboot').disabled = true;
            console.log("rebooting...");
            // chrome.runtime.sendMessage({call:'reboot'}, (response) => {
            //     console.log(response);
            //     if(response=="Restarted Successfully!"){
            //         setTimeout(function(){
                        
            //         },3000)
            //     }
            // })
            msg.style.display  = 'block';
            msg.innerHTML = `<div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>`;
            close_a.click();
            close_e.click()
            while (result.hasChildNodes()) {
                result.removeChild(result.firstChild);
            }
            init();
            setTimeout(shadowRootPopup.getElementById('reboot').disabled = false,500);        })
        
    },3000);
}