# Cabeçalho da biblioteca experimental &lt;experimental/ranges/algorithm&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Especificadores de tag

Definido no namespace `std::experimental::ranges::tag`
---
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(class)

### Operações de sequência não modificadoras

Definido no namespace `std::experimental::ranges`
---
[ all_ofany_ofnone_of](<#/doc/experimental/ranges/algorithm/all_any_none_of>) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(function template)
[ for_each](<#/doc/experimental/ranges/algorithm/for_each>) | aplica uma função a um range de elementos
(function template)
[ countcount_if](<#/doc/experimental/ranges/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(function template)
[ mismatch](<#/doc/experimental/ranges/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(function template)
[ equal](<#/doc/experimental/ranges/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(function template)
[ lexicographical_compare](<#/doc/experimental/ranges/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(function template)
[ findfind_iffind_if_not](<#/doc/experimental/ranges/algorithm/find>) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[ find_end](<#/doc/experimental/ranges/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(function template)
[ find_first_of](<#/doc/experimental/ranges/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(function template)
[ adjacent_find](<#/doc/experimental/ranges/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(function template)
[ search](<#/doc/experimental/ranges/algorithm/search>) | procura por um range de elementos
(function template)
[ search_n](<#/doc/experimental/ranges/algorithm/search_n>) | procura por um número de cópias consecutivas de um elemento em um range
(function template)

### Operações de sequência modificadoras

Definido no namespace `std::experimental::ranges`
---
[ copycopy_if](<#/doc/experimental/ranges/algorithm/copy>) | copia um range de elementos para um novo local
(function template)
[ copy_n](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/copy_n&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/copy n \(page does not exist\)") | copia um número de elementos para um novo local
(function template)
[ copy_backward](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/copy_backward&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/copy backward \(page does not exist\)") | copia um range de elementos em ordem inversa
(function template)
[ move](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/move&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/move \(page does not exist\)") | move um range de elementos para um novo local
(function template)
[ move_backward](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/move_backward&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/move backward \(page does not exist\)") | move um range de elementos para um novo local em ordem inversa
(function template)
[ fill](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/fill&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/fill \(page does not exist\)") | atribui um certo valor a um range de elementos
(function template)
[ fill_n](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/fill_n&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/fill n \(page does not exist\)") | atribui um valor a um número de elementos
(function template)
[ transform](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/transform&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/transform \(page does not exist\)") | aplica uma função a um range de elementos
(function template)
[ generate](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/generate&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/generate \(page does not exist\)") | salva o resultado de uma função em um range
(function template)
[ generate_n](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/generate_n&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/generate n \(page does not exist\)") | salva o resultado de N aplicações de uma função
(function template)
[ removeremove_if](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/remove&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/remove \(page does not exist\)") | remove elementos que satisfazem critérios específicos
(function template)
[ remove_copyremove_copy_if](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/remove_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/remove copy \(page does not exist\)") | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(function template)
[ replacereplace_if](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/replace&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/replace \(page does not exist\)") | substitui todos os valores que satisfazem critérios específicos por outro valor
(function template)
[ replace_copyreplace_copy_if](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/replace_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/replace copy \(page does not exist\)") | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(function template)
[ swap_ranges](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/swap_ranges&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/swap ranges \(page does not exist\)") | troca dois ranges de elementos
(function template)
[ reverse](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/reverse&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/reverse \(page does not exist\)") | inverte a ordem dos elementos em um range
(function template)
[ reverse_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/reverse_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/reverse copy \(page does not exist\)") | cria uma cópia de um range que está invertido
(function template)
[ rotate](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/rotate&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/rotate \(page does not exist\)") | rotaciona a ordem dos elementos em um range
(function template)
[ rotate_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/rotate_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/rotate copy \(page does not exist\)") | copia e rotaciona um range de elementos
(function template)
[ shuffle](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/shuffle&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/shuffle \(page does not exist\)") | reordena aleatoriamente elementos em um range
(function template)
[ unique](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/unique&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/unique \(page does not exist\)") | remove elementos duplicados consecutivos em um range
(function template)
[ unique_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/unique_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/unique copy \(page does not exist\)") | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(function template)

### Operações de particionamento

Definido no namespace `std::experimental::ranges`
---
[ is_partitioned](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/is_partitioned&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/is partitioned \(page does not exist\)") | determina se o range é particionado pelo predicado dado
(function template)
[ partition](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/partition&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/partition \(page does not exist\)") | divide um range de elementos em dois grupos
(function template)
[ partition_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/partition_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/partition copy \(page does not exist\)") | copia um range dividindo os elementos em dois grupos
(function template)
[ stable_partition](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/stable_partition&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/stable partition \(page does not exist\)") | divide elementos em dois grupos enquanto preserva sua ordem relativa
(function template)
[ partition_point](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/partition_point&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/partition point \(page does not exist\)") | localiza o ponto de particionamento de um range particionado
(function template)

### Operações de ordenação

Definido no namespace `std::experimental::ranges`
---
[ is_sorted](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/is_sorted&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/is sorted \(page does not exist\)") | verifica se um range está ordenado em ordem crescente
(function template)
[ is_sorted_until](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/is_sorted_until&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/is sorted until \(page does not exist\)") | encontra o maior sub-range ordenado
(function template)
[ sort](<#/doc/experimental/ranges/algorithm/sort>) | ordena um range em ordem crescente
(function template)
[ partial_sort](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/partial_sort&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/partial sort \(page does not exist\)") | ordena os primeiros N elementos de um range
(function template)
[ partial_sort_copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/partial_sort_copy&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/partial sort copy \(page does not exist\)") | copia e ordena parcialmente um range de elementos
(function template)
[ stable_sort](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/stable_sort&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/stable sort \(page does not exist\)") | ordena um range de elementos enquanto preserva a ordem entre elementos iguais
(function template)
[ nth_element](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/nth_element&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/nth element \(page does not exist\)") | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(function template)

### Operações de busca binária (em ranges ordenados)

Definido no namespace `std::experimental::ranges`
---
[ lower_bound](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/lower_bound&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/lower bound \(page does not exist\)") | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(function template)
[ upper_bound](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/upper_bound&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/upper bound \(page does not exist\)") | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(function template)
[ binary_search](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/binary_search&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/binary search \(page does not exist\)") | determina se um elemento existe em um determinado range
(function template)
[ equal_range](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/equal_range&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/equal range \(page does not exist\)") | retorna um range de elementos que correspondem a uma chave específica
(function template)

### Operações de conjunto (em ranges ordenados)

Definido no namespace `std::experimental::ranges`
---
[ merge](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/merge&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/merge \(page does not exist\)") | mescla dois ranges ordenados
(function template)
[ inplace_merge](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/inplace_merge&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/inplace merge \(page does not exist\)") | mescla dois ranges ordenados no local
(function template)
[ includes](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/includes&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/includes \(page does not exist\)") | retorna true se um conjunto é um subconjunto de outro
(function template)
[ set_difference](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/set_difference&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/set difference \(page does not exist\)") | calcula a diferença entre dois conjuntos
(function template)
[ set_intersection](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/set_intersection&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/set intersection \(page does not exist\)") | calcula a interseção de dois conjuntos
(function template)
[ set_symmetric_difference](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/set_symmetric_difference&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/set symmetric difference \(page does not exist\)") | calcula a diferença simétrica entre dois conjuntos
(function template)
[ set_union](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/set_union&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/set union \(page does not exist\)") | calcula a união de dois conjuntos
(function template)

### Operações de heap

Definido no namespace `std::experimental::ranges`
---
[ is_heap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/is_heap&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/is heap \(page does not exist\)") | verifica se o range dado é um max heap
(function template)
[ is_heap_until](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/is_heap_until&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/is heap until \(page does not exist\)") | encontra o maior sub-range que é um max heap
(function template)
[ make_heap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/make_heap&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/make heap \(page does not exist\)") | cria um max heap a partir de um range de elementos
(function template)
[ push_heap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/push_heap&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/push heap \(page does not exist\)") | adiciona um elemento a um max heap
(function template)
[ pop_heap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/pop_heap&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/pop heap \(page does not exist\)") | remove o maior elemento de um max heap
(function template)
[ sort_heap](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/sort_heap&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/sort heap \(page does not exist\)") | transforma um max heap em um range de elementos ordenados em ordem crescente
(function template)

### Operações de mínimo/máximo

Definido no namespace `std::experimental::ranges`
---
[ max](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/max&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/max \(page does not exist\)") | retorna o maior dos valores dados
(function template)
[ max_element](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/max_element&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/max element \(page does not exist\)") | retorna o maior elemento em um range
(function template)
[ min](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/min&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/min \(page does not exist\)") | retorna o menor dos valores dados
(function template)
[ min_element](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/min_element&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/min element \(page does not exist\)") | retorna o menor elemento em um range
(function template)
[ minmax](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/minmax&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/minmax \(page does not exist\)") | retorna o menor e o maior de dois elementos
(function template)
[ minmax_element](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/minmax_element&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/minmax element \(page does not exist\)") | retorna os menores e os maiores elementos em um range
(function template)

### Operações de permutação

Definido no namespace `std::experimental::ranges`
---
[ is_permutation](<#/doc/experimental/ranges/algorithm/is_permutation>) | determina se uma sequência é uma permutação de outra sequência
(function template)
[ next_permutation](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/next_permutation&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/next permutation \(page does not exist\)") | gera a próxima permutação lexicográfica maior de um range de elementos
(function template)
[ prev_permutation](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/prev_permutation&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/prev permutation \(page does not exist\)") | gera a próxima permutação lexicográfica menor de um range de elementos
(function template)

### Sinopse
```cpp
    #include <initializer_list>
    
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
    
    namespace tag {
      struct in;
      struct in1;
      struct in2;
      struct out;
      struct out1;
      struct out2;
      struct fun;
      struct min;
      struct max;
      struct begin;
      struct end;
    }
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      bool all_of(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      bool all_of(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      bool any_of(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      bool any_of(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      bool none_of(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      bool none_of(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryInvocable<projected<I, Proj>> Fun>
      tagged_pair<tag::in(I), tag::fun(Fun)>
        for_each(I first, S last, Fun f, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryInvocable<projected<iterator_t<Rng>, Proj>> Fun>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::fun(Fun)>
        for_each(Rng&& rng, Fun f, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class T, class Proj = identity>
      requires IndirectRelation<equal_to<>, projected<I, Proj>, const T*>
      I find(I first, S last, const T& value, Proj proj = Proj{});
    
    template <InputRange Rng, class T, class Proj = identity>
      requires IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T*>
      safe_iterator_t<Rng>
        find(Rng&& rng, const T& value, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      I find_if(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      safe_iterator_t<Rng>
        find_if(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      I find_if_not(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      safe_iterator_t<Rng>
        find_if_not(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2,
        Sentinel<I2> S2, class Proj = identity,
        IndirectRelation<I2, projected<I1, Proj>> Pred = equal_to<>>
      I1
        find_end(I1 first1, S1 last1, I2 first2, S2 last2,
                 Pred pred = Pred{}, Proj proj = Proj{});
    
    template <ForwardRange Rng1, ForwardRange Rng2, class Proj = identity,
        IndirectRelation<iterator_t<Rng2>,
          projected<iterator_t<Rng>, Proj>> Pred = equal_to<>>
      safe_iterator_t<Rng1>
        find_end(Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{}, Proj proj = Proj{});
    
    template <InputIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2,
        class Proj1 = identity, class Proj2 = identity,
        IndirectRelation<projected<I1, Proj1>, projected<I2, Proj2>> Pred = equal_to<>>
      I1
        find_first_of(I1 first1, S1 last1, I2 first2, S2 last2,
                      Pred pred = Pred{},
                      Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <InputRange Rng1, ForwardRange Rng2, class Proj1 = identity,
        class Proj2 = identity,
        IndirectRelation<projected<iterator_t<Rng1>, Proj1>,
          projected<iterator_t<Rng2>, Proj2>> Pred = equal_to<>>
      safe_iterator_t<Rng1>
        find_first_of(Rng1&& rng1, Rng2&& rng2,
                      Pred pred = Pred{},
                      Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectRelation<projected<I, Proj>> Pred = equal_to<>>
      I
        adjacent_find(I first, S last, Pred pred = Pred{},
                      Proj proj = Proj{});
    
    template <ForwardRange Rng, class Proj = identity,
        IndirectRelation<projected<iterator_t<Rng>, Proj>> Pred = equal_to<>>
      safe_iterator_t<Rng>
        adjacent_find(Rng&& rng, Pred pred = Pred{}, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class T, class Proj = identity>
      requires IndirectRelation<equal_to<>, projected<I, Proj>, const T*>
      difference_type_t<I>
        count(I first, S last, const T& value, Proj proj = Proj{});
    
    template <InputRange Rng, class T, class Proj = identity>
      requires IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T*>
      difference_type_t<iterator_t<Rng>>
        count(Rng&& rng, const T& value, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      difference_type_t<I>
        count_if(I first, S last, Pred pred, Proj proj = Proj{});
    
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      difference_type_t<iterator_t<Rng>>
        count_if(Rng&& rng, Pred pred, Proj proj = Proj{});
    
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        class Proj1 = identity, class Proj2 = identity,
        IndirectRelation<projected<I1, Proj1>, projected<I2, Proj2>> Pred = equal_to<>>
      tagged_pair<tag::in1(I1), tag::in2(I2)>
        mismatch(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = Pred{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <InputRange Rng1, InputRange Rng2,
        class Proj1 = identity, class Proj2 = identity,
        IndirectRelation<projected<iterator_t<Rng1>, Proj1>,
          projected<iterator_t<Rng2>, Proj2>> Pred = equal_to<>>
      tagged_pair<tag::in1(safe_iterator_t<Rng1>),
                  tag::in2(safe_iterator_t<Rng2>)>
        mismatch(Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        class Pred = equal_to<>, class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
      bool equal(I1 first1, S1 last1, I2 first2, S2 last2,
                 Pred pred = Pred{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <InputRange Rng1, InputRange Rng2, class Pred = equal_to<>,
        class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyComparable<iterator_t<Rng1>, iterator_t<Rng2>, Pred, Proj1, Proj2>
      bool equal(Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2,
        Sentinel<I2> S2, class Pred = equal_to<>, class Proj1 = identity,
        class Proj2 = identity>
      requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
      bool is_permutation(I1 first1, S1 last1, I2 first2, S2 last2,
                          Pred pred = Pred{},
                          Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardRange Rng1, ForwardRange Rng2, class Pred = equal_to<>,
        class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyComparable<iterator_t<Rng1>, iterator_t<Rng2>, Pred, Proj1, Proj2>
      bool is_permutation(Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{},
                          Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2,
        Sentinel<I2> S2, class Pred = equal_to<>,
        class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyComparable<I1, I2, Pred, Proj1, Proj2>
      I1
        search(I1 first1, S1 last1, I2 first2, S2 last2,
               Pred pred = Pred{},
               Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardRange Rng1, ForwardRange Rng2, class Pred = equal_to<>,
        class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyComparable<iterator_t<Rng1>, iterator_t<Rng2>, Pred, Proj1, Proj2>
      safe_iterator_t<Rng1>
        search(Rng1&& rng1, Rng2&& rng2, Pred pred = Pred{},
               Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
    
    template <ForwardIterator I, Sentinel<I> S, class T,
        class Pred = equal_to<>, class Proj = identity>
      requires IndirectlyComparable<I, const T*, Pred, Proj>
      I
        search_n(I first, S last, difference_type_t<I> count,
                 const T& value, Pred pred = Pred{},
                 Proj proj = Proj{});
    
    template <ForwardRange Rng, class T, class Pred = equal_to<>,
        class Proj = identity>
      requires IndirectlyComparable<iterator_t<Rng>, const T*, Pred, Proj>
      safe_iterator_t<Rng>
        search_n(Rng&& rng, difference_type_t<iterator_t<Rng>> count,
                 const T& value, Pred pred = Pred{}, Proj proj = Proj{});
    
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O>
```
```cpp
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        copy(I first, S last, O result);
     
    template <InputRange Rng, WeaklyIncrementable O>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        copy(Rng&& rng, O result);
     
    template <InputIterator I, WeaklyIncrementable O>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        copy_n(I first, difference_type_t<I> n, O result);
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        copy_if(I first, S last, O result, Pred pred, Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        copy_if(Rng&& rng, O result, Pred pred, Proj proj = Proj{});
     
    template <BidirectionalIterator I1, Sentinel<I1> S1, BidirectionalIterator I2>
      requires IndirectlyCopyable<I1, I2>
      tagged_pair<tag::in(I1), tag::out(I2)>
        copy_backward(I1 first, S1 last, I2 result);
     
    template <BidirectionalRange Rng, BidirectionalIterator I>
      requires IndirectlyCopyable<iterator_t<Rng>, I>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(I)>
        copy_backward(Rng&& rng, I result);
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O>
      requires IndirectlyMovable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        move(I first, S last, O result);
     
    template <InputRange Rng, WeaklyIncrementable O>
      requires IndirectlyMovable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        move(Rng&& rng, O result);
     
    template <BidirectionalIterator I1, Sentinel<I1> S1, BidirectionalIterator I2>
      requires IndirectlyMovable<I1, I2>
      tagged_pair<tag::in(I1), tag::out(I2)>
        move_backward(I1 first, S1 last, I2 result);
     
    template <BidirectionalRange Rng, BidirectionalIterator I>
      requires IndirectlyMovable<iterator_t<Rng>, I>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(I)>
        move_backward(Rng&& rng, I result);
     
    template <ForwardIterator I1, Sentinel<I1> S1, ForwardIterator I2, Sentinel<I2> S2>
      requires IndirectlySwappable<I1, I2>
      tagged_pair<tag::in1(I1), tag::in2(I2)>
        swap_ranges(I1 first1, S1 last1, I2 first2, S2 last2);
     
    template <ForwardRange Rng1, ForwardRange Rng2>
      requires IndirectlySwappable<iterator_t<Rng1>, iterator_t<Rng2>>
      tagged_pair<tag::in1(safe_iterator_t<Rng1>), tag::in2(safe_iterator_t<Rng2>)>
        swap_ranges(Rng1&& rng1, Rng2&& rng2);
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O,
        CopyConstructible F, class Proj = identity>
      requires Writable<O, indirect_result_of_t<F&(projected<I, Proj>)>>
      tagged_pair<tag::in(I), tag::out(O)>
        transform(I first, S last, O result, F op, Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O, CopyConstructible F,
        class Proj = identity>
      requires Writable<O, indirect_result_of_t<F&(
        projected<iterator_t<R>, Proj>)>>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        transform(Rng&& rng, O result, F op, Proj proj = Proj{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, CopyConstructible F, class Proj1 = identity,
        class Proj2 = identity>
      requires Writable<O, indirect_result_of_t<F&(projected<I1, Proj1>,
        projected<I2, Proj2>)>>
      tagged_tuple<tag::in1(I1), tag::in2(I2), tag::out(O)>
        transform(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                  F binary_op, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O,
        CopyConstructible F, class Proj1 = identity, class Proj2 = identity>
      requires Writable<O, indirect_result_of_t<F&(
        projected<iterator_t<Rng1>, Proj1>, projected<iterator_t<Rng2>, Proj2>)>>
      tagged_tuple<tag::in1(safe_iterator_t<Rng1>),
                   tag::in2(safe_iterator_t<Rng2>),
                   tag::out(O)>
        transform(Rng1&& rng1, Rng2&& rng2, O result,
                  F binary_op, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputIterator I, Sentinel<I> S, class T1, class T2, class Proj = identity>
      requires Writable<I, const T2&> &&
        IndirectRelation<equal_to<>, projected<I, Proj>, const T1*>
      I
        replace(I first, S last, const T1& old_value, const T2& new_value, Proj proj = Proj{});
     
    template <InputRange Rng, class T1, class T2, class Proj = identity>
      requires Writable<iterator_t<Rng>, const T2&> &&
        IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T1*>
      safe_iterator_t<Rng>
        replace(Rng&& rng, const T1& old_value, const T2& new_value, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, class T, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires Writable<I, const T&>
      I
        replace_if(I first, S last, Pred pred, const T& new_value, Proj proj = Proj{});
     
    template <InputRange Rng, class T, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires Writable<iterator_t<Rng>, const T&>
      safe_iterator_t<Rng>
        replace_if(Rng&& rng, Pred pred, const T& new_value, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, class T1, class T2, OutputIterator<const T2&> O,
        class Proj = identity>
      requires IndirectlyCopyable<I, O> &&
        IndirectRelation<equal_to<>, projected<I, Proj>, const T1*>
      tagged_pair<tag::in(I), tag::out(O)>
        replace_copy(I first, S last, O result, const T1& old_value, const T2& new_value,
                     Proj proj = Proj{});
     
    template <InputRange Rng, class T1, class T2, OutputIterator<const T2&> O,
        class Proj = identity>
      requires IndirectlyCopyable<iterator_t<Rng>, O> &&
        IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T1*>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        replace_copy(Rng&& rng, O result, const T1& old_value, const T2& new_value,
                     Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, class T, OutputIterator<const T&> O,
        class Proj = identity, IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        replace_copy_if(I first, S last, O result, Pred pred, const T& new_value,
                        Proj proj = Proj{});
     
    template <InputRange Rng, class T, OutputIterator<const T&> O, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        replace_copy_if(Rng&& rng, O result, Pred pred, const T& new_value,
                        Proj proj = Proj{});
     
    template <class T, OutputIterator<const T&> O, Sentinel<O> S>
      O fill(O first, S last, const T& value);
     
    template <class T, OutputRange<const T&> Rng>
      safe_iterator_t<Rng>
        fill(Rng&& rng, const T& value);
     
    template <class T, OutputIterator<const T&> O>
      O fill_n(O first, difference_type_t<O> n, const T& value);
     
    template <Iterator O, Sentinel<O> S, CopyConstructible F>
      requires Invocable<F&> && Writable<O, result_of_t<F&()>>
      O generate(O first, S last, F gen);
     
    template <class Rng, CopyConstructible F>
      requires Invocable<F&> && OutputRange<Rng, result_of_t<F&()>>
      safe_iterator_t<Rng>
        generate(Rng&& rng, F gen);
     
    template <Iterator O, CopyConstructible F>
      requires Invocable<F&> && Writable<O, result_of_t<F&()>>
      O generate_n(O first, difference_type_t<O> n, F gen);
     
    template <ForwardIterator I, Sentinel<I> S, class T, class Proj = identity>
      requires Permutable<I> &&
        IndirectRelation<equal_to<>, projected<I, Proj>, const T*>
      I
        remove(I first, S last, const T& value, Proj proj = Proj{});
     
    template <ForwardRange Rng, class T, class Proj = identity>
      requires Permutable<iterator_t<Rng>> &&
        IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T*>
      safe_iterator_t<Rng>
        remove(Rng&& rng, const T& value, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires Permutable<I>
        I remove_if(I first, S last, Pred pred, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires Permutable<iterator_t<Rng>>
      safe_iterator_t<Rng>
        remove_if(Rng&& rng, Pred pred, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O, class T,
        class Proj = identity>
      requires IndirectlyCopyable<I, O> &&
        IndirectRelation<equal_to<>, projected<I, Proj>, const T*>
      tagged_pair<tag::in(I), tag::out(O)>
        remove_copy(I first, S last, O result, const T& value, Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O, class T, class Proj = identity>
      requires IndirectlyCopyable<iterator_t<Rng>, O> &&
        IndirectRelation<equal_to<>, projected<iterator_t<Rng>, Proj>, const T*>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        remove_copy(Rng&& rng, O result, const T& value, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O,
        class Proj = identity, IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        remove_copy_if(I first, S last, O result, Pred pred, Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        remove_copy_if(Rng&& rng, O result, Pred pred, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectRelation<projected<I, Proj>> R = equal_to<>>
      requires Permutable<I>
      I unique(I first, S last, R comp = R{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectRelation<projected<iterator_t<Rng>, Proj>> R = equal_to<>>
      requires Permutable<iterator_t<Rng>>
      safe_iterator_t<Rng>
        unique(Rng&& rng, R comp = R{}, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O,
        class Proj = identity, IndirectRelation<projected<I, Proj>> R = equal_to<>>
      requires IndirectlyCopyable<I, O> &&
        (ForwardIterator<I> ||
        (InputIterator<O> && Same<value_type_t<I>, value_type_t<O>>) ||
        IndirectlyCopyableStorable<I, O>)
      tagged_pair<tag::in(I), tag::out(O)>
        unique_copy(I first, S last, O result, R comp = R{}, Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O, class Proj = identity,
        IndirectRelation<projected<iterator_t<Rng>, Proj>> R = equal_to<>>
      requires IndirectlyCopyable<iterator_t<Rng>, O> &&
        (ForwardIterator<iterator_t<Rng>> ||
        (InputIterator<O> && Same<value_type_t<iterator_t<Rng>>, value_type_t<O>>) ||
        IndirectlyCopyableStorable<iterator_t<Rng>, O>)
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        unique_copy(Rng&& rng, O result, R comp = R{}, Proj proj = Proj{});
     
    template <BidirectionalIterator I, Sentinel<I> S>
      requires Permutable<I>
      I reverse(I first, S last);
     
    template <BidirectionalRange Rng>
      requires Permutable<iterator_t<Rng>>
      safe_iterator_t<Rng>
        reverse(Rng&& rng);
     
    template <BidirectionalIterator I, Sentinel<I> S, WeaklyIncrementable O>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)> reverse_copy(I first, S last, O result);
     
    template <BidirectionalRange Rng, WeaklyIncrementable O>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        reverse_copy(Rng&& rng, O result);
     
    template <ForwardIterator I, Sentinel<I> S>
      requires Permutable<I>
      tagged_pair<tag::begin(I), tag::end(I)>
        rotate(I first, I middle, S last);
     
    template <ForwardRange Rng>
      requires Permutable<iterator_t<Rng>>
      tagged_pair<tag::begin(safe_iterator_t<Rng>),
                  tag::end(safe_iterator_t<Rng>)>
        rotate(Rng&& rng, iterator_t<Rng> middle);
     
    template <ForwardIterator I, Sentinel<I> S, WeaklyIncrementable O>
      requires IndirectlyCopyable<I, O>
      tagged_pair<tag::in(I), tag::out(O)>
        rotate_copy(I first, I middle, S last, O result);
     
    template <ForwardRange Rng, WeaklyIncrementable O>
      requires IndirectlyCopyable<iterator_t<Rng>, O>
      tagged_pair<tag::in(safe_iterator_t<Rng>), tag::out(O)>
        rotate_copy(Rng&& rng, iterator_t<Rng> middle, O result);
     
    template <RandomAccessIterator I, Sentinel<I> S, class Gen>
      requires Permutable<I> &&
        UniformRandomNumberGenerator<remove_reference_t<Gen>> &&
        ConvertibleTo<result_of_t<Gen&()>, difference_type_t<I>>
      I shuffle(I first, S last, Gen&& g);
     
    template <RandomAccessRange Rng, class Gen>
      requires Permutable<I> &&
        UniformRandomNumberGenerator<remove_reference_t<Gen>> &&
        ConvertibleTo<result_of_t<Gen&()>, difference_type_t<I>>
      safe_iterator_t<Rng>
        shuffle(Rng&& rng, Gen&& g);
     
    template <InputIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      bool is_partitioned(I first, S last, Pred pred, Proj proj = Proj{});
     
    template <InputRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      bool
        is_partitioned(Rng&& rng, Pred pred, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires Permutable<I>
        I partition(I first, S last, Pred pred, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires Permutable<iterator_t<Rng>>
      safe_iterator_t<Rng>
        partition(Rng&& rng, Pred pred, Proj proj = Proj{});
     
    template <BidirectionalIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires Permutable<I>
      I stable_partition(I first, S last, Pred pred, Proj proj = Proj{});
     
    template <BidirectionalRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires Permutable<iterator_t<Rng>>
      safe_iterator_t<Rng>
        stable_partition(Rng&& rng, Pred pred, Proj proj = Proj{});
     
    template <InputIterator I, Sentinel<I> S, WeaklyIncrementable O1, WeaklyIncrementable O2,
        class Proj = identity, IndirectUnaryPredicate<projected<I, Proj>> Pred>
      requires IndirectlyCopyable<I, O1> && IndirectlyCopyable<I, O2>
      tagged_tuple<tag::in(I), tag::out1(O1), tag::out2(O2)>
        partition_copy(I first, S last, O1 out_true, O2 out_false, Pred pred,
                       Proj proj = Proj{});
     
    template <InputRange Rng, WeaklyIncrementable O1, WeaklyIncrementable O2,
        class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      requires IndirectlyCopyable<iterator_t<Rng>, O1> &&
        IndirectlyCopyable<iterator_t<Rng>, O2>
      tagged_tuple<tag::in(safe_iterator_t<Rng>), tag::out1(O1), tag::out2(O2)>
        partition_copy(Rng&& rng, O1 out_true, O2 out_false, Pred pred, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectUnaryPredicate<projected<I, Proj>> Pred>
      I partition_point(I first, S last, Pred pred, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectUnaryPredicate<projected<iterator_t<Rng>, Proj>> Pred>
      safe_iterator_t<Rng>
        partition_point(Rng&& rng, Pred pred, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
        I sort(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        sort(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
        I stable_sort(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        stable_sort(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
        I partial_sort(I first, I middle, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        partial_sort(Rng&& rng, iterator_t<Rng> middle, Comp comp = Comp{},
                     Proj proj = Proj{});
     
    template <InputIterator I1, Sentinel<I1> S1, RandomAccessIterator I2, Sentinel<I2> S2,
        class Comp = less<>, class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyCopyable<I1, I2> && Sortable<I2, Comp, Proj2> &&
        IndirectStrictWeakOrder<Comp, projected<I1, Proj1>, projected<I2, Proj2>>
      I2
        partial_sort_copy(I1 first, S1 last, I2 result_first, S2 result_last,
                          Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, RandomAccessRange Rng2, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires IndirectlyCopyable<iterator_t<Rng1>, iterator_t<Rng2>> &&
        Sortable<iterator_t<Rng2>, Comp, Proj2> &&
        IndirectStrictWeakOrder<Comp, projected<iterator_t<Rng1>, Proj1>,
          projected<iterator_t<Rng2>, Proj2>>
      safe_iterator_t<Rng2>
        partial_sort_copy(Rng1&& rng, Rng2&& result_rng, Comp comp = Comp{},
                          Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      bool is_sorted(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      bool
        is_sorted(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      I is_sorted_until(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        is_sorted_until(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
        I nth_element(I first, I nth, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        nth_element(Rng&& rng, iterator_t<Rng> nth, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<I, Proj>> Comp = less<>>
      I
        lower_bound(I first, S last, const T& value, Comp comp = Comp{},
                    Proj proj = Proj{});
     
    template <ForwardRange Rng, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        lower_bound(Rng&& rng, const T& value, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<I, Proj>> Comp = less<>>
      I
        upper_bound(I first, S last, const T& value, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        upper_bound(Rng&& rng, const T& value, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<I, Proj>> Comp = less<>>
      tagged_pair<tag::begin(I), tag::end(I)>
        equal_range(I first, S last, const T& value, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<iterator_t<Rng>, Proj>> Comp = less<>>
      tagged_pair<tag::begin(safe_iterator_t<Rng>),
                  tag::end(safe_iterator_t<Rng>)>
        equal_range(Rng&& rng, const T& value, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<I, Proj>> Comp = less<>>
      bool
        binary_search(I first, S last, const T& value, Comp comp = Comp{},
                      Proj proj = Proj{});
     
    template <ForwardRange Rng, class T, class Proj = identity,
        IndirectStrictWeakOrder<const T*, projected<iterator_t<Rng>, Proj>> Comp = less<>>
      bool
        binary_search(Rng&& rng, const T& value, Comp comp = Comp{},
                      Proj proj = Proj{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, class Comp = less<>, class Proj1 = identity,
        class Proj2 = identity>
      requires Mergeable<I1, I2, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(I1), tag::in2(I2), tag::out(O)>
        merge(I1 first1, S1 last1, I2 first2, S2 last2, O result,
              Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<iterator_t<Rng1>, iterator_t<Rng2>, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(safe_iterator_t<Rng1>),
                   tag::in2(safe_iterator_t<Rng2>),
                   tag::out(O)>
        merge(Rng1&& rng1, Rng2&& rng2, O result,
              Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <BidirectionalIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      I
        inplace_merge(I first, I middle, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <BidirectionalRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        inplace_merge(Rng&& rng, iterator_t<Rng> middle, Comp comp = Comp{},
                      Proj proj = Proj{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        class Proj1 = identity, class Proj2 = identity,
        IndirectStrictWeakOrder<projected<I1, Proj1>, projected<I2, Proj2>> Comp = less<>>
      bool
        includes(I1 first1, S1 last1, I2 first2, S2 last2, Comp comp = Comp{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, class Proj1 = identity,
        class Proj2 = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng1>, Proj1>,
          projected<iterator_t<Rng2>, Proj2>> Comp = less<>>
```
```cpp
      bool
        includes(Rng1&& rng1, Rng2&& rng2, Comp comp = Comp{},
                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<I1, I2, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(I1), tag::in2(I2), tag::out(O)>
        set_union(I1 first1, S1 last1, I2 first2, S2 last2, O result, Comp comp = Comp{},
                  Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O,
        class Comp = less<>, class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<iterator_t<Rng1>, iterator_t<Rng2>, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(safe_iterator_t<Rng1>),
                   tag::in2(safe_iterator_t<Rng2>),
                   tag::out(O)>
        set_union(Rng1&& rng1, Rng2&& rng2, O result, Comp comp = Comp{},
                  Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<I1, I2, O, Comp, Proj1, Proj2>
      O
        set_intersection(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                         Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O,
        class Comp = less<>, class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<iterator_t<Rng1>, iterator_t<Rng2>, O, Comp, Proj1, Proj2>
      O
        set_intersection(Rng1&& rng1, Rng2&& rng2, O result,
                         Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<I1, I2, O, Comp, Proj1, Proj2>
      tagged_pair<tag::in1(I1), tag::out(O)>
        set_difference(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                       Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O,
        class Comp = less<>, class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<iterator_t<Rng1>, iterator_t<Rng2>, O, Comp, Proj1, Proj2>
      tagged_pair<tag::in1(safe_iterator_t<Rng1>), tag::out(O)>
        set_difference(Rng1&& rng1, Rng2&& rng2, O result,
                       Comp comp = Comp{}, Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        WeaklyIncrementable O, class Comp = less<>,
        class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<I1, I2, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(I1), tag::in2(I2), tag::out(O)>
        set_symmetric_difference(I1 first1, S1 last1, I2 first2, S2 last2, O result,
                                 Comp comp = Comp{}, Proj1 proj1 = Proj1{},
                                 Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, WeaklyIncrementable O,
        class Comp = less<>, class Proj1 = identity, class Proj2 = identity>
      requires Mergeable<iterator_t<Rng1>, iterator_t<Rng2>, O, Comp, Proj1, Proj2>
      tagged_tuple<tag::in1(safe_iterator_t<Rng1>),
                   tag::in2(safe_iterator_t<Rng2>),
                   tag::out(O)>
        set_symmetric_difference(Rng1&& rng1, Rng2&& rng2, O result, Comp comp = Comp{},
                                 Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      I push_heap(I first, S last, Comp comp = Comp{}, Proj proj == Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        push_heap(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      I pop_heap(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        pop_heap(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      I make_heap(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        make_heap(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      I sort_heap(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Comp = less<>, class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      safe_iterator_t<Rng>
        sort_heap(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      bool is_heap(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      bool
        is_heap(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      I is_heap_until(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <RandomAccessRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        is_heap_until(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <class T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr const T& min(const T& a, const T& b, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <Copyable T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr T min(initializer_list<T> t, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <InputRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      requires Copyable<value_type_t<iterator_t<Rng>>>
      value_type_t<iterator_t<Rng>>
        min(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <class T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr const T& max(const T& a, const T& b, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <Copyable T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr T max(initializer_list<T> t, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <InputRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      requires Copyable<value_type_t<iterator_t<Rng>>>
      value_type_t<iterator_t<Rng>>
        max(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <class T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr tagged_pair<tag::min(const T&), tag::max(const T&)>
        minmax(const T& a, const T& b, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <Copyable T, class Proj = identity,
        IndirectStrictWeakOrder<projected<const T*, Proj>> Comp = less<>>
      constexpr tagged_pair<tag::min(T), tag::max(T)>
        minmax(initializer_list<T> t, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <InputRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      requires Copyable<value_type_t<iterator_t<Rng>>>
      tagged_pair<tag::min(value_type_t<iterator_t<Rng>>),
                  tag::max(value_type_t<iterator_t<Rng>>)>
        minmax(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      I min_element(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        min_element(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      I max_element(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      safe_iterator_t<Rng>
        max_element(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardIterator I, Sentinel<I> S, class Proj = identity,
        IndirectStrictWeakOrder<projected<I, Proj>> Comp = less<>>
      tagged_pair<tag::min(I), tag::max(I)>
        minmax_element(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <ForwardRange Rng, class Proj = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng>, Proj>> Comp = less<>>
      tagged_pair<tag::min(safe_iterator_t<Rng>),
                  tag::max(safe_iterator_t<Rng>)>
        minmax_element(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <InputIterator I1, Sentinel<I1> S1, InputIterator I2, Sentinel<I2> S2,
        class Proj1 = identity, class Proj2 = identity,
        IndirectStrictWeakOrder<projected<I1, Proj1>, projected<I2, Proj2>> Comp = less<>>
      bool
        lexicographical_compare(I1 first1, S1 last1, I2 first2, S2 last2,
                                Comp comp = Comp{},
                                Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <InputRange Rng1, InputRange Rng2, class Proj1 = identity,
        class Proj2 = identity,
        IndirectStrictWeakOrder<projected<iterator_t<Rng1>, Proj1>,
          projected<iterator_t<Rng2>, Proj2>> Comp = less<>>
      bool
        lexicographical_compare(Rng1&& rng1, Rng2&& rng2, Comp comp = Comp{},
                                Proj1 proj1 = Proj1{}, Proj2 proj2 = Proj2{});
     
    template <BidirectionalIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      bool next_permutation(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <BidirectionalRange Rng, class Comp = less<>,
        class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      bool
        next_permutation(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <BidirectionalIterator I, Sentinel<I> S, class Comp = less<>,
        class Proj = identity>
      requires Sortable<I, Comp, Proj>
      bool prev_permutation(I first, S last, Comp comp = Comp{}, Proj proj = Proj{});
     
    template <BidirectionalRange Rng, class Comp = less<>,
        class Proj = identity>
      requires Sortable<iterator_t<Rng>, Comp, Proj>
      bool
        prev_permutation(Rng&& rng, Comp comp = Comp{}, Proj proj = Proj{});
     
    }}}}
```