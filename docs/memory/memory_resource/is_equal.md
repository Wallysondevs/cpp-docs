# std::pmr::memory_resource::is_equal

```cpp
bool is_equal( const memory_resource& other ) const noexcept;  // (desde C++17)
```

  
Compara *this por igualdade com other. Duas `memory_resource`s se comparam como iguais se e somente se a memória alocada de uma `memory_resource` puder ser desalocada da outra e vice-versa.

Equivalente a return do_is_equal(other);.

### Veja também 

[ do_is_equal](<#/doc/memory/memory_resource/do_is_equal>)[virtual] | compara por igualdade com outra `memory_resource`  
(função membro virtual privada)  