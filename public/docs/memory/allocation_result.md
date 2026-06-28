# std::allocation_result

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Pointer, class SizeType = std::size_t >
struct allocation_result;
```

Especializações de `allocation_result` são retornadas da função membro `allocate_at_least` de tipos [Allocator](<#/doc/named_req/Allocator>) apropriados (por exemplo, [`std::allocator::allocate_at_least`](<#/doc/memory/allocator/allocate_at_least>)) e [`std::allocator_traits::allocate_at_least`](<#/doc/memory/allocator_traits/allocate_at_least>).

Cada especialização de `allocation_result` não possui classes base ou membros declarados além de `ptr` e `count`, sendo assim adequada para [inicialização de agregado](<#/doc/language/aggregate_initialization>) e [structured binding](<#/doc/language/structured_binding>).

### Parâmetros de template

- **Pointer** — tipicamente [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::pointer, onde `Alloc` é um tipo [Allocator](<#/doc/named_req/Allocator>)
- **SizeType** — tipicamente [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::size_type, onde `Alloc` é um tipo [Allocator](<#/doc/named_req/Allocator>)

### Membros de dados

Nome do membro | Definição
---|---
ptr | um ponteiro do tipo `Pointer` que é tipicamente usado para o endereço do primeiro elemento no armazenamento alocado por `allocate_at_least`
(objeto membro público)
count | um valor do tipo `SizeType` que é tipicamente usado para o número real de elementos no armazenamento alocado por `allocate_at_least`
(objeto membro público)

### Observações

`Pointer` e `SizeType` são um ponteiro para um tipo de objeto e [std::make_unsigned_t](<#/doc/types/make_unsigned>)<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>)> (que é quase sempre o mesmo que [std::size_t](<#/doc/types/size_t>)) por padrão.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_allocate_at_least`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Feedback de tamanho na interface Allocator

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ allocate_at_least](<#/doc/memory/allocator/allocate_at_least>)(C++23) | aloca armazenamento não inicializado pelo menos tão grande quanto o tamanho solicitado
(função membro pública de `std::allocator<T>`)
[ allocate_at_least](<#/doc/memory/allocator_traits/allocate_at_least>)[static] (C++23) | aloca armazenamento pelo menos tão grande quanto o tamanho solicitado via um allocator
(função membro estática pública de `std::allocator_traits<Alloc>`)