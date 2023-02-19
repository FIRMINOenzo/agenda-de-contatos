const nome = document.querySelector("#nome");
const sobrenome = document.querySelector("#sobrenome");
const apelido = document.querySelector("#apelido");
const telefone = document.querySelector("#telefone");
const email = document.querySelector("#email");
const btEnviar = document.querySelector("input.btn");
const listaContatos = document.querySelector("ul.collection");
const btRemoverTodos = document.querySelector("a.apagar-contatos");
const buscador = document.querySelector("#buscador");

carregarEventos();


function carregarEventos() {
    document.addEventListener('DOMContentLoaded', carregarContatos);

    btEnviar.addEventListener('click', adicionarContato);

    listaContatos.addEventListener('click', removerContato);

    btRemoverTodos.addEventListener('click', removerTodosContatos);

    buscador.addEventListener('keyup', buscarContato);
}


function carregarContatos() {
    let contatos;

    if(localStorage.getItem('contatos') === null){
        contatos = [];
    } else {
        contatos = JSON.parse(localStorage.getItem('contatos'));
    }

    contatos.forEach(function(contato){
        const li = document.createElement('li');
        li.className = 'collection-item';

        const nomeContato = document.createElement('p');
        nomeContato.className = 'item-desc';
        nomeContato.appendChild(document.createTextNode(contato.nome));

        li.appendChild(nomeContato);

        if (contato.value != ""){
            const apelidoContato = document.createElement('span');
            apelidoContato.className = 'item-desc';
            apelidoContato.appendChild(document.createTextNode(contato.apelido));
            li.appendChild(apelidoContato);
        }

        const btRemover = document.createElement('a');
        btRemover.className = 'delete-item red-text secondary-content';
        btRemover.innerHTML = `<i class="fa fa-remove fa-2x"></i>`;

        li.appendChild(btRemover);

        const telefoneContato = document.createElement('p');
        telefoneContato.className = 'item-desc';
        telefoneContato.appendChild(document.createTextNode(contato.telefone));

        li.appendChild(telefoneContato);


        if (contato.value != ""){
            const emailContato = document.createElement('p');
            emailContato.className = 'item-desc';
            emailContato.appendChild(document.createTextNode(contato.email));
            li.appendChild(emailContato);
        }

        listaContatos.appendChild(li);
    })
}


function adicionarContato(e) {
    if(!(nome.value != "" && telefone.value != "")){
        alert("Você precisa preencher os campos obrigatórios.");
    } else if (!telefoneValido(telefone.value)) {
        alert("Este telefone já está na sua lista.")
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';

        const nomeContato = document.createElement('p');
        nomeContato.className = 'item-desc';
        nomeContato.appendChild(document.createTextNode(`${nome.value} ${sobrenome.value}`));

        li.appendChild(nomeContato);

        if (apelido.value != ""){
            const apelidoContato = document.createElement('span');
            apelidoContato.className = 'item-desc';
            apelidoContato.appendChild(document.createTextNode(apelido.value));
            li.appendChild(apelidoContato);
        }

        const btRemover = document.createElement('a');
        btRemover.className = 'delete-item red-text secondary-content';
        btRemover.innerHTML = `<i class="fa fa-remove fa-2x"></i>`;

        li.appendChild(btRemover);

        const telefoneContato = document.createElement('p');
        telefoneContato.className = 'item-desc';
        telefoneContato.appendChild(document.createTextNode(telefone.value));

        li.appendChild(telefoneContato);


        if (email.value != ""){
            const emailContato = document.createElement('p');
            emailContato.className = 'item-desc';
            emailContato.appendChild(document.createTextNode(email.value));
            li.appendChild(emailContato);
        }

        listaContatos.appendChild(li);

        contatoObj = {
            nome: `${nome.value} ${sobrenome.value}`,
            apelido: `${apelido.value}`,
            telefone: `${telefone.value}`,
            email: `${email.value}`
        }

        salvarContatoLS(contatoObj);

        nome.value = '';
        sobrenome.value = '';
        apelido.value = '';
        telefone.value = '';
        email.value = '';
    }

    e.preventDefault();
}


function salvarContatoLS(obj) {
    let contatos;

    if(localStorage.getItem('contatos') === null){
        contatos = [];
    } else {
        contatos = JSON.parse(localStorage.getItem('contatos'));
    }

    contatos.push(obj);

    localStorage.setItem('contatos', JSON.stringify(contatos));
}


function telefoneValido(tel) {
    const telSemEspaço = (tel.replace(/\s/g, ''));
    let poss;

    if(isNaN(telSemEspaço)){
        poss = false;
    } else {
        let contatos;

        if(localStorage.getItem('contatos') === null){
            contatos = [];
        } else {
            contatos = JSON.parse(localStorage.getItem('contatos'));

            contatos.forEach(function(pessoa){
                let telSemEspaço2 = pessoa.telefone.replace(/\s/g, '');

                if(telSemEspaço2 === telSemEspaço) {
                    poss = false;
                }
            })
        }
    }

    if(poss === undefined){
        poss = true;
    }
    return poss;
}


function removerContato(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Você tem certeza?")) {
            e.target.parentElement.parentElement.remove();
            removerContatoLS(e.target.parentElement.parentElement.firstChild.textContent)
        }
    }
}


function removerContatoLS(nome) {
    let contatos;

    if(localStorage.getItem('contatos') === null){
        contatos = [];
    } else {
        contatos = JSON.parse(localStorage.getItem('contatos'));
    }

    contatos.forEach(function(pessoa, index){
        if(pessoa.nome === nome){
            contatos.splice(index, 1);
        }
    })

    localStorage.setItem('contatos', JSON.stringify(contatos));
}


function removerTodosContatos() {
    while(listaContatos.firstChild) {
        listaContatos.removeChild(listaContatos.firstChild);
    }

    localStorage.clear('contatos');
}


function buscarContato(e) {
    const texto = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(n){

        const item = n.firstChild.textContent;

        if(item.toLowerCase().indexOf(texto) != -1) {
            n.style.display = 'block';
        } else {
            n.style.display = 'none';
        };
    })
}