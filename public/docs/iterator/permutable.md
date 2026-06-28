# std::permutable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept permutable =
std::forward_iterator<I> &&
std::indirectly_movable_storable<I, I> &&
std::indirectly_swappable<I, I>;
```

O concept `permutable` refina [std::forward_iterator](<#/doc/iterator/forward_iterator>) adicionando requisitos para reordenamento através de moves e swaps.

### Requisitos semânticos

`I` modela `permutable` apenas se todos os concepts que ele subsume forem modelados.

### Veja também

[ sortable](<#/doc/iterator/sortable>)(C++20) | especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas
(concept)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(objeto de função de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos enquanto preserva sua ordem relativa
(objeto de função de algoritmo)