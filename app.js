import {html,css, LitElement} from "lit"

export class MyApp extends LitElement{
    static properties ={
        info:{
            type: Array
        }
        ,
        show:{
            type: Boolean
        },
        filteredCharacter:{
            type: Array
        },
        search:{
            type: String
        }


    }

    connectedCallback(){
        super.connectedCallback()
        this.getHP()


    }
    static styles = css`
    :host{
        background-color:#162041 ;
        display:block;
        font-family:Arial;
        color: white    
    }

    h3{
        text-align: center;
        color:yellow;
        font-size:2rem;
    }
    section{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap:1rem;
        padding:1rem;
        

    }
    img{
        max-width:150px; 
        height:auto;
        margin-bottom:1rem;
        border-radius:50%;
        border:2px solid yellow
    }
    .tarjetaChar{
        background-color:#300F40;
        border-radius: 10px;
        text-align:center;
    }
    input, select{
        text-align:center;
        display:block;
        width:100%;
        max-width:300px;
        padding:0.5rem;
        border-radius:5px;
    }
    button{
        background-color:yellow;
        border:none;
        
    }
    
    `

    constructor(){
        super()
        this.info=[]
        this.show = true
        this.house = ""
        this.filteredCharacter= []
        this.search=""
    }


    getHP(){
        fetch("https://hp-api.onrender.com/api/characters")
        .then(response => response.json())
        .then(data => {this.info = [...data]
            this.filteredCharacter=[...data]
        
        })
    }

    showMore(){
        this.show= !this.show
    }

    getFilteredCharacter(event){
        this.selectedHouse = event.target.value
        //console.log(this.house)
        if(this.selectedHouse === "Todos"){
            this.filteredCharacter =[...this.info]

        }else{
            this.filteredCharacter = this.info.filter((char)=>char.house === this.selectedHouse)
        }

    }
    //getSearchCharacter(event){
        //this.search = event.target.value.toLowerCase()
        //console.log(this.search)
        //this.filteredCharacter === this.name



    render(){
        return html `
        <h3>Harry Potter API</h3>
        <input
        @input= ${this.getSearchCharacter}
        type = "text"
        placeholder="Busca tu personaje!"
        >
        <select @change = "${this.getFilteredCharacter}">
            <option>Todos</option>
            <option>Gryffindor</option>
            <option>Hufflepuff</option>
            <option>Ravenclaw</option>
            <option>Slytherin</option>
        </select>
        <section>
        ${this.filteredCharacter.map(information => html`
            <div class ="tarjetaChar">
                <img src ="${information.image || 'HP.svg'}">
                <p>Name: ${information.name}</p>
                <p>Dia de nacimiento: ${information.dateOfBirth || "Desconocido"}</p>
                <p>Especie: ${information.species || "Desconocido"}</p>
                <button @click ="${this.showMore}">Mostrar mas</button>
                <p ?hidden = "${this.show}">
                    Apodos: ${information.alternate_names.join(", " || "Ninguno")}
                    <br/>
                    Actor: ${information.actor || "Desconocido"}
                    <br/>
                    Casa: ${information.house || "Desconocido"}


                </p>
            </div>
                `)}

                </section>
        
        `

    }



}

customElements.define("my-app", MyApp)