# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::
select_on_container_copy_construction

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
scoped_allocator_adaptor select_on_container_copy_construction() const;
```

Cria uma nova instância de `std::scoped_allocator_adaptor`, onde a classe base do alocador externo e cada subobjeto do alocador interno são obtidos chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::select_on_container_copy_construction().

### Parâmetros

(nenhum)

### Valor de retorno

Um novo objeto `std::scoped_allocator_adaptor`, construído a partir de alocadores copiados corretamente.

### Veja também

[ select_on_container_copy_construction](<#/doc/memory/allocator_traits/select_on_container_copy_construction>)[static] | obtém o alocador a ser usado após copiar um container padrão
(função membro estática pública de `std::allocator_traits<Alloc>`)