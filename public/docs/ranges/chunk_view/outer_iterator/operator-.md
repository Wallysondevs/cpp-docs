# operator-(ranges::chunk_view::outer-iterator)

```cpp
friend constexpr difference_type operator-( std::default_sentinel_t s,
const /*outer-iterator*/& i )
requires ranges::sized_sentinel_for<ranges::sentinel_t<V>,
ranges::iterator_t<V>>;  // (1) (desde C++23)
friend constexpr difference_type operator-( const /*outer-iterator*/& i,
std::default_sentinel_t s )
requires ranges::sized_sentinel_for<ranges::sentinel_t<V>,
ranges::iterator_t<V>>;  // (2) (desde C++23)
```

  
Calcula a distância (em número de chunks) entre o [iterator](<#/doc/ranges/chunk_view/outer_iterator>) e o [sentinel](<#/doc/iterator/default_sentinel>).

Seja [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) o ponteiro subjacente para o `chunk_view` envolvente.

1) Equivalente a:
```cpp
    const auto dist = ranges::end(i.parent_->base_) - *i.parent_->current_;
    if (dist < i.parent_->remainder_)
        return dist == 0 ? 0 : 1;
    return /*div-ceil*/(dist - i.parent_->remainder_, i.parent_->n_) + 1;
```

2) Equivalente a: return -(s - i);.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::chunk_view::_outer-iterator_` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  o [iterator](<#/doc/ranges/chunk_view/outer_iterator>)  
---|---|---
s  |  \-  |  o sentinel   
  
### Valor de retorno

A distância entre o iterator e o sentinel fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ operator++](<#/doc/ranges/chunk_view/outer_iterator/operator_inc>)(C++23) |  incrementa o iterator   
(função membro pública)  