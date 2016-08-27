declare module Socialist.Networks.Instagram {
	interface IQueryStrings {
		include_entities: boolean;
		include_rts: boolean;
		screen_name: string;
		count: number;
	}
	
	interface ISearchResponse extends Object {
		meta: {
			code: number;
		},
		data: Array<ISearchData>;
	}
	
	interface ISearchData{
		username: string,
		profile_picture:string,
		id: string,
		full_name: string
	}
	
	interface IPost{
		attribution: string;
		tags: Array<string>;
		location: string;
		comments: IArray<Object>;
		filter: string;
		created_time: string;
		link: string;
		likes: IArray<Object>;
		images: IPostImages;
		users_in_photo: Array<Object>;
		caption: ICaption;
		type: string;
		id: string;
		user: IUser;
	}
	interface IUser{
		username:string;
		profile_picture:string;
		id:string;
		full_name:string;
	}
	interface ICaption{
		created_time:string;
		text:string;
		from:IUser;
		id:string;
	}
	interface IArray<T>{
		count:number;
		data:T;
	}
	interface IPostImages{
		low_resolution: IImage;
		thumbnail: IImage;
		standard_resolution: IImage;
	}
	interface IImage{
		url:string;
		width:number;
		height:number;
	}
	interface ISearchStatus{
		metadata:string;
		created_at:string;
		id:string;
		text:string;
		source:string;
		truncated:boolean;
		geo:any;
		lang:string;
		user:ISearchStatusUser;
		entities:ISearchStatusEntities;
	}
	interface ISearchStatusUser {
		id:number;
		name:string;
		screen_name:string;
		location:string;
		entities:ISearchStatusEntities;
	}
	interface ISearchStatusEntities{
		hashtags:Array<string>;
		symbols:Array<string>;
		urls:Array<ISearchStatusEntitiesUrl>;
	}
	interface ISearchStatusEntitiesUrl{
		url:string;
		expanded_url:string;
		display_url:string;
		indices:Array<number>;
	}
	interface ISearchMetadata{
		completed_in:number;
		max_id:number;
		max_id_str:string;
		next_results:string;
		query:string;
		refresh_url:string;
		count:number;
		since_id:number;
		since_id_str:string;
	}
	interface IToken{
		"token_type":string;
		"access_token":string;
	}
}