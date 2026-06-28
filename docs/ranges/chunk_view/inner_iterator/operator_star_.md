# std::ranges::chunk_view&lt;V&gt;::inner-iterator::operator*

```cpp
constexpr ranges::range_reference_t<V> operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual no chunk atual na `chunk_view`.

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para a `chunk_view`. Equivalente a: `return` **[`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) ->[`_current_;_`](<#/doc/ranges/chunk_view>)`.

Antes da invocação deste operador, a expressão `*this == [std::default_sentinel](<#/doc/iterator/default_sentinel>)` deve ser falsa.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual no chunk atual.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ base](<#/doc/ranges/chunk_view/inner_iterator/base>)(C++23) | retorna um `iterator` para o elemento atual   
(função membro pública)  