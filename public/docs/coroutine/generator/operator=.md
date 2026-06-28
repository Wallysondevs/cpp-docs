# std::generator&lt;Ref,V,Allocator&gt;::operator=

```cpp
generator& operator=( generator other ) noexcept;  // (desde C++23)
```

  
Substitui o conteúdo do objeto generator. Equivalente a: 

std::[`swap`](<#/doc/utility/swap>)([`_coroutine__`](<#/doc/coroutine/generator>)`,` `other.[`_coroutine__`](<#/doc/coroutine/generator>));  
std::[`swap`](<#/doc/utility/swap>)([`_active__`](<#/doc/coroutine/generator>)`,` `other.[`_active__`](<#/doc/coroutine/generator>));

### Parâmetros

other  |  \-  |  outro generator do qual mover   
  
### Valor de retorno

*this

### Complexidade

| Esta seção está incompleta   
  
### Observações

Iterators obtidos anteriormente de other não são invalidados – eles se tornam iterators para *this. 

Este operador de atribuição é tecnicamente um [operador de atribuição por cópia](<#/doc/language/as_operator>), embora `std::generator` seja apenas atribuível por move. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   