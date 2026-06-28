# std::ranges::chunk_by_view&lt;V,Pred&gt;::end

```cpp
constexpr auto end();  // (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/chunk_by_view/iterator>) ou um [sentinel](<#/doc/iterator/default_sentinel>) representando o fim da [`chunk_by_view`](<#/doc/ranges/chunk_by_view>). 

Equivalente a: 
```cpp
    if constexpr (ranges::common_range<V>)
        return /*iterator*/(*this, ranges::end(base_), ranges::end(base_));
    else
        return std::default_sentinel;
```

### Parâmetros

(nenhum) 

### Valor de retorno

Um [iterator](<#/doc/ranges/chunk_by_view/iterator>) para o elemento que segue o último elemento, ou um sentinel que se compara como igual ao iterator final. 

### Observações

`end()` retorna um iterator se e somente se a view subjacente for um [`common_range`](<#/doc/ranges/common_range>): chunk_by_view<V,Pred> modela [`common_range`](<#/doc/ranges/common_range>) sempre que V o faz. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begin](<#/doc/ranges/chunk_by_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)