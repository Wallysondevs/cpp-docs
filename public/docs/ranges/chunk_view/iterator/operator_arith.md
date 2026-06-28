# std::ranges::chunk_view&lt;V&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr /*iterator*/ operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (3) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (4) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type x )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type x )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
```

  
Avança ou decrementa o [iterator](<#/doc/ranges/chunk_view/iterator/iterator>). 

Sejam `_current__`, `_end__` e `_n__` os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes de [`chunk_view::iterator`](<#/doc/ranges/chunk_view/iterator>). 

1) Equivalente a: 
```cpp
    missing_ = ranges::advance(current_, n_, end_);
    return *this;
```

Antes da invocação, a expressão `current_ != end_` deve ser verdadeira, caso contrário o comportamento é indefinido.

2) Equivalente a: `auto tmp = *this; ++*this; return tmp;`.

3) Equivalente a: 
```cpp
    ranges::advance(current_, missing_ - n_);
    missing_ = 0;
    return *this;
```

4) Equivalente a: `auto tmp = *this; --*this; return tmp;`.

5) Equivalente a: 
```cpp
    if (x > 0)
    {
        ranges::advance(current_, n_ * (x - 1));
        missing_ = ranges::advance(current_, n_, end_);
    }
    else if (x < 0)
    {
        ranges::advance(current_, n_ * x + missing_);
        missing_ = 0;
    }
    return *this;
```

Se `x` for positivo, então antes da invocação a expressão [ranges::distance](<#/doc/iterator/ranges/distance>)(current_, end_) > n_ * (x - 1) deve ser verdadeira (ou seja, informalmente, o chunk solicitado deve estar "dentro" da sequência subjacente). Se `x` for negativo, esta pré-condição é sempre satisfeita.

6) Equivalente a: `return *this += -x;`.

### Parâmetros

x  |  \-  |  uma posição relativa à localização atual   
  
### Valor de retorno

1,3,5,6) `*this`

2,4) uma cópia de `*this` que foi feita antes da alteração

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator+operator-](<#/doc/ranges/chunk_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterator   
(função)  