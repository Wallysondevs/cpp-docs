# std::multimap

Definido no cabeçalho `[<map>](<#/doc/header/map>)`

```c
template<
class Key,
class T,
class Compare = std::less<Key>,
class Allocator = std::allocator<std::pair<const Key, T>>
> class multimap;
namespace pmr {
template<
class Key,
class T,
class Compare = std::less<Key>
> using multimap = std::multimap<Key, T, Compare,
std::pmr::polymorphic_allocator<std::pair<const Key, T>>>;
}
```

`std::multimap` é um container associativo que contém uma lista ordenada de pares chave-valor, permitindo múltiplas entradas com a mesma chave. A ordenação é feita de acordo com a função de comparação `Compare`, aplicada às chaves. As operações de busca, inserção e remoção têm complexidade logarítmica.

Iteradores de `std::multimap` iteram em ordem não decrescente das chaves, onde não decrescente é definido pela comparação que foi usada para a construção. Ou seja, dado

* m, um `std::multimap`
* it_l e it_r, iteradores desreferenciáveis para m, com it_l < it_r.

m.value_comp()(*it_r, *it_l) == false (do menor para o maior se usando a comparação padrão).

A ordem dos pares chave-valor cujas chaves são comparativamente equivalentes é a ordem de inserção e não muda. | (desde C++11)

Onde quer que a standard library use os requisitos [Compare](<#/doc/named_req/Compare>), a equivalência é determinada usando a relação de equivalência conforme descrito em [Compare](<#/doc/named_req/Compare>). Em termos imprecisos, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::multimap` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membro

Tipo | Definição
---|---
`key_type` | `Key`
`mapped_type` | `T`
`value_type` | [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`key_compare` | `Compare`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer | (desde C++11)
`const_pointer` | | `Allocator::const_pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer | (desde C++11)
`iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para `value_type`
`const_iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container

### Classes de membro

[ value_compare](<#/doc/container/multimap/value_compare>) | compara objetos do tipo `value_type`
(classe)

### Funções membro

[ (construtor)](<#/doc/container/multimap/multimap>) | constrói o `multimap`
(função membro pública)
[ (destrutor)](<#/doc/container/multimap/~multimap>) | destrói o `multimap`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/multimap/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begin/cbegin](<#/doc/container/multimap/begin>)(C++11) | retorna um iterador para o início
(função membro pública)
[ end/cend](<#/doc/container/multimap/end>)(C++11) | retorna um iterador para o fim
(função membro pública)
[ rbegin/crbegin](<#/doc/container/multimap/rbegin>)(C++11) | retorna um iterador reverso para o início
(função membro pública)
[ rend/crend](<#/doc/container/multimap/rend>)(C++11) | retorna um iterador reverso para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/multimap/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/multimap/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/multimap/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/multimap/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/multimap/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/multimap/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/multimap/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/multimap/emplace_hint>)(C++11) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/multimap/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/multimap/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/multimap/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/multimap/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/multimap/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/multimap/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/multimap/contains>)(C++20) | verifica se o container contém um elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/multimap/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)
[ lower_bound](<#/doc/container/multimap/lower_bound>) | retorna um iterador para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/multimap/upper_bound>) | retorna um iterador para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/multimap/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/multimap/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multimap/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multimap`s
(modelo de função)
[ std::swap(std::multimap)](<#/doc/container/multimap/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::multimap)](<#/doc/container/multimap/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/multimap/deduction_guides>)

| (desde C++17)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `Key` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(uma chave do tipo `Key` pode não ser capaz de ser construída) | `Key` também é exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>)

### Veja também

[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(modelo de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, com hash pelas chaves
(modelo de classe)
[ flat_multimap](<#/doc/container/flat_multimap>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves
(modelo de classe)