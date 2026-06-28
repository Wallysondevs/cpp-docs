# std::pmr::polymorphic_allocator&lt;T&gt;::new_object

```cpp
template< class U, class... CtorArgs >
U* new_object( CtorArgs&&... ctor_args );  // (desde C++20)
```

  
Aloca e constrói um objeto do tipo `U`.

Dado que `alloc` é um [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)&lt;T&gt;:
```cpp
    U* p = alloc.new_object<U>(std::forward<CtorArgs>(ctor_args)...);
```

é equivalente a
```cpp
    U* p = alloc.allocate_object<U>();
    try
    {
        alloc.construct(p, std::forward<CtorArgs>(ctor_args)...);
    }
    catch (...)
    {
        alloc.deallocate_object(p);
        throw;
    }
```

### Parâmetros

ctor_args  |  \-  |  os argumentos a serem encaminhados para o construtor de `U`  
  
### Valor de retorno

Um ponteiro para o objeto alocado e construído.

### Observações

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização como um atalho para evitar ter que fazer o rebind de [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)&lt;T&gt; para [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)&lt;U&gt;, e ter que chamar allocate, construct e deallocate individualmente.

Como `U` não é deduzido, ele deve ser fornecido como um argumento de template ao chamar esta função.

### Exceções

Pode lançar quaisquer exceções lançadas pela chamada a allocate_object ou pelo construtor de `U`.

### Veja também

[ allocate_bytes](<#/doc/memory/polymorphic_allocator/allocate_bytes>)(C++20) | aloca memória bruta alinhada do recurso subjacente   
(função membro pública)  
[ allocate_object](<#/doc/memory/polymorphic_allocator/allocate_object>)(C++20) | aloca memória bruta adequada para um objeto ou um array   
(função membro pública)  
[ allocate](<#/doc/memory/polymorphic_allocator/allocate>) | aloca memória   
(função membro pública)  
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória   
(função membro pública de `std::pmr::memory_resource`)