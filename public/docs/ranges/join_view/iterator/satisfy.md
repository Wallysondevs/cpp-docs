# std::ranges::join_view&lt;V&gt;::iterator&lt;Const&gt;::satisfy

```cpp
constexpr void satisfy();  // (desde C++20)
(exposition only*)
```

  
Pula sobre ranges internos vazios e inicializa o iterator subjacente [`_inner__`](<#/doc/ranges/join_view/iterator>). 

Seja a constante /*ref-is-glvalue*/ [std::is_reference_v](<#/doc/types/is_reference>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>. 

O corpo da função é equivalente a 
```cpp
    auto update_inner = this<Base>& x) -> auto&&
    {
        if constexpr (/*ref-is-glvalue*/)     // *x é uma referência
            return *x;
        else
            return parent_->inner_./*emplace-deref*/(x);
    };
    
    for (; outer_ != ranges::end(parent_->base_); ++outer_)
    {
        auto&& inner = update_inner(outer_);
        inner_ = ranges::begin(inner);
        if (inner_ != ranges::end(inner))
            return;
    }
    
    if constexpr (/*ref-is-glvalue*/)
        inner_ = InnerIter();
```

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 