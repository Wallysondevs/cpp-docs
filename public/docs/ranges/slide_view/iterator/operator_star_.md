# std::ranges::slide_view&lt;V&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr auto operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual na `slide_view`. 

Sejam [`_current__`](<#/doc/ranges/slide_view/iterator>) e [`_n__`](<#/doc/ranges/slide_view/iterator>) os membros de dados subjacentes. Equivalente a: return [views::counted](<#/doc/ranges/counted_view>)(current_, n_). 

### Parâmetros

(nenhum) 

### Valor de retorno

O elemento atual, que é um objeto de [`_value_type_`](<#/doc/ranges/slide_view/iterator>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/ranges/slide_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  