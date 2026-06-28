# std::extents&lt;IndexType,Extents...&gt;::dynamic-index-inv

```cpp
private:
static constexpr auto /*dynamic-index-inv*/( rank_type i ) noexcept;  // (desde C++23)
(apenas para exposição*)
```

  
Retorna o número `r` tal que no intervalo `[`​0​`, `r + 1`)` existem exatamente `[`​0​`, `i + 1`)` extents dinâmicos. Se i <= rank_dynamic() for falso, o comportamento é indefinido. 

### Parâmetros

i  |  \-  |  o índice   
  
### Valor de retorno

O valor mínimo de `_r_` tal que [`_dynamic-index_`](<#/doc/container/mdspan/extents/dynamic-index>)(r + 1) == i + 1 seja verdadeiro. 

### Veja também

| Esta seção está incompleta   