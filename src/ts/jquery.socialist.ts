/// <reference path="d/jquery.d.ts" />
/// <reference path="d/jquery.socialist.d.ts" />
/// <reference path="../../assets/d/underscore.d.ts" />

module Socialist {
  export class Post implements IPost {
    Id = null;
    Url = null;
    UserProfile = new UserProfile();
    Attachment = null;
    CreateDate = null;
    Text = null;

    constructor() { };
  }

  export class UserProfile implements IUserProfile {
    Name = "";
    Username = "";
    Url = "";
    ImageUrl = "";

    constructor() { }
  }
  export class AjaxRequests {
    public Get<T>(url: string): JQueryXHR {
      return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url
      });
    }
    public Post<T>(url:string, data:any) : JQueryXHR{
      return $.ajax({
        type: "POST",
        url: url,
        dataType: "jsonp",
        data:data
      });
    }
  }

  export class Instance implements ISocialistInstance {
    Element: ISocialistHTMLElement;
    Defaults: Object = {
      showImages: true,
    };
    Options: Object;
    Networks = new Array();
    Defered: JQueryDeferred<any>;
    Query: Array<string>;

    constructor(element: HTMLElement, options) {
      this.Defered = $.Deferred();
      this.Element = <ISocialistHTMLElement>element;
      this.Element.Instance = this;
      this.Options = _.defaults(options, this.Defaults);
      this.GetPosts();
    };

    public Inject(network: INetwork): void {
      network.Element = this.Element;
      //      network.Query = this.Query;
      this.Networks.push(network);
    }

    public GetPosts() {
      var _def = this.Defered;
      _.each(this.Networks, function(item: INetwork) {
        _def.promise(item.GetPosts());
      });

      _def.resolve();
    }
  }
};

// Jquery plugin
interface JQuery {
  socialist(): JQuery;
  socialist(settings: Object): JQuery;
}
(function($) {
  $.fn.socialist = function(options) {
    return this.each(function() {
      var socialist = new Socialist.Instance(this, options);
    });
  }
})(jQuery);
