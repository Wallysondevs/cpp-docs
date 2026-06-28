# std::ranges::join_with_view&lt;V,Pattern&gt;::iterator&lt;Const&gt;::operator++,--

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/ operator++( int )
requires std::is_reference_v</*InnerBase*/> &&
ranges::forward_range</*Base*/> &&
ranges::forward_range</*InnerBase*/>;  // (3) (desde C++23)
constexpr /*iterator*/& operator\--()
requires std::is_reference_v</*InnerBase*/> &&
ranges::bidirectional_range</*Base*/> &&
ranges::bidirectional_range</*InnerBase*/> &&
ranges::common_range</*InnerBase*/> &&
ranges::bidirectional_range</*PatternBase*/> &&
ranges::common_range</*PatternBase*/>;  // (4) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires std::is_reference_v</*InnerBase*/> &&
ranges::bidirectional_range</*Base*/> &&
ranges::bidirectional_range</*InnerBase*/> &&
ranges::common_range</*InnerBase*/> &&
ranges::bidirectional_range</*PatternBase*/> &&
ranges::common_range</*PatternBase*/>;  // (5) (desde C++23)
```

Incrementa ou decrementa o iterator.

1) Incrementa o [inner iterator](<#/doc/ranges/join_with_view/iterator>) como se por [std::visit](<#/doc/utility/variant/visit>)([](auto& it){ ++it; },` ` _[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿);.

Depois disso, ajusta os iterators interno e externo da seguinte forma:

* Se o inner iterator incrementado for o iterator past-the-end do range do padrão, ele é definido como um iterator para o início do próximo inner range.
* Se o inner iterator incrementado for o iterator past-the-end de um inner range, o outer iterator é incrementado. Então:

* Se o outer iterator incrementado não for o iterator past-the-end do outer range, o inner iterator é definido como um iterator para o início do range do padrão.
* Caso contrário, se [std::is_reference_v](<#/doc/types/is_reference>)<`_[InnerBase](<#/doc/ranges/join_with_view/iterator>)_` ﻿﻿> for true, o inner iterator é definido como um pattern iterator contendo um [valor singular](<#/doc/iterator>).

* Repete as operações acima até que o inner iterator não seja um iterator past-the-end, ou o outer iterator seja um iterator past-the-end.

2) Equivalente a `++*this;`.

3) Equivalente a `auto tmp = *this;`
`++*this;`
`return tmp;`.

4) Se o outer iterator for o iterator past-the-end do outer range, o decrementa e define o inner iterator para o iterator past-the-end do último inner range; caso contrário, não faz nada.

Depois disso, ajusta os iterators interno e externo da seguinte forma:

* Se o inner iterator se referir ao início de um inner range, ele é definido como o iterator past-the-end do range do padrão.
* Se o inner iterator se referir ao início do range do padrão, o outer iterator é decrementado, e o inner iterator é definido como o iterator past-the-end do inner range anterior.
* Repete as operações acima até que o inner iterator não se refira ao início de nenhum range.

Finalmente, decrementa o inner iterator como se por [std::visit](<#/doc/utility/variant/visit>)([](auto& it){ \--it; },` ` _[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿);.

5) Equivalente a `auto tmp = *this;`
`\--*this;`
`return tmp;`.

### Valor de retorno

1,4) `*this`

3,5) Uma cópia de `*this` que foi feita antes da alteração.