class RestController{
    constructor(){}

    get(url, onSuccess){
        $.get({
            url: url,
            contentType: 'application/json',
            success: onSuccess
        });
    }

    post(url, data, onSuccess){
        $.post({
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: onSuccess
        });
    }

    delete(url, onSuccess){
        $.ajax({
            url : url,
            //data : JSON.stringify(data),
            type : 'DELETE',
            success: onSuccess
        });
    }
}