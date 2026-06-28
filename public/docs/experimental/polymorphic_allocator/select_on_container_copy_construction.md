# std::experimental::pmr::polymorphic_allocator&lt;T&gt;::select_on_container_copy_construction

polymorphic_allocator select_on_container_copy_construction() const; | | (library fundamentals TS)

Retorna um objeto `polymorphic_allocator` construído por padrão.

### Parâmetros

(nenhum)

### Valor de retorno

Um objeto `polymorphic_allocator` construído por padrão.

### Observações

`polymorphic_allocator`s não se propagam na construção por cópia de container.

### Ver também

[ select_on_container_copy_construction](<#/doc/memory/allocator_traits/select_on_container_copy_construction>)[static] | obtém o alocador a ser usado após copiar um container padrão
(função membro estática pública de `std::allocator_traits<Alloc>`)