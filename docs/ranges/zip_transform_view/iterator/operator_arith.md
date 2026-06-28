# std::ranges::zip_transform_view&lt;F,Views...&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/ operator++( int )
requires ranges::forward_range<Base>;  // (3) (desde C++23)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (4) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (5) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type n )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type n )
requires ranges::random_access_range<Base>;  // (7) (desde C++23)
```

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/zip_transform_view/iterator>). 

Seja [`_inner__`](<#/doc/ranges/zip_transform_view/iterator>) o iterator subjacente e [`_Base_`](<#/doc/ranges/zip_transform_view/iterator>) o tipo membro apenas para exposição. 

Equivalente a: 

1) ++inner_; return *this;

2) ++*this;

3) auto tmp = *this; ++*this; return tmp;

4) \--inner_; return *this;

5) auto tmp = *this; \--*this; return tmp;

6) inner_ += n; return *this;

7) inner_ -= n; return *this;

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,4,6,7) *this

2) (nenhum)

3,5) uma cópia de *this que foi feita antes da alteração

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também  
  
---