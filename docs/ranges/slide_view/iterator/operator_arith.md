# std::ranges::slide_view&lt;V&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr /*iterator*/ operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (3) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (4) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type n )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type n )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
```

  
Avança ou decrementa o [iterador](<#/doc/ranges/slide_view/iterator/iterator>).

Sejam [`_current__`](<#/doc/ranges/slide_view/iterator>) e [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) os iteradores subjacentes para o início e fim da janela deslizante.

1) Equivalente a: 
```
    current_ = ranges::next(current_);
    last_ele_ = ranges::next(last_ele_); // if last_ele_ is present
    return *this;
```

Antes da invocação, `_current__` e `_last_ele__` (se presente) devem ser incrementáveis.

2) Equivalente a: auto tmp = *this; ++*this; return tmp;

3) Equivalente a: 
```
    current_ = ranges::prev(current_);
    last_ele_ = ranges::prev(last_ele_); // if last_ele_ is present
    return *this;
```

Antes da invocação, `_current__` e `_last_ele__` (se presente) devem ser decrementáveis.

4) Equivalente a: auto tmp = *this; \--*this; return tmp;

5) Equivalente a: 
```
    current_ = current_ + n;
    last_ele_ = last_ele_ + n; // if last_ele_ is present
    return *this;
```

Antes da invocação, as expressões current_ + n e last_ele_ + n (se `_last_ele__` estiver presente) devem ter comportamento bem definido.

6) Equivalente a: 
```
    current_ = current_ - n;
    last_ele_ = last_ele_ - n; // if last_ele_ is present
    return *this;
```

Antes da invocação, as expressões current_ - n e last_ele_ - n (se `_last_ele__` estiver presente) devem ter comportamento bem definido.

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,3,5,6) *this

2,4) uma cópia de *this que foi feita antes da alteração

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator+operator-](<#/doc/ranges/slide_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iteradores   
(função)  