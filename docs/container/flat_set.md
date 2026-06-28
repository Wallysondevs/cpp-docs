# std::flat_set

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
template<
class Key,
class Compare = std::less<Key>,
class KeyContainer = std::vector<Key>
> class flat_set;
```

O flat set é um [adaptador de container](<#/doc/container>) que fornece a funcionalidade de um container associativo que armazena um conjunto ordenado de objetos únicos do tipo `Key`. A ordenação é feita usando a função de comparação de chaves `Compare`.

O template de classe `flat_set` atua como um wrapper para o container ordenado subjacente passado como objeto do tipo `KeyContainer`.

Onde quer que a standard library utilize os requisitos de [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Informalmente, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::flat_set` atende aos requisitos de [Container](<#/doc/named_req/Container>), [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), [requisitos opcionais de container](<#/doc/named_req/Container>), e todos os requisitos de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) (incluindo complexidade de busca logarítmica), exceto que:

  * requisitos relacionados a nós não são aplicáveis,
  * requisitos de invalidação de iterator diferem,
  * a complexidade das operações de inserção e remoção é linear.

Um flat set suporta a maioria das operações de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) que usam chaves únicas.

### Invalidação de Iterator

| Esta seção está incompleta

### Parâmetros de template

- **Key** — O tipo dos elementos armazenados. O programa é malformado se `Key` não for do mesmo tipo que `KeyContainer::value_type`.
- **Compare** — Um tipo [Compare](<#/doc/named_req/Compare>) que fornece uma ordenação fraca estrita.
- **KeyContainer** — O tipo do [SequenceContainer](<#/doc/named_req/SequenceContainer>) subjacente para armazenar os elementos. Os iterators de tal container devem satisfazer [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) ou modelar [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). Os containers padrão [std::vector](<#/doc/container/vector>) e [std::deque](<#/doc/container/deque>) satisfazem esses requisitos.

### Tipos de membro

Tipo | Definição
---|---
`container_type` | `KeyContainer`
`key_type` | `Key`
`value_type` | `Key`
`key_compare` | `Compare`
`value_compare` | `Compare`
`reference` | value_type&
`const_reference` | const value_type&
`size_type` | typename KeyContainer::size_type
`difference_type` | typename KeyContainer::difference_type
`iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definidos pela implementação para `value_type`
`const_iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definidos pela implementação para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Objetos de membro

Membro | Descrição
---|---
`container_type` `_c_` (private) | o container adaptado
(objeto membro apenas para exposição*)
`key_compare` `_compare_` (private) | o objeto de função de comparação
(objeto membro apenas para exposição*)

### Funções de membro

[ (construtor)](<#/doc/container/flat_set/flat_set>) | constrói o `flat_set`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói cada elemento do adaptador de container
(função membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função membro pública)

##### Iterators

[ begin/cbegin](<#/doc/container/flat_set/begin>) | retorna um iterator para o início
(função membro pública)
[ end/cend](<#/doc/container/flat_set/end>) | retorna um iterator para o fim
(função membro pública)
[ rbegin/crbegin](<#/doc/container/flat_set/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rend/crend](<#/doc/container/flat_set/rend>) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/flat_set/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ size](<#/doc/container/flat_set/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/flat_set/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ emplace](<#/doc/container/flat_set/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/flat_set/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ insert](<#/doc/container/flat_set/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/flat_set/insert_range>) | insere um range de elementos
(função membro pública)
[ extract](<#/doc/container/flat_set/extract>) | extrai o container subjacente
(função membro pública)
[ replace](<#/doc/container/flat_set/replace>) | substitui o container subjacente
(função membro pública)
[ erase](<#/doc/container/flat_set/erase>) | remove elementos
(função membro pública)
[ swap](<#/doc/container/flat_set/swap>) | troca os conteúdos
(função membro pública)
[ clear](<#/doc/container/flat_set/clear>) | limpa os conteúdos
(função membro pública)

##### Busca

[ find](<#/doc/container/flat_set/find>) | encontra elemento com chave específica
(função membro pública)
[ count](<#/doc/container/flat_set/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ contains](<#/doc/container/flat_set/contains>) | verifica se o container contém elemento com chave específica
(função membro pública)
[ lower_bound](<#/doc/container/flat_set/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/flat_set/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)
[ equal_range](<#/doc/container/flat_set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/flat_set/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/flat_set/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)

### Funções não-membro

[ operator==/operator<=>](<#/doc/container/flat_set/operator_cmp>)(C++23) | compara lexicograficamente os valores de dois `flat_set`s
(template de função)
[ std::swap(std::flat_set)](<#/doc/container/flat_set/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase_if(std::flat_set)](<#/doc/container/flat_set/erase_if>)(C++23) | remove todos os elementos que satisfazem critérios específicos
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::flat_set>](<#/doc/container/flat_set/uses_allocator>)(C++23) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### Tags

[ sorted_unique/sorted_unique_t](<#/doc/container/sorted_unique>)(C++23) | indica que os elementos de um range estão ordenados e são únicos
(tag)

### [Guias de dedução](<#/doc/container/flat_set/deduction_guides>)

### Notas

Os tipos de membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Algumas vantagens do flat set sobre outros [adaptadores de container](<#/doc/container>) padrão são:

  * Busca potencialmente mais rápida (mesmo que as operações de busca tenham complexidade logarítmica).
  * Iteração muito mais rápida: [random access iterators](<#/doc/iterator/random_access_iterator>) em vez de [bidirectional iterators](<#/doc/iterator/bidirectional_iterator>).
  * Menor consumo de memória para objetos pequenos (e para objetos grandes se KeyContainer::shrink_to_fit() estiver disponível).
  * Melhor desempenho de cache (dependendo de `KeyContainer`, as chaves são armazenadas em um(s) bloco(s) contíguo(s) de memória).

Algumas desvantagens do flat set são:

  * Iterators não estáveis (iterators são invalidados ao inserir e remover elementos).
  * Valores de tipos não copiáveis e não movíveis não podem ser armazenados.
  * Segurança de exceção mais fraca (construtores de cópia/movimentação podem lançar exceções ao deslocar valores em remoções e inserções).
  * Inserção e remoção mais lentas (ou seja, lineares), especialmente para tipos não movíveis.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_flat_set`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::flat_set` e `std::flat_multiset`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ flat_multiset](<#/doc/container/flat_multiset>)(C++23) | adapta um container para fornecer uma coleção de chaves, ordenadas por chaves
(template de classe)
[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(template de classe)
[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, hashadas por chaves
(template de classe)