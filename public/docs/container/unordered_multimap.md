# std::unordered_multimap

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
template<
class Key,
class T,
class Hash = std::hash<Key>,
class KeyEqual = std::equal_to<Key>,
class Allocator = std::allocator<std::pair<const Key, T>>
> class unordered_multimap;
namespace pmr {
template<
class Key,
class T,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>
> using unordered_multimap =
std::unordered_multimap<Key, T, Hash, Pred,
std::pmr::polymorphic_allocator<std::pair<const Key, T>>>;
}
```

`std::unordered_multimap` é um container associativo não ordenado que suporta chaves equivalentes (um unordered_multimap pode conter múltiplas cópias de cada valor de chave) e que associa valores de outro tipo às chaves. A classe unordered_multimap suporta iteradores forward. Busca, inserção e remoção possuem complexidade de tempo constante em média.

Internamente, os elementos não são ordenados em nenhuma ordem particular, mas organizados em buckets. O bucket em que um elemento é colocado depende inteiramente do hash de sua chave. Isso permite acesso rápido a elementos individuais, já que, uma vez que o hash é computado, ele se refere ao bucket exato onde o elemento é colocado.

A ordem de iteração deste container não é exigida ser estável (assim, por exemplo, [std::equal](<#/doc/algorithm/equal>) não pode ser usado para comparar dois `std::unordered_multimap`s), exceto que cada grupo de elementos cujas chaves comparam como _equivalentes_ (comparam igual com [key_eq()](<#/doc/container/unordered_multimap/key_eq>) como comparador) forma um sub-range contíguo na ordem de iteração, também acessível com [equal_range()](<#/doc/container/unordered_multimap/equal_range>).

`std::unordered_multimap` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>).

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
`hasher` | `Hash`
`key_equal` | `KeyEqual`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer
`iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para `value_type`
`const_iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para const value_type
`local_iterator` | Um tipo de iterador cuja categoria, valor, diferença, tipos de ponteiro e referência são os mesmos que `iterator`. Este iterador pode ser usado para iterar através de um único bucket, mas não entre buckets.
`const_local_iterator` | Um tipo de iterador cuja categoria, valor, diferença, tipos de ponteiro e referência são os mesmos que `const_iterator`. Este iterador pode ser usado para iterar através de um único bucket, mas não entre buckets.
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container

### Funções membro

[ (construtor)](<#/doc/container/unordered_multimap/unordered_multimap>) | constrói o `unordered_multimap`
(função membro pública)
[ (destrutor)](<#/doc/container/unordered_multimap/~unordered_multimap>) | destrói o `unordered_multimap`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/unordered_multimap/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/unordered_multimap/begin>) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/container/unordered_multimap/end>) | retorna um iterador para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/unordered_multimap/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/unordered_multimap/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/unordered_multimap/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/unordered_multimap/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/unordered_multimap/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/unordered_multimap/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/unordered_multimap/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_multimap/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/unordered_multimap/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/unordered_multimap/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/unordered_multimap/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/unordered_multimap/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/unordered_multimap/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/unordered_multimap/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_multimap/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_multimap/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Interface de bucket

[ begin(size_type)cbegin(size_type)](<#/doc/container/unordered_multimap/begin2>) | retorna um iterador para o início do bucket especificado
(função membro pública)
[ end(size_type)cend(size_type)](<#/doc/container/unordered_multimap/end2>) | retorna um iterador para o fim do bucket especificado
(função membro pública)
[ bucket_count](<#/doc/container/unordered_multimap/bucket_count>) | retorna o número de buckets
(função membro pública)
[ max_bucket_count](<#/doc/container/unordered_multimap/max_bucket_count>) | retorna o número máximo de buckets
(função membro pública)
[ bucket_size](<#/doc/container/unordered_multimap/bucket_size>) | retorna o número de elementos em um bucket específico
(função membro pública)
[ bucket](<#/doc/container/unordered_multimap/bucket>) | retorna o bucket para uma chave específica
(função membro pública)

##### Política de hash

[ load_factor](<#/doc/container/unordered_multimap/load_factor>) | retorna o número médio de elementos por bucket
(função membro pública)
[ max_load_factor](<#/doc/container/unordered_multimap/max_load_factor>) | gerencia o número médio máximo de elementos por bucket
(função membro pública)
[ rehash](<#/doc/container/unordered_multimap/rehash>) | reserva pelo menos o número especificado de buckets e regenera a tabela hash
(função membro pública)
[ reserve](<#/doc/container/unordered_multimap/reserve>) | reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash
(função membro pública)

##### Observadores

[ hash_function](<#/doc/container/unordered_multimap/hash_function>) | retorna a função usada para fazer hash das chaves
(função membro pública)
[ key_eq](<#/doc/container/unordered_multimap/key_eq>) | retorna a função usada para comparar chaves por igualdade
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/container/unordered_multimap/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_multimap
(modelo de função)
[ std::swap(std::unordered_multimap)](<#/doc/container/unordered_multimap/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_multimap)](<#/doc/container/unordered_multimap/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/unordered_multimap/deduction_guides>)

| (desde C++17)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2050](<https://cplusplus.github.io/LWG/issue2050>) | C++11 | as definições de `reference`, `const_reference`, `pointer` e `const_pointer` eram baseadas em `allocator_type` | baseadas em `value_type` e [std::allocator_traits](<#/doc/memory/allocator_traits>)

### Veja também

[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, com hash pelas chaves, chaves são únicas
(modelo de classe)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados pelas chaves
(modelo de classe)
[ flat_multimap](<#/doc/container/flat_multimap>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados pelas chaves
(modelo de classe)