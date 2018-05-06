export class ObjectModel {
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
				case "bow":
				case "chest":
				case "diamond":
				case "map":
				case "pencil":
				case "shield":
					this.sexGenre = "male"
					break;

				default:
					this.sexGenre = "female"
					break;
			}
		}

		this.name = this.translate.instant("STORY.OBJECTS." + this.key + ".name");
		this.description = this.translate.instant("STORY.OBJECTS." + this.key + ".description");
		console.log(this)

	}


}