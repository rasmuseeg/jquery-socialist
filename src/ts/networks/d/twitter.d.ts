declare module Socialist.Networks {
	export interface IQueryStrings {
		include_entities: boolean;
		include_rts: boolean;
		screen_name: string;
		count: number;
	}
	
	export interface ISearchResponse extends Object {
		statuses: Array<ISearchStatus>;
		search_metadata: Object;
	}
	
	export interface ISearchStatus {
		metadata: string;
		created_at: string;
		id: string;
		text: string;
		source: string;
		truncated: boolean;
		geo: any;
		lang: string;
		user: ISearchStatusUser;
		entities: ISearchStatusEntities;
	}
	export interface ISearchStatusUser {
		id: number;
		name: string;
		screen_name: string;
		location: string;
		entities: ISearchStatusEntities;
	}
	export interface ISearchStatusEntities {
		hashtags: Array<string>;
		symbols: Array<string>;
		urls: Array<ISearchStatusEntitiesUrl>;
	}
	export interface ISearchStatusEntitiesUrl {
		url: string;
		expanded_url: string;
		display_url: string;
		indices: Array<number>;
	}
	export interface ISearchMetadata {
		completed_in: number;
		max_id: number;
		max_id_str: string;
		next_results: string;
		query: string;
		refresh_url: string;
		count: number;
		since_id: number;
		since_id_str: string;
	}
	export interface IToken {
		"token_type": string;
		"access_token": string;
	}
}