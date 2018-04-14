export class CharacterModel {
    public type: string
    private sexFixed: boolean = false
		private sexGenre: string
		
  constructor
    (
		public key: string,
		public name: string,
		public language : any,
		public translate : any
		) {
		this.sexFixed = this.checkFixedSex();
	}

	checkFixedSex(): boolean 
	{
		let sexFixed = false;
	

		switch (this.key) {
			// MALE ONLY SPANISH
			case "snail":
			case "chameleon":
			case "octopus":
			case "fish":
			case "butterfly":
			case "monster":
			case "tree":
				if (this.language == "es") {
					sexFixed = true;
					this.setSexGenre("male");
				}
				break;
			// MALE ALWAYS
			case "cerberus":
			case "wizard":
			case "satyr":
				sexFixed = true;
				this.setSexGenre("male");
				break;
			// FEMALE ONLY SPANISH
			case "spider":
			case "seal":
			case "bee":
			case "giraffe":
			case "goat":
			case "zebra":
			case "skunk":
			case "chipmunk":
			case "ant":
			case "worm":
			case "snake":
			case "medusa":
			case "mushroom":
			case "puppet":
			case "lizard":
				if (this.language == "es") {
					sexFixed = true;
					this.setSexGenre("female");
				}
				break;
			// FEMALE ALWAYS
			case "amazon":
			case "harpy":
			case "mermaid":
			case "witch":
				sexFixed = true;
				this.setSexGenre("female");
				break;
		}

		return sexFixed;
	}

	setSexGenre(sex: string): void
	{
		this.sexGenre = sex;
	}

	format(name: string, genre: string): void
	{
		this.name = name;
		this.sexGenre = genre;
		
		if (this.language == "en" || this.getSexFixed()) {
			this.type = this.translate.instant("STORY.CHARACTERS."+this.key);
		} else {
			console.log("re")
			this.type = this.translate.instant("STORY.CHARACTERS." + this.key +"." + this.sexGenre);
		}
	}

	getSexGenre(): string
	{
		return this.sexGenre;
	}

	getSexFixed(): boolean
	{
		return this.sexFixed;
	}

}