const { select, input, checkbox } = require('@inquirer/prompts')
// select cria um menu de seleção
const fs = require("fs").promises

let mensagem = "Bem vindo!";

        
let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push({
        value: meta, 
        checked: false
    })

    mensagem = "Meta cadastrada com sucesso!"

}

const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    
    const respostas = await checkbox({
        message: "Use as setas para navegar, o espaço mara marcar/desmarcar e Enter para selecionar.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach(m => {
        m.checked = false        
    })

    if(respostas.length == 0) {
      mensagem = "Nenhuma meta selacionada!" 
        return
    }

    respostas.forEach((resposta) =>{
        const meta = metas.find((m) => {
            return m.value == resposta
        })  
        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluida(s)!";

}

    const metasRealizadas = async () => {
        if(metas.length == 0) {
            mensagem = "Não existem metas!"
            return
        }

        const realizadas = metas.filter((meta) => {
            return meta.checked
        })

        if(realizadas.length == 0) {
            mensagem = "Não existem metas realizadas!"
            return
        }

        await select({
            message: "Metas Realizadas: " + realizadas.length,
            choices: [...realizadas],
            instructions: false,
        })
    }

    const metasAbertas = async () => {
        if(metas.length == 0) {
            mensagem = "Não existem metas!"
            return
        }

        const abertas = metas.filter((meta) => {
            return meta.checked != true
        })
    

        if(abertas.length == 0) {
            mensagem = "Não existem metas abertas!"
            return
        } 

        await select({
            message: "Metas Abertas: " + abertas.length,
            choices: [...abertas],
            instructions: false,
        })
    }    

    const deletarMetas = async() => {
        if(metas.length == 0) {
            mensagem = "Não existem metas!"
            return
        }

        //.map remapeia as informações de um objeto
        const metasDesmarcadas = metas.map((meta) => {
            return { value: meta.value, checked: false}
        })

        const itensADeletar = await checkbox({
            message: "Selecione item para deletar",
            choices: [...metasDesmarcadas],
            instructions: false,
        })

        if(itensADeletar == 0 ) {
            mensagem = "Nenhum item para deletar!"
            return
        }

        itensADeletar.forEach((item) => {
            metas = metas.filter((meta) => {
                return meta.value != item
            })
        })

        mensagem = "Meta(s) deletada(s) com sucesso!"
    }

    const mostrarMentsagem = () => {
        console.clear();

        if(mensagem != "") {
            console.log(mensagem)
            console.log("")
            mensagem = ""
        }
    }

const start = async () => {
    await carregarMetas()
   // let opção = "Sair" substituida pela const
    while(true){
        mostrarMentsagem()

                    //Await serve para que o while aguarde o usuário fazer a seleção
                    //Para usar o await a função precisa se async
        const opcao = await  select({
            message: "Menu >",
            choices: [
            {
                name: "Cadastrar metas",
                value: "cadastrar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Metas realizadas",
                value: "realizadas"
            },    
            {
                name: "Metas abertas",
                value: "abertas"
            },
            {
                name: "Deletar metas",
                value: "deletar"
            },
            {
                name: "Sair",
                value: "sair"
            } 
             ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                await salvarMetas()
                break
            case "listar":
                await listarMetas()
                await salvarMetas()
                break    
            case "realizadas":
                await metasRealizadas() 
                await salvarMetas() 
                break  
            case "abertas":
                await metasAbertas() 
                break    
            case "deletar":
                await deletarMetas()
                break    
            case "sair":
            console.log("Até a próxima!")
            return
        }
            
    }
    

}

start() 