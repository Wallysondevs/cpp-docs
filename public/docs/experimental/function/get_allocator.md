# std::experimental::function&lt;R(Args...)&gt;::get_allocator

[std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> get_allocator() const noexcept; | | (library fundamentals TS v3)

Retorna o [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> armazenado na construção do objeto `function`. Se nenhum alocador foi explicitamente especificado, o alocador armazenado é igual ao alocador de origem na move construction, ou é default-constructed caso contrário.

### Parâmetros

(nenhum)

### Valor de retorno

O [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> armazenado na construção do objeto `function`.

### Veja também

[ get_memory_resource](<#/doc/experimental/function/get_memory_resource>)(removido em library fundamentals TS v3) | recupera um ponteiro para o recurso de memória usado por este objeto para alocar memória
(função membro pública)