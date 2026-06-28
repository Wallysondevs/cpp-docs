# std::ranges::stride_view&lt;V&gt;::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++23)
constexpr auto end() const requires ranges::range<const V>  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/stride_view/iterator>) ou um [sentinel](<https://en.cppreference.com/mwiki/index.php?title=cpp/ranges/stride_view/sentinel&action=edit&redlink=1> "cpp/ranges/stride view/sentinel \(page does not exist\)") representando o fim da [`stride_view`](<#/doc/ranges/stride_view>). 

Sejam [`_base__`](<#/doc/ranges/stride_view>) e [`_stride__`](<#/doc/ranges/stride_view>) os membros de dados subjacentes. 

1) Seja Const definido como using Const = false; e Base como using Base = V;.

2) Seja Const definido como using Const = true; e Base como using Base = const V;.

Equivalente a: 
```cpp
    if constexpr (ranges::common_range<Base> &&
                  ranges::sized_range<Base> &&
                  ranges::forward_range<Base>)
    {
        auto missing = (stride_ - ranges::distance(base_) % stride_) % stride_;
        return iterator<Const>(this, ranges::end(base_), missing);
    }
    else if constexpr (ranges::common_range<Base> &&
                       !ranges::bidirectional_range<Base>)
    {
        return iterator<Const>(this, ranges::end(base_));
    }
    else
    {
        return std::default_sentinel;
    }
```

### Parâmetros

(nenhum) 

### Valor de retorno

Um [iterator](<#/doc/ranges/stride_view/iterator>) para o elemento que segue o último elemento, se a view subjacente V modelar [`common_range`](<#/doc/ranges/common_range>). Caso contrário, o [std::default_sentinel](<#/doc/iterator/default_sentinel>) que se compara como igual ao iterator final. 

### Observações

`stride_view<V>` modela [`common_range`](<#/doc/ranges/common_range>) sempre que a view subjacente V o faz. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begin](<#/doc/ranges/stride_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)