# std::allocator_traits

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Alloc >
struct allocator_traits;
```

O template de classe `allocator_traits` fornece a maneira padronizada de acessar várias propriedades de [Allocators](<#/doc/named_req/Allocator>). Os containers padrão e outros componentes da biblioteca padrão acessam allocators através deste template, o que torna possível usar qualquer tipo de classe como um allocator, desde que a especialização fornecida pelo usuário de `std::allocator_traits` implemente toda a funcionalidade necessária.

Um programa que declara uma especialização explícita ou parcial de `std::allocator_traits` é malformado, sem diagnóstico exigido. | (desde C++23)

O `std::allocator_traits` padrão, não especializado, contém os seguintes membros:

### Tipos Membro

Tipo | Definição
---|---
`allocator_type` | `Alloc`
`value_type` | `Alloc::value_type`
`pointer` | `Alloc::pointer` se presente, caso contrário `value_type*`
`const_pointer` | `Alloc::const_pointer` se presente, caso contrário [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;pointer&gt;::rebind&lt;const value_type&gt;
`void_pointer` | `Alloc::void_pointer` se presente, caso contrário [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;pointer&gt;::rebind&lt;void&gt;
`const_void_pointer` | `Alloc::const_void_pointer` se presente, caso contrário [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;pointer&gt;::rebind&lt;const void&gt;
`difference_type` | `Alloc::difference_type` se presente, caso contrário [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;pointer&gt;::difference_type
`size_type` | `Alloc::size_type` se presente, caso contrário [std::make_unsigned](<#/doc/types/make_unsigned>)<difference_type>::type
`propagate_on_container_copy_assignment` | `Alloc::propagate_on_container_copy_assignment` se presente, caso contrário [std::false_type](<#/doc/types/integral_constant>)
`propagate_on_container_move_assignment` | `Alloc::propagate_on_container_move_assignment` se presente, caso contrário [std::false_type](<#/doc/types/integral_constant>)
`propagate_on_container_swap` | `Alloc::propagate_on_container_swap` se presente, caso contrário [std::false_type](<#/doc/types/integral_constant>)
`is_always_equal` | `Alloc::is_always_equal` se presente, caso contrário [std::is_empty](<#/doc/types/is_empty>)&lt;Alloc&gt;::type

### Templates de Alias Membro

Tipo | Definição
---|---
`rebind_alloc<T>` | `Alloc::rebind<T>::other` se presente, caso contrário `SomeAllocator<T, Args>` se este `Alloc` for da forma SomeAllocator<U, Args>, onde Args são zero ou mais [argumentos de tipo](<#/doc/language/template_parameters>)
`rebind_traits<T>` | std::allocator_traits<rebind_alloc&lt;T&gt;>

### Funções Membro

[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o allocator
(função membro estática pública)
[ allocate_at_least](<#/doc/memory/allocator_traits/allocate_at_least>)[static] (C++23) | aloca armazenamento pelo menos tão grande quanto o tamanho solicitado via um allocator
(função membro estática pública)
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] | desaloca armazenamento usando o allocator
(função membro estática pública)
[ construct](<#/doc/memory/allocator_traits/construct>)[static] | constrói um objeto no armazenamento alocado
(template de função)
[ destroy](<#/doc/memory/allocator_traits/destroy>)[static] | destrói um objeto armazenado no armazenamento alocado
(template de função)
[ max_size](<#/doc/memory/allocator_traits/max_size>)[static] | retorna o tamanho máximo de objeto suportado pelo allocator
(função membro estática pública)
[ select_on_container_copy_construction](<#/doc/memory/allocator_traits/select_on_container_copy_construction>)[static] | obtém o allocator a ser usado após copiar um container padrão
(função membro estática pública)

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2108](<https://cplusplus.github.io/LWG/issue2108>) | C++11 | não havia como indicar que um allocator é stateless | `is_always_equal` fornecido

### Veja também

[AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>)(C++11) | container usando allocator; uso de traits associados (ex: [`propagate_on_container_swap`](<#/doc/memory/allocator_traits>))
(requisito nomeado)
[ allocator](<#/doc/memory/allocator>) | o allocator padrão
(template de classe)
[ scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)(C++11) | implementa allocator multinível para containers multinível
(template de classe)
[ pointer_traits](<#/doc/memory/pointer_traits>)(C++11) | fornece informações sobre tipos semelhantes a ponteiros
(template de classe)