# synth-three-way, synth-three-way-result

```cpp
constexpr auto synth-three-way = /* veja abaixo */;  // (1) (desde C++20)
(apenas para exposição*)
template< class T, class U = T >
using synth-three-way-result =
decltype(synth-three-way(std::declval<T&>(), std::declval<U&>()));  // (2) (desde C++20)
(apenas para exposição*)
```

1) Um objeto de função cujo operator() se comporta como a função de comparação de três vias sintetizada. Equivalente a:
```
    constexpr auto synth-three-way =
        []<class T, class U>(const T& t, const U& u)
            requires requires
            {
                { t < u } -> boolean-testable;
                { u < t } -> boolean-testable;
            }
        {
            if constexpr (std::three_way_comparable_with<T, U>)
                return t <=> u;
            else
            {
                if (t < u)
                    return std::weak_ordering::less;
                if (u < t)
                    return std::weak_ordering::greater;
                return std::weak_ordering::equivalent;
            }
        };
```

2) O tipo de retorno do operator() de (1) (`_synth-three-way_`).

### Parâmetros

- **t, u** — os valores a serem comparados

### Valor de retorno

O resultado da comparação.

### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/pair/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores no `pair`
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores na `tuple`
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/array/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `array`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/deque/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `deque`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/forward_list/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `forward_list`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/list/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `list`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/vector/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `vector`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/map/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `map`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multimap/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multimap`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/set/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `set`s
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multiset/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multiset`s
(modelo de função)