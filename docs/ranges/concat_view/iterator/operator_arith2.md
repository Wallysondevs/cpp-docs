# operator+,-(ranges::concat_view::iterator)

```cpp
friend constexpr /*iterator*/
operator+( const /*iterator*/& it, difference_type n )
requires /*concat-is-random-access*/<Const, Views...>;
```
| (1) | (desde C++26)
```cpp
friend constexpr /*iterator*/
operator+( difference_type n, const /*iterator*/& it )
requires /*concat-is-random-access*/<Const, Views...>;
```
| (2) | (desde C++26)
```cpp
friend constexpr /*iterator*/
operator-( const /*iterator*/& it, difference_type n )
requires /*concat-is-random-access*/<Const, Views...>;
```
| (3) | (desde C++26)
```cpp
friend constexpr difference_type
operator-( const /*iterator*/& x, const /*iterator*/& y )
requires /*concat-is-random-access*/<Const, Views...>;
```
| (4) | (desde C++26)
```cpp
friend constexpr difference_type
operator-( const /*iterator*/& x, std::default_sentinel_t )
requires /* see description */;
```
| (5) | (desde C++26)
```cpp
friend constexpr difference_type
operator-( std::default_sentinel_t, const /*iterator*/& x )
requires /* see description */;
```
| (6) | (desde C++26)

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/concat_view/iterator/iterator>).

1) Equivalente a `auto t = it; t += n; return t;`.

2) Equivalente a `return it + n;`.

3) Equivalente a `auto t = it; t -= n; return t;`.

4) Seja Ix igual a x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .index() e Iy igual a y.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .index(): 

  * Se Ix > Iy for verdadeiro, equivalente a `difference_type result = [ranges::distance](<#/doc/iterator/ranges/distance>)(y.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` <Iy>(), y.`_[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` <Iy>());`  
`for ([std::size_t](<#/doc/types/size_t>) I = Iy + 1; I < Ix; I++)`  
` `result += [ranges::distance](<#/doc/iterator/ranges/distance>)(x.`_[get-view](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;I&gt;());`  
`return result + [ranges::distance](<#/doc/iterator/ranges/distance>)(x.`_[get-begin](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Ix&gt;(), x.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Ix&gt;());`. 
  * Caso contrário, se Ix < Iy for verdadeiro, equivalente a `return -(y - x);`. 
  * Caso contrário, equivalente a `return x.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Ix&gt;() - y.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Iy&gt;();`.

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .valueless_by_exception() || y.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .valueless_by_exception() for verdadeiro, o comportamento é indefinido.

5) Seja Ix igual a x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .index(), equivalente a `difference_type result = [ranges::distance](<#/doc/iterator/ranges/distance>)(x.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Ix&gt;(), x.`_[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` &lt;Ix&gt;());`  
`for ([std::size_t](<#/doc/types/size_t>) I = Ix + 1, count = sizeof...(Views); I < count; I++)`  
` `result += [ranges::distance](<#/doc/iterator/ranges/distance>)(x.`_[get-view](<#/doc/ranges/concat_view/iterator/helpers>)_` <I>());`  
`return -result;`.

Seja `Fs` o pack que consiste em todos os elementos de `Views` exceto o primeiro elemento, a expressão na cláusula requires é equivalente a 

```cpp
(std::sized_sentinel_for<ranges::sentinel_t<`_maybe-const_` <Const, Views>>,
` `ranges::iterator_t<`_maybe-const_` <Const, Views>>> && ...) &&
` `(ranges::sized_range<`_maybe-const_` <Const, Fs>> && ...)
```

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .valueless_by_exception() for verdadeiro, o comportamento é indefinido.

6) Equivalente a `return -(x - [std::default_sentinel](<#/doc/iterator/default_sentinel>));`.

Seja `Fs` o pack que consiste em todos os elementos de `Views` exceto o primeiro elemento, a expressão na cláusula requires é equivalente a 

```cpp
(std::sized_sentinel_for<ranges::sentinel_t<`_maybe-const_` <Const, Views>>,
` `ranges::iterator_t<`_maybe-const_` <Const, Views>>> && ...) &&
` `(ranges::sized_range<`_maybe-const_` <Const, Fs>> && ...)
```

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` .valueless_by_exception() for verdadeiro, o comportamento é indefinido.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `concat_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

it, x, y  |  \-  |  os [iterators](<#/doc/ranges/concat_view/iterator>)  
---|---|---
n  |  \-  |  uma posição relativa à localização atual   
  
### Valor de retorno

Conforme descrito acima. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/concat_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  