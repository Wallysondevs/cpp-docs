# std::pmr::polymorphic_allocator&lt;T&gt;::allocate_object

```cpp
template< class U >
U* allocate_object( std::size_t n = 1 );  // (desde C++20)
```

  
Aloca armazenamento para n objetos do tipo `U` usando o recurso de memória subjacente.

Se [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>::max() / sizeof(U) < n, lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>), caso contrário, é equivalente a return static_cast<U*>(allocate_bytes(n * sizeof(U), alignof(U)));.

### Parâmetros

n  |  \-  |  o número de objetos para os quais alocar armazenamento   
  
### Valor de retorno

Um ponteiro para o armazenamento alocado.

### Observações

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização como um atalho para evitar ter que fazer rebind de [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)&lt;T&gt; para [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)&lt;U&gt;.

Como `U` não é deduzido, ele deve ser fornecido como um argumento de template ao chamar esta função.

### Exceções

Lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) se n > [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>::max() / sizeof(U); também pode lançar quaisquer exceções lançadas pela chamada a resource()->allocate.

### Ver também

[ allocate_bytes](<#/doc/memory/polymorphic_allocator/allocate_bytes>)(C++20) | aloca memória bruta alinhada do recurso subjacente   
(função membro pública)  
[ new_object](<#/doc/memory/polymorphic_allocator/new_object>)(C++20) | aloca e constrói um objeto   
(função membro pública)  
[ allocate](<#/doc/memory/polymorphic_allocator/allocate>) | aloca memória   
(função membro pública)  
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória   
(função membro pública de `std::pmr::memory_resource`)