# std::basic_stacktrace&lt;Allocator&gt;::swap

```cpp
void swap( basic_stacktrace& other ) noexcept(/* see below */);  // (desde C++23)
```

  
Troca o conteúdo do container com o de `other`. Não invoca nenhuma operação de move, copy ou swap em objetos `stacktrace_entry` individuais. 

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/utility/basic_stacktrace/end>) é invalidado. 

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for true, então os alocadores são trocados usando uma chamada não qualificada para o `swap` não-membro. Caso contrário, eles não são trocados (e se get_allocator() != other.get_allocator(), o comportamento é indefinido). 

### Parâmetros

other  |  \-  |  `basic_stacktrace` para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::propagate_on_container_swap::value  
|| [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::is_always_equal::value)

### Complexidade

Constante. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ std::swap(std::basic_stacktrace)](<#/doc/utility/basic_stacktrace/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  