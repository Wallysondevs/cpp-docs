# std::extents&lt;IndexType,Extents...&gt;::dynamic-index

```cpp
private:
static constexpr auto /*dynamic-index*/( rank_type i ) noexcept;  // (desde C++23)
(apenas para exposição*)
```

  
Retorna o número de extents dinâmicos abaixo do índice i. Se i <= rank() for falso, o comportamento é indefinido. 

### Parâmetros

i  |  \-  |  o índice   
  
### Valor de retorno

O número de `_E r_` com `r < i` para os quais `_E r_` é um extent dinâmico. 

### Veja também

| Esta seção está incompleta   