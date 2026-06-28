# operator==,&lt;=&gt;(ranges::cartesian_product_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable<ranges::iterator_t</*maybe-const*/<Const, First>>>;  // (1) (desde C++23)
friend constexpr bool operator==( const /*iterator*/& x, std::default_sentinel_t );  // (2) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires /*all-random-access*/<Const, First, Vs...>;  // (2) (desde C++23)
```

  
Compara dois [iterators](<#/doc/ranges/cartesian_product_view/iterator>) ou um iterator e um sentinel.

Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) o tuple subjacente de iterators.

1) Equivalente a: return x.current_ == y.current_;

2) Retorna true se std::get<i>(x.current_) == [ranges::end](<#/doc/ranges/end>)(std::get<i>(x.parent_->bases_)) for true para qualquer inteiro 0 ≤ i ≤ sizeof...(Vs). Caso contrário, retorna false.

3) Equivalente a: return x.current_ <=> y.current_;

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::cartesian_product_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iterators ou sentinels para comparar   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator==](<https://en.cppreference.com/mwiki/index.php?title=cpp/ranges/cartesian_product_view/sentinel/operator_cmp&action=edit&redlink=1> "cpp/ranges/cartesian product view/sentinel/operator cmp \(page does not exist\)")(C++23) | compara um sentinel com um iterator retornado de [`cartesian_product_view::begin`](<#/doc/ranges/cartesian_product_view/begin>)   
(função)  