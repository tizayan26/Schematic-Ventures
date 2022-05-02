// $(document).ready(function(){
//     alert('test');
//     $('table > tbody > tr').each(function(){ //[role=grid]
//         $(this).append("<p>test</p>");
//         console.log($(this));
//         // $(this).click(function(){
//         //     alert('test');
//         // })
//     })
// })

if (document.readyState === "complete"){
    GMassReady();
}
else{
    window['onload'] = function () {
        GMassReady();
    }
}
 
function GMassReady(){
    // Get the modal
    // var modal = shadowRootPopup.getElementById("editModal");


    // Get the <span> element that closes the modal
    var close_a = shadowRootPopup.getElementById('close_add');
    var close_e = shadowRootPopup.getElementById('close_edit');
    var edit_content = shadowRootPopup.getElementById('edit_content');
    var btn_new_record =  shadowRootPopup.getElementById('btn_new_record');
    var entry_content = shadowRootPopup.getElementById('entry_content')
    var home_content = shadowRootPopup.getElementById('home_content');
    // When the user clicks on <span> (x), close the modal
    

    function backToHome(){
        home_content.style.display = "block";
        edit_content.style.display = "none";
        entry_content.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
     var nodes = document.querySelectorAll('tr[jscontroller=ZdOxDb');
     nodes.forEach(function(currentValue, currentIndex, listObj) {
        //   console.log(currentValue + ', ' + currentIndex + ', ' + this);
            currentValue.addEventListener("click", function(){
                home_content.style.display = "block";
                edit_content.style.display = "none";
                entry_content.style.display = "none";
                
                var result = shadowRootPopup.getElementById('crm_result');
                var li = document.createElement('li');
                var span = document.createElement('span');
                var msg = shadowRootPopup.getElementById('msg');
                msg.innerHTML = `
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`;
                btn_new_record.disabled = false;
                // result.removeChild();
                console.log(result.getElementsByTagName('li').length);
                while (result.hasChildNodes()) {
                    result.removeChild(result.firstChild);
                  }
                console.log('clicked!');
                setTimeout(function(){
                    var email_body = document.querySelector('div[jsname=h50Ewe]').innerHTML;
                    var emails = extractEmails(email_body);
                    emails = getUnique(emails);
                    console.log(getUnique(emails));
                    var formula = `OR(`;
                    emails.forEach(function(currentValue, currentIndex, listObj) {
                        formula += `{CEO Email}='${currentValue}'`;
                       
                        if(currentIndex!= emails.length-1){
                            formula += `,`;
                        }
                    })
                    formula += `)`;
                    console.log(formula);
                    var Airtable = require('airtable');
                    var base = new Airtable({apiKey: API_KEY}).base(BASE);
                    
                
                    base('Schematic_Pipeline').select({
                        // Selecting the first 3 records in Main View:
                        filterByFormula : formula,//
                        view: "Main View"
                    }).eachPage(function page(records, fetchNextPage) {
                        // This function (`page`) will get called for each page of records.
                      
                        if(records.length>0){
                            msg.innerHTML = '';
                            records.forEach(function(record) {
                                li.textContent = record.get('Startup Name');
                                // li.setAttribute('data-toggle', 'modal');
                                // li.setAttribute('data-target', '#exampleModalCenter');
                                // When the user clicks on the button, open the modal
                                li.onclick = function() {
                                    // modal.style.display = "block";
                                    home_content.style.display = "none";
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
                                     
                                            base('Schematic_Pipeline').update(obj, function(err, records) {
                                                if (err) {
                                                  console.error(err);
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
                                span.textContent = `Match: ${record.get('CEO Email')}`;
                                li.appendChild(span);
                                result.appendChild(li);
                                console.log('Retrieved', record.get('CEO Email'));
                            });
                        }else{
                            msg.innerText = 'no existing matches were found!';
                        }

                        btn_new_record.onclick = function(){
                            entry_content.style.display = "block";
                            home_content.style.display = "none";
                            close_a.onclick = backToHome();
                            var ul = shadowRootPopup.getElementById('suggestion_links');
                            ul.innerHTML = '';
                            emails.forEach(function(currentValue, currentIndex, listObj) {
                                var li = document.createElement('li');
                                var s_link = document.createElement('a');
                                s_link.href = '#';
                                s_link.innerText = currentValue;
                                s_link.onclick = function(){
                                    var email_new =this.innerText;
                                    shadowRootPopup.getElementById('ceo_email_new').value =  email_new;
                                    var url_new = email_new.substring(email_new.lastIndexOf("@") +1);
                                    shadowRootPopup.getElementById('startup_name_new').value = url_new;
                                    shadowRootPopup.getElementById('url_new').value = url_new;
                                    shadowRootPopup.getElementById('source_new').value = window.location.href;
                                }
                                li.appendChild(s_link);
                                ul.appendChild(li);
                            });
                            shadowRootPopup.getElementById('suggestion').appendChild(ul);
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
                                        "CEO Email": shadowRootPopup.getElementById('ceo_email_new'),
                                        "Description": "",
                                        "Startup Name": shadowRootPopup.getElementById('startup_name').value
                                      }
                                    }];
                                    base('Schematic_Pipeline').create(obj, function(err, records) {
                                        if (err) {
                                          console.error(err);
                                          return;
                                        }else{
                                            shadowRootPopup.getElementById('btn_add').innerHTML = 'Add Record';
                                            shadowRootPopup.getElementById('btn_add').disabled =
                                            shadowRootPopup.getElementById('add-msg').innerHTML = 'Added Successfully!';

                                        }
                                        records.forEach(function (record) {
                                          console.log(record.getId());
                                        });
                                      });
                            }
                        }
                     
                
                        // To fetch the next page of records, call `fetchNextPage`.
                        // If there are more records, `page` will get called again.
                        // If there are no more records, `done` will get called.
                        fetchNextPage();
                
                    }, function done(err) {
                        if (err) { console.error(err); return; }
                    });
                 
                },3000);
              
            });
        
        }
      );
}
