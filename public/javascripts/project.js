const { json } = require("express")

$(document).ready(function(){
    $.get('/employee/fetch_all_states',function(response){
        //alert(json.stringify(response.data))
        response.data.map((item)=>{
            $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
        })
    })
})