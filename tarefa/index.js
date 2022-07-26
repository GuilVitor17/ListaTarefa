const inputNovaTarefa = document.querySelector('#inputnovatarefa');
const btnAddTarefa = document.getElementById('btnAddTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const janelaEdicao = document.getElementById('janelaEdicao');
const janelaEdicaofundo = document.getElementById('janelaEdicaoFundo');
const janelaEdicaoBtnFechar = document.getElementById('janelaEdicaoBtnFechar');
const btnAtualizarTarefa = document.getElementById('btnAtualizarTarefa');
const Idtarefaedicao = document.getElementById('Idtarefaedicao');
const inputTarefaNomeEdicao = document.getElementById('inputTarefaNomeEdicao');


inputNovaTarefa.addEventListener('keypress', (e)=>{

    if(e.keycode == 13){
        const tarefa = {
            nome : inputNovaTarefa.value,
            id : gerarId(),
        }
        adicionarTarefa(tarefa);
    }
   
    
});

janelaEdicaoBtnFechar.addEventListener('click', (e)=>{
      
    alternarJanelaEdicao();
});


btnAtualizarTarefa.addEventListener('click', (e)=>{

    e.preventDefault();

    const idTarefa = Idtarefaedicao.innerHTML.replace('#', '');

    const tarefa = {
        nome : inputTarefaNomeEdicao.value,
        id : idTarefa
    }

    const tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual){
        const li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else{
        alert("Elemento não encontrado")
    }
     
});

      



btnAddTarefa.addEventListener('click', (e)=>{
    const tarefa = {
        nome : inputNovaTarefa.value,
        id : gerarId(),
    }
    adicionarTarefa(tarefa);
});

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){
    const li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLI(tarefa){
   const li = document.createElement('li');
   li.id = tarefa.id;


   const span = document.createElement('span');
   span.classList.add('textoTarefa');
   span.innerHTML = tarefa.nome;

   const div = document.createElement('div')

   const btnEditar = document.createElement('button');
   btnEditar.classList.add('btnAcao');
   btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
   btnEditar.setAttribute('onclick', 'editar(' + tarefa.id +')');

   const btnExcluir = document.createElement('button');
   btnExcluir.classList.add('btnAcao');
   btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
   btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id +')');


   div.appendChild(btnEditar);
   div.appendChild(btnExcluir);


   li.appendChild(span)
   li.appendChild(div);

   return li;
}

function editar(idTarefa){
    const li = document.getElementById('' + idTarefa + '');
    if(li){
        Idtarefaedicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao()
    }
    else{
        alert("Elemento não encontrado")
    }
}

function excluir(idTarefa){
    const confirmacao = window.confirm('Tem Certeza que deseja excluir?');
    if(confirmacao){
        const li = document.getElementById('' + idTarefa + '');
        if(li){
            listaTarefas.removeChild(li);
        } else{
            alert("Elemento não encontrado")
        }
    }
}
function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaofundo.classList.toggle('abrir');

}

