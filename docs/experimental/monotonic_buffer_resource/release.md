# std::experimental::pmr::monotonic_buffer_resource::release

void release(); |  |  (library fundamentals TS)  

  
Libera toda a memória alocada chamando a função `deallocate` no recurso de memória upstream conforme necessário.

A memória é liberada de volta para o recurso upstream mesmo que `deallocate` não tenha sido chamada para alguns dos blocos alocados.

### Veja também

[ deallocate](<#/doc/experimental/memory_resource/deallocate>) | desaloca memória   
(função membro pública de `std::experimental::pmr::memory_resource`)  