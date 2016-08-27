/// <reference path="../jquery.socialist.d.ts" />
/// <reference path="../../../src/ts/networks/d/instagram.d.ts" />
/// <reference path="../../../src/ts/d/jquery.d.ts" />
/// <reference path="../../../src/ts/d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />
declare module Socialist {
    module Networks {
        class Instagram implements INetwork, IOAuthNetwork {
            Element: HTMLElement;
            Api: string;
            QueryStrings: {};
            Query: string[];
            ClientKey: string;
            ClientSecret: string;
            RequestTokenUrl: any;
            Token: IInstagramToken;
            constructor(clientKey: string, clientSecret: string);
            Attach(container: ISocialistHTMLElement): void;
            GetPosts(): JQueryPromise<Array<IPost>>;
            UglifyPost(element: any): IPost;
            RequestToken(): JQueryPromise<JQueryXHR>;
            Search(): JQueryPromise<JQueryXHR>;
            GetUserPosts(): JQueryXHR;
            GetPostsByHashtag(): JQueryXHR;
        }
    }
}
