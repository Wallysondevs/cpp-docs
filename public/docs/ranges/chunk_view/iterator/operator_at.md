# std::ranges::chunk_view&lt;V&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr value_type operator const
requires ranges::random_access_range<Base>;  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada.

Equivalente a: return *(*this + pos);.

### Parâmetros

pos  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento (do tipo [`_value_type_`](<#/doc/ranges/chunk_view/iterator>)) no deslocamento pos em relação à localização atual.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/chunk_view/iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  