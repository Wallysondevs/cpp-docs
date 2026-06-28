# std::ranges::view_interface&lt;D&gt;::cbegin

```cpp
constexpr auto cbegin();  // (1) (desde C++23)
constexpr auto cbegin() const requires ranges::range<const D>;  // (2) (desde C++23)
```

  
A implementação padrão da função membro `cbegin()` retorna um iterator constante de início do range.

1) Seja `derived` uma referência vinculada a `static_cast<D&>(*this)`.

Equivalente a `return [ranges::cbegin](<#/doc/ranges/cbegin>)(derived);`.

2) O mesmo que (1), exceto que `derived` é `static_cast<const D&>(*this)`.

### Parâmetros

(nenhum) 

### Valor de retorno

Um iterator constante de início do range.

### Notas

Todos os adaptadores de range e fábricas de range na standard library e `[std::ranges::subrange](<#/doc/ranges/subrange>)` usam a implementação padrão de `cbegin`.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array   
(function template)  
[ ranges::cbegin](<#/doc/ranges/cbegin>)(C++20) | retorna um iterator para o início de um range somente leitura  
(customization point object)