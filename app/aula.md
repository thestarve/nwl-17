--- Source control

-para adicionar o primeiro Commit é nescessário configurar as credenciais do git:

git config --global user.name "Nome"
git config --global user.email "email@email.com"

    # Escopo e variáveis 

        As chaves {} en JS definem um novo escopo, os códigos dentro delas são chamados de escopo local e são executados separadamente do escopo global que está fora das chaves. 
        Cada vez que as chaves fora abertas um novo escopo será criado.

const nome = "Gabriel"
console.log(nome);
    {
    const sobrenome = "Salinas"
    console.log(sobrenome);
    }

    # Definindo variáveis e Constantes

    Para definir variáveis usa-se a função Let e para constantes Const

    Let nome = "Gabriel"
    Const sobrenome = "Salinas"    

   # arrays e objetos
let metas = ["Gabriel", "Olá"]
    // Arrays utilizan índices de refeência que começam no índice 0

console.log(metas[1] + ", " + metas[0] + "");

    # Criação de objetos

    As chaves estão presentes em outras situações além da criação de Escopos Locais e, neste caso, elas estão na criação de objetos.

    # Objetos
    # Criando objeto com uma variável
let meta = {
    value: 'Ler um livro por mês',
    checked: false
}

console.log(meta.value)

    # Funcão --- Arrow Function
        # Criando uma função com uma constante
        # Neste caso a Função é um objeto
const criarMeta = () => {}

    # Neste outro caso a função está dento do objeto, então ela se torna um método
let outraMeta = {
    value: 'Ler um livro por mês',
    checked: false,
    isChecked: () => {}
}

console.log(outraMeta.isChecked())

    # Função --- Named Function
        #Outro modelo de criação de funcões

function = criarMeta() {}

    # Os dois modelos juntos 
function = criarMeta() {}
const criarMeta() => {}