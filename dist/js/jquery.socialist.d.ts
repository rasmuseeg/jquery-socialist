/// <reference path="../../src/ts/d/jquery.d.ts" />
/// <reference path="../../src/ts/d/jquery.socialist.d.ts" />
/// <reference path="../../assets/d/underscore.d.ts" />
declare module Socialist {
    class Post implements IPost {
        Id: any;
        Url: any;
        UserProfile: UserProfile;
        Attachment: any;
        CreateDate: any;
        Text: any;
        constructor();
    }
    class UserProfile implements IUserProfile {
        Name: string;
        Username: string;
        Url: string;
        ImageUrl: string;
        constructor();
    }
    class Instance implements ISocialistInstance {
        Element: ISocialistHTMLElement;
        Defaults: Object;
        Options: Object;
        Networks: any[];
        Defered: JQueryDeferred<any>;
        Query: Array<string>;
        constructor(element: HTMLElement, options: any);
        Inject(network: INetwork): void;
        GetPosts(): void;
    }
}
interface JQuery {
    socialist(): JQuery;
    socialist(settings: Object): JQuery;
}
