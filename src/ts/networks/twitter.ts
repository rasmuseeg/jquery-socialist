/// <reference path="../jquery.socialist.ts" />

/// <reference path="d/twitter.d.ts" />
/// <reference path="../d/jquery.d.ts" />
/// <reference path="../d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />

module Socialist {
	export module Networks {
		export class Twitter implements INetwork, IOAuthNetwork {
			Instance:ISocialistInstance;
			// Network
			Api = "https://api.twitter.com/1.1/search/tweets.json";
			QueryStrings = {};
			Query = new Array<string>();
			
			// OAuth Network
			ClientKey = "";
			ClientSecret = "";
			RequestTokenUrl = "https://api.twitter.com/oauth2/token";
			Token: IToken;

			constructor(clientKey:string, clientSecret:string) {
				this.ClientKey = clientKey;
				this.ClientSecret = clientSecret;
				this.RequestToken();
			}
			
			public Attach(container:ISocialistHTMLElement){
				container.Instance.Inject(this);
				this.Instance = container.Instance;
			}

			public GetPosts(): JQueryPromise<Array<IPost>> {
				var uglify = this.UglifyPost,
					token = this.Token.access_token,
					query = this.Query.join('+'),
					api = this.Api;
				
				return $.ajax({
					type: "GET",
					dataType: 'jsonp',
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Bearer " + token);
					},
					url: api,
					data: {
						"q":query
					},
					processData: false,
					success: function(response:ISearchResponse) {
						return _.each(response.statuses, function (status:ISearchStatus) {
							return uglify(status);
						});
					}
				});
				
			};
			
			public GetUserTimeline(user_id:string){
				return $.get
			}

			public UglifyPost(status: ISearchStatus): IPost {
				var post = new Socialist.Post();
				post.Attachment = null;
				post.CreateDate = new Date(status.created_at);
				
				var user = new UserProfile();
				user.ImageUrl = "";
				user.Username = "";
				post.UserProfile = user;
				
				return post;
			}

			public RequestToken() : JQueryPromise<JQueryXHR> {
				var _this = this;
				return $.ajax({
					type: "POST",
				    dataType: 'jsonp',
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Basic " + this.authorizationToken);
					},
					url: "https://api.twitter.com/oauth2/token",
					data: {
						"grant_type":"client_credentials"
					},
					processData: false,
					success: function(token:IToken) {
						_this.Token = token;
					}
				});
			}
		}
	}
}