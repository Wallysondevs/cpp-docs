# std::allocator_traits&lt;Alloc&gt;::select_on_container_copy_construction

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
static Alloc select_on_container_copy_construction( const Alloc& a );  // (desde C++11)
(constexpr desde C++20)
```

  
Se possível, obtém a versão copy-constructed do alocador a, chamando a.select_on_container_copy_construction(). Se o acima não for possível (por exemplo, `Alloc` não possui a função membro `select_on_container_copy_construction()`), então retorna a, sem modificações.

Esta função é chamada pelos construtores de cópia de todos os containers da standard library. Ela permite que o alocador usado pelo argumento do construtor tome conhecimento de que o container está sendo copiado e modifique o estado, se necessário.

### Parâmetros

a  |  \-  |  alocador usado por um container padrão passado como argumento para um construtor de cópia de container   
  
### Valor de retorno

O alocador a ser usado pelos containers padrão copy-constructed.

### Veja também

[ select_on_container_copy_construction](<#/doc/memory/scoped_allocator_adaptor/select_on_container_copy_construction>) | copia o estado de `scoped_allocator_adaptor` e todos os seus alocadores   
(função membro pública de `std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>`)  