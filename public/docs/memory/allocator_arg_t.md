# std::allocator_arg, std::allocator_arg_t

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
struct allocator_arg_t { explicit allocator_arg_t() = default; };
constexpr std::allocator_arg_t allocator_arg {};
(inline desde C++17)
```

1) `std::allocator_arg_t` é um tipo de classe vazia usado para desambiguar as sobrecargas de construtores e funções membro de objetos cientes de alocadores (allocator-aware objects), incluindo [std::tuple](<#/doc/utility/tuple>), [std::function](<#/doc/utility/functional/function>), [std::packaged_task](<#/doc/thread/packaged_task>),(até C++17) e [std::promise](<#/doc/thread/promise>).

2) `std::allocator_arg` é uma instância de ([1](<#/doc/memory/allocator_arg_t>)) que pode ser passada para os construtores e funções membro de tais tipos permitidos.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2510](<https://cplusplus.github.io/LWG/issue2510>) | C++11 | o construtor padrão não era explícito, o que poderia levar à ambiguidade | tornado explícito

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(modelo de classe)