# std::ranges::adjacent_view&lt;V,N&gt;::end

```cpp
constexpr auto end() requires (!__SimpleView<V>);  // (1) (desde C++23)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/adjacent_view/iterator>) ou um [sentinel](<#/doc/ranges/adjacent_view/sentinel>) representando o fim da [`adjacent_view`](<#/doc/ranges/adjacent_view>). 

Seja [`_base__`](<#/doc/ranges/adjacent_view>) a view subjacente. 

1) Equivalente a: 
```
    if constexpr (ranges::common_range<V>)
        return /*iterator*/<false>(__as_sentinel{}, ranges::begin(base_), ranges::end(base_));
    else
        return /*sentinel*/<false>(ranges::end(base_));
```

2) Equivalente a: 
```
    if constexpr (ranges::common_range<const V>)
        return /*iterator*/<true>(__as_sentinel{}, ranges::begin(base_), ranges::end(base_));
    else
        return /*sentinel*/<true>(ranges::end(base_));
```

### Parâmetros

(nenhum) 

### Valor de retorno

Um [iterator](<#/doc/ranges/adjacent_view/iterator>) para o elemento seguinte ao último elemento, se a view subjacente V modelar [`common_range`](<#/doc/ranges/common_range>). Caso contrário, um [sentinel](<#/doc/ranges/adjacent_view/sentinel>) que se compara como igual ao iterator final. 

### Observações

[ranges::adjacent_view](<#/doc/ranges/adjacent_view>)<V,N> modela [`common_range`](<#/doc/ranges/common_range>) sempre que a view subjacente V o faz. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ begin](<#/doc/ranges/adjacent_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)