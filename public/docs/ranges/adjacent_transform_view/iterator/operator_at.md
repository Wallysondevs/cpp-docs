# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires ranges::random_access_range<Base>;  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada. 

Sejam [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) e [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) os membros de dados do [iterator](<#/doc/ranges/adjacent_transform_view/iterator/iterator>). Equivalente a: 
```
    return apply(& -> decltype(auto)
                 {
                    return invoke(*parent_->fun_, iters[n]...);
                 },
                 inner_.current_);
```

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento no deslocamento n relativo à localização atual. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/adjacent_transform_view/iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  