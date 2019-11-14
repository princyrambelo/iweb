import { Invoice } from "./invoice";

export  class  InvoicePrint {
	private idagent:string
	private nomagent:string
	private prenomagent:string
	private login:string
	private mdp:string
	private datenaissance: string
	 
	constructor() {
		this.idagent = ""
		this.nomagent =""
		this.prenomagent =""
		this.login =  ""
		this.mdp =  ""
		this.datenaissance = ""
	
	}

	tpePrint(invoice : Invoice) : InvoicePrint {
		console.log("test")

		let date = new Date();
		let agent = new InvoicePrint();
		console.log(date.toLocaleDateString())
		console.log(date.getHours().toString())
		console.log(date.getMinutes().toString())
		console.log(agent.tofrMounth(date.getMonth()))
		console.log(date.getFullYear())
	
		let minutesNow = date.getMinutes().toString();
		let hourNow  = date.getHours().toString()
		let dateNow =  date.toLocaleDateString();
		let dateHour = dateNow + " à " + hourNow + ":" + minutesNow;
		let mounthNow = agent.tofrMounth(date.getMonth())
		let yearNow = date.getFullYear().toString();
		let mounth = mounthNow + "  " + yearNow 
	
		agent.setIdagent(agent.idagent)
		agent.setNomagent(agent.nomagent)
		agent.setPrenomagent(agent.prenomagent)
		agent.setlogin(agent.login)
		agent.setdatenaissance(agent.datenaissance)
		agent.setmdp(agent.mdp)
		
		return agent;
	}

	public tofrMounth(i:number) :any {
		let frMounth = ['Janvier','Fevrier','Mars','Avril','Mais', 'Juin', 'Juillet','Août','Septembre','Novembre','Décembre'];
		return frMounth[i]
	}

	public setIdagent(idagent:string) {
		this.idagent = this.returnWithoutUndefined(idagent);
	}

	public setNomagent(nomagent:string){
		this.nomagent = this.returnWithoutUndefined(nomagent);
	}

	public getIdagent() :string {
		return this.idagent
	}

	public getnomagent() :string {
		return this.nomagent
	}

	public setPrenomagent (prenomagent : string) {
		this.prenomagent = this.returnWithoutUndefined(prenomagent);
	}

	public getPrenomagent() :string {
		return this.prenomagent
	}



	private returnWithoutUndefined(val:string): string{
		if(val == undefined)
			return "";
		else
			return val
	}

	private returnWithoutUndefinedNumber(val:number): number{
		if(val == undefined)
			return 0;
		else
			return val
	}

    public  getlogin() :string{
        return this.login;
    }

    public setlogin(login : string) {
        this.login = this.returnWithoutUndefined(login);
    }

    public getdatenaissance() : string {
        return this.datenaissance;
    }

    public  setdatenaissance(datenaissance : string) {
        this.datenaissance = this.returnWithoutUndefined(datenaissance);
    }

    public getmdp() :string {
        return this.mdp;
    }

    public setmdp(mdp : string) {
		//this.receivedAmount = this.returnWithoutUndefinedNumber(receivedAmount);
		this.mdp = mdp
    }

    
}

