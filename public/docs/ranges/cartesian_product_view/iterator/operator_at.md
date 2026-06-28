# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr reference operator const
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (desde C++23)
```

  
Retorna um elemento na localização relativa especificada. Equivalente a: `return *((*this) + n);`. 

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento no deslocamento `n` relativo à localização atual. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/cartesian_product_view/iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  