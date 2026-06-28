# Extensões para ranges

As Extensões C++ para Ranges, ISO/IEC TS 21425:2017, especificam uma modificação à linguagem central e definem novos componentes para a biblioteca padrão C++ listados nesta página.

O Ranges TS é baseado no padrão C++14, conforme modificado pelo [Concepts TS](<#/doc/experimental/constraints>).

#### Alterações na linguagem central

O Ranges TS modifica a especificação do [loop for baseado em range](<#/doc/language/range-for>) para permitir iterators de início e fim com tipos diferentes. Essa alteração permite o uso de sentinels e também está presente no C++17.

#### Concepts

##### Concepts da linguagem central

---
Definido no header `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```cpp
Definido no namespace `std::experimental::ranges`
 Same
(concept)
 DerivedFrom
(concept)
 ConvertibleTo
(concept)
 CommonReference
(concept)
 Common
(concept)
 Integral
(concept)
 SignedIntegral
(concept)
 UnsignedIntegral
(concept)
 Assignable
(concept)
 SwappableSwappableWith
(concept)
```

##### Concepts de comparação

Definido no header `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```cpp
Definido no namespace `std::experimental::ranges`
 Boolean
(concept)
 WeaklyEqualityComparableWith
(concept)
 EqualityComparableEqualityComparableWith
(concept)
 StrictTotallyOrderedStrictTotallyOrderedWith
(concept)
```

##### Concepts de objeto

Definido no header `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```cpp
Definido no namespace `std::experimental::ranges`
 Destructible
(concept)
 Constructible
(concept)
 DefaultConstructible
(concept)
 MoveConstructible
(concept)
 CopyConstructible
(concept)
 Movable
(concept)
 Copyable
(concept)
 Semiregular
(concept)
 Regular
(concept)
```

##### Concepts de invocáveis

Definido no header `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```cpp
Definido no namespace `std::experimental::ranges`
 InvocableRegularInvocable
(concept)
 Predicate
(concept)
 Relation
(concept)
 StrictWeakOrder
(concept)
```

##### Concept de gerador de números aleatórios

Definido no header `[<experimental/ranges/random>](<#/doc/header/experimental/ranges/random>)`

```cpp
Definido no namespace `std::experimental::ranges`
 UniformRandomNumberGenerator
(concept)
```

#### Utilitários gerais

##### Componentes utilitários

---
Definido no header `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```cpp
Definido no namespace `std::experimental::ranges`
 swap
(objeto de ponto de customização)
 exchange
(modelo de função)
```

##### Objetos de função

Definido no header `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```cpp
Definido no namespace `std::experimental::ranges`
 invoke
(modelo de função)
 equal_to
(modelo de classe)
 not_equal_to
(modelo de classe)
 greater
(modelo de classe)
 less
(modelo de classe)
 greater_equal
(modelo de classe)
 less_equal
(modelo de classe)
 identity
(classe)
```

##### Metaprogramação e type traits

Definido no header `[<experimental/ranges/type_traits>](<#/doc/header/experimental/ranges/type_traits>)`

```cpp
Definido no namespace `std::experimental::ranges`
 is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable
(modelo de classe)
 common_reference
(modelo de classe)
 common_type
(modelo de classe)
```

##### Pares e tuplas marcados

Definido no header `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```cpp
Definido no namespace `std::experimental::ranges`
 TagSpecifier
(concept)
 TaggedType
(concept)
 tagged
(modelo de classe)
 tagged_pair
(alias template)
 make_tagged_pair
(modelo de função)
Definido no header `<experimental/ranges/tuple>`
 tagged_tuple
(alias template)
 make_tagged_tuple
(modelo de função)
Definido no header `<experimental/ranges/algorithm>`
Definido no namespace `std::experimental::ranges::tag`
 inin1in2outout1out2funminmaxbeginend
(classe)
```

#### Iterators

Definido no header `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`
---

##### Concepts relacionados a iterators

Definido no namespace `std::experimental::ranges`

###### Concepts de iterator

[ Readable](<#/doc/experimental/ranges/iterator/Readable>) | especifica que um tipo é legível aplicando o operador `*`
(concept)
[ Writable](<#/doc/experimental/ranges/iterator/Writable>) | especifica que um valor pode ser escrito no objeto referenciado por um iterator
(concept)
[ WeaklyIncrementable](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>) | especifica que um tipo [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ Incrementable](<#/doc/experimental/ranges/iterator/Incrementable>) | especifica que a operação de incremento em um tipo [`WeaklyIncrementable`](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>) preserva a igualdade e que o tipo é [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>)
(concept)
[ Iterator](<#/doc/experimental/ranges/iterator/Iterator>) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[ Sentinel](<#/doc/experimental/ranges/iterator/Sentinel>) | especifica que objetos de um tipo são um sentinel para um tipo [`Iterator`](<#/doc/experimental/ranges/iterator/Iterator>)
(concept)
[ SizedSentinel](<#/doc/experimental/ranges/iterator/SizedSentinel>) | especifica que o operador `-` pode ser aplicado a um iterator e um sentinel para calcular sua diferença em tempo constante
(concept)
[ InputIterator](<#/doc/experimental/ranges/iterator/InputIterator>) | especifica que um tipo é um input iterator, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré e pós-incrementado
(concept)
[ OutputIterator](<#/doc/experimental/ranges/iterator/OutputIterator>) | especifica que um tipo é um output iterator para um dado tipo de valor, ou seja, valores desse tipo podem ser escritos nele e ele pode ser pré e pós-incrementado
(concept)
[ ForwardIterator](<#/doc/experimental/ranges/iterator/ForwardIterator>) | especifica que um [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>) é um forward iterator, suportando comparação de igualdade e múltiplas passagens
(concept)
[ BidirectionalIterator](<#/doc/experimental/ranges/iterator/BidirectionalIterator>) | especifica que um [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>) é um bidirectional iterator, suportando movimento para trás
(concept)
[ RandomAccessIterator](<#/doc/experimental/ranges/iterator/RandomAccessIterator>) | especifica que um [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>) é um random-access iterator, suportando avanço em tempo constante e indexação
(concept)

###### Concepts de invocáveis indiretos

[ IndirectUnaryInvocableIndirectRegularUnaryInvocable](<#/doc/experimental/ranges/iterator/IndirectUnaryInvocable>) | especifica que um tipo invocável pode ser invocado com o resultado da desreferência de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)
(concept)
[ IndirectUnaryPredicate](<#/doc/experimental/ranges/iterator/IndirectUnaryPredicate>) | especifica que um objeto invocável, quando invocado com o resultado da desreferência de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`Predicate`](<#/doc/experimental/ranges/concepts/Predicate>)
(concept)
[ IndirectRelation](<#/doc/experimental/ranges/iterator/IndirectRelation>) | especifica que um objeto invocável, quando invocado com o resultado da desreferência de alguns tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`Relation`](<#/doc/experimental/ranges/concepts/Relation>)
(concept)
[ IndirectStrictWeakOrder](<#/doc/experimental/ranges/iterator/IndirectStrictWeakOrder>) | especifica que um objeto invocável, quando invocado com o resultado da desreferência de alguns tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>), satisfaz [`StrictWeakOrder`](<#/doc/experimental/ranges/concepts/StrictWeakOrder>)
(concept)

###### Requisitos comuns de algoritmo

[ IndirectlyMovable](<#/doc/experimental/ranges/iterator/IndirectlyMovable>) | especifica que valores podem ser movidos de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>)
(concept)
[ IndirectlyMovableStorable](<#/doc/experimental/ranges/iterator/IndirectlyMovableStorable>) | especifica que valores podem ser movidos de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>) e que o movimento pode ser realizado através de um objeto intermediário
(concept)
[ IndirectlyCopyable](<#/doc/experimental/ranges/iterator/IndirectlyCopyable>) | especifica que valores podem ser copiados de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>)
(concept)
[ IndirectlyCopyableStorable](<#/doc/experimental/ranges/iterator/IndirectlyCopyableStorable>) | especifica que valores podem ser copiados de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) para um tipo [`Writable`](<#/doc/experimental/ranges/iterator/Writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)
[ IndirectlySwappable](<#/doc/experimental/ranges/iterator/IndirectlySwappable>) | especifica que os valores referenciados por dois tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) podem ser trocados
(concept)
[ IndirectlyComparable](<#/doc/experimental/ranges/iterator/IndirectlyComparable>) | especifica que os valores referenciados por dois tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) podem ser comparados
(concept)
[ Permutable](<#/doc/experimental/ranges/iterator/Permutable>) | especifica os requisitos comuns de algoritmos que reordenam elementos no local
(concept)
[ Mergeable](<#/doc/experimental/ranges/iterator/Mergeable>) | especifica os requisitos de algoritmos que mesclam sequências ordenadas em uma sequência de saída copiando elementos
(concept)
[ Sortable](<#/doc/experimental/ranges/iterator/Sortable>) | especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas
(concept)

###### Utilitários de concept

[ indirect_result_of](<#/doc/experimental/ranges/iterator/indirect_result_of>) | calcula o resultado de invocar um objeto invocável no resultado da desreferência de um conjunto de tipos [`Readable`](<#/doc/experimental/ranges/iterator/Readable>)
(modelo de classe)
[ projected](<#/doc/experimental/ranges/iterator/projected>) | modelo auxiliar para especificar as restrições em algoritmos que aceitam projeções
(modelo de classe)

##### Primitivos de iterator

###### Utilitários de iterator

Definido no namespace `std::experimental::ranges`

```cpp
 iter_move")
(objeto de ponto de customização)
 iter_swap")
(objeto de ponto de customização)
```

###### Traits de iterator

Definido no namespace `std::experimental::ranges`

```cpp
 difference_type
(modelo de classe)
 value_type
(modelo de classe)
 iterator_category
(modelo de classe)
 iterator_traits")
(alias template)
 reference_trvalue_reference_titer_common_reference_t
(alias template)
```

###### Tags de categoria de iterator

Definido no namespace `std::experimental::ranges`

```cpp
 input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tag
(classe)
```

###### Especializações de [std::iterator_traits](<#/doc/iterator/iterator_traits>)

Definido no namespace `std`

```cpp
 std::iterator_traits<InputIterator>std::iterator_traits<OutputIterator>")
(especialização de modelo de classe)
```

###### Operações de iterator

Definido no namespace `std::experimental::ranges`

```cpp
 advance
(modelo de função)
 distance
(modelo de função)
 next
(modelo de função)
 prev
(modelo de função)
```

##### Adaptadores de iterator

Definido no namespace `std::experimental::ranges`

```cpp
 reverse_iterator")
(modelo de classe)
 back_insert_iterator")
(modelo de classe)
 front_insert_iterator")
(modelo de classe)
 insert_iterator")
(modelo de classe)
 move_iterator")
(modelo de classe)
 move_sentinel")
(modelo de classe)
 common_iterator")
(modelo de classe)
 counted_iterator")
(modelo de classe)
 default_sentinel")
(classe)
 dangling
(modelo de classe)
 safe_iterator_t
(alias template)
 unreachable")
(classe)
```

##### Iterators de stream

Definido no namespace `std::experimental::ranges`

```cpp
 istream_iterator")
(modelo de classe)
 ostream_iterator")
(modelo de classe)
 istreambuf_iterator")
(modelo de classe)
 ostreambuf_iterator")
(modelo de classe)
```

#### Ranges

Definido no header `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`
---

##### Concepts de Range

[ Range](<#/doc/experimental/ranges/range/Range>) | especifica que um tipo é um range, ou seja, ele fornece um iterator `begin` e um sentinel `end`
(concept)
[ SizedRange](<#/doc/experimental/ranges/range/SizedRange>) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ View](<#/doc/experimental/ranges/range/View>) | especifica que um range é uma view, ou seja, possui cópia/movimento/atribuição em tempo constante
(concept)
[ BoundedRange](<#/doc/experimental/ranges/range/BoundedRange>) | especifica que um range possui tipos de iterator e sentinel idênticos
(concept)
[ InputRange](<#/doc/experimental/ranges/range/InputRange>) | especifica um range cujo tipo de iterator satisfaz [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>)
(concept)
[ OutputRange](<#/doc/experimental/ranges/range/OutputRange>) | especifica um range cujo tipo de iterator satisfaz [`OutputIterator`](<#/doc/experimental/ranges/iterator/OutputIterator>)
(concept)
[ ForwardRange](<#/doc/experimental/ranges/range/ForwardRange>) | especifica um range cujo tipo de iterator satisfaz [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>)
(concept)
[ BidirectionalRange](<#/doc/experimental/ranges/range/BidirectionalRange>) | especifica um range cujo tipo de iterator satisfaz [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>)
(concept)
[ RandomAccessRange](<#/doc/experimental/ranges/range/RandomAccessRange>) | especifica um range cujo tipo de iterator satisfaz [`RandomAccessIterator`](<#/doc/experimental/ranges/iterator/RandomAccessIterator>)
(concept)

##### Acesso a Range

Definido no namespace `std::experimental::ranges`

```cpp
 begincbegin")
(objeto de ponto de customização)
 endcend")
(objeto de ponto de customização)
 rbegincrbegin")
(objeto de ponto de customização)
 rendcrend")
(objeto de ponto de customização)
```

##### Primitivas de Range

Definido no namespace `std::experimental::ranges`

```cpp
 size")
(objeto de ponto de customização)
 empty")
(objeto de ponto de customização)
 datacdata")
(objeto de ponto de customização)
 iterator_tsentinel_t
(template de alias)
```

#### Algoritmos

Definido no header `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`
---

##### Operações de sequência não modificadoras

Definido no namespace `std::experimental::ranges`

```cpp
 all_ofany_ofnone_of
(template de função)
 for_each
(template de função)
 countcount_if
(template de função)
 mismatch
(template de função)
 equal
(template de função)
 lexicographical_compare
(template de função)
 findfind_iffind_if_not
(template de função)
 find_end
(template de função)
 find_first_of
(template de função)
 adjacent_find
(template de função)
 search
(template de função)
 search_n
(template de função)
```

##### Operações de sequência modificadoras

Definido no namespace `std::experimental::ranges`

```cpp
 copycopy_if
(template de função)
 copy_n")
(template de função)
 copy_backward")
(template de função)
 move")
(template de função)
 move_backward")
(template de função)
 fill")
(template de função)
 fill_n")
(template de função)
 transform")
(template de função)
 generate")
(template de função)
 generate_n")
(template de função)
 removeremove_if")
(template de função)
 remove_copyremove_copy_if")
(template de função)
 replacereplace_if")
(template de função)
 replace_copyreplace_copy_if")
(template de função)
 swap_ranges")
(template de função)
 reverse")
(template de função)
 reverse_copy")
(template de função)
 rotate")
(template de função)
 rotate_copy")
(template de função)
 shuffle")
(template de função)
 unique")
(template de função)
 unique_copy")
(template de função)
```

##### Operações de Particionamento

Definido no namespace `std::experimental::ranges`

```cpp
 is_partitioned")
(template de função)
 partition")
(template de função)
 partition_copy")
(template de função)
 stable_partition")
(template de função)
 partition_point")
(template de função)
```

##### Operações de Ordenação

Definido no namespace `std::experimental::ranges`

```cpp
 is_sorted")
(template de função)
 is_sorted_until")
(template de função)
 sort
(template de função)
 partial_sort")
(template de função)
 partial_sort_copy")
(template de função)
 stable_sort")
(template de função)
 nth_element")
(template de função)
```

##### Operações de busca binária (em ranges ordenados)

Definido no namespace `std::experimental::ranges`

```cpp
 lower_bound")
(template de função)
 upper_bound")
(template de função)
 binary_search")
(template de função)
 equal_range")
(template de função)
```

##### Operações de conjunto (em ranges ordenados)

Definido no namespace `std::experimental::ranges`

```cpp
 merge")
(template de função)
 inplace_merge")
(template de função)
 includes")
(template de função)
 set_difference")
(template de função)
 set_intersection")
(template de função)
 set_symmetric_difference")
(template de função)
 set_union")
(template de função)
```

##### Operações de Heap

Definido no namespace `std::experimental::ranges`

```cpp
 is_heap")
(template de função)
 is_heap_until")
(template de função)
 make_heap")
(template de função)
 push_heap")
(template de função)
 pop_heap")
(template de função)
 sort_heap")
(template de função)
```

##### Operações de Mínimo/Máximo

Definido no namespace `std::experimental::ranges`

```cpp
 max")
(template de função)
 max_element")
(template de função)
 min")
(template de função)
 min_element")
(template de função)
 minmax")
(template de função)
 minmax_element")
(template de função)
```

##### Operações de Permutação

Definido no namespace `std::experimental::ranges`

```cpp
 is_permutation
(template de função)
 next_permutation")
(template de função)
 prev_permutation")
(template de função)
```
