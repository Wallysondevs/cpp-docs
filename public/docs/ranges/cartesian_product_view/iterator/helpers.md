# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::next, std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::prev, std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::distance_from

## std::ranges::cartesian_product_view::_iterator_ ::_next_

```cpp
template< std::size_t N = sizeof...(Vs) >
constexpr void /*next*/();  // (desde C++23)
(exposition only*)
```

Se chamado com o parâmetro de template padrão, gera recursivamente o próximo elemento (a tupla de iteradores) em `cartesian_product_view`.

Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) a tupla subjacente de iteradores. Equivalente a:
```cpp
    auto& it = std::get<N>(current_);
    ++it;
    if constexpr (N > 0)
    {
        if (it == ranges::end(std::get<N>(parent_->bases_)))
        {
            it = ranges::begin(std::get<N>(parent_->bases_));
            next<N - 1>();
        }
    }
```

Usado nas seguintes funções membro não estáticas:

* ranges::cartesian_product_view::[`operator+`](<#/doc/ranges/cartesian_product_view/iterator/operator_arith>)

## std::ranges::cartesian_product_view::_iterator_ ::_prev_

```cpp
template< std::size_t N = sizeof...(Vs) >
constexpr void /*prev*/();  // (desde C++23)
(exposition only*)
```

Se chamado com o parâmetro de template padrão, gera recursivamente o elemento anterior (a tupla de iteradores) em `cartesian_product_view`.

Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) a tupla subjacente de iteradores. Equivalente a:
```cpp
    auto& it = std::get<N>(current_);
    if constexpr (N > 0)
    {
        if (it == ranges::begin(std::get<N>(parent_->bases_)))
        {
            it = /*cartesian-common-arg-end*/(std::get<N>(parent_->bases_));
            prev<N - 1>();
        }
    }
    --it;
```

Usado nas seguintes funções membro não estáticas:

* ranges::cartesian_product_view::[`operator-`](<#/doc/ranges/cartesian_product_view/iterator/operator_arith>)

## std::ranges::cartesian_product_view::_iterator_ ::_distance_from_

```cpp
template< class Tuple >
constexpr difference_type
/*distance-from*/( const Tuple& t ) const;  // (desde C++23)
(exposition only*)
```

Retorna a "distância" (ou seja, número de "saltos") entre dois [iteradores](<#/doc/ranges/cartesian_product_view/iterator>).

Seja:

* [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) o ponteiro subjacente para `cartesian_product_view`
* /*scaled-size*/(N) seja:
  * o produto de static_cast<difference_type>([ranges::size](<#/doc/ranges/size>)(std::get&lt;N&gt;(parent_->bases_))) e /*scaled-size*/(N + 1) se N ≤ sizeof...(Vs), caso contrário
  * static_cast<difference_type>(1);
* /*scaled-distance*/(N) seja o produto de static_cast<difference_type>(std::get&lt;N&gt;(current_) - std::get&lt;N&gt;(t)) e /*scaled-size*/(N + 1);
* /*scaled-sum*/ seja a soma de /*scaled-distance*/(N) para cada inteiro 0 ≤ N ≤ sizeof...(Vs).

Retorna: /*scaled-sum*/.

O comportamento é indefinido se /*scaled-sum*/ não puder ser representado por `difference_type`.

Usado nas seguintes funções:

* [`operator-`](<#/doc/ranges/cartesian_product_view/iterator/operator_arith2>)(const /*iterator*/&, const /*iterator*/&)
* [`operator-`](<#/doc/ranges/cartesian_product_view/iterator/operator_arith2>)(const /*iterator*/&, [std::default_sentinel_t](<#/doc/iterator/default_sentinel>))

### Parameters

- **t** — uma tupla de iteradores para encontrar a distância até