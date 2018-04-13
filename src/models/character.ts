export class CharacterModel {
    public translateType: string
    public sexFixed: boolean = false
    private sexGenre: string
  constructor
    (
		public key: string,
		public name: string,
		public language : any
		) {
		this.sexFixed = this.checkFixedSex();
	}

	checkFixedSex(): boolean 
	{
		let sexFixed = false;
	

		switch (this.key) {
			// MALE ONLY SPANISH
			case "snail":
			case "shark":
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
				if (this.language == "es") {
					sexFixed = true;
					this.setSexGenre("female");
				}
				break;
			// FEMALE ALWAYS
			case "amazon":
			case "harpy":
			case "mermaid":
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

}