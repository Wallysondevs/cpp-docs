# std::extents&lt;IndexType,Extents...&gt;::index-cast

```cpp
template< class OtherIndexType >
static constexpr auto /*index-cast*/( OtherIndexType&& i ) noexcept;  // (desde C++23)
(apenas para exposição*)
```

  
Converte o índice `i` do tipo `OtherIndexType` para um certo tipo integral.

É equivalente a: 

  * `return i;`, se `OtherIndexType` for um tipo integral diferente de `bool` e 
  * `return static_cast<index_type>(i);` caso contrário. 

### Parâmetros

i  |  \-  |  o índice a ser convertido   
  
### Valor de retorno

Índice convertido. 

### Observações

Uma chamada a esta função sempre retornará um tipo integral diferente de `bool`. [Tipos de classe inteira](<#/doc/iterator/is-integer-like>) podem usar o ramo `static_cast` sem perda de precisão porque os locais de chamada desta função já são restritos quanto à convertibilidade de `OtherIndexType` para `index_type`. 