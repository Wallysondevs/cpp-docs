# operator-(ranges::zip_view::sentinel)

```cpp
template< bool OtherConst >
requires (std::sized_sentinel_for<
ranges::sentinel_t</*maybe-const*/<Const, Views>>,
ranges::iterator_t</*maybe-const*/<OtherConst, Views>>> && ...)
friend constexpr
std::common_type_t<ranges::range_difference_t</*maybe-const*/<OtherConst, Views>>...>
operator-( const iterator<OtherConst>& x, const sentinel& y );  // (1) (desde C++23)
template< bool OtherConst >
requires (std::sized_sentinel_for<
ranges::sentinel_t</*maybe-const*/<Const, Views>>,
ranges::iterator_t</*maybe-const*/<OtherConst, Views>>> && ...)
friend constexpr
std::common_type_t<ranges::range_difference_t</*maybe-const*/<OtherConst, Views>>...>
operator-( const sentinel& y, const iterator<OtherConst>& x );  // (2) (desde C++23)
```

  
Calcula a distância mínima entre a tupla subjacente de iteradores de x e a tupla subjacente de sentinelas de y.

Essas funções não são visíveis para a pesquisa não qualificada ou qualificada comum, e só podem ser encontradas por pesquisa dependente de argumento (ADL) quando `zip_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/zip_view/iterator>)  
---|---|---
y  |  \-  |  uma [sentinel](<#/doc/ranges/zip_view/sentinel>)  
  
### Valor de retorno

Seja `_current__` a tupla subjacente de iteradores de x, e `_end__` a tupla subjacente de sentinelas de y.

Seja `_DIST_(x, y, i)` uma distância calculada por uma expressão equivalente a `std::get<i>(x.current_) - std::get<i>(y.end_)` para algum inteiro `i`.

1) o valor com o menor valor absoluto entre `_DIST_(x, y, i)` de todos os `i` no intervalo `0 ≤ i < sizeof...(Views)`

2) -(x - y).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <deque>
    #include <list>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        auto x = std::vector{1, 2, 3, 4};
        auto y = std::deque{'a', 'b', 'c'};
        auto z = {1.1, 2.2};
        auto w = std::list{1, 2, 3};
    
        auto p = std::views::zip(x, y, z);
        assert(p.begin() - p.end() == +2);
        assert(p.end() - p.begin() == -2);
    
        [[maybe_unused]]
        auto q = std::views::zip(x, y, w);
    
        // The following code fires a compile-time error because std::list::iterator
        // does not support operator- that is needed to calculate the distance:
        // auto e = q.begin() - q.end();
    }
```