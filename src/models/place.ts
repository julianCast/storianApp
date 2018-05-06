export class PlaceModel {
    public name: string;
    public description: string;
		protected sexGenre: string = "";
		
  constructor
    (
		public key: string,
		public language : any,
		public translate : any
		) {
			this.format();
	}


	format(): void 
	{
		if (this.language == "es") {
			switch (this.key) {
				case "lighthouse":
				case "volcano":
				case "windmill":
				case "river":
				case "desert":
				case "forest":
				case "castle":
					this.sexGenre = "male"
					break;

				default:
					this.sexGenre = "female"
					break;
			}
		}

		this.name = this.translate.instant("STORY.PLACES." + this.key + ".name");
		this.description = this.translate.instant("STORY.PLACES." + this.key + ".description");
		console.log(this)

	}


}