# std::experimental::observer_ptr

Definido no cabeçalho `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`

```c
template< class W >
class observer_ptr;
```

`std::experimental::observer_ptr` é um ponteiro não proprietário, ou _observador_. O observador armazena um ponteiro para um segundo objeto, conhecido como _objeto observado_. Um `observer_ptr` também pode não ter um objeto observado.

Um observador não é responsável de forma alguma pelo objeto observado; não há relação inerente entre um observador e o objeto que ele observa.

Ele é destinado a ser um substituto quase direto para tipos de ponteiro brutos, com a vantagem de que, como um tipo de vocabulário, ele indica seu uso pretendido sem a necessidade de análise detalhada por leitores de código.

Especializações de `observer_ptr` satisfazem os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

Requisitos de tipo
---
-`W` não deve ser um tipo de referência, mas pode ser um tipo incompleto.

### Tipos de membros

Tipo de membro | Definição
---|---
element_type | `W`, o tipo do objeto observado por este `observer_ptr`

### Funções membro

[ (construtor)](<#/doc/experimental/observer_ptr/observer_ptr>) | constrói um novo `observer_ptr`
(função membro pública)
(destrutor)(implicitamente declarado) | destrói um `observer_ptr`
(função membro pública)
operator=(implicitamente declarado) | operadores de atribuição de cópia e de movimento implicitamente declarados que atribuem o ponteiro armazenado
(função membro pública)

##### Modificadores

[ release](<#/doc/experimental/observer_ptr/release>) | retorna um ponteiro para o objeto observado e para de observar o objeto
(função membro pública)
[ reset](<#/doc/experimental/observer_ptr/reset>) | substitui o objeto observado
(função membro pública)
[ swap](<#/doc/experimental/observer_ptr/swap>) | troca os objetos observados
(função membro pública)

##### Observadores

[ get](<#/doc/experimental/observer_ptr/get>) | retorna um ponteiro para o objeto observado
(função membro pública)
[ operator bool](<#/doc/experimental/observer_ptr/operator_bool>) | verifica se há um objeto observado associado
(função membro pública)
[ operator*operator->](<#/doc/experimental/observer_ptr/operator_star_>) | desreferencia o ponteiro para o objeto observado
(função membro pública)

##### Conversões

[ operator element_type*](<#/doc/experimental/observer_ptr/operator_pointer>) | função de conversão explícita para o ponteiro armazenado
(função membro pública)

### Funções não-membro

[ make_observer](<#/doc/experimental/observer_ptr/make_observer>) | cria um `observer_ptr` que observa um objeto
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/observer_ptr/operator_cmp>) | compara com outro `observer_ptr` ou com nullptr
(modelo de função)
[ std::experimental::swap(std::experimental::observer_ptr)](<#/doc/experimental/observer_ptr/swap2>) | especializa o algoritmo `swap`
(modelo de função)

### Classes auxiliares

[ std::hash<std::experimental::observer_ptr>](<#/doc/experimental/observer_ptr/hash>) | suporte a hash para `observer_ptr`
(especialização de modelo de classe)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo