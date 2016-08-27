/// <reference path="jquery.d.ts" />

interface IPost {
	Id:string;
	UserProfile: IUserProfile;
	Attachment: string;
	CreateDate: Date;
	Text:string;
	Url:string;
}
interface INetwork {
	Instance:ISocialistInstance;
	Api: string;
	Options: Object;
	GetPosts(): JQueryPromise<Array<IPost>>;
	UglifyPost(element:any): IPost;
}

interface INetworkOptions {
	Query:Array<string>;
}

interface IOAuthNetwork extends INetwork {
	RequestTokenUrl: string;
	ClientKey:string;
	ClientSecret:string;
	QueryStrings: Object;
}
interface ISocialistInstance{
	Networks:Array<INetwork>;
    Defered:JQueryDeferred<any>;
	Inject(nework:INetwork):void;
	GetPosts():void;
}

interface IUserProfile{
	Name:string;
	Username: string;
	Url:string;
	ImageUrl:string;
}

interface ISocialistHTMLElement extends HTMLElement {
	Instance:ISocialistInstance;
}

