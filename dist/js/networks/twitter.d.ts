/// <reference path="../jquery.socialist.d.ts" />
/// <reference path="../../../src/ts/networks/d/twitter.d.ts" />
/// <reference path="../../../src/ts/d/jquery.d.ts" />
/// <reference path="../../../src/ts/d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />
declare module Socialist {
    module Networks {
        class Twitter implements INetwork, IOAuthNetwork {
            Element: HTMLElement;
            Api: string;
            QueryStrings: {};
            Query: string[];
            ClientKey: string;
            ClientSecret: string;
            RequestTokenUrl: string;
            Token: ITwitterToken;
            constructor(clientKey: string, clientSecret: string);
            Attach(container: ISocialistHTMLElement): void;
            GetPosts(): JQueryPromise<Array<IPost>>;
            GetUserTimeline(user_id: string): {
                (url: string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
                (url: string, data?: string | Object, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
            };
            UglifyPost(status: ITwitterSearchStatus): IPost;
            RequestToken(): JQueryPromise<JQueryXHR>;
        }
    }
}
