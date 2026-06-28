# std::ranges::chunk_view&lt;V&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr value_type operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual na `chunk_view`. 

Sejam `_current__`, `_end__`, e `_n__` os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes. 

Equivalente a: return [views::take](<#/doc/ranges/take_view>)([ranges::subrange](<#/doc/ranges/subrange>)(current_, end_), n_). 

Antes da invocação, a expressão `current_ != end_` deve ser verdadeira, caso contrário o comportamento é indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

O elemento atual, que é um objeto de [`_value_type_`](<#/doc/ranges/chunk_view/iterator>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/ranges/chunk_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  