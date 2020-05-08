function follow() {
    $.ajax({
        method: 'POST',
        url: 'api/v1/follow',
        data: {
            "_id":_id
        }
    })
    .done(function(data) {
        show_notification('Following user!', 'success')
        setTimeout(()=> {window.location.reload()}, 1000)
    })
    .fail(function(data) {
        console.log(data)
    });

    for(var i=0;i<user.followers.length;i++) { 
        if(user.followers[i] == userId) { disabled }}
};