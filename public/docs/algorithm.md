# Biblioteca de algoritmos

A biblioteca de algoritmos define funções para uma variedade de propósitos (por exemplo, busca, ordenação, contagem, manipulação) que operam em ranges de elementos. Note que um range é definido como `[`first`, `last`)` onde `last` se refere ao elemento _após_ o último elemento a ser inspecionado ou modificado.

### [Algoritmos restritos](<#/doc/algorithm/ranges>) (desde C++20)

C++20 fornece versões [restritas](<#/doc/language/constraints>) da maioria dos algoritmos no namespace `std::ranges`. Nestes algoritmos, um range pode ser especificado como um par [iterator](<#/doc/iterator/input_or_output_iterator>)-[sentinel](<#/doc/iterator/sentinel_for>) ou como um único argumento [`range`](<#/doc/ranges/range>), e projeções e callables ponteiro-para-membro são suportados. Além disso, os [tipos de retorno](<#/doc/algorithm/ranges>) da maioria dos algoritmos foram alterados para retornar todas as informações potencialmente úteis computadas durante a execução do algoritmo.
```cpp
    std::vector<int> v {7, 1, 4, 0, -1};
    std::ranges::sort(v); // algoritmo restrito
```

### Políticas de execução (desde C++17)

A maioria dos algoritmos possui sobrecargas que aceitam políticas de execução. Os algoritmos da standard library suportam várias [políticas de execução](<#/doc/algorithm/execution_policy_tag_t>), e a biblioteca fornece tipos e objetos de política de execução correspondentes. Usuários podem selecionar uma política de execução estaticamente invocando um algoritmo paralelo com um [objeto de política de execução](<#/doc/algorithm/execution_policy_tag>) do tipo correspondente.

Implementações da standard library (mas não os usuários) podem definir políticas de execução adicionais como uma extensão. A semântica de algoritmos paralelos invocados com um objeto de política de execução de tipo definido pela implementação é definida pela implementação.

Versões paralelas de algoritmos (exceto por [std::for_each](<#/doc/algorithm/for_each>) e [std::for_each_n](<#/doc/algorithm/for_each_n>)) são permitidas a fazer cópias arbitrárias de elementos de ranges, desde que ambos [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; e [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)&lt;T&gt; sejam verdadeiros, onde `T` é o tipo dos elementos.

Definido no header `[<execution>](<#/doc/header/execution>)`
---
Definido no namespace `std::execution`

```cpp
 sequenced_policyparallel_policyparallel_unsequenced_policyunsequenced_policy(C++17)(C++17)(C++17)(C++20)
(classe)
 seqparpar_unsequnseq(C++17)(C++17)(C++17)(C++20)
(constante)
Definido no namespace `std`
 is_execution_policy(C++17)
(modelo de classe)
Macro de teste de funcionalidade
`__cpp_lib_parallel_algorithm`  // (C++17)
`__cpp_lib_execution`  // (C++17)
`201902L`  // (C++20)
```

### Operações de sequência não modificadoras

#### Operações em lote

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(modelo de função)
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(function object de algoritmo)
[ for_each_n](<#/doc/algorithm/for_each_n>)(C++17) | aplica um function object aos primeiros N elementos de uma sequência
(modelo de função)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um function object aos primeiros N elementos de uma sequência
(function object de algoritmo)

#### Operações de busca

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ all_ofany_ofnone_of](<#/doc/algorithm/all_any_none_of>)(C++11)(C++11)(C++11) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(modelo de função)
[ ranges::all_ofranges::any_ofranges::none_of](<#/doc/algorithm/ranges/all_any_none_of>)(C++20)(C++20)(C++20) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(function object de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(function object de algoritmo)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(function object de algoritmo)
[ ranges::find_lastranges::find_last_ifranges::find_last_if_not](<#/doc/algorithm/ranges/find_last>)(C++23)(C++23)(C++23) | encontra o último elemento que satisfaz critérios específicos
(function object de algoritmo)
[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(function object de algoritmo)
[ find_first_of](<#/doc/algorithm/find_first_of>) | busca por qualquer um de um conjunto de elementos
(modelo de função)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | busca por qualquer um de um conjunto de elementos
(function object de algoritmo)
[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(function object de algoritmo)
[ countcount_if](<#/doc/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(function object de algoritmo)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(function object de algoritmo)
[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(function object de algoritmo)
[ search](<#/doc/algorithm/search>) | busca pela primeira ocorrência de um range de elementos
(modelo de função)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | busca pela primeira ocorrência de um range de elementos
(function object de algoritmo)
[ search_n](<#/doc/algorithm/search_n>) | busca pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | busca pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(function object de algoritmo)
[ ranges::starts_with](<#/doc/algorithm/ranges/starts_with>)(C++23) | verifica se um range começa com outro range
(function object de algoritmo)
[ ranges::ends_with](<#/doc/algorithm/ranges/ends_with>)(C++23) | verifica se um range termina com outro range
(function object de algoritmo)

#### Operações de fold (desde C++23)

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | faz um fold à esquerda de um range de elementos
(function object de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | faz um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial
(function object de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | faz um fold à direita de um range de elementos
(function object de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | faz um fold à direita de um range de elementos usando o último elemento como valor inicial
(function object de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, value)
(function object de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(function object de algoritmo)

### Operações de sequência modificadoras

#### Operações de cópia

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(function object de algoritmo)
[ copy_n](<#/doc/algorithm/copy_n>)(C++11) | copia um número de elementos para um novo local
(modelo de função)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(function object de algoritmo)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(modelo de função)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(function object de algoritmo)
[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(modelo de função)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(function object de algoritmo)
[ move_backward](<#/doc/algorithm/move_backward>)(C++11) | move um range de elementos para um novo local em ordem inversa
(modelo de função)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(function object de algoritmo)

#### Operações de troca

Definido no header `[<algorithm>](<#/doc/header/algorithm>)` `(até C++11)
---
Definido no header `[<utility>](<#/doc/header/utility>)` `(desde C++11)

```cpp
Definido no header `<string_view>`
 swap
(modelo de função)
Definido no header `<algorithm>`
 swap_ranges
(modelo de função)
 ranges::swap_ranges(C++20)
(function object de algoritmo)
 iter_swap
(modelo de função)
```

#### Operações de transformação

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(function object de algoritmo)
[ replacereplace_if](<#/doc/algorithm/replace>) | substitui todos os valores que satisfazem critérios específicos por outro valor
(modelo de função)
[ ranges::replaceranges::replace_if](<#/doc/algorithm/ranges/replace>)(C++20)(C++20) | substitui todos os valores que satisfazem critérios específicos por outro valor
(function object de algoritmo)
[ replace_copyreplace_copy_if](<#/doc/algorithm/replace_copy>) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(modelo de função)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(function object de algoritmo)

#### Operações de geração

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor dado a cada elemento em um range
(modelo de função)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(function object de algoritmo)
[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor dado a N elementos em um range
(modelo de função)
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(function object de algoritmo)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(modelo de função)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(function object de algoritmo)
[ generate_n](<#/doc/algorithm/generate_n>) | atribui os resultados de chamadas de função sucessivas a N elementos em um range
(modelo de função)
[ ranges::generate_n](<#/doc/algorithm/ranges/generate_n>)(C++20) | salva o resultado de N aplicações de uma função
(function object de algoritmo)

#### Operações de remoção

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(function object de algoritmo)
[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(modelo de função)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(function object de algoritmo)
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(function object de algoritmo)
[ unique_copy](<#/doc/algorithm/unique_copy>) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(modelo de função)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(function object de algoritmo)

#### Operações de mudança de ordem

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ reverse](<#/doc/algorithm/reverse>) | inverte a ordem dos elementos em um range
(modelo de função)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(function object de algoritmo)
[ reverse_copy](<#/doc/algorithm/reverse_copy>) | cria uma cópia de um range que está invertido
(modelo de função)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que está invertido
(function object de algoritmo)
[ rotate](<#/doc/algorithm/rotate>) | rotaciona a ordem dos elementos em um range
(modelo de função)
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(function object de algoritmo)
[ rotate_copy](<#/doc/algorithm/rotate_copy>) | copia e rotaciona um range de elementos
(modelo de função)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(function object de algoritmo)
[ shift_leftshift_right](<#/doc/algorithm/shift>)(C++20) | desloca elementos em um range
(modelo de função)
[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(até C++17)(C++11) | reordena aleatoriamente elementos em um range
(modelo de função)
[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(function object de algoritmo)
[ ranges::shift_leftranges::shift_right](<#/doc/algorithm/ranges/shift>)(C++23) | desloca elementos em um range
(function object de algoritmo)

#### Operações de amostragem

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ sample](<#/doc/algorithm/sample>)(C++17) | seleciona N elementos aleatórios de uma sequência
(modelo de função)
[ ranges::sample](<#/doc/algorithm/ranges/sample>)(C++20) | seleciona N elementos aleatórios de uma sequência
(function object de algoritmo)

### Operações de ordenação e relacionadas

#### Requisitos

Alguns algoritmos exigem que a sequência representada pelos argumentos seja “ordenada” ou “particionada”. O comportamento é indefinido se o requisito não for atendido.

Uma sequência é _ordenada em relação a um comparator comp_ se para cada iterator iter apontando para a sequência e cada inteiro não negativo n tal que iter + n[1](<#/doc/algorithm>) é um [iterator válido](<#/doc/iterator>) apontando para um elemento da sequência, comp(*(iter + n), *iter) == false[1](<#/doc/algorithm>). | (até C++20)
Uma sequência é _ordenada em relação a comp e proj_ para um comparator comp e projeção proj se para cada iterator iter apontando para a sequência e cada inteiro não negativo n tal que iter + n[1](<#/doc/algorithm>) é um iterator válido apontando para um elemento da sequência, bool([std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(iter + n)),
[std::invoke](<#/doc/utility/functional/invoke>)(proj, *iter)))[1](<#/doc/algorithm>) é falso. Uma sequência é _ordenada em relação a um comparator comp_ se a sequência é ordenada em relação a comp e [std::identity](<#/doc/utility/functional/identity>){} (a projeção identidade). | (desde C++20)

Uma sequência `[`start`, `finish`)` é _particionada em relação a uma expressão f(e)_ se existe um inteiro n tal que para todo i em `[`​0​`, `[std::distance](<#/doc/iterator/distance>)(start, finish)`)`, f(*(start + i))[1](<#/doc/algorithm>) é verdadeiro se e somente se i < n.

1.  ↑ [1.0](<#/doc/algorithm>) [1.1](<#/doc/algorithm>) [1.2](<#/doc/algorithm>) [1.3](<#/doc/algorithm>) [1.4](<#/doc/algorithm>) iter + n significa simplesmente “o resultado de iter ser incrementado n vezes”, independentemente de iter ser um iterator de acesso aleatório.

#### Operações de particionamento

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ is_partitioned](<#/doc/algorithm/is_partitioned>)(C++11) | determina se o range é particionado pelo predicado dado
(modelo de função)
[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range é particionado pelo predicado dado
(function object de algoritmo)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(modelo de função)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(function object de algoritmo)
[ partition_copy](<#/doc/algorithm/partition_copy>)(C++11) | copia um range dividindo os elementos em dois grupos
(modelo de função)
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(function object de algoritmo)
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos preservando sua ordem relativa
(modelo de função)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos preservando sua ordem relativa
(function object de algoritmo)
[ partition_point](<#/doc/algorithm/partition_point>)(C++11) | localiza o ponto de partição de um range particionado
(modelo de função)
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(C++20) | localiza o ponto de partição de um range particionado
(function object de algoritmo)

#### Operações de ordenação

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(function object de algoritmo)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(modelo de função)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(function object de algoritmo)
[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(modelo de função)
[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(function object de algoritmo)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(modelo de função)
[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e ordena parcialmente um range de elementos
(function object de algoritmo)
[ is_sorted](<#/doc/algorithm/is_sorted>)(C++11) | verifica se um range está ordenado em ordem crescente
(modelo de função)
[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(function object de algoritmo)
[ is_sorted_until](<#/doc/algorithm/is_sorted_until>)(C++11) | encontra o maior subrange ordenado
(modelo de função)
[ ranges::is_sorted_until](<#/doc/algorithm/ranges/is_sorted_until>)(C++20) | encontra o maior subrange ordenado
(function object de algoritmo)
[ nth_element](<#/doc/algorithm/nth_element>) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(modelo de função)
[ ranges::nth_element](<#/doc/algorithm/ranges/nth_element>)(C++20) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(function object de algoritmo)

#### Operações de busca binária (em ranges particionados)

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(modelo de função)
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(function object de algoritmo)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(modelo de função)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(function object de algoritmo)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)
[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(function object de algoritmo)
[ binary_search](<#/doc/algorithm/binary_search>) | determina se um elemento existe em um range parcialmente ordenado
(modelo de função)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(function object de algoritmo)

#### Operações de conjunto (em ranges ordenados)

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(function object de algoritmo)
[ set_union](<#/doc/algorithm/set_union>) | calcula a união de dois conjuntos
(modelo de função)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(function object de algoritmo)
[ set_intersection](<#/doc/algorithm/set_intersection>) | calcula a interseção de dois conjuntos
(modelo de função)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(function object de algoritmo)
[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(modelo de função)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(function object de algoritmo)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(modelo de função)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(function object de algoritmo)

#### Operações de merge (em ranges ordenados)

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ merge](<#/doc/algorithm/merge>) | faz merge de dois ranges ordenados
(modelo de função)
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | faz merge de dois ranges ordenados
(function object de algoritmo)
[ inplace_merge](<#/doc/algorithm/inplace_merge>) | faz merge de dois ranges ordenados in-place
(modelo de função)
[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | faz merge de dois ranges ordenados in-place
(function object de algoritmo)

#### Operações de heap

Um [range](<#/doc/iterator>) de acesso aleatório `[`first`, `last`)` é um _heap em relação a um comparator comp_ se bool(comp(first[(i - 1) / 2], first[i])) é falso para todo inteiro i em `(`​0​`, `last - first`)`. | (até C++20)
Um [range](<#/doc/iterator>) de acesso aleatório `[`first`, `last`)` é um _heap em relação a comp e proj_ para um comparator comp e projeção proj se bool([std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, first[(i - 1) / 2]),
[std::invoke](<#/doc/utility/functional/invoke>)(proj, first[i])) é falso para todo inteiro i em `(`​0​`, `last - first`)`. Um range de acesso aleatório `[`first`, `last`)` é um _heap em relação a um comparator comp_ se o range é um heap em relação a comp e [std::identity](<#/doc/utility/functional/identity>){} (a projeção identidade). | (desde C++20)

Um heap pode ser criado por [std::make_heap](<#/doc/algorithm/make_heap>) e [ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(desde C++20).
Para mais propriedades de heap, veja [max heap](<https://en.wikipedia.org/wiki/Binary_heap> "enwiki:Binary heap").

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(modelo de função)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(modelo de função)
[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)

#### Operações de mínimo/máximo

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores dados
(modelo de função)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(objeto de função de algoritmo)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(modelo de função)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[ min](<#/doc/algorithm/min>) | retorna o menor dos valores dados
(modelo de função)
[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores dados
(objeto de função de algoritmo)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[ minmax](<#/doc/algorithm/minmax>)(C++11) | retorna o menor e o maior de dois elementos
(modelo de função)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) | retorna os menores e os maiores elementos em um range
(modelo de função)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e os maiores elementos em um range
(objeto de função de algoritmo)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de limite
(modelo de função)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)

#### Operações de comparação lexicográfica

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(modelo de função)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range é lexicograficamente menor que outro
(objeto de função de algoritmo)
[ lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(C++20) | compara dois ranges usando comparação de três vias
(modelo de função)

#### Operações de permutação

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto de função de algoritmo)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto de função de algoritmo)
[ is_permutation](<#/doc/algorithm/is_permutation>)(C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(C++20) | determina se uma sequência é uma permutação de outra sequência
(objeto de função de algoritmo)

### Operações numéricas

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(modelo de função)
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou 'dobra' um range de elementos
(modelo de função)
[ inner_product](<#/doc/algorithm/inner_product>) | calcula o produto interno de dois ranges de elementos
(modelo de função)
[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto fora de ordem
(modelo de função)
[ exclusive_scan](<#/doc/algorithm/exclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), exclui o i-ésimo elemento de entrada da i-ésima soma
(modelo de função)
[ inclusive_scan](<#/doc/algorithm/inclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), inclui o i-ésimo elemento de entrada na i-ésima soma
(modelo de função)
[ transform_reduce](<#/doc/algorithm/transform_reduce>)(C++17) | aplica um invocável, então reduz fora de ordem
(modelo de função)
[ transform_exclusive_scan](<#/doc/algorithm/transform_exclusive_scan>)(C++17) | aplica um invocável, então calcula o exclusive scan
(modelo de função)
[ transform_inclusive_scan](<#/doc/algorithm/transform_inclusive_scan>)(C++17) | aplica um invocável, então calcula o inclusive scan
(modelo de função)

### Operações em memória não inicializada

Definido no header `[<memory>](<#/doc/header/memory>)`
---
[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | copia um range de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(C++20) | copia um range de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(C++11) | copia um número de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_copy_n](<#/doc/memory/ranges/uninitialized_copy_n>)(C++20) | copia um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) | copia um objeto para uma área de memória não inicializada, definida por um range
(modelo de função)
[ ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ ranges::uninitialized_fill_n](<#/doc/memory/ranges/uninitialized_fill_n>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ uninitialized_move](<#/doc/memory/uninitialized_move>)(C++17) | move um range de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(C++20) | move um range de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_move_n](<#/doc/memory/uninitialized_move_n>)(C++17) | move um número de objetos para uma área de memória não inicializada
(modelo de função)
[ ranges::uninitialized_move_n](<#/doc/memory/ranges/uninitialized_move_n>)(C++20) | move um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(modelo de função)
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ uninitialized_default_construct_n](<#/doc/memory/uninitialized_default_construct_n>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e contagem
(objeto de função de algoritmo)
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(modelo de função)
[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ uninitialized_value_construct_n](<#/doc/memory/uninitialized_value_construct_n>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
[ ranges::uninitialized_value_construct_n](<#/doc/memory/ranges/uninitialized_value_construct_n>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ destroy](<#/doc/memory/destroy>)(C++17) | destrói um range de objetos
(modelo de função)
[ ranges::destroy](<#/doc/memory/ranges/destroy>)(C++20) | destrói um range de objetos
(objeto de função de algoritmo)
[ destroy_n](<#/doc/memory/destroy_n>)(C++17) | destrói um número de objetos em um range
(modelo de função)
[ ranges::destroy_n](<#/doc/memory/ranges/destroy_n>)(C++20) | destrói um número de objetos em um range
(objeto de função de algoritmo)
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) | destrói um objeto em um endereço dado
(modelo de função)
[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(C++20) | destrói um objeto em um endereço dado
(objeto de função de algoritmo)
[ construct_at](<#/doc/memory/construct_at>)(C++20) | cria um objeto em um endereço dado
(modelo de função)
[ ranges::construct_at](<#/doc/memory/ranges/construct_at>)(C++20) | cria um objeto em um endereço dado
(objeto de função de algoritmo)

### Geração de números aleatórios (desde C++26)

Definido no header `[<random>](<#/doc/header/random>)`
---
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) | preenche um range com números aleatórios de um gerador de bits aleatórios uniforme
(objeto de função de algoritmo)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_iterator_requirements`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Iteradores de Ranges como entradas para algoritmos não-Ranges
[`__cpp_lib_clamp`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [std::clamp](<#/doc/algorithm/clamp>)
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | Constexpr para algoritmos
[`202306L`](<#/>) | (C++26) | Ordenação estável constexpr
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos
[`__cpp_lib_freestanding_algorithm`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Facilidades freestanding em [`<algorithm>`](<#/doc/header/algorithm>)
[`__cpp_lib_robust_nonmodifying_seq_ops`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Tornando operações de sequência não modificadoras mais robustas (sobrecargas de dois ranges para [std::mismatch](<#/doc/algorithm/mismatch>), [std::equal](<#/doc/algorithm/equal>) e std::is_permutation)
[`__cpp_lib_sample`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [std::sample](<#/doc/algorithm/sample>)
[`__cpp_lib_shift`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | std::shift_left e std::shift_right

### Biblioteca C

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`
---
[ qsort](<#/doc/algorithm/qsort>) | ordena um range de elementos com tipo não especificado
(função)
[ bsearch](<#/doc/algorithm/bsearch>) | procura em um array por um elemento de tipo não especificado
(função)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 193](<https://cplusplus.github.io/LWG/issue193>) | C++98 | heap exigia que *first fosse o maior elemento | pode haver elementos iguais a *first
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | a definição de uma sequência ordenada estava incorreta | corrigido
[LWG 2166](<https://cplusplus.github.io/LWG/issue2166>) | C++98 | o requisito de heap não correspondia à definição de [max heap](<https://en.wikipedia.org/wiki/Binary_heap> "enwiki:Binary heap") de perto o suficiente | requisito melhorado

### Veja também

[documentação C](<#/>) para Algoritmos
---