# std::ranges::chunk_view&lt;V&gt;::outer-iterator::operator*

```cpp
constexpr value_type operator*() const;  // (desde C++23)
```

  
Retorna o chunk atual no `chunk_view`.

Seja [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) o ponteiro subjacente, e [`_value_type_`](<#/doc/ranges/chunk_view/outer_iterator>) uma classe aninhada que é o tipo de valor do [iterator](<#/doc/ranges/chunk_view/outer_iterator>).

Equivalente a: `return value_type(*parent_);`.

Antes da invocação deste operador, a expressão `*this == [std::default_sentinel](<#/doc/iterator/default_sentinel>)` deve ser falsa.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual (um chunk).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   