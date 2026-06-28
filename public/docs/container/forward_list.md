# std::forward_list

Definido no cabeçalho `[<forward_list>](<#/doc/header/forward_list>)`

```c
template<
class T,
class Allocator = std::allocator<T>
> class forward_list;
namespace pmr {
template< class T >
using forward_list = std::forward_list<T, std::pmr::polymorphic_allocator<T>>;
}
```

`std::forward_list` é um contêiner que suporta inserção e remoção rápidas de elementos de qualquer lugar no contêiner. Acesso aleatório rápido não é suportado. É implementado como uma lista simplesmente encadeada. Comparado a [std::list](<#/doc/container/list>), este contêiner oferece armazenamento mais eficiente em espaço quando a iteração bidirecional não é necessária.

Adicionar, remover e mover os elementos dentro da lista, ou entre várias listas, não invalida os iteradores que atualmente se referem a outros elementos na lista. No entanto, um iterador ou referência que se refere a um elemento é invalidado quando o elemento correspondente é removido (via [erase_after](<#/doc/container/forward_list/erase_after>)) da lista.

`std::forward_list` atende aos requisitos de [Container](<#/doc/named_req/Container>) (exceto pela função membro `size` e pelo fato de que a complexidade de `operator==` é sempre linear), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) e [SequenceContainer](<#/doc/named_req/SequenceContainer>).

### Parâmetros de template

- **T** — O tipo dos elementos. | Os requisitos impostos aos elementos dependem das operações reais realizadas no contêiner. Geralmente, é exigido que o tipo do elemento seja um tipo completo e atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. | (até C++17)
Os requisitos impostos aos elementos dependem das operações reais realizadas no contêiner. Geralmente, é exigido que o tipo do elemento atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. Este contêiner (mas não seus membros) pode ser instanciado com um tipo de elemento incompleto se o alocador satisfizer os [requisitos de completude do alocador](<#/doc/named_req/Allocator>). | [Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
[`__cpp_lib_incomplete_container_elements`](<#/doc/feature_test>) | [`201505L`](<#/>) | (C++17) | Suporte mínimo a tipos incompletos
(desde C++17)

- **Allocator** — Um alocador que é usado para adquirir/liberar memória e para construir/destruir os elementos nessa memória. O tipo deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>). O comportamento é indefinido (até C++20) O programa é malformado (desde C++20) se `Allocator::value_type` não for o mesmo que `T`.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | `T`
`allocator_type` | `Allocator`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer
`iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para `value_type`
`const_iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para const value_type

### Funções membro

[ (construtor)](<#/doc/container/forward_list/forward_list>) | constrói a `forward_list`
(função membro pública)
[ (destrutor)](<#/doc/container/forward_list/~forward_list>) | destrói a `forward_list`
(função membro pública)
[ operator=](<#/>) | atribui valores ao contêiner
(função membro pública)
[ assign](<#/doc/container/forward_list/assign>) | atribui valores ao contêiner
(função membro pública)
[ assign_range](<#/doc/container/forward_list/assign_range>)(C++23) | atribui um range de valores ao contêiner
(função membro pública)
[ get_allocator](<#/doc/container/forward_list/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Acesso a elementos

[ front](<#/doc/container/forward_list/front>) | acessa o primeiro elemento
(função membro pública)

##### Iteradores

[ before_begincbefore_begin](<#/doc/container/forward_list/before_begin>) | retorna um iterador para o elemento antes do início
(função membro pública)
[ begincbegin](<#/doc/container/forward_list/begin>) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/container/forward_list/end>) | retorna um iterador para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/forward_list/empty>) | verifica se o contêiner está vazio
(função membro pública)
[ max_size](<#/doc/container/forward_list/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/forward_list/clear>) | limpa o conteúdo
(função membro pública)
[ insert_after](<#/doc/container/forward_list/insert_after>) | insere elementos após um elemento
(função membro pública)
[ emplace_after](<#/doc/container/forward_list/emplace_after>) | constrói elementos no local após um elemento
(função membro pública)
[ insert_range_after](<#/doc/container/forward_list/insert_range_after>)(C++23) | insere um range de elementos após um elemento
(função membro pública)
[ erase_after](<#/doc/container/forward_list/erase_after>) | apaga um elemento após um elemento
(função membro pública)
[ push_front](<#/doc/container/forward_list/push_front>) | insere um elemento no início
(função membro pública)
[ emplace_front](<#/doc/container/forward_list/emplace_front>) | constrói um elemento no local no início
(função membro pública)
[ prepend_range](<#/doc/container/forward_list/prepend_range>)(C++23) | adiciona um range de elementos ao início
(função membro pública)
[ pop_front](<#/doc/container/forward_list/pop_front>) | remove o primeiro elemento
(função membro pública)
[ resize](<#/doc/container/forward_list/resize>) | altera o número de elementos armazenados
(função membro pública)
[ swap](<#/doc/container/forward_list/swap>) | troca o conteúdo
(função membro pública)

##### Operações

[ merge](<#/doc/container/forward_list/merge>) | mescla duas listas ordenadas
(função membro pública)
[ splice_after](<#/doc/container/forward_list/splice_after>) | move elementos de outra `forward_list`
(função membro pública)
[ removeremove_if](<#/doc/container/forward_list/remove>) | remove elementos que satisfazem critérios específicos
(função membro pública)
[ reverse](<#/doc/container/forward_list/reverse>) | inverte a ordem dos elementos
(função membro pública)
[ unique](<#/doc/container/forward_list/unique>) | remove elementos duplicados consecutivos
(função membro pública)
[ sort](<#/doc/container/forward_list/sort>) | ordena os elementos
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/forward_list/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `forward_list`s
(template de função)
[ std::swap(std::forward_list)](<#/doc/container/forward_list/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::forward_list)erase_if(std::forward_list)](<#/doc/container/forward_list/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### [Guias de dedução](<#/doc/container/forward_list/deduction_guides>)

| (desde C++17)

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para contêineres

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ list](<#/doc/container/list>) | lista duplamente encadeada
(template de classe)