# Algoritmos restritos (desde C++20)

C++20 fornece versões [restritas](<#/doc/language/constraints>) da maioria dos algoritmos no namespace `std::ranges`. Nesses algoritmos, um range pode ser especificado como um par [iterator](<#/doc/iterator/input_or_output_iterator>)-[sentinel](<#/doc/iterator/sentinel_for>) ou como um único argumento [`range`](<#/doc/ranges/range>), e projeções e callables ponteiro-para-membro são suportados. Além disso, os [tipos de retorno](<#/doc/algorithm/ranges>) da maioria dos algoritmos foram alterados para retornar todas as informações potencialmente úteis calculadas durante a execução do algoritmo.
  
### Objetos de função de algoritmo

Um _objeto de função de algoritmo_ (AFO), informalmente conhecido como _niebloid_, é um [objeto de ponto de customização](<#/doc/ranges/cpo>) (CPO) que é especificado como um ou mais function templates sobrecarregados. O nome desses function templates designa o objeto de função de algoritmo correspondente.

Para um objeto de função de algoritmo o, seja `S` o conjunto correspondente de function templates. Então, para qualquer sequência de argumentos args..., o(args...) é [expression-equivalent](<#/doc/language/expressions>) a s(args...), onde o resultado da busca de nome para s é o conjunto de sobrecarga `S`.

Os algoritmos restritos no namespace `std::ranges` são definidos como objetos de função de algoritmo. Como resultado:

  * Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Algoritmos restritos

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
Definido no namespace `std::ranges`
  
##### Operações de sequência não modificadoras
  
[ ranges::all_ofranges::any_ofranges::none_of](<#/doc/algorithm/ranges/all_any_none_of>)(C++20)(C++20)(C++20) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(objeto de função de algoritmo)
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um objeto de função aos primeiros N elementos de uma sequência
(objeto de função de algoritmo)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(objeto de função de algoritmo)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range é lexicograficamente menor que outro
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::find_lastranges::find_last_ifranges::find_last_if_not](<#/doc/algorithm/ranges/find_last>)(C++23)(C++23)(C++23) | encontra o último elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos
(objeto de função de algoritmo)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(objeto de função de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(objeto de função de algoritmo)
[ ranges::starts_with](<#/doc/algorithm/ranges/starts_with>)(C++23) | verifica se um range começa com outro range
(objeto de função de algoritmo)
[ ranges::ends_with](<#/doc/algorithm/ranges/ends_with>)(C++23) | verifica se um range termina com outro range
(objeto de função de algoritmo)
  
##### Operações de sequência modificadoras
  
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(objeto de função de algoritmo)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(objeto de função de algoritmo)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(objeto de função de algoritmo)
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(objeto de função de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ ranges::generate_n](<#/doc/algorithm/ranges/generate_n>)(C++20) | salva o resultado de N aplicações de uma função
(objeto de função de algoritmo)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::replaceranges::replace_if](<#/doc/algorithm/ranges/replace>)(C++20)(C++20) | substitui todos os valores que satisfazem critérios específicos por outro valor
(objeto de função de algoritmo)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(objeto de função de algoritmo)
[ ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(C++20) | troca dois ranges de elementos
(objeto de função de algoritmo)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que está invertido
(objeto de função de algoritmo)
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(objeto de função de algoritmo)
[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(objeto de função de algoritmo)
[ ranges::shift_leftranges::shift_right](<#/doc/algorithm/ranges/shift>)(C++23) | desloca elementos em um range
(objeto de função de algoritmo)
[ ranges::sample](<#/doc/algorithm/ranges/sample>)(C++20) | seleciona N elementos aleatórios de uma sequência
(objeto de função de algoritmo)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(objeto de função de algoritmo)
  
##### Operações de particionamento
  
[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range é particionado pelo predicado dado
(objeto de função de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos preservando sua ordem relativa
(objeto de função de algoritmo)
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(C++20) | localiza o ponto de partição de um range particionado
(objeto de função de algoritmo)
  
##### Operações de ordenação
  
[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(objeto de função de algoritmo)
[ ranges::is_sorted_until](<#/doc/algorithm/ranges/is_sorted_until>)(C++20) | encontra o maior subrange ordenado
(objeto de função de algoritmo)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(objeto de função de algoritmo)
[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(objeto de função de algoritmo)
[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e ordena parcialmente um range de elementos
(objeto de função de algoritmo)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(objeto de função de algoritmo)
[ ranges::nth_element](<#/doc/algorithm/ranges/nth_element>)(C++20) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(objeto de função de algoritmo)
  
##### Operações de busca binária (em ranges ordenados)
  
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(objeto de função de algoritmo)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(objeto de função de algoritmo)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(objeto de função de algoritmo)
[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(objeto de função de algoritmo)
  
##### Operações de conjunto (em ranges ordenados)
  
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados
(objeto de função de algoritmo)
[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | mescla dois ranges ordenados no local
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)
  
##### Operações de heap
  
[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior subrange que é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
  
##### Operações de mínimo/máximo
  
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(objeto de função de algoritmo)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores dados
(objeto de função de algoritmo)
[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e os maiores elementos em um range
(objeto de função de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)
  
##### Operações de permutação
  
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(C++20) | determina se uma sequência é uma permutação de outra sequência
(objeto de função de algoritmo)
[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto de função de algoritmo)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto de função de algoritmo)
  
### Operações numéricas restritas

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::iota(C++23)
(objeto de função de algoritmo)
```

  
### Operações de fold restritas

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::fold_left(C++23)
(objeto de função de algoritmo)
 ranges::fold_left_first(C++23)
(objeto de função de algoritmo)
 ranges::fold_right(C++23)
(objeto de função de algoritmo)
 ranges::fold_right_last(C++23)
(objeto de função de algoritmo)
 ranges::fold_left_with_iter(C++23)
(objeto de função de algoritmo)
 ranges::fold_left_first_with_iter(C++23)
(objeto de função de algoritmo)
```

  
### Algoritmos de memória não inicializada restritos

Definido no header `[<memory>](<#/doc/header/memory>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::uninitialized_copy(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_copy_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_fill(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_fill_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_move(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_move_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_default_construct(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_default_construct_n(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_value_construct(C++20)
(objeto de função de algoritmo)
 ranges::uninitialized_value_construct_n(C++20)
(objeto de função de algoritmo)
 ranges::destroy(C++20)
(objeto de função de algoritmo)
 ranges::destroy_n(C++20)
(objeto de função de algoritmo)
 ranges::destroy_at(C++20)
(objeto de função de algoritmo)
 ranges::construct_at(C++20)
(objeto de função de algoritmo)
```

  
### Algoritmos de números aleatórios restritos

Definido no header `[<random>](<#/doc/header/random>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::generate_random(C++26)
(objeto de função de algoritmo)
```

  
### Tipos de retorno

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`
---
Definido no namespace `std::ranges`

```cpp
 ranges::in_fun_result(C++20)
(class template)
 ranges::in_in_result(C++20)
(class template)
 ranges::in_out_result(C++20)
(class template)
 ranges::in_in_out_result(C++20)
(class template)
 ranges::in_out_out_result(C++20)
(class template)
 ranges::min_max_result(C++20)
(class template)
 ranges::in_found_result(C++20)
(class template)
 ranges::in_value_result(C++23)
(class template)
 ranges::out_value_result(C++23)
(class template)
```

  
### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | [List-initialization](<#/doc/language/list_initialization>) para algoritmos
[`__cpp_lib_ranges`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | [Biblioteca de ranges](<#/doc/ranges>) e [algoritmos restritos](<#/doc/algorithm/ranges>)
[`__cpp_lib_ranges_contains`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::ranges::contains
[`__cpp_lib_ranges_find_last`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | std::ranges::find_last
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges` [fold algorithms](<#/doc/algorithm/ranges>)
[`__cpp_lib_ranges_iota`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | std::ranges::iota
[`__cpp_lib_ranges_starts_ends_with`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | std::ranges::starts_with, std::ranges::ends_with
[`__cpp_lib_shift`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | std::shift_left, std::shift_right
[`202202L`](<#/>) | (C++23) | std::ranges::shift_left, std::ranges::shift_right
[`__cpp_lib_ranges_generate_random`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | std::ranges::generate_random
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P3136R1](<https://wg21.link/P3136R1>) | C++20 | niebloids eram permitidos serem especificados como entidades especiais diferentes de objetos de função | exigido serem especificados como objetos de função