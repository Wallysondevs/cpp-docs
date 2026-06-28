# std::pmr::synchronized_pool_resource::release

```cpp
void release();  // (desde C++17)
```

  
Libera toda a memória de propriedade deste recurso chamando a função `deallocate` do recurso de memória upstream conforme necessário.

A memória é liberada de volta para o recurso upstream mesmo que `deallocate` não tenha sido chamada para alguns dos blocos alocados.

### Veja também

[ deallocate](<#/doc/memory/memory_resource/deallocate>) | desaloca memória   
(função membro pública de `std::pmr::memory_resource`)  