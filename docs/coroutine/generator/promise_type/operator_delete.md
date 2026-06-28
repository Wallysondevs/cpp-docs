# std::generator&lt;Ref,V,Allocator&gt;::promise_type::operator delete

```cpp
void operator delete( void* ptr, std::size_t n ) noexcept;  // (desde C++23)
```

  
Desaloca o armazenamento apontado por ptr usando um alocador equivalente ao usado para [alocar](<#/doc/coroutine/generator/promise_type/operator_new>) esta memória.

O ptr passado para esta função deve ser aquele retornado de uma invocação de uma das sobrecargas de [`operator new`](<#/doc/coroutine/generator/promise_type/operator_new>) com um argumento de tamanho igual a n. Caso contrário, o comportamento é indefinido.

### Parâmetros

ptr  |  \-  |  um ponteiro obtido da chamada anterior para [`operator new`](<#/doc/coroutine/generator/promise_type/operator_new>)  
---|---|---
n  |  \-  |  o tamanho do armazenamento a ser desalocado