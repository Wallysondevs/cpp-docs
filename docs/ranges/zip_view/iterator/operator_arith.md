```cpp
# std::ranges::zip_view<Views...>::iterator<Const>::operator++,--,+=,-=

constexpr /*iterator*/& operator++(); |  (1)  |  (desde C++23)  
---|---|---  
constexpr void operator++( int ); |  (2)  |  (desde C++23)  
constexpr /*iterator*/ operator++( int )  
requires /*all-forward*/<Const, Views...>; |  (3)  |  (desde C++23)  
constexpr /*iterator*/& operator\--()  
requires /*all-bidirectional*/<Const, Views...>; |  (4)  |  (desde C++23)  
constexpr /*iterator*/ operator\--( int )  
requires /*all-bidirectional*/<Const, Views...>; |  (5)  |  (desde C++23)  
constexpr /*iterator*/& operator+=( difference_type n )  
requires /*all-random-access*/<Const, Views...>; |  (6)  |  (desde C++23)  
constexpr /*iterator*/& operator-=( difference_type n )  
requires /*all-random-access*/<Const, Views...>; |  (7)  |  (desde C++23)  
| |   
  
Incrementa ou decrementa cada um dos iterators subjacentes `_is_..._` no objeto tipo tupla subjacente `_current__`. 

1) Equivalent to /*tuple-for-each*/( { ++i; }, current_); return *this;

2) Equivalent to ++*this;

3) Equivalent to auto tmp = *this; ++*this; return tmp;

4) Equivalent to /*tuple-for-each*/( { \--i; }, current_); return *this;

5) Equivalent to auto tmp = *this; \--*this; return tmp;

6) Equivalent to /*tuple-for-each*/([&]<class I>(I& i) { i += iter_difference_t<I>(x); }, current_); return *this;

7) Equivalent to /*tuple-for-each*/([&]<class I>(I& i) { i -= iter_difference_t<I>(x); }, current_); return *this;

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
---|---|---  
  
### Valor de retorno

1,4,6,7) *this

2) (nenhum)

3,5) uma cópia de *this que foi feita antes da alteração

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
---|---
```