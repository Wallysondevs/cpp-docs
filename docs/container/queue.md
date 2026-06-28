# std::queue

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template<
class T,
class Container = std::deque<T>
> class queue;
```

O template de classe `std::queue` é um [adaptador de container](<#/doc/container>) que fornece a funcionalidade de uma [fila](<https://en.wikipedia.org/wiki/Queue_\(abstract_data_type\)> "enwiki:Queue \(abstract data type\)") - especificamente, uma estrutura de dados FIFO (first-in, first-out).

O template de classe atua como um wrapper para o container subjacente - apenas um conjunto específico de funções é fornecido. A fila insere os elementos no final do container subjacente e os remove do início.

### Parâmetros de template

- **T** — O tipo dos elementos armazenados. O programa é malformado se `T` não for do mesmo tipo que `Container::value_type`.
- **Container** — O tipo do container subjacente a ser usado para armazenar os elementos. O container deve satisfazer os requisitos de [SequenceContainer](<#/doc/named_req/SequenceContainer>). Além disso, ele deve fornecer as seguintes funções com a [semântica usual](<#/doc/named_req/SequenceContainer>):

  * `back()`, por exemplo, [std::deque::back()](<#/doc/container/deque/back>),
  * `front()`, por exemplo, [std::list::front()](<#/doc/container/list/front>),
  * `push_back()`, por exemplo, [std::deque::push_back()](<#/doc/container/deque/push_back>),
  * `pop_front()`, por exemplo, [std::list::pop_front()](<#/doc/container/list/pop_front>).

Os containers padrão [std::deque](<#/doc/container/deque>) e [std::list](<#/doc/container/list>) satisfazem esses requisitos.

### Tipos de membros

Tipo de membro | Definição
---|---
`container_type` | `Container`
`value_type` | `Container::value_type`
`size_type` | Container::size_type
`reference` | `Container::reference`
`const_reference` | `Container::const_reference`

### Objetos de membros

Nome do membro | Definição
---|---
Container c | o container subjacente
(objeto membro protegido)

### Funções de membros

[ (construtor)](<#/doc/container/queue/queue>) | constrói a `queue`
(função membro pública)
[ (destrutor)](<#/doc/container/queue/~queue>) | destrói a `queue`
(função membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função membro pública)

##### Acesso a elementos

[ front](<#/doc/container/queue/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/queue/back>) | acessa o último elemento
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/queue/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ size](<#/doc/container/queue/size>) | retorna o número de elementos
(função membro pública)

##### Modificadores

[ push](<#/doc/container/queue/push>) | insere elemento no final
(função membro pública)
[ push_range](<#/doc/container/queue/push_range>)(C++23) | insere um range de elementos no final
(função membro pública)
[ emplace](<#/doc/container/queue/emplace>)(C++11) | constrói elemento no local no final
(função membro pública)
[ pop](<#/doc/container/queue/pop>) | remove o primeiro elemento
(função membro pública)
[ swap](<#/doc/container/queue/swap>)(C++11) | troca os conteúdos
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/queue/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `queue`s
(template de função)
[ std::swap(std::queue)](<#/doc/container/queue/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::queue>](<#/doc/container/queue/uses_allocator>)(C++11) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)
[ std::formatter<std::queue>](<#/doc/container/queue/formatter>)(C++23) | suporte a formatação para `std::queue`
(especialização de template de classe)

### [Guias de dedução](<#/doc/container/queue/deduction_guides>)

| (desde C++17)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <queue>
     
    int main()
    {
        std::queue<int> q;
     
        q.push(0); // back pushes 0
        q.push(1); // q = 0 1
        q.push(2); // q = 0 1 2
        q.push(3); // q = 0 1 2 3
     
        assert(q.front() == 0);
        assert(q.back() == 3);
        assert(q.size() == 4);
     
        q.pop(); // removes the front element, 0
        assert(q.size() == 3);
     
        // Print and remove all elements. Note that std::queue does not
        // support begin()/end(), so a range-for-loop cannot be used.
        std::cout << "q: ";
        for (; !q.empty(); q.pop())
            std::cout << q.front() << ' ';
        std::cout << '\n';
        assert(q.size() == 0);
    }
```

Saída:
```
    q: 1 2 3
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 307](<https://cplusplus.github.io/LWG/issue307>) | C++98 | `std::queue` não suportava containers usando tipos de referência proxy
em vez de (`const`) `value_type&` | suportado
[LWG 2566](<https://cplusplus.github.io/LWG/issue2566>) | C++98 | Faltando o requisito para `Container::value_type` | malformado se `T` não for do mesmo tipo que `Container::value_type`

1. [↑](<#/doc/container/queue>) Como containers semelhantes a [`std::vector<bool>`](<#/doc/container/vector_bool>) com suporte adicional de `pop_front()`. A resolução deste DR adicionou suporte a [`std::vector<bool>`](<#/doc/container/vector_bool>) para [std::stack](<#/doc/container/stack>) e [std::priority_queue](<#/doc/container/priority_queue>). As mudanças envolvendo `std::queue` são para manter a consistência.

### Veja também

[ priority_queue](<#/doc/container/priority_queue>) | adapta um container para fornecer uma fila de prioridade
(template de classe)
[ deque](<#/doc/container/deque>) | fila de duas extremidades
(template de classe)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(template de classe)