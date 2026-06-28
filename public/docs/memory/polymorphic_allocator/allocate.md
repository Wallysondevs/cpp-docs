# std::pmr::polymorphic_allocator&lt;T&gt;::allocate

T* allocate( [std::size_t](<#/doc/types/size_t>) n ); |  |  (desde C++17)  

  
Aloca armazenamento para n objetos do tipo `T` usando o recurso de memória subjacente. Equivalente a `return static_cast<T*>(resource()->allocate(n * sizeof(T), alignof(T)));`.

### Parâmetros

n  |  \-  |  o número de objetos para os quais alocar armazenamento   
  
### Valor de retorno

Um ponteiro para o armazenamento alocado.

### Exceções

Lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) se `n > std::numeric_limits<std::size_t>::max() / sizeof(T)`; também pode lançar quaisquer exceções lançadas pela chamada a `resource()->allocate`.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3038](<https://cplusplus.github.io/LWG/issue3038>) | C++17  | `allocate` pode alocar armazenamento de tamanho incorreto  | lança `length_error` em vez disso   
[LWG 3237](<https://cplusplus.github.io/LWG/issue3237>) | C++17  | a exceção lançada por `allocate` era inconsistente com `std::allocator::allocate` | tornada consistente   
  
### Veja também

[ allocate_bytes](<#/doc/memory/polymorphic_allocator/allocate_bytes>)(C++20) |  aloca memória bruta alinhada do recurso subjacente   
(função membro pública)  
[ allocate_object](<#/doc/memory/polymorphic_allocator/allocate_object>)(C++20) |  aloca memória bruta adequada para um objeto ou um array   
(função membro pública)  
[ new_object](<#/doc/memory/polymorphic_allocator/new_object>)(C++20) |  aloca e constrói um objeto   
(função membro pública)  
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] |  aloca armazenamento não inicializado usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ allocate](<#/doc/memory/memory_resource/allocate>) |  aloca memória   
(função membro pública de `std::pmr::memory_resource`)