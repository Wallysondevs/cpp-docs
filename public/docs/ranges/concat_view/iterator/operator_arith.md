# std::ranges::concat_view&lt;Views...&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++26)
constexpr void operator++( int );  // (2) (desde C++26)
constexpr /*iterator*/ operator++( int )
requires /*all-forward*/<Const, Views...>;  // (3) (desde C++26)
constexpr /*iterator*/& operator\--()
requires /*concat-is-bidirectional*/<Const, Views...>;  // (4) (desde C++26)
constexpr /*iterator*/ operator\--( int )
requires /*concat-is-bidirectional*/<Const, Views...>;  // (5) (desde C++26)
constexpr /*iterator*/& operator+=( difference_type n )
requires /*concat-is-random-access*/<Const, Views...>;  // (6) (desde C++26)
constexpr /*iterator*/& operator-=( difference_type n )
requires /*concat-is-random-access*/<Const, Views...>;  // (7) (desde C++26)
```

Incrementa ou decrementa o [iterator](<#/doc/ranges/concat_view/iterator>).

Sobrecarga | Equivalente a
(seja I _[it_](<#/doc/ranges/concat_view/iterator>)_.index())
(1) | ++`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;(); `_[satisfy](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;(); return *this;
---|---
(2) | ++*this;
(3) | auto tmp = *this; ++*this; return tmp;
(4) | `_[prev](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;(); return *this;
(5) | auto tmp = *this; \--*this; return tmp;
(6) | auto offset =` ` `_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;() -` ` `_[get-begin](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;();
if (n > 0)
` ` `_[advance-fwd](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;(offset, n);
else if (n < 0)
` ` `_[advance-bwd](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;(offset, -n);
return *this;
(7) | *this += -n; return *this;

Se `_[it_](<#/doc/ranges/concat_view/iterator>)_` .valueless_by_exception() for true, o comportamento é indefinido.

### Parâmetros

- **n** — posição relativa à localização atual

### Valor de retorno

Conforme descrito acima.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo