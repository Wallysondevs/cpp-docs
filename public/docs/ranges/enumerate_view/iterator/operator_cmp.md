# operator==,&lt;=&gt;(ranges::enumerate_view::iterator)

```cpp
friend constexpr bool
operator==( const /*iterator*/& x, const /*iterator*/& y ) noexcept;  // (1) (desde C++23)
friend constexpr std::strong_ordering
operator<=>( const /*iterator*/& x, const /*iterator*/& y ) noexcept;  // (2) (desde C++23)
```

  
Compara os [iterators](<#/doc/ranges/enumerate_view/iterator>) subjacentes. Seja [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) o índice subjacente.

1) Equivalente a `return x.pos_ == y.pos_;`.

2) Equivalente a `return x.pos_ <=> y.pos_;`.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::enumerate_view::_iterator_ <Const>` é uma classe associada dos argumentos.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

Resultado da comparação.

### Veja também

[ operator==](<#/doc/ranges/enumerate_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`enumerate_view::begin`](<#/doc/ranges/enumerate_view/begin>)   
(função)  