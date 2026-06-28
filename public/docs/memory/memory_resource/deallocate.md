# std::pmr::memory_resource::deallocate

```cpp
void deallocate( void* p,  
std::size_t bytes,  
std::size_t alignment = alignof(std::max_align_t) );
```
| | | (desde C++17)

Desaloca o armazenamento apontado por `p`. `p` deve ter sido retornado por uma chamada anterior a `allocate(bytes, alignment)` em um `memory_resource` que se compara como igual a `*this`, e o armazenamento para o qual ele aponta ainda não deve ter sido desalocado.

Equivalente a `do_deallocate(p, bytes, alignment);`.

### Exceções

Não lança exceções.

### Veja também

[ do_deallocate](<#/doc/memory/memory_resource/do_deallocate>)[virtual] | desaloca memória
(função membro virtual privada)