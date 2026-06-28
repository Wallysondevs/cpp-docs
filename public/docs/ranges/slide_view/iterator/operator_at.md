# std::ranges::slide_view&lt;V&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr auto operator const
requires ranges::random_access_range<Base>;  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada.

Sejam [`_current__`](<#/doc/ranges/slide_view/iterator>) e [`_n__`](<#/doc/ranges/slide_view/iterator>) os membros de dados subjacentes. Equivalente a: return [views::counted](<#/doc/ranges/counted_view>)(current_ + pos, n_);.

### Parâmetros

pos  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento (do tipo [`_value_type_`](<#/doc/ranges/slide_view/iterator>)) no deslocamento pos relativo à localização atual.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/slide_view/iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  