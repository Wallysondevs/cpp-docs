# std::ranges::chunk_by_view&lt;V,Pred&gt;::iterator::operator*

```cpp
constexpr value_type operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual no `chunk_by_view`.

Equivalente a: return [ranges::subrange](<#/doc/ranges/subrange>)([`_current__`](<#/doc/ranges/chunk_by_view/iterator>) ,` `[` _next__`](<#/doc/ranges/chunk_by_view/iterator>)).

Antes da chamada a este operador, [`_current__`](<#/doc/ranges/chunk_by_view/iterator>) não deve ser igual a [`_next__`](<#/doc/ranges/chunk_by_view/iterator>), caso contrário, o comportamento é indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   