# std::experimental::ranges::Range

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool Range =
requires(T&& t) {
ranges::begin(t); /* não necessariamente preserva a igualdade (veja abaixo) */
ranges::end(t);
};
```

Dado um lvalue `t` do tipo [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;, `Range<T>` é satisfeito apenas se

  * `[`[ranges::begin](<#/doc/ranges/begin>)(t)`, `[ranges::end](<#/doc/ranges/end>)(t)`)` denota um range; e
  * ambos [ranges::begin](<#/doc/ranges/begin>)(t) e [ranges::end](<#/doc/ranges/end>)(t) são de tempo constante amortizado e não modificadores.
  * Se [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;T&gt; satisfaz [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>), [ranges::begin](<#/doc/ranges/begin>)(t) preserva a igualdade.
