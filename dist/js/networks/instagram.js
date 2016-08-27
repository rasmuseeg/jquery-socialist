/// <reference path="../jquery.socialist.ts" />
/// <reference path="d/instagram.d.ts" />
/// <reference path="../d/jquery.d.ts" />
/// <reference path="../d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />
var Socialist;
(function (Socialist) {
    var Networks;
    (function (Networks) {
        var Instagram = (function () {
            function Instagram(clientKey, clientSecret) {
                // Network
                this.Api = "https://api.instagram.com/v1/";
                this.QueryStrings = {};
                this.Query = new Array();
                // OAuth Network
                this.ClientKey = "";
                this.ClientSecret = "";
                this.RequestTokenUrl = null;
                this.ClientKey = clientKey;
                this.ClientSecret = clientSecret;
            }
            ;
            Instagram.prototype.Attach = function (container) {
                container.Instance.Inject(this);
            };
            Instagram.prototype.GetPosts = function () {
                var uglify = this.UglifyPost, token = this.Token.access_token, query = this.Query.join('+'), api = this.Api;
                return $.ajax({
                    type: "GET",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Bearer " + token);
                    },
                    url: api,
                    data: {
                        "q": query
                    },
                    processData: false,
                    success: function (response) {
                        return _.each(response.data, function (status) {
                            return uglify(status);
                        });
                    }
                });
            };
            ;
            Instagram.prototype.UglifyPost = function (element) {
                var post = new Socialist.Post();
                post.Id = element.id;
                post.CreateDate = element.created_time;
                post.Url = element.link;
                post.Text = (element.caption && element.caption) ? element.caption.text : '';
                //if (options.show_media) {
                post.Attachment = '<img class="item-attachment" src="' + element.images.standard_resolution.url + '' + '" />';
                //}
                var user = new Socialist.UserProfile();
                user.Url = 'http://instagram.com/' + element.user.username;
                user.ImageUrl = element.user.profile_picture;
                user.Name = element.user.full_name;
                post.UserProfile = user;
                return post;
            };
            Instagram.prototype.RequestToken = function () {
                var _this = this;
                return $.ajax({
                    type: "POST",
                    dataType: "jsonp",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Basic " + this.authorizationToken);
                    },
                    url: "https://instagram.com/oauth/authorize/",
                    data: {
                        "grant_type": "client_credentials"
                    },
                    processData: false,
                    success: function (token) {
                        _this.Token = token;
                    }
                });
            };
            Instagram.prototype.Search = function () {
                var api = this.Api + "users/search/", client_id = this.ClientKey, queryStrings = {
                    "q": "",
                    "client_id": this.ClientKey,
                    "count": 1,
                    "callback": "?"
                };
                return $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: api,
                    data: queryStrings,
                    success: function (response) {
                        //
                    }
                });
            };
            // TODO: Implement this
            Instagram.prototype.GetUserPosts = function () {
                var api = "https://api.instagram.com/v1/users/search/";
                var client_id = this.ClientKey;
                var queryStrings = {
                    "q": "",
                    "client_id": this.ClientKey,
                    "count": 1,
                    "callback": "?"
                };
                return $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: api,
                    data: queryStrings,
                    success: function (response) {
                        //
                    }
                });
            };
            // TODO: Implement this
            Instagram.prototype.GetPostsByHashtag = function () {
                var api = "https://api.instagram.com/v1/users/search/";
                var client_id = this.ClientKey;
                var queryStrings = {
                    "q": "",
                    "client_id": this.ClientKey,
                    "count": 1,
                    "callback": "?"
                };
                return $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: api,
                    data: queryStrings,
                    success: function (response) {
                        //
                    }
                });
            };
            return Instagram;
        })();
        Networks.Instagram = Instagram;
    })(Networks = Socialist.Networks || (Socialist.Networks = {}));
})(Socialist || (Socialist = {}));
//# sourceMappingURL=instagram.js.map