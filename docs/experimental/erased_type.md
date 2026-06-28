# std::experimental::erased_type

Definido no cabeçalho `[<experimental/utility>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/utility&action=edit&redlink=1> "cpp/header/experimental/utility \(page does not exist\)")`

```c
struct erased_type { };
(removido no library fundamentals TS v3)
```

  
A classe `erased_type` é uma struct vazia que serve como um *placeholder* para um tipo em situações onde o tipo real é determinado em tempo de execução. Por exemplo, em classes que usam [allocators com type erasure](<#/doc/experimental/memory>), o typedef aninhado `allocator_type` é um alias para `erased_type`. 

### Observações

`erased_type` foi removido no LFTS v3 porque [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> é preferível para *type erasure*.