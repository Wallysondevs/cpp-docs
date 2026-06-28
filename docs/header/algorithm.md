# Cabeçalho da biblioteca padrão &lt;algorithm&gt;

Este cabeçalho faz parte da biblioteca [algorithm](<#/doc/algorithm>).

### Inclusões

---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | modelo de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

Definido no namespace `std::ranges`

##### Tipos de retorno (C++20)

[ ranges::in_fun_result](<#/doc/algorithm/ranges/return_types/in_fun_result>)(C++20) | fornece uma maneira de armazenar um iterator e um function object como uma única unidade
(modelo de classe)
[ ranges::in_in_result](<#/doc/algorithm/ranges/return_types/in_in_result>)(C++20) | fornece uma maneira de armazenar dois iterators como uma única unidade
(modelo de classe)
[ ranges::in_out_result](<#/doc/algorithm/ranges/return_types/in_out_result>)(C++20) | fornece uma maneira de armazenar dois iterators como uma única unidade
(modelo de classe)
[ ranges::in_in_out_result](<#/doc/algorithm/ranges/return_types/in_in_out_result>)(C++20) | fornece uma maneira de armazenar três iterators como uma única unidade
(modelo de classe)
[ ranges::in_out_out_result](<#/doc/algorithm/ranges/return_types/in_out_out_result>)(C++20) | fornece uma maneira de armazenar três iterators como uma única unidade
(modelo de classe)
[ ranges::min_max_result](<#/doc/algorithm/ranges/return_types/min_max_result>)(C++20) | fornece uma maneira de armazenar dois objetos ou referências do mesmo tipo como uma única unidade
(modelo de classe)
[ ranges::in_found_result](<#/doc/algorithm/ranges/return_types/in_found_result>)(C++20) | fornece uma maneira de armazenar um iterator e um flag booleano como uma única unidade
(modelo de classe)
[ ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)(C++23) | fornece uma maneira de armazenar um iterator e um valor como uma única unidade
(modelo de classe)
[ ranges::out_value_result](<#/doc/algorithm/ranges/return_types/out_value_result>)(C++23) | fornece uma maneira de armazenar um iterator e um valor como uma única unidade
(modelo de classe)

### Funções

##### Operações de sequência não modificadoras

[ all_ofany_ofnone_of](<#/doc/algorithm/all_any_none_of>)(desde C++11)(desde C++11)(desde C++11) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(modelo de função)
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(modelo de função)
[ for_each_n](<#/doc/algorithm/for_each_n>)(desde C++17) | aplica um function object aos primeiros N elementos de uma sequência
(modelo de função)
[ countcount_if](<#/doc/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(modelo de função)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(desde C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ find_first_of](<#/doc/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(modelo de função)
[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)

##### Operações de sequência modificadoras

[ copycopy_if](<#/doc/algorithm/copy>)(desde C++11) | copia um range de elementos para um novo local
(modelo de função)
[ copy_n](<#/doc/algorithm/copy_n>)(desde C++11) | copia um número de elementos para um novo local
(modelo de função)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(modelo de função)
[ move](<#/doc/algorithm/move>)(desde C++11) | move um range de elementos para um novo local
(modelo de função)
[ move_backward](<#/doc/algorithm/move_backward>)(desde C++11) | move um range de elementos para um novo local em ordem inversa
(modelo de função)
[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor dado a cada elemento em um range
(modelo de função)
[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor dado a N elementos em um range
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(modelo de função)
[ generate_n](<#/doc/algorithm/generate_n>) | atribui os resultados de chamadas de função sucessivas a N elementos em um range
(modelo de função)
[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(modelo de função)
[ replacereplace_if](<#/doc/algorithm/replace>) | substitui todos os valores que satisfazem critérios específicos por outro valor
(modelo de função)
[ replace_copyreplace_copy_if](<#/doc/algorithm/replace_copy>) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(modelo de função)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ swap_ranges](<#/doc/algorithm/swap_ranges>) | troca dois ranges de elementos
(modelo de função)
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators
(modelo de função)
[ reverse](<#/doc/algorithm/reverse>) | inverte a ordem dos elementos em um range
(modelo de função)
[ reverse_copy](<#/doc/algorithm/reverse_copy>) | cria uma cópia de um range que está invertido
(modelo de função)
[ rotate](<#/doc/algorithm/rotate>) | rotaciona a ordem dos elementos em um range
(modelo de função)
[ rotate_copy](<#/doc/algorithm/rotate_copy>) | copia e rotaciona um range de elementos
(modelo de função)
[ shift_leftshift_right](<#/doc/algorithm/shift>)(desde C++20) | desloca elementos em um range
(modelo de função)
[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(ate C++17)(desde C++11) | reordena aleatoriamente elementos em um range
(modelo de função)
[ sample](<#/doc/algorithm/sample>)(desde C++17) | seleciona N elementos aleatórios de uma sequência
(modelo de função)
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função)
[ unique_copy](<#/doc/algorithm/unique_copy>) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(modelo de função)

##### Operações de particionamento

[ is_partitioned](<#/doc/algorithm/is_partitioned>)(desde C++11) | determina se o range é particionado pelo predicado dado
(modelo de função)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(modelo de função)
[ partition_copy](<#/doc/algorithm/partition_copy>)(desde C++11) | copia um range dividindo os elementos em dois grupos
(modelo de função)
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos preservando sua ordem relativa
(modelo de função)
[ partition_point](<#/doc/algorithm/partition_point>)(desde C++11) | localiza o ponto de particionamento de um range particionado
(modelo de função)

##### Operações de ordenação

[ is_sorted](<#/doc/algorithm/is_sorted>)(desde C++11) | verifica se um range está ordenado em ordem crescente
(modelo de função)
[ is_sorted_until](<#/doc/algorithm/is_sorted_until>)(desde C++11) | encontra o maior subrange ordenado
(modelo de função)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(modelo de função)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(modelo de função)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(modelo de função)
[ nth_element](<#/doc/algorithm/nth_element>) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(modelo de função)

##### Operações de busca binária (em ranges ordenados)

[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(modelo de função)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(modelo de função)
[ binary_search](<#/doc/algorithm/binary_search>) | determina se um elemento existe em um range parcialmente ordenado
(modelo de função)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)

##### Outras operações em ranges ordenados

[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados
(modelo de função)
[ inplace_merge](<#/doc/algorithm/inplace_merge>) | mescla dois ranges ordenados no local
(modelo de função)

##### Operações de conjunto (em ranges ordenados)

[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)
[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(modelo de função)
[ set_intersection](<#/doc/algorithm/set_intersection>) | calcula a interseção de dois conjuntos
(modelo de função)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(modelo de função)
[ set_union](<#/doc/algorithm/set_union>) | calcula a união de dois conjuntos
(modelo de função)

##### Operações de heap

[ is_heap](<#/doc/algorithm/is_heap>)(desde C++11) | verifica se o range dado é um max heap
(modelo de função)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(desde C++11) | encontra o maior subrange que é um max heap
(modelo de função)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(modelo de função)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)

##### Operações de mínimo/máximo

[ max](<#/doc/algorithm/max>) | retorna o maior dos valores dados
(modelo de função)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(modelo de função)
[ min](<#/doc/algorithm/min>) | retorna o menor dos valores dados
(modelo de função)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ minmax](<#/doc/algorithm/minmax>)(desde C++11) | retorna o menor e o maior de dois elementos
(modelo de função)
[ minmax_element](<#/doc/algorithm/minmax_element>)(desde C++11) | retorna os menores e os maiores elementos em um range
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(desde C++17) | limita um valor entre um par de valores de limite
(modelo de função)

##### Operações de comparação

[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(modelo de função)
[ lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(desde C++20) | compara dois ranges usando comparação de três vias
(modelo de função)

##### Operações de permutação

[ is_permutation](<#/doc/algorithm/is_permutation>)(desde C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(modelo de função)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(modelo de função)

### Entidades tipo função (C++20)

Definido no namespace `std::ranges`

##### Operações de sequência não modificadoras

[ ranges::all_ofranges::any_ofranges::none_of](<#/doc/algorithm/ranges/all_any_none_of>)(C++20)(C++20)(C++20) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(function object de algoritmo)
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(function object de algoritmo)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um function object aos primeiros N elementos de uma sequência
(function object de algoritmo)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(function object de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(function object de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(function object de algoritmo)
[ ranges::find_lastranges::find_last_ifranges::find_last_if_not](<#/doc/algorithm/ranges/find_last>)(C++23)(C++23)(C++23) | encontra o último elemento que satisfaz critérios específicos
(function object de algoritmo)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(function object de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos
(function object de algoritmo)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(function object de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(function object de algoritmo)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(function object de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(function object de algoritmo)
[ ranges::starts_with](<#/doc/algorithm/ranges/starts_with>)(C++23) | verifica se um range começa com outro range
(function object de algoritmo)
[ ranges::ends_with](<#/doc/algorithm/ranges/ends_with>)(C++23) | verifica se um range termina com outro range
(function object de algoritmo)

##### Operações de fold

[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | faz um fold à esquerda de um range de elementos
(function object de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | faz um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial
(function object de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | faz um fold à direita de um range de elementos
(function object de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | faz um fold à direita de um range de elementos usando o último elemento como valor inicial
(function object de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos, e retorna um [pair](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, valor)
(function object de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial, e retorna um [pair](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(function object de algoritmo)

##### Operações de sequência modificadoras

[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(function object de algoritmo)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(function object de algoritmo)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(function object de algoritmo)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(function object de algoritmo)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(function object de algoritmo)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(function object de algoritmo)
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(function object de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(function object de algoritmo)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(function object de algoritmo)
[ ranges::generate_n](<#/doc/algorithm/ranges/generate_n>)(C++20) | salva o resultado de N aplicações de uma função
(function object de algoritmo)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(function object de algoritmo)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(function object de algoritmo)
[ ranges::replaceranges::replace_if](<#/doc/algorithm/ranges/replace>)(C++20)(C++20) | substitui todos os valores que satisfazem critérios específicos por outro valor
(function object de algoritmo)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(function object de algoritmo)
[ ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(C++20) | troca dois ranges de elementos
(function object de algoritmo)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(function object de algoritmo)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que está invertido
(function object de algoritmo)
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(function object de algoritmo)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(function object de algoritmo)
[ ranges::shift_leftranges::shift_right](<#/doc/algorithm/ranges/shift>)(C++23) | desloca elementos em um range
(function object de algoritmo)
[ ranges::sample](<#/doc/algorithm/ranges/sample>)(C++20) | seleciona N elementos aleatórios de uma sequência
(function object de algoritmo)
[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(function object de algoritmo)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(function object de algoritmo)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(function object de algoritmo)

##### Operações de particionamento

[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range é particionado pelo predicado dado
(function object de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(function object de algoritmo)
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(function object de algoritmo)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos preservando sua ordem relativa
(function object de algoritmo)
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(C++20) | localiza o ponto de particionamento de um range particionado
(function object de algoritmo)

##### Operações de ordenação

[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(function object de algoritmo)
[ ranges::is_sorted_until](<#/doc/algorithm/ranges/is_sorted_until>)(C++20) | encontra o maior subrange ordenado
(function object de algoritmo)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(function object de algoritmo)
[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(function object de algoritmo)
[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e ordena parcialmente um range de elementos
(function object de algoritmo)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(function object de algoritmo)
[ ranges::nth_element](<#/doc/algorithm/ranges/nth_element>)(C++20) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(function object de algoritmo)

##### Operações de busca binária (em ranges ordenados)

[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(function object de algoritmo)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(function object de algoritmo)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(function object de algoritmo)
[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(function object de algoritmo)

##### Outras operações em ranges ordenados

[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados
(function object de algoritmo)
[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | mescla dois ranges ordenados no local
(function object de algoritmo)

##### Operações de conjunto (em ranges ordenados)

[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(function object de algoritmo)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(function object de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(function object de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(function object de algoritmo)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(function object de algoritmo)

##### Operações de heap

[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(function object de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior subrange que é um max heap
(function object de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(function object de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(function object de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(function object de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(function object de algoritmo)

##### Operações de mínimo/máximo

[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(function object de algoritmo)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(function object de algoritmo)
[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores dados
(function object de algoritmo)
[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(function object de algoritmo)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(function object de algoritmo)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e os maiores elementos em um range
(function object de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(function object de algoritmo)

##### Operações de comparação

[ ranges::equal](<#/doc/algorithm/ranges/equal>)(C++20) | determina se dois conjuntos de elementos são os mesmos
(function object de algoritmo)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range é lexicograficamente menor que outro
(function object de algoritmo)
(algorithm function object)  
  
##### Operações de Permutação   
  
[ ranges::is_permutation](<#/doc/algorithm/ranges/is_permutation>)(desde C++20) | determina se uma sequência é uma permutação de outra sequência  
(algorithm function object)  
[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(desde C++20) | gera a próxima permutação lexicográfica maior de um range de elementos  
(algorithm function object)  
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(desde C++20) | gera a próxima permutação lexicográfica menor de um range de elementos  
(algorithm function object)  
  
### Sinopse
```cpp
    #include <initializer_list>
     
    namespace std {
      namespace ranges {
        // algorithm result types
        template<class I, class F>
          struct in_fun_result;
     
        template<class I1, class I2>
          struct in_in_result;
     
        template<class I, class O>
          struct in_out_result;
     
        template<class I1, class I2, class O>
          struct in_in_out_result;
     
        template<class I, class O1, class O2>
          struct in_out_out_result;
     
        template<class T>
          struct min_max_result;
     
        template<class I>
          struct in_found_result;
     
        template<class I, class T>
          struct in_value_result;
     
        template<class O, class T>
          struct out_value_result;
      }
     
      // non-modifying sequence operations
      // all of
      template<class InputIter, class Pred>
        constexpr bool all_of(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        bool all_of(ExecutionPolicy&& exec,
                    ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr bool all_of(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr bool all_of(R&& r, Pred pred, Proj proj = {});
      }
     
      // any of
      template<class InputIter, class Pred>
        constexpr bool any_of(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        bool any_of(ExecutionPolicy&& exec,
                    ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr bool any_of(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr bool any_of(R&& r, Pred pred, Proj proj = {});
      }
     
      // none of
      template<class InputIter, class Pred>
        constexpr bool none_of(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        bool none_of(ExecutionPolicy&& exec,
                     ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr bool none_of(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr bool none_of(R&& r, Pred pred, Proj proj = {});
      }
     
      // contains
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>>
          requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
          constexpr bool contains(I first, S last, const T& value, Proj proj = {});
        template<input_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>>
          requires indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T*>
          constexpr bool contains(R&& r, const T& value, Proj proj = {});
     
        template<forward_iterator I1, sentinel_for<I1> S1,
                 forward_iterator I2, sentinel_for<I2> S2,
                 class Pred = ranges::equal_to, class Proj1 = identity,
                 class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr bool contains_subrange(I1 first1, S1 last1, I2 first2, S2 last2,
                                           Pred pred = {}, Proj1 proj1 = {},
                                           Proj2 proj2 = {});
        template<forward_range R1, forward_range R2,
                 class Pred = ranges::equal_to, class Proj1 = identity,
                 class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr bool contains_subrange(R1&& r1, R2&& r2,
                                           Pred pred = {}, Proj1 proj1 = {},
                                           Proj2 proj2 = {});
      }
     
      // for each
      template<class InputIter, class Function>
        constexpr Function for_each(InputIter first, InputIter last, Function f);
      template<class ExecutionPolicy, class ForwardIter, class Function>
        void for_each(ExecutionPolicy&& exec,
                      ForwardIter first, ForwardIter last, Function f);
     
      namespace ranges {
        template<class I, class F>
          using for_each_result = in_fun_result<I, F>;
     
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirectly_unary_invocable<projected<I, Proj>> Fun>
          constexpr for_each_result<I, Fun>
            for_each(I first, S last, Fun f, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirectly_unary_invocable<projected<iterator_t<R>, Proj>> Fun>
          constexpr for_each_result<borrowed_iterator_t<R>, Fun>
            for_each(R&& r, Fun f, Proj proj = {});
      }
     
      template<class InputIter, class Size, class Function>
        constexpr InputIter for_each_n(InputIter first, Size n, Function f);
      template<class ExecutionPolicy, class ForwardIter, class Size, class Function>
        ForwardIter for_each_n(ExecutionPolicy&& exec,
                               ForwardIter first, Size n, Function f);
     
      namespace ranges {
        template<class I, class F>
          using for_each_n_result = in_fun_result<I, F>;
     
        template<input_iterator I, class Proj = identity,
                 indirectly_unary_invocable<projected<I, Proj>> Fun>
          constexpr for_each_n_result<I, Fun>
            for_each_n(I first, iter_difference_t<I> n, Fun f, Proj proj = {});
      }
     
      // find
      template<class InputIter, class T = typename iterator_traits<InputIter>::value_type>
        constexpr InputIter find(InputIter first, InputIter last, const T& value);
      template<class ExecutionPolicy, class ForwardIter,
               class T = typename iterator_traits<InputIter>::value_type>
        ForwardIter find(ExecutionPolicy&& exec,
                         ForwardIter first, ForwardIter last, const T& value);
      template<class InputIter, class Pred>
        constexpr InputIter find_if(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        ForwardIter find_if(ExecutionPolicy&& exec,
                            ForwardIter first, ForwardIter last, Pred pred);
      template<class InputIter, class Pred>
        constexpr InputIter find_if_not(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        ForwardIter find_if_not(ExecutionPolicy&& exec,
                                ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity
                 class T = projected_value_t<I, Proj>>
          requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
          constexpr I find(I first, S last, const T& value, Proj proj = {});
        template<input_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>>
          requires indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T*>
          constexpr borrowed_iterator_t<R>
            find(R&& r, const T& value, Proj proj = {});
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr I find_if(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr borrowed_iterator_t<R>
            find_if(R&& r, Pred pred, Proj proj = {});
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr I find_if_not(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr borrowed_iterator_t<R>
            find_if_not(R&& r, Pred pred, Proj proj = {});
      }
     
      // find last
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class T, class Proj = identity>
          requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
          constexpr subrange<I> find_last(I first, S last, const T& value, Proj proj = {});
        template<forward_range R, class T, class Proj = identity>
          requires
            indirect_binary_predicate<ranges::equal_to,
                projected<iterator_t<R>, Proj>, const T*>
          constexpr borrowed_subrange_t<R> find_last(R&& r, const T& value, Proj proj = {});
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr subrange<I> find_last_if(I first, S last, Pred pred, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr borrowed_subrange_t<R> find_last_if(R&& r, Pred pred, Proj proj = {});
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr subrange<I> find_last_if_not(I first, S last, Pred pred, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr borrowed_subrange_t<R> find_last_if_not(R&& r, Pred pred, Proj proj = {});
      }
     
      // find end
      template<class ForwardIter1, class ForwardIter2>
        constexpr ForwardIter1
          find_end(ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2);
      template<class ForwardIter1, class ForwardIter2, class BinaryPred>
        constexpr ForwardIter1
          find_end(ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2,
                   BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter1
          find_end(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1,
               class ForwardIter2, class BinaryPred>
        ForwardIter1
          find_end(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2,
                   BinaryPred pred);
     
      namespace ranges {
        template<forward_iterator I1, sentinel_for<I1> S1, forward_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr subrange<I1>
            find_end(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                     Proj1 proj1 = {}, Proj2 proj2 = {});
        template<forward_range R1, forward_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr borrowed_subrange_t<R1>
            find_end(R1&& r1, R2&& r2, Pred pred = {},
                     Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // find first
      template<class InputIter, class ForwardIter>
        constexpr InputIter
          find_first_of(InputIter first1, InputIter last1,
                        ForwardIter first2, ForwardIter last2);
      template<class InputIter, class ForwardIter, class BinaryPred>
        constexpr InputIter
          find_first_of(InputIter first1, InputIter last1,
                        ForwardIter first2, ForwardIter last2,
                        BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter1
          find_first_of(ExecutionPolicy&& exec,
                        ForwardIter1 first1, ForwardIter1 last1,
                        ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1,
               class ForwardIter2, class BinaryPred>
        ForwardIter1
          find_first_of(ExecutionPolicy&& exec,
                        ForwardIter1 first1, ForwardIter1 last1,
                        ForwardIter2 first2, ForwardIter2 last2,
                        BinaryPred pred);
     
      namespace ranges {
        template<input_iterator I1, sentinel_for<I1> S1, forward_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr I1 find_first_of(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                                     Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, forward_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr borrowed_iterator_t<R1>
            find_first_of(R1&& r1, R2&& r2, Pred pred = {},
                          Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // adjacent find
      template<class ForwardIter>
        constexpr ForwardIter adjacent_find(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class BinaryPred>
        constexpr ForwardIter adjacent_find(ForwardIter first, ForwardIter last,
                                            BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter adjacent_find(ExecutionPolicy&& exec,
                                  ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class BinaryPred>
        ForwardIter adjacent_find(ExecutionPolicy&& exec,
                                  ForwardIter first, ForwardIter last, BinaryPred pred);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_binary_predicate<projected<I, Proj>,
                                           projected<I, Proj>> Pred = ranges::equal_to>
          constexpr I adjacent_find(I first, S last, Pred pred = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_binary_predicate<projected<iterator_t<R>, Proj>,
                                           projected<iterator_t<R>, Proj>>
                                             Pred = ranges::equal_to>
          constexpr borrowed_iterator_t<R>
            adjacent_find(R&& r, Pred pred = {}, Proj proj = {});
      }
     
      // count
      template<class InputIter, class T = typename iterator_traits<InputIter>::value_type>
        constexpr typename iterator_traits<InputIter>::difference_type
          count(InputIter first, InputIter last, const T& value);
      template<class ExecutionPolicy, class ForwardIter,
               class T = typename iterator_traits<InputIterator>::value_type>
        typename iterator_traits<ForwardIter>::difference_type
          count(ExecutionPolicy&& exec,
                ForwardIter first, ForwardIter last, const T& value);
      template<class InputIter, class Pred>
        constexpr typename iterator_traits<InputIter>::difference_type
          count_if(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        typename iterator_traits<ForwardIter>::difference_type
          count_if(ExecutionPolicy&& exec,
                   ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>>
          requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
          constexpr iter_difference_t<I>
            count(I first, S last, const T& value, Proj proj = {});
        template<input_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>>
          requires indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T*>
          constexpr range_difference_t<R>
            count(R&& r, const T& value, Proj proj = {});
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr iter_difference_t<I>
            count_if(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr range_difference_t<R>
            count_if(R&& r, Pred pred, Proj proj = {});
      }
     
      // mismatch
      template<class InputIter1, class InputIter2>
        constexpr pair<InputIter1, InputIter2>
          mismatch(InputIter1 first1, InputIter1 last1,
                   InputIter2 first2);
      template<class InputIter1, class InputIter2, class BinaryPred>
        constexpr pair<InputIter1, InputIter2>
          mismatch(InputIter1 first1, InputIter1 last1,
                   InputIter2 first2, BinaryPred pred);
      template<class InputIter1, class InputIter2>
        constexpr pair<InputIter1, InputIter2>
          mismatch(InputIter1 first1, InputIter1 last1,
                   InputIter2 first2, InputIter2 last2);
      template<class InputIter1, class InputIter2, class BinaryPred>
        constexpr pair<InputIter1, InputIter2>
          mismatch(InputIter1 first1, InputIter1 last1,
                   InputIter2 first2, InputIter2 last2,
                   BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        pair<ForwardIter1, ForwardIter2>
          mismatch(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        pair<ForwardIter1, ForwardIter2>
          mismatch(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        pair<ForwardIter1, ForwardIter2>
          mismatch(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, InputIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        pair<ForwardIter1, ForwardIter2>
          mismatch(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2,
                   BinaryPred pred);
     
      namespace ranges {
        template<class I1, class I2>
          using mismatch_result = in_in_result<I1, I2>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity,
                 class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr mismatch_result<I1, I2>
            mismatch(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                     Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2,
                 class Pred = ranges::equal_to, class Proj1 = identity,
                 class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr mismatch_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>>
            mismatch(R1&& r1, R2&& r2, Pred pred = {},
                     Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // equal
      template<class InputIter1, class InputIter2>
        constexpr bool equal(InputIter1 first1, InputIter1 last1,
                             InputIter2 first2);
      template<class InputIter1, class InputIter2, class BinaryPred>
        constexpr bool equal(InputIter1 first1, InputIter1 last1,
                             InputIter2 first2, BinaryPred pred);
      template<class InputIter1, class InputIter2>
        constexpr bool equal(InputIter1 first1, InputIter1 last1,
                             InputIter2 first2, InputIter2 last2);
      template<class InputIter1, class InputIter2, class BinaryPred>
        constexpr bool equal(InputIter1 first1, InputIter1 last1,
                             InputIter2 first2, InputIter2 last2,
                             BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        bool equal(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        bool equal(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        bool equal(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        bool equal(ExecutionPolicy&& exec,
                   ForwardIter1 first1, ForwardIter1 last1,
                   ForwardIter2 first2, ForwardIter2 last2,
                   BinaryPred pred);
     
      namespace ranges {
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity,
                 class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr bool equal(I1 first1, S1 last1, I2 first2, S2 last2,
                               Pred pred = {},
                               Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr bool equal(R1&& r1, R2&& r2, Pred pred = {},
                               Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // is permutation
      template<class ForwardIter1, class ForwardIter2>
        constexpr bool is_permutation(ForwardIter1 first1, ForwardIter1 last1,
                                      ForwardIter2 first2);
      template<class ForwardIter1, class ForwardIter2, class BinaryPred>
        constexpr bool is_permutation(ForwardIter1 first1, ForwardIter1 last1,
                                      ForwardIter2 first2, BinaryPred pred);
      template<class ForwardIter1, class ForwardIter2>
        constexpr bool is_permutation(ForwardIter1 first1, ForwardIter1 last1,
                                      ForwardIter2 first2, ForwardIter2 last2);
      template<class ForwardIter1, class ForwardIter2, class BinaryPred>
        constexpr bool is_permutation(ForwardIter1 first1, ForwardIter1 last1,
                                      ForwardIter2 first2, ForwardIter2 last2,
                                      BinaryPred pred);
     
      namespace ranges {
        template<forward_iterator I1, sentinel_for<I1> S1, forward_iterator I2,
                 sentinel_for<I2> S2, class Proj1 = identity, class Proj2 = identity,
                 indirect_equivalence_relation<projected<I1, Proj1>,
                                               projected<I2, Proj2>> Pred = ranges::equal_to>
          constexpr bool is_permutation(I1 first1, S1 last1, I2 first2, S2 last2,
                                        Pred pred = {},
                                        Proj1 proj1 = {}, Proj2 proj2 = {});
        template<forward_range R1, forward_range R2,
                 class Proj1 = identity, class Proj2 = identity,
                 indirect_equivalence_relation<projected<iterator_t<R1>, Proj1>,
                                               projected<iterator_t<R2>, Proj2>>
                                               Pred = ranges::equal_to>
          constexpr bool is_permutation(R1&& r1, R2&& r2, Pred pred = {},
                                        Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // search
      template<class ForwardIter1, class ForwardIter2>
        constexpr ForwardIter1
          search(ForwardIter1 first1, ForwardIter1 last1,
                 ForwardIter2 first2, ForwardIter2 last2);
      template<class ForwardIter1, class ForwardIter2, class BinaryPred>
        constexpr ForwardIter1
          search(ForwardIter1 first1, ForwardIter1 last1,
                 ForwardIter2 first2, ForwardIter2 last2, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter1
          search(ExecutionPolicy&& exec,
                 ForwardIter1 first1, ForwardIter1 last1,
                 ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        ForwardIter1
          search(ExecutionPolicy&& exec,
                 ForwardIter1 first1, ForwardIter1 last1,
                 ForwardIter2 first2, ForwardIter2 last2, BinaryPred pred);
     
      namespace ranges {
        template<forward_iterator I1, sentinel_for<I1> S1, forward_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr subrange<I1>
            search(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                   Proj1 proj1 = {}, Proj2 proj2 = {});
        template<forward_range R1, forward_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr borrowed_subrange_t<R1>
            search(R1&& r1, R2&& r2, Pred pred = {},
                   Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class ForwardIter, class Size,
               class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr ForwardIter
          search_n(ForwardIter first, ForwardIter last,
                   Size count, const T& value);
      template<class ForwardIter, class Size,
               class T = typename iterator_traits<ForwardIter>::value_type, class BinaryPred>
        constexpr ForwardIter
          search_n(ForwardIter first, ForwardIter last,
                   Size count, const T& value, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter, class Size,
               class T = typename iterator_traits<ForwardIter>::value_type>
        ForwardIter
          search_n(ExecutionPolicy&& exec,
                   ForwardIter first, ForwardIter last,
                   Size count, const T& value);
      template<class ExecutionPolicy, class ForwardIter, class Size,
               class T = typename iterator_traits<ForwardIter>::value_type, class BinaryPred>
        ForwardIter
          search_n(ExecutionPolicy&& exec,
```
```cpp
                   ForwardIter first, ForwardIter last,
                   Size count, const T& value, BinaryPred pred);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S,
                 class Pred = ranges::equal_to, class Proj = identity,
                 class T = projected_value_t<I, Proj>>
          requires indirectly_comparable<I, const T*, Pred, Proj>
          constexpr subrange<I>
            search_n(I first, S last, iter_difference_t<I> count,
                     const T& value, Pred pred = {}, Proj proj = {});
        template<forward_range R, class Pred = ranges::equal_to, class Proj = identity,
                 projected_value_t<iterator_t<R>, Proj>>
          requires indirectly_comparable<iterator_t<R>, const T*, Pred, Proj>
          constexpr borrowed_subrange_t<R>
            search_n(R&& r, range_difference_t<R> count,
                     const T& value, Pred pred = {}, Proj proj = {});
      }
     
      template<class ForwardIter, class Searcher>
        constexpr ForwardIter
          search(ForwardIter first, ForwardIter last, const Searcher& searcher);
     
      namespace ranges {
        // começa com
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr bool starts_with(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                                     Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr bool starts_with(R1&& r1, R2&& r2, Pred pred = {},
                                     Proj1 proj1 = {}, Proj2 proj2 = {});
     
        // termina com
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires (forward_iterator<I1> || sized_sentinel_for<S1, I1>) &&
                   (forward_iterator<I2> || sized_sentinel_for<S2, I2>) &&
                   indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
          constexpr bool ends_with(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
                                   Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, class Pred = ranges::equal_to,
                 class Proj1 = identity, class Proj2 = identity>
          requires (forward_range<R1> || sized_range<R1>) &&
                   (forward_range<R2> || sized_range<R2>) &&
                   indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
          constexpr bool ends_with(R1&& r1, R2&& r2, Pred pred = {},
                                   Proj1 proj1 = {}, Proj2 proj2 = {});
     
        // fold
        template<class F>
        class /* flipped */ {   // apenas para exposição
          F f;                  // apenas para exposição
     
        public:
          template<class T, class U> requires invocable<F&, U, T>
          invoke_result_t<F&, U, T> operator()(T&&, U&&);
        };
     
        template<class F, class T, class I, class U>
          concept /* indirectly-binary-left-foldable-impl */ =  // apenas para exposição
            movable<T> && movable<U> &&
            convertible_to<T, U> && invocable<F&, U, iter_reference_t<I>> &&
            assignable_from<U&, invoke_result_t<F&, U, iter_reference_t<I>>>;
     
        template<class F, class T, class I>
          concept /* indirectly-binary-left-foldable */ =       // apenas para exposição
            copy_constructible<F> && indirectly_readable<I> &&
            invocable<F&, T, iter_reference_t<I>> &&
            convertible_to<invoke_result_t<F&, T, iter_reference_t<I>>,
                   decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>> &&
            /* indirectly-binary-left-foldable-impl */
                 <F, T, I, decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>>;
     
        template<class F, class T, class I>
          concept /* indirectly-binary-right-foldable */ =      // apenas para exposição
            /* indirectly-binary-left-foldable */</* flipped */<F>, T, I>;
     
        template<input_iterator I, sentinel_for<I> S, class T = iter_value_t<I>,
                 /* indirectly-binary-left-foldable */<T, I> F>
          constexpr auto fold_left(I first, S last, T init, F f);
     
        template<input_range R, class T = range_value_t<R>,
                 /* indirectly-binary-left-foldable */<T, iterator_t<R>> F>
          constexpr auto fold_left(R&& r, T init, F f);
     
        template<input_iterator I, sentinel_for<I> S,
                 /* indirectly-binary-left-foldable */<iter_value_t<I>, I> F>
          requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
          constexpr auto fold_left_first(I first, S last, F f);
     
        template<input_range R,
                 /* indirectly-binary-left-foldable */<range_value_t<R>, iterator_t<R>> F>
          requires constructible_from<range_value_t<R>, range_reference_t<R>>
          constexpr auto fold_left_first(R&& r, F f);
     
        template<bidirectional_iterator I, sentinel_for<I> S, class T = iter_value_t<I>,
                 /* indirectly-binary-right-foldable */<T, I> F>
          constexpr auto fold_right(I first, S last, T init, F f);
     
        template<bidirectional_range R, class T = range_value_t<R>,
                 /* indirectly-binary-right-foldable */<T, iterator_t<R>> F>
          constexpr auto fold_right(R&& r, T init, F f);
     
        template<bidirectional_iterator I, sentinel_for<I> S,
                 /* indirectly-binary-right-foldable */<iter_value_t<I>, I> F>
          requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
        constexpr auto fold_right_last(I first, S last, F f);
     
        template<bidirectional_range R,
                 /* indirectly-binary-right-foldable */<range_value_t<R>, iterator_t<R>> F>
          requires constructible_from<range_value_t<R>, range_reference_t<R>>
          constexpr auto fold_right_last(R&& r, F f);
     
        template<class I, class T>
          using fold_left_with_iter_result = in_value_result<I, T>;
        template<class I, class T>
          using fold_left_first_with_iter_result = in_value_result<I, T>;
     
        template<input_iterator I, sentinel_for<I> S, class T = iter_value_t<I>,
                 /* indirectly-binary-left-foldable */<T, I> F>
          constexpr /* see description */ fold_left_with_iter(I first, S last, T init, F f);
     
        template<input_range R, class T = range_value_t<R>,
                 /* indirectly-binary-left-foldable */<T, iterator_t<R>> F>
          constexpr /* see description */ fold_left_with_iter(R&& r, T init, F f);
     
        template<input_iterator I, sentinel_for<I> S,
                 /* indirectly-binary-left-foldable */<iter_value_t<I>, I> F>
          requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
          constexpr /* see description */ fold_left_first_with_iter(I first, S last, F f);
     
        template<input_range R,
                 /* indirectly-binary-left-foldable */<range_value_t<R>, iterator_t<R>> F>
          requires constructible_from<range_value_t<R>, range_reference_t<R>>
          constexpr /* see description */ fold_left_first_with_iter(R&& r, F f);
      }
     
      // operações de sequência mutáveis
      // copiar
      template<class InputIter, class OutputIter>
        constexpr OutputIter copy(InputIter first, InputIter last,
                                  OutputIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter2 copy(ExecutionPolicy&& exec,
                          ForwardIter1 first, ForwardIter1 last,
                          ForwardIter2 result);
     
      namespace ranges {
        template<class I, class O>
          using copy_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O>
          requires indirectly_copyable<I, O>
          constexpr copy_result<I, O> copy(I first, S last, O result);
        template<input_range R, weakly_incrementable O>
          requires indirectly_copyable<iterator_t<R>, O>
          constexpr copy_result<borrowed_iterator_t<R>, O> copy(R&& r, O result);
      }
     
      template<class InputIter, class Size, class OutputIter>
        constexpr OutputIter copy_n(InputIter first, Size n, OutputIter result);
      template<class ExecutionPolicy,
               class ForwardIter1, class Size, class ForwardIter2>
        ForwardIter2 copy_n(ExecutionPolicy&& exec,
                            ForwardIter1 first, Size n, ForwardIter2 result);
     
      namespace ranges {
        template<class I, class O>
          using copy_n_result = in_out_result<I, O>;
     
        template<input_iterator I, weakly_incrementable O>
          requires indirectly_copyable<I, O>
          constexpr copy_n_result<I, O> copy_n(I first, iter_difference_t<I> n, O result);
      }
     
      template<class InputIter, class OutputIter, class Pred>
        constexpr OutputIter copy_if(InputIter first, InputIter last,
                                     OutputIter result, Pred pred);
      template<class ExecutionPolicy,
               class ForwardIter1, class ForwardIter2, class Pred>
        ForwardIter2 copy_if(ExecutionPolicy&& exec,
                             ForwardIter1 first, ForwardIter1 last,
                             ForwardIter2 result, Pred pred);
     
      namespace ranges {
        template<class I, class O>
          using copy_if_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O,
                 class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
          requires indirectly_copyable<I, O>
          constexpr copy_if_result<I, O>
            copy_if(I first, S last, O result, Pred pred, Proj proj = {});
        template<input_range R, weakly_incrementable O, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires indirectly_copyable<iterator_t<R>, O>
          constexpr copy_if_result<borrowed_iterator_t<R>, O>
            copy_if(R&& r, O result, Pred pred, Proj proj = {});
      }
     
      template<class BidirectionalIter1, class BidirectionalIter2>
        constexpr BidirectionalIter2
          copy_backward(BidirectionalIter1 first, BidirectionalIter1 last,
                        BidirectionalIter2 result);
     
      namespace ranges {
        template<class I1, class I2>
          using copy_backward_result = in_out_result<I1, I2>;
     
        template<bidirectional_iterator I1, sentinel_for<I1> S1, bidirectional_iterator I2>
          requires indirectly_copyable<I1, I2>
          constexpr copy_backward_result<I1, I2>
            copy_backward(I1 first, S1 last, I2 result);
        template<bidirectional_range R, bidirectional_iterator I>
          requires indirectly_copyable<iterator_t<R>, I>
          constexpr copy_backward_result<borrowed_iterator_t<R>, I>
            copy_backward(R&& r, I result);
      }
     
      // mover
      template<class InputIter, class OutputIter>
        constexpr OutputIter move(InputIter first, InputIter last, OutputIter result);
      template<class ExecutionPolicy, class ForwardIter1,
               class ForwardIter2>
        ForwardIter2 move(ExecutionPolicy&& exec,
                          ForwardIter1 first, ForwardIter1 last, ForwardIter2 result);
     
      namespace ranges {
        template<class I, class O>
          using move_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O>
          requires indirectly_movable<I, O>
          constexpr move_result<I, O> move(I first, S last, O result);
        template<input_range R, weakly_incrementable O>
          requires indirectly_movable<iterator_t<R>, O>
          constexpr move_result<borrowed_iterator_t<R>, O> move(R&& r, O result);
      }
     
      template<class BidirectionalIter1, class BidirectionalIter2>
        constexpr BidirectionalIter2
          move_backward(BidirectionalIter1 first, BidirectionalIter1 last,
                        BidirectionalIter2 result);
     
      namespace ranges {
        template<class I1, class I2>
          using move_backward_result = in_out_result<I1, I2>;
     
        template<bidirectional_iterator I1, sentinel_for<I1> S1, bidirectional_iterator I2>
          requires indirectly_movable<I1, I2>
          constexpr move_backward_result<I1, I2>
            move_backward(I1 first, S1 last, I2 result);
        template<bidirectional_range R, bidirectional_iterator I>
          requires indirectly_movable<iterator_t<R>, I>
          constexpr move_backward_result<borrowed_iterator_t<R>, I>
            move_backward(R&& r, I result);
      }
     
      // trocar
      template<class ForwardIter1, class ForwardIter2>
        constexpr ForwardIter2 swap_ranges(ForwardIter1 first1, ForwardIter1 last1,
                                           ForwardIter2 first2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter2 swap_ranges(ExecutionPolicy&& exec,
                                 ForwardIter1 first1, ForwardIter1 last1,
                                 ForwardIter2 first2);
     
      namespace ranges {
        template<class I1, class I2>
          using swap_ranges_result = in_in_result<I1, I2>;
     
        template<input_iterator I1, sentinel_for<I1> S1,
                 input_iterator I2, sentinel_for<I2> S2>
          requires indirectly_swappable<I1, I2>
          constexpr swap_ranges_result<I1, I2>
            swap_ranges(I1 first1, S1 last1, I2 first2, S2 last2);
        template<input_range R1, input_range R2>
          requires indirectly_swappable<iterator_t<R1>, iterator_t<R2>>
          constexpr swap_ranges_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>>
            swap_ranges(R1&& r1, R2&& r2);
      }
     
      template<class ForwardIter1, class ForwardIter2>
        constexpr void iter_swap(ForwardIter1 a, ForwardIter2 b);
     
      // transformar
      template<class InputIter, class OutputIter, class UnaryOperation>
        constexpr OutputIter
          transform(InputIter first1, InputIter last1,
                    OutputIter result, UnaryOperation op);
      template<class InputIter1, class InputIter2, class OutputIter,
               class BinaryOperation>
        constexpr OutputIter
          transform(InputIter1 first1, InputIter1 last1,
                    InputIter2 first2, OutputIter result,
                    BinaryOperation binary_op);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class UnaryOperation>
        ForwardIter2
          transform(ExecutionPolicy&& exec,
                    ForwardIter1 first1, ForwardIter1 last1,
                    ForwardIter2 result, UnaryOperation op);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class BinaryOperation>
        ForwardIter
          transform(ExecutionPolicy&& exec,
                    ForwardIter1 first1, ForwardIter1 last1,
                    ForwardIter2 first2, ForwardIter result,
                    BinaryOperation binary_op);
     
      namespace ranges {
        template<class I, class O>
          using unary_transform_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O,
                 copy_constructible F, class Proj = identity>
          requires indirectly_writable<O, indirect_result_t<F&, projected<I, Proj>>>
          constexpr unary_transform_result<I, O>
            transform(I first1, S last1, O result, F op, Proj proj = {});
        template<input_range R, weakly_incrementable O,
                 copy_constructible F, class Proj = identity>
          requires
            indirectly_writable<O, indirect_result_t<F&, projected<iterator_t<R>, Proj>>>
          constexpr unary_transform_result<borrowed_iterator_t<R>, O>
            transform(R&& r, O result, F op, Proj proj = {});
     
        template<class I1, class I2, class O>
          using binary_transform_result = in_in_out_result<I1, I2, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, copy_constructible F,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_writable<O, indirect_result_t<F&, projected<I1, Proj1>,
                                                            projected<I2, Proj2>>>
          constexpr binary_transform_result<I1, I2, O>
            transform(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                      F binary_op, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 copy_constructible F, class Proj1 = identity, class Proj2 = identity>
          requires indirectly_writable
                       <O, indirect_result_t<F&, projected<iterator_t<R1>, Proj1>, 
                                             projected<iterator_t<R2>, Proj2>>>
          constexpr binary_transform_result<borrowed_iterator_t<R1>,
                                            borrowed_iterator_t<R2>, O>
            transform(R1&& r1, R2&& r2, O result,
                      F binary_op, Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // substituir
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr void replace(ForwardIter first, ForwardIter last,
                               const T& old_value, const T& new_value);
      template<class ExecutionPolicy, class ForwardIter,
               class T = typename iterator_traits<ForwardIter>::value_type>
        void replace(ExecutionPolicy&& exec,
                     ForwardIter first, ForwardIter last,
                     const T& old_value, const T& new_value);
      template<class ForwardIter, class Pred,
               class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr void replace_if(ForwardIter first, ForwardIter last,
                                  Pred pred, const T& new_value);
      template<class ExecutionPolicy, class ForwardIter, class Pred,
               class T = typename iterator_traits<ForwardIter>::value_type>
        void replace_if(ExecutionPolicy&& exec,
                        ForwardIter first, ForwardIter last,
                        Pred pred, const T& new_value);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S,
                 class Proj = identity, class T1 = projected_value_t<I, Proj>, class T2 = T1>
          requires indirectly_writable<I, const T2&> &&
                   indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T1*>
          constexpr I replace(I first, S last, const T1& old_value,
                              const T2& new_value, Proj proj = {});
        template<input_range R, class Proj = identity,
                 class T1 = projected_value_t<iterator_t<R>, Proj>, class T2 = T1>
          requires indirectly_writable<iterator_t<R>, const T2&> &&
                   indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T1*>
          constexpr borrowed_iterator_t<R> replace(R&& r, const T1& old_value,
                                                   const T2& new_value, Proj proj = {});
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          requires indirectly_writable<I, const T&>
          constexpr I replace_if(I first, S last, Pred pred,
                                 const T& new_value, Proj proj = {});
        template<input_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires indirectly_writable<iterator_t<R>, const T&>
          constexpr borrowed_iterator_t<R> replace_if(R&& r, Pred pred,
                                                      const T& new_value, Proj proj = {});
      }
     
      template<class InputIter, class OutputIter, class T>
        constexpr OutputIter replace_copy(InputIter first, InputIter last, OutputIter result,
                                          const T& old_value, const T& new_value);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2, class T>
        ForwardIter2 replace_copy(ExecutionPolicy&& exec,
                                  ForwardIter1 first, ForwardIter1 last, ForwardIter2 result,
                                  const T& old_value, const T& new_value);
      template<class InputIter, class OutputIter, class Pred,
               class T = typename iterator_traits<OutputIter>::value_type>
        constexpr OutputIter replace_copy_if(InputIter first, InputIter last,
                                             OutputIter result,
                                             Pred pred, const T& new_value);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class Pred, class T = typename iterator_traits<ForwardIter2>::value_type>
        ForwardIter2 replace_copy_if(ExecutionPolicy&& exec,
                                     ForwardIter1 first, ForwardIter1 last,
                                     ForwardIter2 result,
                                     Pred pred, const T& new_value);
     
      namespace ranges {
        template<class I, class O>
          using replace_copy_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, class O, class Proj = identity,
                 class T1 = projected_value_t<I, Proj>, class T2 = iter_value_t<O>>
          requires indirectly_copyable<I, O> &&
                   indirect_binary_predicate<ranges::equal_to,
                                             projected<I, Proj>, const T1*> &&
                   output_iterator<O, const T2&>
          constexpr replace_copy_result<I, O>
            replace_copy(I first, S last, O result, const T1& old_value,
                         const T2& new_value, Proj proj = {});
        template<input_range R, class O, class Proj = identity,
                 class T1 = projected_value_t<iterator_t<R>, Proj>,
                 class T2 = iter_value_t<O>>
          requires indirectly_copyable<iterator_t<R>, O> &&
                   indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T1*> &&
                   output_iterator<O, const T2&>
          constexpr replace_copy_result<borrowed_iterator_t<R>, O>
            replace_copy(R&& r, O result, const T1& old_value,
                         const T2& new_value, Proj proj = {});
     
        template<class I, class O>
          using replace_copy_if_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, class O, class T = iter_value_t<O>,
                 class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
          requires indirectly_copyable<I, O> && output_iterator<O, const T&>
          constexpr replace_copy_if_result<I, O>
            replace_copy_if(I first, S last, O result, Pred pred,
                            const T& new_value, Proj proj = {});
        template<input_range R, class O, class T = iter_value<O>, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires indirectly_copyable<iterator_t<R>, O> && output_iterator<O, const T&>
          constexpr replace_copy_if_result<borrowed_iterator_t<R>, O>
            replace_copy_if(R&& r, O result, Pred pred,
                            const T& new_value, Proj proj = {});
      }
     
      // preencher
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr void fill(ForwardIter first, ForwardIter last, const T& value);
      template<class ExecutionPolicy, class ForwardIter,
               class T = typename iterator_traits<ForwardIter>::value_type>
        void fill(ExecutionPolicy&& exec,
                  ForwardIter first, ForwardIter last, const T& value);
      template<class OutputIter, class Size,
               class T = typename iterator_traits<OutputIter>::value_type>
        constexpr OutputIter fill_n(OutputIter first, Size n, const T& value);
      template<class ExecutionPolicy, class ForwardIter,
               class Size, class T = typename iterator_traits<OutputIter>::value_type>
        ForwardIter fill_n(ExecutionPolicy&& exec,
                           ForwardIter first, Size n, const T& value);
     
      namespace ranges {
        template<class O, sentinel_for<O> S, class T = iter_value_t<O>>
          requires output_iterator<O, const T&>
          constexpr O fill(O first, S last, const T& value);
        template<class R, class T = range_value_t<R>>
          requires output_range<R, const T&>
          constexpr borrowed_iterator_t<R> fill(R&& r, const T& value);
        template<class O, class T = iter_value_t<O>>
          requires output_iterator<O, const T&>
          constexpr O fill_n(O first, iter_difference_t<O> n, const T& value);
      }
     
      // gerar
      template<class ForwardIter, class Generator>
        constexpr void generate(ForwardIter first, ForwardIter last, Generator gen);
      template<class ExecutionPolicy, class ForwardIter, class Generator>
        void generate(ExecutionPolicy&& exec,
                      ForwardIter first, ForwardIter last, Generator gen);
      template<class OutputIter, class Size, class Generator>
        constexpr OutputIter generate_n(OutputIter first, Size n, Generator gen);
      template<class ExecutionPolicy, class ForwardIter, class Size, class Generator>
        ForwardIter generate_n(ExecutionPolicy&& exec,
                               ForwardIter first, Size n, Generator gen);
     
      namespace ranges {
        template<input_or_output_iterator O, sentinel_for<O> S, copy_constructible F>
          requires invocable<F&> && indirectly_writable<O, invoke_result_t<F&>>
          constexpr O generate(O first, S last, F gen);
        template<class R, copy_constructible F>
          requires invocable<F&> && output_range<R, invoke_result_t<F&>>
          constexpr borrowed_iterator_t<R> generate(R&& r, F gen);
        template<input_or_output_iterator O, copy_constructible F>
          requires invocable<F&> && indirectly_writable<O, invoke_result_t<F&>>
          constexpr O generate_n(O first, iter_difference_t<O> n, F gen);
      }
     
      // remover
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr ForwardIter remove(ForwardIter first, ForwardIter last, const T& value);
      template<class ExecutionPolicy, class ForwardIter,
               class T = typename iterator_traits<ForwardIter>::value_type>
        ForwardIter remove(ExecutionPolicy&& exec,
                           ForwardIter first, ForwardIter last, const T& value);
      template<class ForwardIter, class Pred>
        constexpr ForwardIter remove_if(ForwardIter first, ForwardIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        ForwardIter remove_if(ExecutionPolicy&& exec,
                              ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>>
          requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
          constexpr subrange<I> remove(I first, S last, const T& value, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>>
          requires permutable<iterator_t<R>> &&
                   indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T*>
          constexpr borrowed_subrange_t<R> remove(R&& r, const T& value, Proj proj = {});
        template<permutable I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr subrange<I> remove_if(I first, S last, Pred pred, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> remove_if(R&& r, Pred pred, Proj proj = {});
      }
     
      template<class InputIter, class OutputIter,
               class T = typename iterator_traits<InputIter>::value_type>
        constexpr OutputIter remove_copy(InputIter first, InputIter last,
                                         OutputIter result, const T& value);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class T = typename iterator_traits<ForwardIter1>::value_type>
        ForwardIter2 remove_copy(ExecutionPolicy&& exec,
                                 ForwardIter1 first, ForwardIter1 last,
                                 ForwardIter2 result, const T& value);
      template<class InputIter, class OutputIter, class Pred>
        constexpr OutputIter remove_copy_if(InputIter first, InputIter last,
                                            OutputIter result, Pred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2, class Pred>
        ForwardIter2 remove_copy_if(ExecutionPolicy&& exec,
                                    ForwardIter1 first, ForwardIter1 last,
                                    ForwardIter2 result, Pred pred);
     
      namespace ranges {
        template<class I, class O>
          using remove_copy_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O,
                 class Proj = identity, class T = projected_value_t<I, Proj>>
          requires indirectly_copyable<I, O> &&
                   indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
```
```cpp
          constexpr remove_copy_result<I, O>
            remove_copy(I first, S last, O result, const T& value, Proj proj = {});
        template<input_range R, weakly_incrementable O, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>>
          requires indirectly_copyable<iterator_t<R>, O> &&
                   indirect_binary_predicate<ranges::equal_to,
                                             projected<iterator_t<R>, Proj>, const T*>
          constexpr remove_copy_result<borrowed_iterator_t<R>, O>
            remove_copy(R&& r, O result, const T& value, Proj proj = {});
     
        template<class I, class O>
          using remove_copy_if_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S, weakly_incrementable O,
                 class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
          requires indirectly_copyable<I, O>
          constexpr remove_copy_if_result<I, O>
            remove_copy_if(I first, S last, O result, Pred pred, Proj proj = {});
        template<input_range R, weakly_incrementable O, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires indirectly_copyable<iterator_t<R>, O>
          constexpr remove_copy_if_result<borrowed_iterator_t<R>, O>
            remove_copy_if(R&& r, O result, Pred pred, Proj proj = {});
      }
     
      // único
      template<class ForwardIter>
        constexpr ForwardIter unique(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class BinaryPred>
        constexpr ForwardIter unique(ForwardIter first, ForwardIter last, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter unique(ExecutionPolicy&& exec,
                           ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class BinaryPred>
        ForwardIter unique(ExecutionPolicy&& exec,
                           ForwardIter first, ForwardIter last, BinaryPred pred);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S, class Proj = identity,
                 indirect_equivalence_relation<projected<I, Proj>> C = ranges::equal_to>
          constexpr subrange<I> unique(I first, S last, C comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_equivalence_relation
                     <projected<iterator_t<R>, Proj>> C = ranges::equal_to>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> unique(R&& r, C comp = {}, Proj proj = {});
      }
     
      template<class InputIter, class OutputIter>
        constexpr OutputIter unique_copy(InputIter first, InputIter last,
                                         OutputIter result);
      template<class InputIter, class OutputIter, class BinaryPred>
        constexpr OutputIter unique_copy(InputIter first, InputIter last,
                                         OutputIter result, BinaryPred pred);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter2 unique_copy(ExecutionPolicy&& exec,
                                 ForwardIter1 first, ForwardIter1 last,
                                 ForwardIter2 result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class BinaryPred>
        ForwardIter2 unique_copy(ExecutionPolicy&& exec,
                                 ForwardIter1 first, ForwardIter1 last,
                                 ForwardIter2 result, BinaryPred pred);
     
      namespace ranges {
        template<class I, class O>
          using unique_copy_result = in_out_result<I, O>;
     
        template<input_iterator I, sentinel_for<I> S,
                 weakly_incrementable O, class Proj = identity,
                 indirect_equivalence_relation<projected<I, Proj>> C = ranges::equal_to>
          requires indirectly_copyable<I, O> &&
                   (forward_iterator<I> ||
                    (input_iterator<O> && same_as<iter_value_t<I>, iter_value_t<O>>) ||
                    indirectly_copyable_storable<I, O>)
          constexpr unique_copy_result<I, O>
            unique_copy(I first, S last, O result, C comp = {}, Proj proj = {});
        template<input_range R, weakly_incrementable O, class Proj = identity,
                 indirect_equivalence_relation
                     <projected<iterator_t<R>, Proj>> C = ranges::equal_to>
          requires indirectly_copyable<iterator_t<R>, O> &&
                   (forward_iterator<iterator_t<R>> ||
                    (input_iterator<O> && same_as<range_value_t<R>, iter_value_t<O>>) ||
                    indirectly_copyable_storable<iterator_t<R>, O>)
          constexpr unique_copy_result<borrowed_iterator_t<R>, O>
            unique_copy(R&& r, O result, C comp = {}, Proj proj = {});
      }
     
      // inverter
      template<class BidirectionalIter>
        constexpr void reverse(BidirectionalIter first, BidirectionalIter last);
      template<class ExecutionPolicy, class BidirectionalIter>
        void reverse(ExecutionPolicy&& exec,
                     BidirectionalIter first, BidirectionalIter last);
     
      namespace ranges {
        template<bidirectional_iterator I, sentinel_for<I> S>
          requires permutable<I>
          constexpr I reverse(I first, S last);
        template<bidirectional_range R>
          requires permutable<iterator_t<R>>
          constexpr borrowed_iterator_t<R> reverse(R&& r);
      }
     
      template<class BidirectionalIter, class OutputIter>
        constexpr OutputIter reverse_copy(BidirectionalIter first, BidirectionalIter last,
                                          OutputIter result);
      template<class ExecutionPolicy, class BidirectionalIter, class ForwardIter>
        ForwardIter reverse_copy(ExecutionPolicy&& exec,
                                 BidirectionalIter first, BidirectionalIter last,
                                 ForwardIter result);
     
      namespace ranges {
        template<class I, class O>
          using reverse_copy_result = in_out_result<I, O>;
     
        template<bidirectional_iterator I, sentinel_for<I> S, weakly_incrementable O>
          requires indirectly_copyable<I, O>
          constexpr reverse_copy_result<I, O>
            reverse_copy(I first, S last, O result);
        template<bidirectional_range R, weakly_incrementable O>
          requires indirectly_copyable<iterator_t<R>, O>
          constexpr reverse_copy_result<borrowed_iterator_t<R>, O>
            reverse_copy(R&& r, O result);
      }
     
      // rotacionar
      template<class ForwardIter>
        constexpr ForwardIter rotate(ForwardIter first, ForwardIter middle, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter rotate(ExecutionPolicy&& exec,
                           ForwardIter first, ForwardIter middle, ForwardIter last);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S>
          constexpr subrange<I> rotate(I first, I middle, S last);
        template<forward_range R>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> rotate(R&& r, iterator_t<R> middle);
      }
     
      template<class ForwardIter, class OutputIter>
        constexpr OutputIter rotate_copy(ForwardIter first, ForwardIter middle,
                                         ForwardIter last, OutputIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        ForwardIter2 rotate_copy(ExecutionPolicy&& exec,
                                 ForwardIter1 first, ForwardIter1 middle,
                                 ForwardIter1 last, ForwardIter2 result);
     
      namespace ranges {
        template<class I, class O>
          using rotate_copy_result = in_out_result<I, O>;
     
        template<forward_iterator I, sentinel_for<I> S, weakly_incrementable O>
          requires indirectly_copyable<I, O>
          constexpr rotate_copy_result<I, O>
            rotate_copy(I first, I middle, S last, O result);
        template<forward_range R, weakly_incrementable O>
          requires indirectly_copyable<iterator_t<R>, O>
          constexpr rotate_copy_result<borrowed_iterator_t<R>, O>
            rotate_copy(R&& r, iterator_t<R> middle, O result);
      }
     
      // amostra
      template<class PopulationIter, class SampleIter,
               class Distance, class UniformRandomBitGenerator>
        SampleIter sample(PopulationIter first, PopulationIter last,
                          SampleIter out, Distance n, UniformRandomBitGenerator&& g);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S,
                 weakly_incrementable O, class Gen>
          requires (forward_iterator<I> || random_access_iterator<O>) &&
                   indirectly_copyable<I, O> &&
                   uniform_random_bit_generator<remove_reference_t<Gen>>
          O sample(I first, S last, O out, iter_difference_t<I> n, Gen&& g);
        template<input_range R, weakly_incrementable O, class Gen>
          requires (forward_range<R> || random_access_iterator<O>) &&
                   indirectly_copyable<iterator_t<R>, O> &&
                   uniform_random_bit_generator<remove_reference_t<Gen>>
          O sample(R&& r, O out, range_difference_t<R> n, Gen&& g);
      }
     
      // embaralhar
      template<class RandomAccessIter, class UniformRandomBitGenerator>
        void shuffle(RandomAccessIter first, RandomAccessIter last,
                     UniformRandomBitGenerator&& g);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S, class Gen>
          requires permutable<I> &&
                   uniform_random_bit_generator<remove_reference_t<Gen>>
          I shuffle(I first, S last, Gen&& g);
        template<random_access_range R, class Gen>
          requires permutable<iterator_t<R>> &&
                   uniform_random_bit_generator<remove_reference_t<Gen>>
          borrowed_iterator_t<R> shuffle(R&& r, Gen&& g);
      }
     
      // deslocar
      template<class ForwardIter>
        constexpr ForwardIter
          shift_left(ForwardIter first, ForwardIter last,
                     typename iterator_traits<ForwardIter>::difference_type n);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter
          shift_left(ExecutionPolicy&& exec,
                     ForwardIter first, ForwardIter last,
                     typename iterator_traits<ForwardIter>::difference_type n);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S>
          constexpr subrange<I> shift_left(I first, S last, iter_difference_t<I> n);
        template<forward_range R>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> shift_left(R&& r, range_difference_t<R> n);
      }
     
      template<class ForwardIter>
        constexpr ForwardIter
          shift_right(ForwardIter first, ForwardIter last,
                      typename iterator_traits<ForwardIter>::difference_type n);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter
          shift_right(ExecutionPolicy&& exec,
                      ForwardIter first, ForwardIter last,
                      typename iterator_traits<ForwardIter>::difference_type n);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S>
          constexpr subrange<I> shift_right(I first, S last, iter_difference_t<I> n);
        template<forward_range R>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> shift_right(R&& r, range_difference_t<R> n);
      }
     
      // ordenação e operações relacionadas
      // ordenação
      template<class RandomAccessIter>
        constexpr void sort(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void sort(RandomAccessIter first, RandomAccessIter last, Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        void sort(ExecutionPolicy&& exec,
                  RandomAccessIter first, RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        void sort(ExecutionPolicy&& exec,
                  RandomAccessIter first, RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I sort(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R> sort(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        void stable_sort(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        void stable_sort(RandomAccessIter first, RandomAccessIter last, Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        void stable_sort(ExecutionPolicy&& exec,
                         RandomAccessIter first, RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        void stable_sort(ExecutionPolicy&& exec,
                         RandomAccessIter first, RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = identity>
          requires sortable<I, Comp, Proj>
          I stable_sort(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          borrowed_iterator_t<R> stable_sort(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr void partial_sort(RandomAccessIter first, RandomAccessIter middle,
                                    RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void partial_sort(RandomAccessIter first, RandomAccessIter middle,
                                    RandomAccessIter last, Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        void partial_sort(ExecutionPolicy&& exec,
                          RandomAccessIter first, RandomAccessIter middle,
                          RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        void partial_sort(ExecutionPolicy&& exec,
                          RandomAccessIter first, RandomAccessIter middle,
                          RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I
            partial_sort(I first, I middle, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R>
            partial_sort(R&& r, iterator_t<R> middle, Comp comp = {}, Proj proj = {});
      }
     
      template<class InputIter, class RandomAccessIter>
        constexpr RandomAccessIter
          partial_sort_copy(InputIter first, InputIter last,
                            RandomAccessIter result_first,
                            RandomAccessIter result_last);
      template<class InputIter, class RandomAccessIter, class Compare>
        constexpr RandomAccessIter
          partial_sort_copy(InputIter first, InputIter last,
                            RandomAccessIter result_first,
                            RandomAccessIter result_last, Compare comp);
      template<class ExecutionPolicy, class ForwardIter, class RandomAccessIter>
        RandomAccessIter
          partial_sort_copy(ExecutionPolicy&& exec,
                            ForwardIter first, ForwardIter last,
                            RandomAccessIter result_first,
                            RandomAccessIter result_last);
      template<class ExecutionPolicy, class ForwardIter, class RandomAccessIter,
               class Compare>
        RandomAccessIter
          partial_sort_copy(ExecutionPolicy&& exec,
                            ForwardIter first, ForwardIter last,
                            RandomAccessIter result_first,
                            RandomAccessIter result_last, Compare comp);
     
      namespace ranges {
        template<class I, class O>
          using partial_sort_copy_result = in_out_result<I, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1,
                 random_access_iterator I2, sentinel_for<I2> S2,
                 class Comp = ranges::less, class Proj1 = identity, class Proj2 = identity>
          requires indirectly_copyable<I1, I2> && sortable<I2, Comp, Proj2> &&
                   indirect_strict_weak_order<Comp, projected<I1, Proj1>,
                                              projected<I2, Proj2>>
          constexpr partial_sort_copy_result<I1, I2>
            partial_sort_copy(I1 first, S1 last, I2 result_first, S2 result_last,
                              Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, random_access_range R2, class Comp = ranges::less,
                 class Proj1 = identity, class Proj2 = identity>
          requires indirectly_copyable<iterator_t<R1>, iterator_t<R2>> &&
                   sortable<iterator_t<R2>, Comp, Proj2> &&
                   indirect_strict_weak_order<Comp, projected<iterator_t<R1>, Proj1>,
                                              projected<iterator_t<R2>, Proj2>>
          constexpr partial_sort_copy_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>>
            partial_sort_copy(R1&& r, R2&& result_r, Comp comp = {},
                              Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class ForwardIter>
        constexpr bool is_sorted(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class Compare>
        constexpr bool is_sorted(ForwardIter first, ForwardIter last, Compare comp);
      template<class ExecutionPolicy, class ForwardIter>
        bool is_sorted(ExecutionPolicy&& exec,
                       ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class Compare>
        bool is_sorted(ExecutionPolicy&& exec,
                       ForwardIter first, ForwardIter last, Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
          constexpr bool is_sorted(I first, S last, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr bool is_sorted(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter>
        constexpr ForwardIter is_sorted_until(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class Compare>
        constexpr ForwardIter is_sorted_until(ForwardIter first, ForwardIter last,
                                              Compare comp);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter is_sorted_until(ExecutionPolicy&& exec,
                                    ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class Compare>
        ForwardIter is_sorted_until(ExecutionPolicy&& exec,
                                    ForwardIter first, ForwardIter last,
                                    Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
          constexpr I is_sorted_until(I first, S last, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr borrowed_iterator_t<R>
            is_sorted_until(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      // N-ésimo elemento
      template<class RandomAccessIter>
        constexpr void nth_element(RandomAccessIter first, RandomAccessIter nth,
                                   RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void nth_element(RandomAccessIter first, RandomAccessIter nth,
                                   RandomAccessIter last, Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        void nth_element(ExecutionPolicy&& exec,
                         RandomAccessIter first, RandomAccessIter nth,
                         RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        void nth_element(ExecutionPolicy&& exec,
                         RandomAccessIter first, RandomAccessIter nth,
                         RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I
            nth_element(I first, I nth, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R>
            nth_element(R&& r, iterator_t<R> nth, Comp comp = {}, Proj proj = {});
      }
     
      // busca binária
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr ForwardIter lower_bound(ForwardIter first, ForwardIter last,
                                          const T& value);
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type,
               class Compare>
        constexpr ForwardIter lower_bound(ForwardIter first, ForwardIter last,
                                          const T& value, Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>,
                 indirect_strict_weak_order<const T*, projected<I, Proj>> Comp = ranges::less>
          constexpr I
              lower_bound(I first, S last, const T& value, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>,
                 indirect_strict_weak_order
                     <const T*, projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr borrowed_iterator_t<R>
            lower_bound(R&& r, const T& value, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr ForwardIter upper_bound(ForwardIter first, ForwardIter last,
                                          const T& value);
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type,
               class Compare>
        constexpr ForwardIter upper_bound(ForwardIter first, ForwardIter last,
                                          const T& value, Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>,
                 indirect_strict_weak_order<const T*, projected<I, Proj>> Comp = ranges::less>
          constexpr I
              upper_bound(I first, S last, const T& value, Comp comp = {}, Proj proj = {});
        template<forward_range R, class T, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>,
                 indirect_strict_weak_order
                     <const T*, projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr borrowed_iterator_t<R>
            upper_bound(R&& r, const T& value, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr pair<ForwardIter, ForwardIter>
          equal_range(ForwardIter first, ForwardIter last, const T& value);
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type,
               class Compare>
        constexpr pair<ForwardIter, ForwardIter>
          equal_range(ForwardIter first, ForwardIter last, const T& value, Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>,
                 indirect_strict_weak_order<const T*, projected<I, Proj>> Comp = ranges::less>
          constexpr subrange<I>
            equal_range(I first, S last, const T& value, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>,
                 indirect_strict_weak_order
                     <const T*, projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr borrowed_subrange_t<R>
            equal_range(R&& r, const T& value, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type>
        constexpr bool binary_search(ForwardIter first, ForwardIter last,
                                     const T& value);
      template<class ForwardIter, class T = typename iterator_traits<ForwardIter>::value_type,
               class Compare>
        constexpr bool binary_search(ForwardIter first, ForwardIter last,
                                     const T& value, Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 class T = projected_value_t<I, Proj>,
                 indirect_strict_weak_order<const T*, projected<I, Proj>> Comp = ranges::less>
          constexpr bool binary_search(I first, S last, const T& value,
                                       Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 class T = projected_value_t<iterator_t<R>, Proj>,
                 indirect_strict_weak_order
                     <const T*, projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr bool binary_search(R&& r, const T& value, Comp comp = {}, Proj proj = {});
      }
     
      // partições
      template<class InputIter, class Pred>
        constexpr bool is_partitioned(InputIter first, InputIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        bool is_partitioned(ExecutionPolicy&& exec,
                            ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<input_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr bool is_partitioned(I first, S last, Pred pred, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          constexpr bool is_partitioned(R&& r, Pred pred, Proj proj = {});
      }
     
      template<class ForwardIter, class Pred>
        constexpr ForwardIter partition(ForwardIter first, ForwardIter last, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class Pred>
        ForwardIter partition(ExecutionPolicy&& exec,
                              ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<permutable I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          constexpr subrange<I> partition(I first, S last, Pred pred, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
          requires permutable<iterator_t<R>>
          constexpr borrowed_subrange_t<R> partition(R&& r, Pred pred, Proj proj = {});
      }
     
      template<class BidirectionalIter, class Pred>
        BidirectionalIter stable_partition(BidirectionalIter first,
                                           BidirectionalIter last, Pred pred);
      template<class ExecutionPolicy, class BidirectionalIter, class Pred>
        BidirectionalIter stable_partition(ExecutionPolicy&& exec,
                                           BidirectionalIter first,
                                           BidirectionalIter last, Pred pred);
     
      namespace ranges {
        template<bidirectional_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<projected<I, Proj>> Pred>
          requires permutable<I>
          subrange<I> stable_partition(I first, S last, Pred pred, Proj proj = {});
        template<bidirectional_range R, class Proj = identity,
                 indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
```
          requires permutable<iterator_t<R>>
          borrowed_subrange_t<R> stable_partition(R&& r, Pred pred, Proj proj = {});
      }
     
      template<class InputIter, class OutputIter1,
               class OutputIter2, class Pred>
        constexpr pair<OutputIter1, OutputIter2>
          partition_copy(InputIter first, InputIter last,
                         OutputIter1 out_true, OutputIter2 out_false, Pred pred);
      template<class ExecutionPolicy, class ForwardIter, class ForwardIter1,
               class ForwardIter2, class Pred>
        pair<ForwardIter1, ForwardIter2>
          partition_copy(ExecutionPolicy&& exec,
                         ForwardIter first, ForwardIter last,
                         ForwardIter1 out_true, ForwardIter2 out_false, Pred pred);
     
      namespace ranges {
        template<class I, class O1, class O2>
          using partition_copy_result = in_out_out_result<I, O1, O2>;
     
        template<input_iterator I, sentinel_for<I> S,
                 weakly_incrementable O1, weakly_incrementable O2,
                 class Proj = identity, indirect_unary_predicate<[projected](<#/doc/iterator/projected>)<I, Proj>> Pred>
          requires indirectly_copyable<I, O1> && indirectly_copyable<I, O2>
          constexpr partition_copy_result<I, O1, O2>
            partition_copy(I first, S last, O1 out_true, O2 out_false,
                           Pred pred, Proj proj = {});
        template<input_range R, weakly_incrementable O1, weakly_incrementable O2,
                 class Proj = identity,
                 indirect_unary_predicate<[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Pred>
          requires indirectly_copyable<iterator_t<R>, O1> &&
                   indirectly_copyable<iterator_t<R>, O2>
          constexpr partition_copy_result<borrowed_iterator_t<R>, O1, O2>
            partition_copy(R&& r, O1 out_true, O2 out_false, Pred pred, Proj proj = {});
      }
     
      template<class ForwardIter, class Pred>
        constexpr ForwardIter
          partition_point(ForwardIter first, ForwardIter last, Pred pred);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_unary_predicate<[projected](<#/doc/iterator/projected>)<I, Proj>> Pred>
          constexpr I partition_point(I first, S last, Pred pred, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_unary_predicate<[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Pred>
          constexpr borrowed_iterator_t<R>
            partition_point(R&& r, Pred pred, Proj proj = {});
      }
     
      // mesclar
      template<class InputIter1, class InputIter2, class OutputIter>
        constexpr OutputIter merge(InputIter1 first1, InputIter1 last1,
                                   InputIter2 first2, InputIter2 last2, OutputIter result);
      template<class InputIter1, class InputIter2, class OutputIter,
               class Compare>
        constexpr OutputIter merge(InputIter1 first1, InputIter1 last1,
                                   InputIter2 first2, InputIter2 last2,
                                   OutputIter result, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter>
        ForwardIter merge(ExecutionPolicy&& exec,
                          ForwardIter1 first1, ForwardIter1 last1,
                          ForwardIter2 first2, ForwardIter2 last2, ForwardIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class Compare>
        ForwardIter merge(ExecutionPolicy&& exec,
                          ForwardIter1 first1, ForwardIter1 last1,
                          ForwardIter2 first2, ForwardIter2 last2,
                          ForwardIter result, Compare comp);
     
      namespace ranges {
        template<class I1, class I2, class O>
          using merge_result = in_in_out_result<I1, I2, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, class Comp = [ranges::less](<#/>),
                 class Proj1 = identity, class Proj2 = identity>
          requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
          constexpr merge_result<I1, I2, O>
            merge(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                  Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 class Comp = [ranges::less](<#/>), class Proj1 = identity, class Proj2 = identity>
          requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
          constexpr merge_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>, O>
            merge(R1&& r1, R2&& r2, O result,
                  Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class BidirectionalIter>
        void inplace_merge(BidirectionalIter first, BidirectionalIter middle,
                           BidirectionalIter last);
      template<class BidirectionalIter, class Compare>
        void inplace_merge(BidirectionalIter first, BidirectionalIter middle,
                           BidirectionalIter last, Compare comp);
      template<class ExecutionPolicy, class BidirectionalIter>
        void inplace_merge(ExecutionPolicy&& exec,
                           BidirectionalIter first, BidirectionalIter middle,
                           BidirectionalIter last);
      template<class ExecutionPolicy, class BidirectionalIter, class Compare>
        void inplace_merge(ExecutionPolicy&& exec,
                           BidirectionalIter first, BidirectionalIter middle,
                           BidirectionalIter last, Compare comp);
     
      namespace ranges {
        template<bidirectional_iterator I, sentinel_for<I> S,
                 class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<I, Comp, Proj>
          I inplace_merge(I first, I middle, S last, Comp comp = {}, Proj proj = {});
        template<bidirectional_range R, class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          borrowed_iterator_t<R> inplace_merge(R&& r, iterator_t<R> middle,
                                               Comp comp = {}, Proj proj = {});
      }
     
      // operações de conjunto
      template<class InputIter1, class InputIter2>
        constexpr bool includes(InputIter1 first1, InputIter1 last1,
                                InputIter2 first2, InputIter2 last2);
      template<class InputIter1, class InputIter2, class Compare>
        constexpr bool includes(InputIter1 first1, InputIter1 last1,
                                InputIter2 first2, InputIter2 last2, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        bool includes(ExecutionPolicy&& exec,
                      ForwardIter1 first1, ForwardIter1 last1,
                      ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2, class Compare>
        bool includes(ExecutionPolicy&& exec,
                      ForwardIter1 first1, ForwardIter1 last1,
                      ForwardIter2 first2, ForwardIter2 last2, Compare comp);
     
      namespace ranges {
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Proj1 = identity, class Proj2 = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<I1, Proj1>, [projected](<#/doc/iterator/projected>)<I2, Proj2>> Comp = [ranges::less](<#/>)>
          constexpr bool includes(I1 first1, S1 last1, I2 first2, S2 last2, Comp comp = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2,
                 class Proj1 = identity, class Proj2 = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R1>, Proj1>,
                      [projected](<#/doc/iterator/projected>)<iterator_t<R2>, Proj2>> Comp = [ranges::less](<#/>)>
          constexpr bool includes(R1&& r1, R2&& r2, Comp comp = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class InputIter1, class InputIter2, class OutputIter>
        constexpr OutputIter set_union(InputIter1 first1, InputIter1 last1,
                                       InputIter2 first2, InputIter2 last2,
                                       OutputIter result);
      template<class InputIter1, class InputIter2, class OutputIter, class Compare>
        constexpr OutputIter set_union(InputIter1 first1, InputIter1 last1,
                                       InputIter2 first2, InputIter2 last2,
                                       OutputIter result, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter>
        ForwardIter set_union(ExecutionPolicy&& exec,
                              ForwardIter1 first1, ForwardIter1 last1,
                              ForwardIter2 first2, ForwardIter2 last2,
                              ForwardIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class Compare>
        ForwardIter set_union(ExecutionPolicy&& exec,
                              ForwardIter1 first1, ForwardIter1 last1,
                              ForwardIter2 first2, ForwardIter2 last2,
                              ForwardIter result, Compare comp);
     
      namespace ranges {
        template<class I1, class I2, class O>
          using set_union_result = in_in_out_result<I1, I2, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, class Comp = [ranges::less](<#/>),
                 class Proj1 = identity, class Proj2 = identity>
          requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
          constexpr set_union_result<I1, I2, O>
            set_union(I1 first1, S1 last1, I2 first2, S2 last2, O result, Comp comp = {},
                      Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 class Comp = [ranges::less](<#/>), class Proj1 = identity, class Proj2 = identity>
          requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
          constexpr set_union_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>, O>
            set_union(R1&& r1, R2&& r2, O result, Comp comp = {},
                      Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class InputIter1, class InputIter2, class OutputIter>
        constexpr OutputIter set_intersection(InputIter1 first1, InputIter1 last1,
                                              InputIter2 first2, InputIter2 last2,
                                              OutputIter result);
      template<class InputIter1, class InputIter2, class OutputIter, class Compare>
        constexpr OutputIter set_intersection(InputIter1 first1, InputIter1 last1,
                                              InputIter2 first2, InputIter2 last2,
                                              OutputIter result, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter>
        ForwardIter set_intersection(ExecutionPolicy&& exec,
                                     ForwardIter1 first1, ForwardIter1 last1,
                                     ForwardIter2 first2, ForwardIter2 last2,
                                     ForwardIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class Compare>
        ForwardIter set_intersection(ExecutionPolicy&& exec,
                                     ForwardIter1 first1, ForwardIter1 last1,
                                     ForwardIter2 first2, ForwardIter2 last2,
                                     ForwardIter result, Compare comp);
     
      namespace ranges {
        template<class I1, class I2, class O>
          using set_intersection_result = in_in_out_result<I1, I2, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, class Comp = [ranges::less](<#/>),
                 class Proj1 = identity, class Proj2 = identity>
          requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
          constexpr set_intersection_result<I1, I2, O>
            set_intersection(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                             Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 class Comp = [ranges::less](<#/>), class Proj1 = identity, class Proj2 = identity>
          requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
          constexpr set_intersection_result<borrowed_iterator_t<R1>,
                                            borrowed_iterator_t<R2>, O>
            set_intersection(R1&& r1, R2&& r2, O result,
                             Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class InputIter1, class InputIter2, class OutputIter>
        constexpr OutputIter set_difference(InputIter1 first1, InputIter1 last1,
                                            InputIter2 first2, InputIter2 last2,
                                            OutputIter result);
      template<class InputIter1, class InputIter2, class OutputIter, class Compare>
        constexpr OutputIter set_difference(InputIter1 first1, InputIter1 last1,
                                            InputIter2 first2, InputIter2 last2,
                                            OutputIter result, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter>
        ForwardIter set_difference(ExecutionPolicy&& exec,
                                   ForwardIter1 first1, ForwardIter1 last1,
                                   ForwardIter2 first2, ForwardIter2 last2,
                                   ForwardIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class Compare>
        ForwardIter set_difference(ExecutionPolicy&& exec,
                                   ForwardIter1 first1, ForwardIter1 last1,
                                   ForwardIter2 first2, ForwardIter2 last2,
                                   ForwardIter result, Compare comp);
     
      namespace ranges {
        template<class I, class O>
          using set_difference_result = in_out_result<I, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, class Comp = [ranges::less](<#/>),
                 class Proj1 = identity, class Proj2 = identity>
          requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
          constexpr set_difference_result<I1, O>
            set_difference(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                           Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 class Comp = [ranges::less](<#/>), class Proj1 = identity, class Proj2 = identity>
          requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
          constexpr set_difference_result<borrowed_iterator_t<R1>, O>
            set_difference(R1&& r1, R2&& r2, O result,
                           Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      template<class InputIter1, class InputIter2, class OutputIter>
        constexpr OutputIter set_symmetric_difference(InputIter1 first1, InputIter1 last1,
                                                      InputIter2 first2, InputIter2 last2,
                                                      OutputIter result);
      template<class InputIter1, class InputIter2, class OutputIter, class Compare>
        constexpr OutputIter set_symmetric_difference(InputIter1 first1, InputIter1 last1,
                                                      InputIter2 first2, InputIter2 last2,
                                                      OutputIter result, Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter>
        ForwardIter set_symmetric_difference(ExecutionPolicy&& exec,
                                             ForwardIter1 first1, ForwardIter1 last1,
                                             ForwardIter2 first2, ForwardIter2 last2,
                                             ForwardIter result);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class ForwardIter, class Compare>
        ForwardIter set_symmetric_difference(ExecutionPolicy&& exec,
                                             ForwardIter1 first1, ForwardIter1 last1,
                                             ForwardIter2 first2, ForwardIter2 last2,
                                             ForwardIter result, Compare comp);
     
      namespace ranges {
        template<class I1, class I2, class O>
          using set_symmetric_difference_result = in_in_out_result<I1, I2, O>;
     
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, weakly_incrementable O, class Comp = [ranges::less](<#/>),
                 class Proj1 = identity, class Proj2 = identity>
          requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
          constexpr set_symmetric_difference_result<I1, I2, O>
            set_symmetric_difference(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                                     Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, weakly_incrementable O,
                 class Comp = [ranges::less](<#/>), class Proj1 = identity, class Proj2 = identity>
          requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
          constexpr set_symmetric_difference_result<borrowed_iterator_t<R1>,
                                                    borrowed_iterator_t<R2>, O>
            set_symmetric_difference(R1&& r1, R2&& r2, O result, Comp comp = {},
                                     Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // operações de heap
      template<class RandomAccessIter>
        constexpr void push_heap(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void push_heap(RandomAccessIter first, RandomAccessIter last,
                                 Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I push_heap(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R> push_heap(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr void pop_heap(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void pop_heap(RandomAccessIter first, RandomAccessIter last,
                                Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I pop_heap(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R> pop_heap(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr void make_heap(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void make_heap(RandomAccessIter first, RandomAccessIter last,
                                 Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I make_heap(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R> make_heap(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr void sort_heap(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr void sort_heap(RandomAccessIter first, RandomAccessIter last,
                                 Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S,
                 class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr I sort_heap(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Comp = [ranges::less](<#/>), class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr borrowed_iterator_t<R> sort_heap(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr bool is_heap(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr bool is_heap(RandomAccessIter first, RandomAccessIter last,
                               Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        bool is_heap(ExecutionPolicy&& exec,
                     RandomAccessIter first, RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        bool is_heap(ExecutionPolicy&& exec,
                     RandomAccessIter first, RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<I, Proj>> Comp = [ranges::less](<#/>)>
          constexpr bool is_heap(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          constexpr bool is_heap(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class RandomAccessIter>
        constexpr RandomAccessIter
          is_heap_until(RandomAccessIter first, RandomAccessIter last);
      template<class RandomAccessIter, class Compare>
        constexpr RandomAccessIter
          is_heap_until(RandomAccessIter first, RandomAccessIter last, Compare comp);
      template<class ExecutionPolicy, class RandomAccessIter>
        RandomAccessIter
          is_heap_until(ExecutionPolicy&& exec,
                        RandomAccessIter first, RandomAccessIter last);
      template<class ExecutionPolicy, class RandomAccessIter, class Compare>
        RandomAccessIter
          is_heap_until(ExecutionPolicy&& exec,
                        RandomAccessIter first, RandomAccessIter last, Compare comp);
     
      namespace ranges {
        template<random_access_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<I, Proj>> Comp = [ranges::less](<#/>)>
          constexpr I is_heap_until(I first, S last, Comp comp = {}, Proj proj = {});
        template<random_access_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          constexpr borrowed_iterator_t<R>
            is_heap_until(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      // mínimo e máximo
      template<class T> constexpr const T& min(const T& a, const T& b);
      template<class T, class Compare>
        constexpr const T& min(const T& a, const T& b, Compare comp);
      template<class T>
        constexpr T min(initializer_list<T> t);
      template<class T, class Compare>
        constexpr T min(initializer_list<T> t, Compare comp);
     
      namespace ranges {
        template<class T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr const T& min(const T& a, const T& b, Comp comp = {}, Proj proj = {});
        template<copyable T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr T min(initializer_list<T> r, Comp comp = {}, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          requires indirectly_copyable_storable<iterator_t<R>, range_value_t<R>*>
          constexpr range_value_t<R> min(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class T> constexpr const T& max(const T& a, const T& b);
      template<class T, class Compare>
        constexpr const T& max(const T& a, const T& b, Compare comp);
      template<class T>
        constexpr T max(initializer_list<T> t);
      template<class T, class Compare>
        constexpr T max(initializer_list<T> t, Compare comp);
     
      namespace ranges {
        template<class T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr const T& max(const T& a, const T& b, Comp comp = {}, Proj proj = {});
        template<copyable T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr T max(initializer_list<T> r, Comp comp = {}, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          requires indirectly_copyable_storable<iterator_t<R>, range_value_t<R>*>
          constexpr range_value_t<R> max(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class T> constexpr pair<const T&, const T&> minmax(const T& a, const T& b);
      template<class T, class Compare>
        constexpr pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp);
      template<class T>
        constexpr pair<T, T> minmax(initializer_list<T> t);
      template<class T, class Compare>
        constexpr pair<T, T> minmax(initializer_list<T> t, Compare comp);
     
      namespace ranges {
        template<class T>
          using minmax_result = min_max_result<T>;
     
        template<class T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr minmax_result<const T&>
            minmax(const T& a, const T& b, Comp comp = {}, Proj proj = {});
        template<copyable T, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<const T*, Proj>> Comp = [ranges::less](<#/>)>
          constexpr minmax_result<T>
            minmax(initializer_list<T> r, Comp comp = {}, Proj proj = {});
        template<input_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          requires indirectly_copyable_storable<iterator_t<R>, range_value_t<R>*>
          constexpr minmax_result<range_value_t<R>>
            minmax(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter>
        constexpr ForwardIter min_element(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class Compare>
        constexpr ForwardIter min_element(ForwardIter first, ForwardIter last,
                                          Compare comp);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter min_element(ExecutionPolicy&& exec,
                                ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class Compare>
        ForwardIter min_element(ExecutionPolicy&& exec,
                                ForwardIter first, ForwardIter last,
                                Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<[projected](<#/doc/iterator/projected>)<I, Proj>> Comp = [ranges::less](<#/>)>
          constexpr I min_element(I first, S last, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <[projected](<#/doc/iterator/projected>)<iterator_t<R>, Proj>> Comp = [ranges::less](<#/>)>
          constexpr borrowed_iterator_t<R>
            min_element(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter>
        constexpr ForwardIter max_element(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class Compare>
        constexpr ForwardIter max_element(ForwardIter first, ForwardIter last,
                                          Compare comp);
      template<class ExecutionPolicy, class ForwardIter>
        ForwardIter max_element(ExecutionPolicy&& exec,
                                ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class Compare>
```cpp
        ForwardIter max_element(ExecutionPolicy&& exec,
                                ForwardIter first, ForwardIter last,
                                Compare comp);
     
      namespace ranges {
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
          constexpr I max_element(I first, S last, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr borrowed_iterator_t<R>
            max_element(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class ForwardIter>
        constexpr pair<ForwardIter, ForwardIter>
          minmax_element(ForwardIter first, ForwardIter last);
      template<class ForwardIter, class Compare>
        constexpr pair<ForwardIter, ForwardIter>
          minmax_element(ForwardIter first, ForwardIter last, Compare comp);
      template<class ExecutionPolicy, class ForwardIter>
        pair<ForwardIter, ForwardIter>
          minmax_element(ExecutionPolicy&& exec,
                         ForwardIter first, ForwardIter last);
      template<class ExecutionPolicy, class ForwardIter, class Compare>
        pair<ForwardIter, ForwardIter>
          minmax_element(ExecutionPolicy&& exec,
                         ForwardIter first, ForwardIter last, Compare comp);
     
      namespace ranges {
        template<class I>
          using minmax_element_result = min_max_result<I>;
     
        template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
                 indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
          constexpr minmax_element_result<I>
            minmax_element(I first, S last, Comp comp = {}, Proj proj = {});
        template<forward_range R, class Proj = identity,
                 indirect_strict_weak_order
                     <projected<iterator_t<R>, Proj>> Comp = ranges::less>
          constexpr minmax_element_result<borrowed_iterator_t<R>>
            minmax_element(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      // valor limitado
      template<class T>
        constexpr const T& clamp(const T& v, const T& lo, const T& hi);
      template<class T, class Compare>
        constexpr const T& clamp(const T& v, const T& lo, const T& hi, Compare comp);
     
      namespace ranges {
        template<class T, class Proj = identity,
                 indirect_strict_weak_order<projected<const T*, Proj>> Comp = ranges::less>
          constexpr const T&
            clamp(const T& v, const T& lo, const T& hi, Comp comp = {}, Proj proj = {});
      }
     
      // comparação lexicográfica
      template<class InputIter1, class InputIter2>
        constexpr bool lexicographical_compare(InputIter1 first1, InputIter1 last1,
                                               InputIter2 first2, InputIter2 last2);
      template<class InputIter1, class InputIter2, class Compare>
        constexpr bool lexicographical_compare(InputIter1 first1, InputIter1 last1,
                                               InputIter2 first2, InputIter2 last2,
                                               Compare comp);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2>
        bool lexicographical_compare(ExecutionPolicy&& exec,
                                     ForwardIter1 first1, ForwardIter1 last1,
                                     ForwardIter2 first2, ForwardIter2 last2);
      template<class ExecutionPolicy, class ForwardIter1, class ForwardIter2,
               class Compare>
        bool lexicographical_compare(ExecutionPolicy&& exec,
                                     ForwardIter1 first1, ForwardIter1 last1,
                                     ForwardIter2 first2, ForwardIter2 last2,
                                     Compare comp);
     
      namespace ranges {
        template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2,
                 sentinel_for<I2> S2, class Proj1 = identity, class Proj2 = identity,
                 indirect_strict_weak_order
                     <projected<I1, Proj1>, projected<I2, Proj2>> Comp = ranges::less>
          constexpr bool
            lexicographical_compare(I1 first1, S1 last1, I2 first2, S2 last2,
                                    Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {});
        template<input_range R1, input_range R2, class Proj1 = identity,
                 class Proj2 = identity,
                 indirect_strict_weak_order
                     <projected<iterator_t<R1>, Proj1>,
                                projected<iterator_t<R2>, Proj2>> Comp = ranges::less>
          constexpr bool
            lexicographical_compare(R1&& r1, R2&& r2, Comp comp = {},
                                    Proj1 proj1 = {}, Proj2 proj2 = {});
      }
     
      // algoritmos de comparação de três vias
      template<class InputIter1, class InputIter2, class Cmp>
        constexpr auto lexicographical_compare_three_way(InputIter1 b1, InputIter1 e1,
                                                         InputIter2 b2, InputIter2 e2,
                                                         Cmp comp)
            -> decltype(comp(*b1, *b2));
      template<class InputIter1, class InputIter2>
        constexpr auto lexicographical_compare_three_way(InputIter1 b1, InputIter1 e1,
                                                         InputIter2 b2, InputIter2 e2);
     
      // permutações
      template<class BidirectionalIter>
        constexpr bool next_permutation(BidirectionalIter first,
                                        BidirectionalIter last);
      template<class BidirectionalIter, class Compare>
        constexpr bool next_permutation(BidirectionalIter first,
                                        BidirectionalIter last, Compare comp);
     
      namespace ranges {
        template<class I>
          using next_permutation_result = in_found_result<I>;
     
        template<bidirectional_iterator I, sentinel_for<I> S, class Comp = ranges::less,
                 class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr next_permutation_result<I>
            next_permutation(I first, S last, Comp comp = {}, Proj proj = {});
        template<bidirectional_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr next_permutation_result<borrowed_iterator_t<R>>
            next_permutation(R&& r, Comp comp = {}, Proj proj = {});
      }
     
      template<class BidirectionalIter>
        constexpr bool prev_permutation(BidirectionalIter first,
                                        BidirectionalIter last);
      template<class BidirectionalIter, class Compare>
        constexpr bool prev_permutation(BidirectionalIter first,
                                        BidirectionalIter last, Compare comp);
     
      namespace ranges {
        template<class I>
          using prev_permutation_result = in_found_result<I>;
     
        template<bidirectional_iterator I, sentinel_for<I> S, class Comp = ranges::less,
                 class Proj = identity>
          requires sortable<I, Comp, Proj>
          constexpr prev_permutation_result<I>
            prev_permutation(I first, S last, Comp comp = {}, Proj proj = {});
        template<bidirectional_range R, class Comp = ranges::less, class Proj = identity>
          requires sortable<iterator_t<R>, Comp, Proj>
          constexpr prev_permutation_result<borrowed_iterator_t<R>>
            prev_permutation(R&& r, Comp comp = {}, Proj proj = {});
      }
    }
```

#### Modelo de classe [std::ranges::in_fun_result](<#/doc/algorithm/ranges/return_types/in_fun_result>)
```cpp
    namespace std::ranges {
      template<class I, class F>
      struct in_fun_result {
        [[no_unique_address]] I in;
        [[no_unique_address]] F fun;
     
        template<class I2, class F2>
          requires convertible_to<const I&, I2> && convertible_to<const F&, F2>
        constexpr operator in_fun_result<I2, F2>() const & {
          return {in, fun};
        }
     
        template<class I2, class F2>
          requires convertible_to<I, I2> && convertible_to<F, F2>
        constexpr operator in_fun_result<I2, F2>() && {
          return {std::move(in), std::move(fun)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::in_in_result](<#/doc/algorithm/ranges/return_types/in_in_result>)
```cpp
    namespace std::ranges {
      template<class I1, class I2>
      struct in_in_result {
        [[no_unique_address]] I1 in1;
        [[no_unique_address]] I2 in2;
     
        template<class II1, class II2>
          requires convertible_to<const I1&, II1> && convertible_to<const I2&, II2>
        constexpr operator in_in_result<II1, II2>() const & {
          return {in1, in2};
        }
     
        template<class II1, class II2>
          requires convertible_to<I1, II1> && convertible_to<I2, II2>
        constexpr operator in_in_result<II1, II2>() && {
          return {std::move(in1), std::move(in2)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::in_out_result](<#/doc/algorithm/ranges/return_types/in_out_result>)
```cpp
    namespace std::ranges {
      template<class I, class O>
      struct in_out_result {
        [[no_unique_address]] I in;
        [[no_unique_address]] O out;
     
        template<class I2, class O2>
          requires convertible_to<const I&, I2> && convertible_to<const O&, O2>
        constexpr operator in_out_result<I2, O2>() const & {
          return {in, out};
        }
     
        template<class I2, class O2>
          requires convertible_to<I, I2> && convertible_to<O, O2>
        constexpr operator in_out_result<I2, O2>() && {
          return {std::move(in), std::move(out)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::in_in_out_result](<#/doc/algorithm/ranges/return_types/in_in_out_result>)
```cpp
    namespace std::ranges {
      template<class I1, class I2, class O>
      struct in_in_out_result {
        [[no_unique_address]] I1 in1;
        [[no_unique_address]] I2 in2;
        [[no_unique_address]] O  out;
     
        template<class II1, class II2, class OO>
          requires convertible_to<const I1&, II1> &&
                   convertible_to<const I2&, II2> &&
                   convertible_to<const O&, OO>
        constexpr operator in_in_out_result<II1, II2, OO>() const & {
          return {in1, in2, out};
        }
     
        template<class II1, class II2, class OO>
          requires convertible_to<I1, II1> &&
                   convertible_to<I2, II2> &&
                   convertible_to<O, OO>
        constexpr operator in_in_out_result<II1, II2, OO>() && {
          return {std::move(in1), std::move(in2), std::move(out)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::in_out_out_result](<#/doc/algorithm/ranges/return_types/in_out_out_result>)
```cpp
    namespace std::ranges {
      template<class I, class O1, class O2>
      struct in_out_out_result {
        [[no_unique_address]] I  in;
        [[no_unique_address]] O1 out1;
        [[no_unique_address]] O2 out2;
     
        template<class II, class OO1, class OO2>
          requires convertible_to<const I&, II> &&
                   convertible_to<const O1&, OO1> &&
                   convertible_to<const O2&, OO2>
        constexpr operator in_out_out_result<II, OO1, OO2>() const & {
          return {in, out1, out2};
        }
     
        template<class II, class OO1, class OO2>
          requires convertible_to<I, II> &&
                   convertible_to<O1, OO1> &&
                   convertible_to<O2, OO2>
        constexpr operator in_out_out_result<II, OO1, OO2>() && {
          return {std::move(in), std::move(out1), std::move(out2)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::min_max_result](<#/doc/algorithm/ranges/return_types/min_max_result>)
```cpp
    namespace std::ranges {
      template<class T>
      struct min_max_result {
        [[no_unique_address]] T min;
        [[no_unique_address]] T max;
     
        template<class T2>
          requires convertible_to<const T&, T2>
        constexpr operator min_max_result<T2>() const & {
          return {min, max};
        }
     
        template<class T2>
          requires convertible_to<T, T2>
        constexpr operator min_max_result<T2>() && {
          return {std::move(min), std::move(max)};
        }
      };
    }
```

#### Modelo de classe [std::ranges::in_found_result](<#/doc/algorithm/ranges/return_types/in_found_result>)
```cpp
    namespace std::ranges {
      template<class I>
      struct in_found_result {
        [[no_unique_address]] I in;
        bool found;
     
        template<class I2>
          requires convertible_to<const I&, I2>
        constexpr operator in_found_result<I2>() const & {
          return {in, found};
        }
        template<class I2>
          requires convertible_to<I, I2>
        constexpr operator in_found_result<I2>() && {
          return {std::move(in), found};
        }
      };
    }
```

#### Modelo de classe std::ranges::in_value_result
```cpp
    namespace std::ranges {
    template<class I, class T>
      struct in_value_result {
        [[no_unique_address]] I in;
        [[no_unique_address]] T value;
     
        template<class I2, class T2>
          requires convertible_to<const I&, I2> && convertible_to<const T&, T2>
        constexpr operator in_value_result<I2, T2>() const & {
          return {in, value};
        }
     
        template<class I2, class T2>
          requires convertible_to<I, I2> && convertible_to<T, T2>
        constexpr operator in_value_result<I2, T2>() && {
          return {std::move(in), std::move(value)};
        }
      };
    }
```

#### Modelo de classe std::ranges::out_value_result
```cpp
    namespace std::ranges {
    template<class O, class T>
      struct out_value_result {
        [[no_unique_address]] O out;
        [[no_unique_address]] T value;
     
        template<class O2, class T2>
          requires convertible_to<const O&, O2> && convertible_to<const T&, T2>
        constexpr operator out_value_result<O2, T2>() const & {
          return {out, value};
        }
     
        template<class O2, class T2>
          requires convertible_to<O, O2> && convertible_to<T, T2>
        constexpr operator out_value_result<O2, T2>() && {
          return {std::move(out), std::move(value)};
        }
      };
    }
```