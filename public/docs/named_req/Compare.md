# Requisitos nomeados C++: Compare

**Compare** é um conjunto de requisitos esperado por algumas das facilidades da standard library de tipos de objetos de função fornecidos pelo usuário.

O valor de retorno da operação de chamada de função aplicada a um objeto de um tipo que satisfaz Compare, quando [convertido](<#/doc/language/implicit_cast>) para bool, resulta em true se o primeiro argumento da chamada aparece antes do segundo na [relação de ordenação fraca estrita](<https://en.wikipedia.org/wiki/Strict_weak_ordering> "enwiki:Strict weak ordering") induzida por este tipo, e false caso contrário.

Assim como qualquer [BinaryPredicate](<#/doc/named_req/BinaryPredicate>), a avaliação dessa expressão não é permitida para chamar funções não-const através dos iterators desreferenciados e, sintaticamente, a operação de chamada de função deve aceitar argumentos de objeto const, com o mesmo comportamento independentemente de os argumentos serem const ou não-const.

### Requisitos

O tipo `T` satisfaz Compare se

*   O tipo `T` satisfaz [BinaryPredicate](<#/doc/named_req/BinaryPredicate>), e

Dado

*   `comp`, um objeto do tipo `T`,
*   equiv(a, b), [expressão-equivalente](<#/doc/language/expressions>) a !comp(a, b) && !comp(b, a).

As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Tipo de retorno | Requisitos
comp(a, b) | | atende [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (até C++20)
modela _[`boolean-testable`](<#/doc/concepts/boolean-testable>)_ | (desde C++20)
Estabelece [relação de ordenação fraca estrita](<https://en.wikipedia.org/wiki/strict_weak_ordering> "enwiki:strict weak ordering") com as seguintes propriedades:

*   Para todo `a`, comp(a, a) == false.
*   Se comp(a, b) == true então comp(b, a) == false.
*   Se comp(a, b) == true e comp(b, c) == true então comp(a, c) == true.

equiv(a, b) | bool | Estabelece [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki:equivalence relation") com as seguintes propriedades:

*   Para todo `a`, equiv(a, a) == true.
*   Se equiv(a, b) == true, então equiv(b, a) == true.
*   Se equiv(a, b) == true e equiv(b, c) == true, então equiv(a, c) == true.

Nota: `comp` induz uma [ordenação total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_and_non-strict_total_orders> "enwiki:Total order") nas classes de equivalência determinadas por `equiv`.

### Standard library

As seguintes facilidades da standard library esperam um tipo Compare.

[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(class template)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(class template)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(class template)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(class template)
[ priority_queue](<#/doc/container/priority_queue>) | adapta um container para fornecer uma fila de prioridade
(class template)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(function template)
[ sort](<#/doc/container/forward_list/sort>) | ordena os elementos
(public member function of `std::forward_list<T,Allocator>`)
[ sort](<#/doc/container/list/sort>) | ordena os elementos
(public member function of `std::list<T,Allocator>`)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(function template)
[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(function template)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(function template)
[ is_sorted](<#/doc/algorithm/is_sorted>)(C++11) | verifica se um range está ordenado em ordem crescente
(function template)
[ is_sorted_until](<#/doc/algorithm/is_sorted_until>)(C++11) | encontra o maior subrange ordenado
(function template)
[ nth_element](<#/doc/algorithm/nth_element>) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(function template)
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(function template)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(function template)
[ binary_search](<#/doc/algorithm/binary_search>) | determina se um elemento existe em um range parcialmente ordenado
(function template)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(function template)
[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados
(function template)
[ merge](<#/doc/container/forward_list/merge>) | mescla duas listas ordenadas
(public member function of `std::forward_list<T,Allocator>`)
[ merge](<#/doc/container/list/merge>) | mescla duas listas ordenadas
(public member function of `std::list<T,Allocator>`)
[ inplace_merge](<#/doc/algorithm/inplace_merge>) | mescla dois ranges ordenados no local
(function template)
[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(function template)
[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(function template)
[ set_intersection](<#/doc/algorithm/set_intersection>) | calcula a interseção de dois conjuntos
(function template)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(function template)
[ set_union](<#/doc/algorithm/set_union>) | calcula a união de dois conjuntos
(function template)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(function template)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(function template)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(function template)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(function template)
[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(function template)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior subrange que é um max heap
(function template)
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores dados
(function template)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(function template)
[ min](<#/doc/algorithm/min>) | retorna o menor dos valores dados
(function template)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(function template)
[ minmax](<#/doc/algorithm/minmax>)(C++11) | retorna o menor e o maior de dois elementos
(function template)
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) | retorna os menores e os maiores elementos em um range
(function template)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(function template)
[ next_permutation](<#/doc/algorithm/next_permutation>) | gera a próxima permutação lexicográfica maior de um range de elementos
(function template)
[ prev_permutation](<#/doc/algorithm/prev_permutation>) | gera a próxima permutação lexicográfica menor de um range de elementos
(function template)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a convertibilidade contextual de tipos de retorno para bool não
refletia a prática das implementações | requisitos corrigidos
[LWG 3031](<https://cplusplus.github.io/LWG/issue3031>) | C++98 | requisitos sobre valores const eram insuficientes | requisitos reforçados

### Ver também

[ strict_weak_order](<#/doc/concepts/strict_weak_order>)(C++20) | especifica que uma [`relation`](<#/doc/concepts/relation>) impõe uma ordenação fraca estrita
(concept)
[**Operadores de comparação**](<#/doc/language/operator_comparison>) | `<`, `<=`, `>`, `>=`, `==`, `!=`, e `<=>` (C++20), comparam os argumentos
*[_(como está)_]: A::pointer