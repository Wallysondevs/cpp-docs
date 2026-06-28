# std::pmr::memory_resource::allocate

void* allocate( [std::size_t](<#/doc/types/size_t>) bytes,  
[std::size_t](<#/doc/types/size_t>) alignment = alignof([std::max_align_t](<#/doc/types/max_align_t>)) ); |  |  (desde C++17)  

  
Aloca armazenamento com um tamanho de pelo menos `bytes` bytes, alinhado ao `alignment` especificado.

Equivalente a `return do_allocate(bytes, alignment);`.

### Exceções

Lança uma exceção se o armazenamento do tamanho e alinhamento solicitados não puder ser obtido.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2843](<https://cplusplus.github.io/LWG/issue2843>) | C++17  | o super-alinhamento era permitido não ter suporte  | o alinhamento deve ser respeitado   
  
### Veja também 

[ do_allocate](<#/doc/memory/memory_resource/do_allocate>)[virtual] |  aloca memória  
(virtual private member function)  