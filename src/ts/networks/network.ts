/// <reference path="../d/jquery.socialist.d.ts" />
/// <reference path="../../../assets/d/underscore.d.ts" />

module Socialist.Networks{
	export class Network implements INetwork, JsonpAjax{
		Instance:ISocialistInstance;
		
		constructor(){}
		
		public AttachTo(container:ISocialistHTMLElement){
			this.Instance = container.Instance;
			this.Instance.Inject(this);
		}
		
		public Dispose(){
			//TODO: Should be able to remove this from the list later on
		}
	}
}