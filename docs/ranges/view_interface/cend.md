# std::ranges::view_interface&lt;D&gt;::cend

```cpp
constexpr auto cend();  // (1) (desde C++23)
constexpr auto cend() const requires ranges::range<const D>;  // (2) (desde C++23)
```

  
A implementação padrão da função membro `cend()` retorna o sentinel para o iterador constante do range.

1) Seja `derived` uma referência ligada a `static_cast<D&>(*this)`. Equivalente a `return [ranges::cend](<#/doc/ranges/cend>)(derived);`.

2) O mesmo que (1), exceto que `derived` é `static_cast<const D&>(*this)`.

### Parâmetros

(nenhum) 

### Valor de retorno

O sentinel para o iterador constante do range.

### Observações

Todos os adaptadores de range e fábricas de range na standard library e `[std::ranges::subrange](<#/doc/ranges/subrange>)` usam a implementação padrão de `cend`.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterador para o fim de um container ou array   
(modelo de função)  
[ ranges::cend](<#/doc/ranges/cend>)(C++20) | retorna um sentinel indicando o fim de um range somente leitura  
(objeto de ponto de customização)