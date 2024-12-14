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
        },
        selectedHouse:{
            type: String
        }


    }

    connectedCallback(){
        super.connectedCallback()
        this.getHP()


    }
    static styles = css`
    :host{
        background-color:#1e1e2f ;
        display:block;
        font-family:Arial;
        color: white ;
        box-sizing:border-box;
        padding:1rem;
    }

    h3{
        text-align: center;
        color:#ffcc00;
        font-size:2rem;
        margin-bottom:1rem;
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
    .tarjetaChar:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    }
    input, select{
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        display: block;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        margin-bottom: 1rem;
        background-color: #2a2a3d;
        color: #f0f0f0;
    }
    button{
        background-color: #ffcc00;
        color: #1e1e2f;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-size: 0.9rem;
        
    }
    button:hover {
        background-color: #e6b800;
    }
    
    `

    constructor(){
        super()
        this.info=[]
        this.show = true
        this.house = ""
        this.filteredCharacter= []
        this.search=""
        this.selectedHouse="Todos"
    }

//Metodo de consumo de API, se guardan los valores en las dos propiedades
    getHP(){
        fetch("https://hp-api.onrender.com/api/characters")
        .then(response => response.json())
        .then(data => {this.info = [...data]
            this.filteredCharacter=[...data]
        }).catch(error=>console.error(error))
    }
//Metodo de habilitacion de mostrar informacion
    showMore(){
        this.show= !this.show
    }
//Metodo que filtra los personajes por casa, verifica si tiene la opcion de todas y si no realizas un filtro mostrando todos los elementos que cuentan con  ese atributo
    getFilteredCharacter(event){
        this.selectedHouse = event.target.value
        //console.log(this.house)
        if(this.selectedHouse === "Todos"){
            this.filteredCharacter =[...this.info]

        }else{
            this.filteredCharacter = this.info.filter((char)=>char.house === this.selectedHouse)
        }

    }
//Metodo para la busqueda de personajes por el input, en donde igual verifica la casa seleccionada para hacer el filtro
    getSearchCharacter(event){
        this.search = event.target.value.toLowerCase();
        console.log(this.search)
        this.filteredCharacter = this.info.filter(char => {
        const matchesName = char.name.toLowerCase().includes(this.search);
        const matchesHouse = this.selectedHouse === "Todos" || char.house === this.selectedHouse;
        return matchesName && matchesHouse;
        })}



    render(){
        return html `
        <h3>Harry Potter API</h3>
        <input
        @input= ${(e)=>this.getSearchCharacter(e)}
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
