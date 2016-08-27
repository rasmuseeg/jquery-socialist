/// <reference path="d/jquery.d.ts" />
/// <reference path="d/jquery.socialist.d.ts" />
/// <reference path="../../assets/d/underscore.d.ts" />
var Socialist;
(function (Socialist) {
    var Post = (function () {
        function Post() {
            this.Id = null;
            this.Url = null;
            this.UserProfile = new UserProfile();
            this.Attachment = null;
            this.CreateDate = null;
            this.Text = null;
        }
        ;
        return Post;
    })();
    Socialist.Post = Post;
    var UserProfile = (function () {
        function UserProfile() {
            this.Name = "";
            this.Username = "";
            this.Url = "";
            this.ImageUrl = "";
        }
        return UserProfile;
    })();
    Socialist.UserProfile = UserProfile;
    var Instance = (function () {
        function Instance(element, options) {
            this.Defaults = {
                showImages: true,
            };
            this.Networks = new Array();
            this.Defered = $.Deferred();
            this.Element = element;
            this.Element.Instance = this;
            this.Options = _.defaults(options, this.Defaults);
            this.GetPosts();
        }
        ;
        Instance.prototype.Inject = function (network) {
            network.Element = this.Element;
            //      network.Query = this.Query;
            this.Networks.push(network);
        };
        Instance.prototype.GetPosts = function () {
            var _def = this.Defered;
            _.each(this.Networks, function (item) {
                _def.promise(item.GetPosts());
            });
            _def.resolve();
        };
        return Instance;
    })();
    Socialist.Instance = Instance;
})(Socialist || (Socialist = {}));
;
(function ($) {
    $.fn.socialist = function (options) {
        return this.each(function () {
            var socialist = new Socialist.Instance(this, options);
        });
    };
})(jQuery);
//# sourceMappingURL=jquery.socialist.js.map