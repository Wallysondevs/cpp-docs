# std::experimental::pmr::monotonic_buffer_resource::do_deallocate

virtual void do_deallocate( void* p, [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ); | | (library fundamentals TS)

Esta função não tem efeito. A memória usada por um `monotonic_buffer_resource`, como o seu nome indica, aumenta monotonicamente até que o recurso seja destruído.

### Exceções

Não lança exceções.

### Veja também

[ deallocate](<#/doc/experimental/memory_resource/deallocate>) | desaloca memória
(função membro pública de `std::experimental::pmr::memory_resource`)
[ do_deallocate](<#/doc/experimental/memory_resource/do_deallocate>)[virtual] | desaloca memória
(função membro virtual protegida de `std::experimental::pmr::memory_resource`)