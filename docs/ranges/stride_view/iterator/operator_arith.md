# std::ranges::stride_view&lt;V&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

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

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/stride_view/iterator/iterator>). 

Sejam [`_current__`](<#/doc/ranges/stride_view/iterator>), [`_end__`](<#/doc/ranges/stride_view/iterator>), [`_stride__`](<#/doc/ranges/stride_view/iterator>), e [`_missing__`](<#/doc/ranges/stride_view/iterator>) os membros de dados do [iterator](<#/doc/ranges/stride_view/iterator/iterator>). 

1) Equivalente a 
```cpp
    missing_ = ranges::advance(current_, stride_, end_);
    return *this;
```

Antes da chamada, [`_current__`](<#/doc/ranges/stride_view/iterator>) não deve ser igual a [`_end__`](<#/doc/ranges/stride_view/iterator>).

2) Equivalente a `++*this;`.

3) Equivalente a `auto tmp = *this; ++*this; return tmp;`.

4) Equivalente a 
```cpp
    ranges::advance(current_, missing_ - stride_);
    missing_ = 0;
    return *this;
```

5) Equivalente a `auto tmp = *this; --*this; return tmp;`.

6) Equivalente a 
```cpp
    if (n > 0)
    {
        ranges::advance(current_, stride_ * (n - 1));
        missing_ = ranges::advance(current_, stride_, end_);
    }
    else if (n < 0)
    {
        ranges::advance(current_, stride_ * n + missing_);
        missing_ = 0;
    }
    
    return *this;
```

Se n > 0, então antes da chamada a esta função, [ranges::distance](<#/doc/iterator/ranges/distance>)(current_, end_) deve ser maior que `stride_ * (n - 1)`. 

Note que se n < 0, o [ranges::distance](<#/doc/iterator/ranges/distance>)(current_, end_) é sempre maior que `stride_ * (n - 1)` (não-positivo).

7) Equivalente a `return *this += -n;`

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,4,6,7) `*this`

2) (nenhum)

3,5) uma cópia de `*this` que foi feita antes da alteração

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator+operator-](<#/doc/ranges/stride_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterator   
(função)  