# Extensões das bibliotecas padrão C++, versão 3

A Versão 3 das Extensões C++ para Fundamentos de Biblioteca, ISO/IEC TS 19568:2024, define os seguintes novos componentes para a biblioteca padrão C++, além daqueles definidos na [versão 1](<#/doc/experimental/memory>) e na [versão 2](<#/doc/experimental/lib_extensions_2>).

Componentes incorporados ao C++17/20 e os seguintes componentes são removidos no LFTS v3:

*   [std::experimental::make_array](<#/doc/experimental/make_array>),
*   [std::experimental::erased_type](<#/doc/experimental/erased_type>),
*   [`std::experimental::packaged_task`](<#/doc/experimental/lib_extensions/packaged_task>), e
*   [`std::experimental::promise`](<#/doc/experimental/lib_extensions/promise>).

### Guarda de escopo

Definido no header `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`
---
[ scope_exit](<#/doc/experimental/scope_exit>) | envolve um objeto de função e o invoca ao sair do escopo
(class template)
[ scope_fail](<#/doc/experimental/scope_fail>) | envolve um objeto de função e o invoca ao sair do escopo através de uma exceção
(class template)
[ scope_success](<#/doc/experimental/scope_success>) | envolve um objeto de função e o invoca ao sair do escopo normalmente
(class template)
[ unique_resource](<#/doc/experimental/unique_resource>) | wrapper universal de handle de recurso RAII
(class template)

### Macros de teste de funcionalidade

Definido no header `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`
---
__cpp_lib_experimental_memory_resources | um valor de pelo menos 201803 indica que [`resource_adaptor`](<#/doc/experimental/resource_adaptor>) é suportado
(macro constant)
Definido no header `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```cpp
__cpp_lib_experimental_function_polymorphic_allocator
(macro constant)
Definido no header `<experimental/scope>")`
__cpp_lib_experimental_scope
(macro constant)
```

### Notas

O valor de `__cpp_lib_experimental_memory_resources` foi aumentado no LFTS v3, porque o design de [`resource_adaptor`](<#/doc/experimental/resource_adaptor>) é rebaseado em [std::pmr::memory_resource](<#/doc/memory/memory_resource>).