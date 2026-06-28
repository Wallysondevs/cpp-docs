# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const noexcept(/* see below */);  // (desde C++23)
```

  
Retorna o elemento atual no `adjacent_transform_view`.

Sejam [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) e [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) os membros de dados do [iterator](<#/doc/ranges/adjacent_transform_view/iterator/iterator>). Equivalente a:
```cpp
    return apply(& -> decltype(auto)
                 {
                     return invoke(*parent_->fun_, *iters...);
                 },
                 inner_.current_);
```

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual.

### Exceções

Seja `_Is_` o pacote `0, 1, ..., (N - 1)`.

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::invoke](<#/doc/utility/functional/invoke>)(*parent_->fun_, *std::get&lt;Is&gt;(inner_.current_)...))

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/ranges/adjacent_transform_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  