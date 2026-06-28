# std::unordered_multiset

Definido no cabeçalho `[<unordered_set>](<#/doc/header/unordered_set>)`

```c
template<
class Key,
class Hash = std::hash<Key>,
class KeyEqual = std::equal_to<Key>,
class Allocator = std::allocator<Key>
> class unordered_multiset;
namespace pmr {
template<
class Key,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>
> using unordered_multiset = std::unordered_multiset<Key, Hash, Pred,
std::pmr::polymorphic_allocator<Key>>;
}
```

`std::unordered_multiset` é um container associativo que contém um conjunto de objetos possivelmente não-únicos do tipo Key. Busca, inserção e remoção têm complexidade de tempo constante em média.

Internamente, os elementos não são ordenados em nenhuma ordem particular, mas organizados em buckets. Em qual bucket um elemento é colocado depende inteiramente do hash de seu valor. Isso permite acesso rápido a elementos individuais, pois uma vez que o hash é computado, ele se refere ao bucket exato onde o elemento é colocado.

A ordem de iteração deste container não é exigida ser estável (assim, por exemplo, [std::equal](<#/doc/algorithm/equal>) não pode ser usado para comparar dois `std::unordered_multiset`s), exceto que cada grupo de elementos cujas chaves se comparam _equivalentes_ (se comparam iguais com [key_eq()](<#/doc/container/unordered_multiset/key_eq>) como o comparador) forma um sub-range contíguo na ordem de iteração, também acessível com [equal_range()](<#/doc/container/unordered_multiset/equal_range>).

`std::unordered_multiset` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>).

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membros

Tipo | Definição
---|---
`key_type` | `Key`
`value_type` | `Key`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`hasher` | `Hash`
`key_equal` | `KeyEqual`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer
`iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) constante para `value_type`
`const_iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para const value_type
`local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, ponteiro e
tipos de referência são os mesmos que `iterator`. Este iterator
pode ser usado para iterar através de um único bucket, mas não entre buckets
`const_local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, ponteiro e
tipos de referência são os mesmos que `const_iterator`. Este iterator
pode ser usado para iterar através de um único bucket, mas não entre buckets
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container

### Funções membro

[ (construtor)](<#/doc/container/unordered_multiset/unordered_multiset>) | constrói o `unordered_multiset`
(função membro pública)
[ (destrutor)](<#/doc/container/unordered_multiset/~unordered_multiset>) | destrói o `unordered_multiset`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/unordered_multiset/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/unordered_multiset/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/unordered_multiset/end>) | retorna um iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/unordered_multiset/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/unordered_multiset/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/unordered_multiset/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/unordered_multiset/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/unordered_multiset/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/unordered_multiset/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/unordered_multiset/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_multiset/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/unordered_multiset/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/unordered_multiset/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/unordered_multiset/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/unordered_multiset/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/unordered_multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/unordered_multiset/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_multiset/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Interface de bucket

[ begin(size_type)cbegin(size_type)](<#/doc/container/unordered_multiset/begin2>) | retorna um iterator para o início do bucket especificado
(função membro pública)
[ end(size_type)cend(size_type)](<#/doc/container/unordered_multiset/end2>) | retorna um iterator para o fim do bucket especificado
(função membro pública)
[ bucket_count](<#/doc/container/unordered_multiset/bucket_count>) | retorna o número de buckets
(função membro pública)
[ max_bucket_count](<#/doc/container/unordered_multiset/max_bucket_count>) | retorna o número máximo de buckets
(função membro pública)
[ bucket_size](<#/doc/container/unordered_multiset/bucket_size>) | retorna o número de elementos no bucket específico
(função membro pública)
[ bucket](<#/doc/container/unordered_multiset/bucket>) | retorna o bucket para uma chave específica
(função membro pública)

##### Política de hash

[ load_factor](<#/doc/container/unordered_multiset/load_factor>) | retorna o número médio de elementos por bucket
(função membro pública)
[ max_load_factor](<#/doc/container/unordered_multiset/max_load_factor>) | gerencia o número médio máximo de elementos por bucket
(função membro pública)
[ rehash](<#/doc/container/unordered_multiset/rehash>) | reserva pelo menos o número especificado de buckets e regenera a tabela hash
(função membro pública)
[ reserve](<#/doc/container/unordered_multiset/reserve>) | reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash
(função membro pública)

##### Observadores

[ hash_function](<#/doc/container/unordered_multiset/hash_function>) | retorna a função usada para fazer o hash das chaves
(função membro pública)
[ key_eq](<#/doc/container/unordered_multiset/key_eq>) | retorna a função usada para comparar chaves por igualdade
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/container/unordered_multiset/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_multiset
(modelo de função)
[ std::swap(std::unordered_multiset)](<#/doc/container/unordered_multiset/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_multiset)](<#/doc/container/unordered_multiset/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/unordered_multiset/deduction_guides>)

| (desde C++17)

### Notas

Os tipos de membros `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2050](<https://cplusplus.github.io/LWG/issue2050>) | C++11 | as definições de `reference`, `const_reference`, `pointer`
e `const_pointer` eram baseadas em `allocator_type` | baseadas em `value_type` e
[std::allocator_traits](<#/doc/memory/allocator_traits>)

### Veja também

[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, hashadas por chaves
(modelo de classe)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(modelo de classe)
[ flat_multiset](<#/doc/container/flat_multiset>)(C++23) | adapta um container para fornecer uma coleção de chaves, ordenadas por chaves
(modelo de classe)