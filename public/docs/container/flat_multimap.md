# std::flat_multimap

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template<
class Key,
class T,
class Compare = std::less<Key>,
class KeyContainer = std::vector<Key>,
class MappedContainer = std::vector<T>
> class flat_multimap;
```

O flat multimap é um [adaptador de container](<#/doc/container>) que fornece a funcionalidade de um container associativo que contém pares chave-valor, enquanto permite múltiplas entradas com o mesmo valor de chave. As chaves são ordenadas usando a função de comparação `Compare`.

O template de classe `flat_multimap` atua como um wrapper para os dois containers subjacentes, passados como objetos dos tipos `KeyContainer` e `MappedContainer` respectivamente. O primeiro container é ordenado, e para cada chave seu valor correspondente está no segundo container no mesmo índice (offset). O número de elementos em ambos os containers é o mesmo.

Onde quer que a standard library use os requisitos [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Informalmente, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::flat_multimap` atende aos requisitos de [Container](<#/doc/named_req/Container>), [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), [requisitos opcionais de container](<#/doc/named_req/Container>), e todos os requisitos de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) (incluindo complexidade de busca logarítmica), exceto que:

  * requisitos relacionados a nós não são aplicáveis,
  * requisitos de invalidação de iterator diferem,
  * a complexidade das operações de inserção e remoção é linear.

Um flat multimap suporta a maioria das operações de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) que usam chaves iguais.

### Invalidação de Iterator

| Esta seção está incompleta

### Parâmetros de template

- **Key** — O tipo das chaves. O programa é malformado se `Key` não for do mesmo tipo que `KeyContainer::value_type`.
- **T** — O tipo dos valores mapeados. O programa é malformado se `T` não for do mesmo tipo que `MappedContainer::value_type`.
- **Compare** — Um tipo [Compare](<#/doc/named_req/Compare>) que fornece uma ordenação fraca estrita.
KeyContainer
- **MappedContainer** — Os tipos dos [SequenceContainer](<#/doc/named_req/SequenceContainer>) subjacentes para armazenar chaves e valores mapeados, respectivamente. Os iterators de tais containers devem satisfazer [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) ou modelar [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). Invocações de suas funções membro `size` e `max_size` não devem sair via uma exceção. Os containers padrão [std::vector](<#/doc/container/vector>) e [std::deque](<#/doc/container/deque>) satisfazem esses requisitos.

### Tipos membro

Tipo | Definição
---|---
`key_container_type` | `KeyContainer`
`mapped_container_type` | `MappedContainer`
`key_type` | `Key`
`mapped_type` | `T`
`value_type` | [std::pair](<#/doc/utility/pair>)<key_type, mapped_type>
`key_compare` | `Compare`
`reference` | [std::pair](<#/doc/utility/pair>)&lt;const key_type&, mapped_type&&gt;
`const_reference` | [std::pair](<#/doc/utility/pair>)&lt;const key_type&, const mapped_type&&gt;
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`iterator` | [LegacyInputIterator](<#/doc/named_req/InputIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definidos pela implementação para `value_type`
`const_iterator` | [LegacyInputIterator](<#/doc/named_req/InputIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definidos pela implementação para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`containers` | tipo que descreve os containers subjacentes
struct containers
{
key_container_type keys;
mapped_container_type values;
};

### Classes membro

[ value_compare](<#/doc/container/flat_multimap/value_compare>) | compara objetos do tipo `value_type`
(classe)

### Objetos membro

Membro | Descrição
---|---
`containers` `_c_` (privado) | os containers adaptados
(objeto membro apenas para exposição*)
`key_compare` `_compare_` (privado) | o objeto de função de comparação
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/container/flat_multimap/flat_multimap>) | constrói o `flat_multimap`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói cada elemento do adaptador de container
(função membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função membro pública)

##### Iterators

[ begincbegin](<#/doc/container/flat_multimap/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/flat_multimap/end>) | retorna um iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/flat_multimap/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/flat_multimap/rend>) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/flat_multimap/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ size](<#/doc/container/flat_multimap/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/flat_multimap/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ emplace](<#/doc/container/flat_multimap/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/flat_multimap/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ insert](<#/doc/container/flat_multimap/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/flat_multimap/insert_range>) | insere um range de elementos
(função membro pública)
[ extract](<#/doc/container/flat_multimap/extract>) | extrai os containers subjacentes
(função membro pública)
[ replace](<#/doc/container/flat_multimap/replace>) | substitui os containers subjacentes
(função membro pública)
[ erase](<#/doc/container/flat_multimap/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/flat_multimap/swap>) | troca o conteúdo
(função membro pública)
[ clear](<#/doc/container/flat_multimap/clear>) | limpa o conteúdo
(função membro pública)

##### Busca

[ find](<#/doc/container/flat_multimap/find>) | encontra elemento com chave específica
(função membro pública)
[ count](<#/doc/container/flat_multimap/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ contains](<#/doc/container/flat_multimap/contains>) | verifica se o container contém elemento com chave específica
(função membro pública)
[ lower_bound](<#/doc/container/flat_multimap/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/flat_multimap/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)
[ equal_range](<#/doc/container/flat_multimap/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/flat_multimap/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/flat_multimap/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)
[ keys](<#/doc/container/flat_multimap/keys>) | acesso direto ao container de chaves subjacente
(função membro pública)
[ values](<#/doc/container/flat_multimap/values>) | acesso direto ao container de valores subjacente
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/container/flat_multimap/operator_cmp>)(C++23) | compara lexicograficamente os valores de dois `flat_multimap`s
(template de função)
[ std::swap(std::flat_multimap)](<#/doc/container/flat_multimap/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase_if(std::flat_multimap)](<#/doc/container/flat_multimap/erase_if>)(C++23) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::flat_multimap>](<#/doc/container/flat_multimap/uses_allocator>)(C++23) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### Tags

[ sorted_equivalentsorted_equivalent_t](<#/doc/container/sorted_equivalent>)(C++23) | indica que os elementos de um range estão ordenados (unicidade não é necessária)
(tag)

### [Guias de dedução](<#/doc/container/flat_multimap/deduction_guides>)

### Notas

Os tipos membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_flat_map`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::flat_map e `std::flat_multimap`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ flat_map](<#/doc/container/flat_map>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves únicas
(template de classe)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(template de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, hashed por chaves
(template de classe)