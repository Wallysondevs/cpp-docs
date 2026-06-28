# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr auto operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual na `cartesian_product_view`. Equivalente a: 

return /*tuple-transform*/([](auto& i) -> decltype(auto) { return *i; },` `[` _current__`](<#/doc/ranges/cartesian_product_view/iterator>));. 

### Parâmetros

(nenhum) 

### Valor de retorno

O elemento atual. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/ranges/cartesian_product_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  