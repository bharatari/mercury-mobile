angular.module('MercuryApp.services', [])

.factory('MenuFactory', function() {
    return [
        { id:'news', name:'News' },
        { id:'life-arts', name:'Life & Arts' },
        { id:'opinion', name:'Opinion' },
        { id:'sports', name:'Sports' },
        { id:'comics', name:'Comics' }
    ];
})

.factory('PostsFactory', function($http) {
    return {
        getRecentPosts: function() {
            return $http.get('http://www.utdmercury.com/?json=get_recent_posts');
        },
        getRecentPage: function(page) {
            return $http.get('http://www.utdmercury.com/?json=get_recent_posts&page=' + page);
        },
        getFeaturedPost: function() {
            return $http.get('http://www.utdmercury.com/api/core/get_category_posts/?category_slug=featured');
        },
        getPost: function(id) {
            return $http.get('http://www.utdmercury.com/api/core/get_post/?id=' + id);
        },
        getCategory: function(categoryName) {
            return $http.get('http://www.utdmercury.com/api/core/get_category_posts/?category_slug=' + categoryName);
        },
        getCategoryPage: function(categoryName, page) {
            return $http.get('http://www.utdmercury.com/api/core/get_category_posts/?category_slug=' + categoryName + "&page=" + page);
        }
    }
})

.factory('SearchFactory', function($http) {
    return {
        searchPosts: function(searchTerm) {
            return $http.get('http://www.utdmercury.com/api/core/get_search_results/?search=' + searchTerm);
        },
        searchPostsPage: function(searchTerm, page) {
            return $http.get('http://www.utdmercury.com/api/core/get_search_results/?search=' + searchTerm + "&page=" + page);
        }
    }
})

.factory('UtilityFactory', function(MenuFactory) {
    return {
        stringifyArray: function(array) {
            var string = "";
            for(var i = 0; i < array.length; i++) {
                if(i === 0) {
                    string += array[i];
                }
                else {
                    string += ", " + array[i];
                }
            }
        },
        /*** @deprecated */
        processAuthors: function(posts) {
            if(posts) {
                for(var i = 0; i < posts.length; i++) {
                    if(posts[i].title.length > 45) {
                        posts[i].titleClip = posts[i].title.substring(0, 45);
                        posts[i].titleClip += "...";
                    }
                    else {
                        posts[i].titleClip = posts[i].title;
                    }
                    if(posts[i].custom_fields) {
                        if(posts[i].custom_fields.authors[0]) {
                            if(posts[i].custom_fields.authors[0] === "") {
                                posts[i].Author = posts[i].author.name;
                            }
                            else {
                                posts[i].Author = posts[i].custom_fields.authors[0];
                            }
                        }
                        else {
                            posts[i].Author = posts[i].author.name;
                        }
                    }
                    else {
                        posts[i].Author = "";
                    }
                    
                }
            }
            return posts;
        },
        process: function(posts) {
            if(posts) {
                for(var i = 0; i < posts.length; i++) {
                    if(posts[i].attachments) {
                        if(posts[i].attachments[0]) {
                            if(posts[i].attachments[0].url) {
                                posts[i]._postImage = posts[i].attachments[0].url;
                            }
                            else {
                                posts[i]._postImage = "";
                            }
                        }
                        else {
                            posts[i]._postImage = "";
                        }
                    }
                    else {
                        posts[i]._postImage = "";
                    }
                }
            }
            return posts;
        },
        processPost: function(post) {
            if(post) {
                if(post.attachments) {
                    if(post.attachments[0]) {
                        post._postImage = post.attachments[0].url;
                    }
                }
            }
            return post;
        },
        findCategory: function(categoryName) {
            var menu = MenuFactory;
            for(var i = 0; i < menu.length; i++) {
                if(categoryName === menu[i].id) {
                    return menu[i].name;
                }
            }
        }
    }
});