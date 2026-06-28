# std::stack

Definido no cabeçalho `[<stack>](<#/doc/header/stack>)`

```c
template<
class T,
class Container = std::deque<T>
> class stack;
```

A classe `std::stack` é um [adaptador de container](<#/doc/container>) que oferece ao programador a funcionalidade de uma [pilha](<https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)> "enwiki:Stack \(abstract data type\)") - especificamente, uma estrutura de dados LIFO (last-in, first-out).

O template de classe atua como um invólucro para o container subjacente - apenas um conjunto específico de funções é fornecido. A pilha insere (push) e remove (pop) o elemento da parte de trás do container subjacente, conhecido como o topo da pilha.

### Parâmetros de template

- **T** — O tipo dos elementos armazenados. O programa é malformado se `T` não for do mesmo tipo que `Container::value_type`.
- **Container** — O tipo do container subjacente a ser usado para armazenar os elementos. O container deve satisfazer os requisitos de [SequenceContainer](<#/doc/named_req/SequenceContainer>). Além disso, ele deve fornecer as seguintes funções com a [semântica usual](<#/doc/named_req/SequenceContainer>):

  * `back()`, ex.: [std::vector::back()](<#/doc/container/vector/back>),
  * `push_back()`, ex.: [std::deque::push_back()](<#/doc/container/deque/push_back>),
  * `pop_back()`, ex.: [std::list::pop_back()](<#/doc/container/list/pop_back>).

Os containers padrão [std::vector](<#/doc/container/vector>) (incluindo [`std::vector<bool>`](<#/doc/container/vector_bool>)), [std::deque](<#/doc/container/deque>) e [std::list](<#/doc/container/list>) satisfazem esses requisitos. Por padrão, se nenhuma classe de container for especificada para uma instanciação particular da classe `stack`, o container padrão [std::deque](<#/doc/container/deque>) é usado.

### Tipos de membro

Tipo | Definição
---|---
`container_type` | `Container`
`value_type` | `Container::value_type`
`size_type` | Container::size_type
`reference` | `Container::reference`
`const_reference` | `Container::const_reference`

### Objetos de membro

Membro | Descrição
---|---
Container c | o container subjacente
(objeto de membro protegido)

### Funções de membro

[ (construtor)](<#/doc/container/stack/stack>) | constrói a `stack`
(função de membro pública)
[ (destrutor)](<#/doc/container/stack/~stack>) | destrói a `stack`
(função de membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função de membro pública)

##### Acesso a elementos

[ top](<#/doc/container/stack/top>) | acessa o elemento do topo
(função de membro pública)

##### Capacidade

[ empty](<#/doc/container/stack/empty>) | verifica se o adaptador de container está vazio
(função de membro pública)
[ size](<#/doc/container/stack/size>) | retorna o número de elementos
(função de membro pública)

##### Modificadores

[ push](<#/doc/container/stack/push>) | insere um elemento no topo
(função de membro pública)
[ push_range](<#/doc/container/stack/push_range>)(C++23) | insere um range de elementos no topo
(função de membro pública)
[ emplace](<#/doc/container/stack/emplace>)(C++11) | constrói um elemento in-place no topo
(função de membro pública)
[ pop](<#/doc/container/stack/pop>) | remove o elemento do topo
(função de membro pública)
[ swap](<#/doc/container/stack/swap>)(C++11) | troca os conteúdos
(função de membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/stack/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `stack`s
(template de função)
[ std::swap(std::stack)](<#/doc/container/stack/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::stack>](<#/doc/container/stack/uses_allocator>)(C++11) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)
[ std::formatter<std::stack>](<#/doc/container/stack/formatter>)(C++23) | suporte a formatação para `std::stack`
(especialização de template de classe)

### [Guias de dedução](<#/doc/container/stack/deduction_guides>)

| (desde C++17)

### Notas

Macro [de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 307](<https://cplusplus.github.io/LWG/issue307>) | C++98 | `Container` não podia ser `std::vector<bool>` | permitido
[LWG 2566](<https://cplusplus.github.io/LWG/issue2566>) | C++98 | Faltando o requisito para `Container::value_type` | malformado se `T` não for do mesmo tipo que `Container::value_type`

### Veja também

[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(template de classe)
[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) | bitset dinâmico com eficiência de espaço
(especialização de template de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(template de classe)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(template de classe)