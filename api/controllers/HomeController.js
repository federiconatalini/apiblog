class HomeController {

    constructor() {
        this.posts = [];
        this.titolo;
        this.articolo;
        this.pubblico;
        this.featured;
        this.restController = new RestController();
    }


    init() {

        $(document).ready(function () {
            this.titolo = $("#title");
            this.articolo = $("#article");
            this.pubblico = $("#pubblico");
            this.featured = $("#featured");
            this.getPost();
            this.deletePost();

            $('#invia').click(this.addPost.bind(this));

        }.bind(this))
    }

    addPost() {
        this.closeModal();
        var pub = this.pubblico.prop("checked");
        var fea = this.featured.prop("checked");
        var p = new Post(this.titolo.val(), this.articolo.val(), pub, fea);
        this.posts.push(p);
        this.newPost(p);
        this.resetModal();
    }

    getPost() {
        this.restController.get('http://localhost:3000/posts', function (data, textStatus, jqXHR) {
            for (let id in data) {
                this.showPosts(data[id]);
            }
        }.bind(this));
    }

    newPost(post) {
        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public,
            "tag": ["",""]
        }
        this.restController.post("http://localhost:3000/posts", JSON.stringify(data), function (data, status, xhr) {
            this.showPost();
        }.bind(this))
    }
    
    deletePost(){
        
        this.restController.delete('https://texty-89895.firebaseio.com/posts/'+'-MJ7pU-9KxjkMUJbe01a'+'.json',function(data, status, xhr){
            console.log('CIAO');
        }.bind(this))
    }

    closeModal() {
        $("#addPost").modal("hide");
    }

    resetModal() {
        this.titolo.val("");
        this.articolo.val("");
    }

    showPosts(post) {
        // let posts=this.posts;
        //for (var i = 0; i < posts.length; i++) {
        if (post.public != false) {
            if (post.featured != true) {
                this.buildCard(post.title, post.body, post.tag);
            }
            else {
                this.buildCardFeatured(post.title, post.body, post.tag);
                //}
            }
        }
    }

    showPost() {
        var that = this.posts;
        if (that[that.length - 1].pubblico) {
            if (that[that.length - 1].featured) {
                this.buildCardFeatured(that[that.length - 1].title, that[that.length - 1].body);
            } else {
                this.buildCard(that[that.length - 1].title, that[that.length - 1].body);
            }
        } 
    }

    buildCard(title, body, tag) {
        return $("#postContainer").append('<div class="card bg-light mb-3 mx-auto" style="max-width: 18rem;">' +
            '<div class="card-header"><h5 class="card-title">' + title + '</h5></div>' +
            '<div class="card-body">' +
            '<p class="card-text">' + body + '</p>' +
            '<span class="badge badge-secondary">' + tag + '</span></div></div>');
    }

    buildCardFeatured(title, body, tag) {
        return $("#postContainer").prepend('<div class="card bg-light mb-3 mx-auto" style="max-width: 18rem;">' +
            '<div class="card-header bg-primary"><h5 class="card-title">' + title + '</h5></div>' +
            '<div class="card-body">' +
            '<p class="card-text">' + body + '</p>' +
            '<span class="badge badge-secondary">' + tag + '</span></div></div>');
    }

}