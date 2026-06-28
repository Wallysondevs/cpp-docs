# std::flat_multiset

Definido no header `[<flat_set>](<#/doc/header/flat_set>)`

```cpp
template<
class Key,
class Compare = std::less<Key>,
class KeyContainer = std::vector<Key>
> class flat_multiset;  // (desde C++23)
```

O flat multiset é um [adaptador de container](<#/doc/container>) que fornece a funcionalidade de um container associativo que armazena um conjunto ordenado de objetos do tipo `Key`. Ao contrário de std::flat_set, múltiplas chaves com valores equivalentes são permitidas. A ordenação é feita usando a função de comparação de chaves `Compare`.

O template de classe `flat_multiset` atua como um wrapper para o container ordenado subjacente passado como objeto do tipo `KeyContainer`.

Onde quer que a standard library utilize os requisitos [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Informalmente, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::flat_multiset` atende aos requisitos de [Container](<#/doc/named_req/Container>), [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), [requisitos opcionais de container](<#/doc/named_req/Container>), e todos os requisitos de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) (incluindo complexidade de busca logarítmica), exceto que:

*   requisitos relacionados a nós não são aplicáveis,
*   requisitos de invalidação de iterator diferem,
*   a complexidade das operações de inserção e remoção é linear.

Um flat multiset suporta a maioria das operações de [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) que utilizam chaves iguais.

### Invalidação de Iterator

| Esta seção está incompleta

### Parâmetros de template

- **Key** — O tipo dos elementos armazenados. O programa é malformado se `Key` não for do mesmo tipo que `KeyContainer::value_type`.
- **Compare** — Um tipo [Compare](<#/doc/named_req/Compare>) que fornece uma ordenação fraca estrita.
- **KeyContainer** — O tipo do [SequenceContainer](<#/doc/named_req/SequenceContainer>) subjacente para armazenar os elementos. Os iterators de tal container devem satisfazer [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) ou modelar [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). Os containers padrão [std::vector](<#/doc/container/vector>) e [std::deque](<#/doc/container/deque>) satisfazem esses requisitos.

### Tipos de membro

Tipo | Definição
---|---
`container_type` | `Key`Container`
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
`container_type` `_c_` (privado) | o container adaptado
(objeto de membro apenas para exposição*)
`key_compare` `_compare_` (privado) | o objeto de função de comparação
(objeto de membro apenas para exposição*)

### Funções de membro

[ (construtor)](<#/doc/container/flat_multiset/flat_multiset>) | constrói o `flat_multiset`
(função de membro pública)
(destrutor)(declarado implicitamente) | destrói cada elemento do adaptador de container
(função de membro pública)
[ operator=](<#/>) | atribui valores ao adaptador de container
(função de membro pública)

##### Iterators

[ begincbegin](<#/doc/container/flat_multiset/begin>) | retorna um iterator para o início
(função de membro pública)
[ endcend](<#/doc/container/flat_multiset/end>) | retorna um iterator para o fim
(função de membro pública)
[ rbegincrbegin](<#/doc/container/flat_multiset/rbegin>) | retorna um reverse iterator para o início
(função de membro pública)
[ rendcrend](<#/doc/container/flat_multiset/rend>) | retorna um reverse iterator para o fim
(função de membro pública)

##### Capacidade

[ empty](<#/doc/container/flat_multiset/empty>) | verifica se o adaptador de container está vazio
(função de membro pública)
[ size](<#/doc/container/flat_multiset/size>) | retorna o número de elementos
(função de membro pública)
[ max_size](<#/doc/container/flat_multiset/max_size>) | retorna o número máximo possível de elementos
(função de membro pública)

##### Modificadores

[ emplace](<#/doc/container/flat_multiset/emplace>) | constrói o elemento no local
(função de membro pública)
[ emplace_hint](<#/doc/container/flat_multiset/emplace_hint>) | constrói elementos no local usando uma dica
(função de membro pública)
[ insert](<#/doc/container/flat_multiset/insert>) | insere elementos
(função de membro pública)
[ insert_range](<#/doc/container/flat_multiset/insert_range>) | insere um range de elementos
(função de membro pública)
[ extract](<#/doc/container/flat_multiset/extract>) | extrai o container subjacente
(função de membro pública)
[ replace](<#/doc/container/flat_multiset/replace>) | substitui o container subjacente
(função de membro pública)
[ erase](<#/doc/container/flat_multiset/erase>) | apaga elementos
(função de membro pública)
[ swap](<#/doc/container/flat_multiset/swap>) | troca os conteúdos
(função de membro pública)
[ clear](<#/doc/container/flat_multiset/clear>) | limpa os conteúdos
(função de membro pública)

##### Busca

[ find](<#/doc/container/flat_multiset/find>) | encontra elemento com chave específica
(função de membro pública)
[ count](<#/doc/container/flat_multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função de membro pública)
[ contains](<#/doc/container/flat_multiset/contains>) | verifica se o container contém elemento com chave específica
(função de membro pública)
[ lower_bound](<#/doc/container/flat_multiset/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função de membro pública)
[ upper_bound](<#/doc/container/flat_multiset/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função de membro pública)
[ equal_range](<#/doc/container/flat_multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função de membro pública)

##### Observadores

[ key_comp](<#/doc/container/flat_multiset/key_comp>) | retorna a função que compara chaves
(função de membro pública)
[ value_comp](<#/doc/container/flat_multiset/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função de membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/container/flat_multiset/operator_cmp>)(C++23) | compara lexicograficamente os valores de dois `flat_multiset`s
(template de função)
[ std::swap(std::flat_multiset)](<#/doc/container/flat_multiset/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase_if(std::flat_multiset)](<#/doc/container/flat_multiset/erase_if>)(C++23) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::flat_multiset>](<#/doc/container/flat_multiset/uses_allocator>)(C++23) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### Tags

[ sorted_equivalentsorted_equivalent_t](<#/doc/container/sorted_equivalent>)(C++23) | indica que os elementos de um range estão ordenados (unicidade não é exigida)
(tag)

### [Guias de dedução](<#/doc/container/flat_multiset/deduction_guides>)

### Notas

Os tipos de membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_flat_set`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::flat_set e `std::flat_multiset`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ flat_set](<#/doc/container/flat_set>)(C++23) | adapta um container para fornecer uma coleção de chaves únicas, ordenadas por chaves
(template de classe)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(template de classe)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, hashadas por chaves
(template de classe)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão