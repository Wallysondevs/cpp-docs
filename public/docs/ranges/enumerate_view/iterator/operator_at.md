# std::ranges::enumerate_view&lt;V&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr auto operator const
requires ranges::random_access_range<Base>  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada. Equivalente a: return` `[` _reference-type_`](<#/doc/ranges/enumerate_view/iterator>)([`_pos__`](<#/doc/ranges/enumerate_view/iterator>)` `+ n,` `[` _current__`](<#/doc/ranges/enumerate_view/iterator>)[n]);. 

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento no deslocamento n em relação à localização atual. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator*](<#/doc/ranges/enumerate_view/iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  