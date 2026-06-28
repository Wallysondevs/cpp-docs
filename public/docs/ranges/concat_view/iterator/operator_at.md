# std::ranges::concat_view&lt;Views...&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires /*concat-is-random-access*/<Const, Views...>;  // (desde C++26)
```

  
Retorna uma referência para um elemento em uma localização relativa especificada.

### Parâmetros

pos  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

*((*this) + pos)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*](<#/doc/ranges/concat_view/iterator/operator_star_>)(C++26) |  acessa o elemento   
(função membro pública)  