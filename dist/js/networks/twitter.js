/// <reference path="../jquery.socialist.ts" />
/// <reference path="d/twitter.d.ts" />
/// <reference path="../d/jquery.d.ts" />
/// <reference path="../d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />
var Socialist;
(function (Socialist) {
    var Networks;
    (function (Networks) {
        var Twitter = (function () {
            function Twitter(clientKey, clientSecret) {
                // Network
                this.Api = "https://api.twitter.com/1.1/search/tweets.json";
                this.QueryStrings = {};
                this.Query = new Array();
                // OAuth Network
                this.ClientKey = "";
                this.ClientSecret = "";
                this.RequestTokenUrl = "https://api.twitter.com/oauth2/token";
                this.ClientKey = clientKey;
                this.ClientSecret = clientSecret;
                this.RequestToken();
            }
            Twitter.prototype.Attach = function (container) {
                container.Instance.Inject(this);
            };
            Twitter.prototype.GetPosts = function () {
                var uglify = this.UglifyPost, token = this.Token.access_token, query = this.Query.join('+'), api = this.Api;
                return $.ajax({
                    type: "GET",
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Bearer " + token);
                    },
                    url: api,
                    data: {
                        "q": query
                    },
                    processData: false,
                    success: function (response) {
                        return _.each(response.statuses, function (status) {
                            return uglify(status);
                        });
                    }
                });
            };
            ;
            Twitter.prototype.GetUserTimeline = function (user_id) {
                return $.get;
            };
            Twitter.prototype.UglifyPost = function (status) {
                var post = new Socialist.Post();
                post.Attachment = null;
                post.CreateDate = new Date(status.created_at);
                var user = new Socialist.UserProfile();
                user.ImageUrl = "";
                user.Username = "";
                post.UserProfile = user;
                return post;
            };
            Twitter.prototype.RequestToken = function () {
                var _this = this;
                return $.ajax({
                    type: "POST",
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Basic " + this.authorizationToken);
                    },
                    url: "https://api.twitter.com/oauth2/token",
                    data: {
                        "grant_type": "client_credentials"
                    },
                    processData: false,
                    success: function (token) {
                        _this.Token = token;
                    }
                });
            };
            return Twitter;
        })();
        Networks.Twitter = Twitter;
    })(Networks = Socialist.Networks || (Socialist.Networks = {}));
})(Socialist || (Socialist = {}));
//# sourceMappingURL=twitter.js.map