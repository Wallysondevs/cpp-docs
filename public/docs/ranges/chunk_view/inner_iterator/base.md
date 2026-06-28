# std::ranges::chunk_view&lt;V&gt;::inner-iterator::base

```cpp
constexpr const ranges::iterator_t<V>& base() const &;  // (desde C++23)
```

  
Retorna o iterator subjacente em cache para o elemento atual (no chunk atual) em `chunk_view`. 

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para o `chunk_view` envolvente. 

Equivalente a: return *[`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) ->[`_current_;_`](<#/doc/ranges/chunk_view>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Um iterator. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/chunk_view/inner_iterator/operator_star_>)(C++23) | acessa o elemento   
(função membro pública)  