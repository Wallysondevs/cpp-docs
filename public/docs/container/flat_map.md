# std::flat_map

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template<
class Key,
class T,
class Compare = std::less<Key>,
class KeyContainer = std::vector<Key>,
class MappedContainer = std::vector<T>
> class flat_map;
```

O flat map é um [adaptador de container](<#/doc/container>) que fornece a funcionalidade de um container associativo que contém pares chave-valor com chaves únicas. As chaves são ordenadas usando a função de comparação `Compare`.

O modelo de classe `flat_map` atua como um invólucro para os dois containers subjacentes, passados como objetos dos tipos `KeyContainer` e `MappedContainer` respectivamente. O primeiro container é ordenado, e para cada chave, seu valor correspondente está no segundo container no mesmo índice (offset). O número de elementos em ambos os containers é o mesmo.

Onde quer que a standard library use os requisitos [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Informalmente, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::flat_map` atende aos requisitos de [Container](<#/doc/named_req/Container>), [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), [requisitos opcionais de container](<#/doc/named_req/Container>), e todos os requisitos de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) (incluindo complexidade de busca logarítmica), exceto que:

*   requisitos relacionados a nós não são aplicáveis,
*   requisitos de invalidação de iterator diferem,
*   a complexidade das operações de inserção e remoção é linear.

Um flat map suporta a maioria das operações de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) que usam chaves únicas.

### Invalidação de Iterator

| Esta seção está incompleta

### Parâmetros de modelo

- **Key** — O tipo das chaves. O programa é malformado se `Key` não for do mesmo tipo que `KeyContainer::value_type`.
- **T** — O tipo dos valores mapeados. O programa é malformado se `T` não for do mesmo tipo que `MappedContainer::value_type`.
- **Compare** — Um tipo [Compare](<#/doc/named_req/Compare>) que fornece uma ordenação fraca estrita.
KeyContainer
- **MappedContainer** — Os tipos dos [SequenceContainer](<#/doc/named_req/SequenceContainer>) subjacentes para armazenar chaves e valores mapeados correspondentemente. Os iterators de tais containers devem satisfazer [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) ou modelar [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). Invocações de suas funções membro `size` e `max_size` não devem sair via uma exceção. Os containers padrão [std::vector](<#/doc/container/vector>) e [std::deque](<#/doc/container/deque>) satisfazem esses requisitos.

### Tipos de membro

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
`iterator` | definido pela implementação [LegacyInputIterator](<#/doc/named_req/InputIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) para `value_type`
`const_iterator` | definido pela implementação [LegacyInputIterator](<#/doc/named_req/InputIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`containers` | tipo que descreve os containers subjacentes
struct containers
{
key_container_type keys;
mapped_container_type values;
};

### Classes de membro

[ value_compare](<#/doc/container/flat_map/value_compare>) | compara objetos do tipo `value_type`
(class)

### Objetos de membro

Membro | Descrição
---|---
`containers` `_c_` (private) | os containers adaptados
(objeto membro apenas para exposição*)
`key_compare` `_compare_` (private) | o objeto de função de comparação
(objeto membro apenas para exposição*)

### Funções de membro

[ (construtor)](<#/doc/container/flat_map/flat_map>) | constrói o `flat_map`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói cada elemento do adaptador de container
(função membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função membro pública)

##### Acesso a Elementos

[ at](<#/doc/container/flat_map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/flat_map/operator_at>) | acessa ou insere o elemento especificado
(função membro pública)

##### Iterators

[ begin cbegin](<#/doc/container/flat_map/begin>) | retorna um iterator para o início
(função membro pública)
[ end cend](<#/doc/container/flat_map/end>) | retorna um iterator para o fim
(função membro pública)
[ rbegin crbegin](<#/doc/container/flat_map/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rend crend](<#/doc/container/flat_map/rend>) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/flat_map/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ size](<#/doc/container/flat_map/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/flat_map/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ emplace](<#/doc/container/flat_map/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/flat_map/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ try_emplace](<#/doc/container/flat_map/try_emplace>) | insere no local se a chave não existir, não faz nada se a chave existir
(função membro pública)
[ insert](<#/doc/container/flat_map/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/flat_map/insert_range>) | insere um range de elementos
(função membro pública)
[ insert_or_assign](<#/doc/container/flat_map/insert_or_assign>) | insere um elemento ou atribui ao elemento atual se a chave já existir
(função membro pública)
[ extract](<#/doc/container/flat_map/extract>) | extrai os containers subjacentes
(função membro pública)
[ replace](<#/doc/container/flat_map/replace>) | substitui os containers subjacentes
(função membro pública)
[ erase](<#/doc/container/flat_map/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/flat_map/swap>) | troca os conteúdos
(função membro pública)
[ clear](<#/doc/container/flat_map/clear>) | limpa os conteúdos
(função membro pública)

##### Busca

[ find](<#/doc/container/flat_map/find>) | encontra elemento com chave específica
(função membro pública)
[ count](<#/doc/container/flat_map/count>) | retorna o número de elementos que correspondem à chave específica
(função membro pública)
[ contains](<#/doc/container/flat_map/contains>) | verifica se o container contém elemento com chave específica
(função membro pública)
[ lower_bound](<#/doc/container/flat_map/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/flat_map/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)
[ equal_range](<#/doc/container/flat_map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/flat_map/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/flat_map/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)
[ keys](<#/doc/container/flat_map/keys>) | acesso direto ao container de chaves subjacente
(função membro pública)
[ values](<#/doc/container/flat_map/values>) | acesso direto ao container de valores subjacente
(função membro pública)

### Funções não-membro

[ operator== operator<=>](<#/doc/container/flat_map/operator_cmp>)(C++23) | compara lexicograficamente os valores de dois `flat_map`s
(modelo de função)
[ std::swap(std::flat_map)](<#/doc/container/flat_map/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::flat_map)](<#/doc/container/flat_map/erase_if>)(C++23) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### Classes auxiliares

[ std::uses_allocator<std::flat_map>](<#/doc/container/flat_map/uses_allocator>)(C++23) | especializa a trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

### Tags

[ sorted_unique sorted_unique_t](<#/doc/container/sorted_unique>)(C++23) | indica que os elementos de um range estão ordenados e são únicos
(tag)

### [Guias de Dedução](<#/doc/container/flat_map/deduction_guides>)

### Notas

Os tipos membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_flat_map`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::flat_map` e std::flat_multimap

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ flat_multimap](<#/doc/container/flat_multimap>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves
(modelo de classe)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(modelo de classe)
[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, hashados por chaves, chaves são únicas
(modelo de classe)