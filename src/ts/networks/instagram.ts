/// <reference path="../jquery.socialist.ts" />

/// <reference path="d/instagram.d.ts" />
/// <reference path="../d/jquery.d.ts" />
/// <reference path="../d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />

module Socialist {
	export module Networks {
		export class Instagram implements IOAuthNetwork extends Network {
			// Asigned trough Inject and Attach
			Instance:ISocialistInstance;
			// Network
			Api = "https://api.instagram.com/v1/";
			QueryStrings = {};
			Query = new Array<string>();
			
			// OAuth Network
			ClientKey = "";
			ClientSecret = "";
			RequestTokenUrl = null;
			Token: IToken;
			
			constructor(clientKey:string, clientSecret:string) {
				super();
				this.ClientKey = clientKey;
				this.ClientSecret = clientSecret;
			};

			public GetPosts(): JQueryPromise<Array<IPost>> {
				var uglify = this.UglifyPost,
					token = this.Token.access_token,
					query = this.Query.join('+'),
					api = this.Api;
				
				return $.ajax({
					type: "GET",
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Bearer " + token);
					},
					url: api,
					data: {
						"q":query
					},
					processData: false,
					success: function(response:Instagram.I) {
						return _.each(response.data, function (status:IInstagramSearchData) {
							return uglify(status);
						});
					}
				});
			};

			public UglifyPost(element: Instagram.IPost): IPost {
				var post = new Post();

                post.Id = element.id;
                post.CreateDate = element;
                post.Url = element.link;
                post.Text = (element.caption && element.caption) ? element.caption.text : "";
				//if (options.show_media) {
				$('<div></div>', {
					"class":"image-attachment",
					"src":element.
					
				})
                post.Attachment = '<img class="item-attachment" src="' + element.images.standard_resolution.url + '' + '" />';
				//}
				
				var user = new UserProfile();
				user.Url = 'http://instagram.com/' + element.username;
                user.ImageUrl = element.user.profile_picture;
                user.Name = element.user.full_name;
				post.UserProfile = user;

                return post;
			}

			public RequestToken() : JQueryPromise<JQueryXHR> {
				var _this = this;
				return $.ajax({
					type: "POST",
					dataType:"jsonp",
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", "Basic " + this.authorizationToken);
					},
					url: "https://instagram.com/oauth/authorize/",
					data: {
						"grant_type":"client_credentials"
					},
					processData: false,
					success: function(token:any) {
						_this.Token = token;
					}
				});
			}
			
			public Search() : JQueryPromise<JQueryXHR> {
				var api = this.Api + "users/search/",
					client_id = this.ClientKey,
					queryStrings = {
						"q": "",
						"client_id":this.ClientKey,
						"count":1,
						"callback":"?"
					};
				
				return $.ajax({
					type: "GET",
					dataType:"jsonp",
					url: api,
					data: queryStrings,
					success: function(response:IInstagramSearchResponse) {
						//
					}
				});
			}
			
			public GetUser(username:string){
				var api = "https://api.instagram.com/v1/users/search/?q=" + username + "&client_id="+this.ClientKey+"&count=1&callback=?";
				var userId = $.ajax({
					type:"GET",
					dataType:"jsonp",
					url:api,
					success:function(response) {
						return response.data[0].id;
					}
				});
			}
			
			// TODO: Implement this
			public GetUserPosts(username:string){
				// first request by username to get userid
				var userId = $.ajax({
					type:"GET",
					dataType:"jsonp",
					url:"",
					success:function(response) {
						return response.data;
					}
				});
				
				
				
				var api = "https://api.instagram.com/v1/users/"+ userId +"/media/recent/?client_id="+this.ClientKey+"&callback=?";
				return $.ajax({
					type: "GET",
					dataType:"jsonp",
					url: api,
					data: queryStrings,
					success: function(response:IInstagramSearchResponse) {
						//
					}
				});
			}
			
			public GetMostRecent(userId:number){
				var url = "https://api.instagram.com/v1/users/" + userId + "/media/recent/?client_id=" + this.ClientKey + "&callback=?";
				
				
			}
			
			// TODO: Implement this
			public GetPostsByHashtag(hashtag:string){
				var api = "https://api.instagram.com/v1/tags/"+ hashtag + "/media/recent/?client_id="+this.ClientKey+"&count="+this.Counts+"&callback=?";
				var client_id = this.ClientKey;
				var queryStrings = {
					"q": "",
					"client_id":this.ClientKey,
					"count":1,
					"callback":"?"
				};
				
				return $.ajax({
					type: "GET",
					dataType:"jsonp",
					url: api,
					data: queryStrings,
					success: function(response:IInstagramSearchResponse) {
						//
					}
				});
			}
		}
	}
}