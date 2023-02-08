
$(document).ready(function(){
    $('.modal').modal();
    $("form").submit(function(){
        var name = $('input').val();
        var desc = $('#desc').val();
        var id =$('form').attr('data-id');
        $.ajax({
            method: 'put',
            url: `/image/${id}`,
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                'name': name,
                'desc':desc
            }),
            error: function(err){
                console.log(err);
            }
        })
    })
    $('#delete').click( function(){
        var id = $('#delete').attr('data-id');
        $.ajax({
            method: 'delete',
            url: `/image/${id}`,
            success: function(res){
                window.location.href ='/'
            },
            error: function(err){
                console.log(err);
            }
        })
        
    })
})
