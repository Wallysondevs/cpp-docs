# std::multiset

Definido no cabeçalho `[<set>](<#/doc/header/set>)`

```c
template<
class Key,
class Compare = std::less<Key>,
class Allocator = std::allocator<Key>
> class multiset;
namespace pmr {
template<
class Key,
class Compare = std::less<Key>
> using multiset = std::multiset<Key, Compare, std::pmr::polymorphic_allocator<Key>>;
}
```

`std::multiset` é um container associativo que contém um conjunto ordenado de objetos do tipo Key. Ao contrário de set, múltiplas chaves com valores equivalentes são permitidas. A ordenação é feita usando a função de comparação de chaves Compare. As operações de busca, inserção e remoção têm complexidade logarítmica.

Onde quer que a standard library utilize os requisitos [Compare](<#/doc/named_req/Compare>), a equivalência é determinada usando a relação de equivalência conforme descrito em [Compare](<#/doc/named_req/Compare>). Em termos imprecisos, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

A ordem dos elementos que se comparam como equivalentes é a ordem de inserção e não muda. | (desde C++11)

`std::multiset` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Template parameters

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Member types

Tipo | Definição
---|---
`key_type` | `Key`
`value_type` | `Key`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`key_compare` | `Compare`
`value_compare` | `Compare`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer` | (ate C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer | (desde C++11)
`const_pointer` | | `Allocator::const_pointer` | (ate C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer | (desde C++11)
`iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) constante para `value_type`
`const_iterator` | [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container

### Member functions

[ (constructor)](<#/doc/container/multiset/multiset>) | constrói o `multiset`
(função membro pública)
[ (destructor)](<#/doc/container/multiset/~multiset>) | destrói o `multiset`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/multiset/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/multiset/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/multiset/end>)(C++11) | retorna um iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/multiset/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/multiset/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/multiset/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/multiset/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/multiset/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/multiset/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/multiset/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/multiset/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/multiset/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/multiset/emplace_hint>)(C++11) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/multiset/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/multiset/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/multiset/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/multiset/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/multiset/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/multiset/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)
[ lower_bound](<#/doc/container/multiset/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/multiset/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/multiset/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/multiset/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)

### Non-member functions

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multiset/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multiset`s
(modelo de função)
[ std::swap(std::multiset)](<#/doc/container/multiset/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::multiset)](<#/doc/container/multiset/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Deduction guides](<#/doc/container/multiset/deduction_guides>)

| (desde C++17)

### Notes

Os tipos membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [One Definition Rule](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 103](<https://cplusplus.github.io/LWG/issue103>) | C++98 | iterator permite modificação de chaves | iterator tornado constante
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `Key` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(uma chave do tipo `Key` pode não ser capaz de ser construída) | `Key` também é exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>)

### See also

[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(modelo de classe)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, hashadas por chaves
(modelo de classe)
[ flat_multiset](<#/doc/container/flat_multiset>)(C++23) | adapta um container para fornecer uma coleção de chaves, ordenadas por chaves
(modelo de classe)