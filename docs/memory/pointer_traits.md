# std::pointer_traits

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Ptr >
struct pointer_traits;
template< class T >
struct pointer_traits<T*>;
```

O template de classe `pointer_traits` fornece a maneira padronizada de acessar certas propriedades de tipos semelhantes a ponteiros ([fancy pointers](<#/doc/named_req/Allocator>), como [`boost::interprocess::offset_ptr`](<https://www.boost.org/doc/libs/release/doc/html/interprocess/offset_ptr.html>)). O template padrão [std::allocator_traits](<#/doc/memory/allocator_traits>) depende de `pointer_traits` para determinar os padrões para vários typedefs exigidos por [Allocator](<#/doc/named_req/Allocator>).

1) O `pointer_traits` não especializado declara condicionalmente os seguintes membros:

Seja /*element-type-of*/&lt;Ptr&gt;

*   Ptr::element_type se presente;
*   caso contrário, `T` se `Ptr` for uma especialização de template de classe Template<T, Args...>, onde Args... são zero ou mais argumentos de tipo;
*   caso contrário, não definido.

Se /*element-type-of*/&lt;Ptr&gt; não for definido, o template primário não possui membros especificados nesta página.

### Tipos de membros

Tipo | Definição
---|---
`pointer` | Ptr
`element_type` | /*element-type-of*/&lt;Ptr&gt;
`difference_type` | Ptr::difference_type se presente, caso contrário [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)

### Templates de alias de membro

Template | Definição
---|---
template< class U > using rebind | Ptr::rebind&lt;U&gt; se existir, caso contrário Template<U, Args...> se `Ptr` for uma especialização de template Template<T, Args...>

### Funções de membro

[ pointer_to](<#/doc/memory/pointer_traits/pointer_to>)[static] | obtém um ponteiro desreferenciável para seu argumento
(função membro estática pública)

2) Uma especialização é fornecida para tipos de ponteiro, T*, que declara os seguintes membros:

### Tipos de membros

Tipo | Definição
---|---
`pointer` | T*
`element_type` | T
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)

### Templates de alias de membro

Template | Definição
---|---
template< class U > using rebind | U*

### Funções de membro

[ pointer_to](<#/doc/memory/pointer_traits/pointer_to>)[static] | obtém um ponteiro desreferenciável para seu argumento
(função membro estática pública)

### Funções de membro opcionais de especializações definidas pelo programa

[ to_address](<#/doc/memory/pointer_traits/to_address>)[static] (C++20)(opcional) | obtém um ponteiro bruto de um fancy pointer (inverso de `pointer_to`)
(função membro estática pública)

### Notas

O alias de template de membro `rebind` torna possível, dado um tipo semelhante a ponteiro que aponta para `T`, obter o mesmo tipo semelhante a ponteiro que aponta para `U`. Por exemplo,
```cpp
    using another_pointer = std::pointer_traits<std::shared_ptr<int>>::rebind<double>;
    static_assert(std::is_same<another_pointer, std::shared_ptr<double>>::value);
```

```cpp
Uma especialização para tipos de fancy pointer definidos pelo usuário pode fornecer uma função membro estática adicional `to_address` para personalizar o comportamento de std::to_address.  // (desde C++20)
Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
`__cpp_lib_constexpr_memory` | `201811L` | (C++20) | constexpr em `std::pointer_traits`
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    template<class Ptr>
    struct BlockList
    {
        // Predefine a memory block
        struct block;
    
        // Define a pointer to a memory block from the kind of pointer Ptr s
        // If Ptr is any kind of T*, block_ptr_t is block*
        // If Ptr is smart_ptr<T>, block_ptr_t is smart_ptr<block>
        using block_ptr_t = typename std::pointer_traits<Ptr>::template rebind<block>;
    
        struct block
        {
            std::size_t size{};
            block_ptr_t next_block{};
        };
    
        block_ptr_t free_blocks;
    };
    
    int main()
    {
        [[maybe_unused]]
        BlockList<int*> bl1;
        // The type of bl1.free_blocks is BlockList<int*>:: block*
    
        BlockList<std::shared_ptr<char>> bl2;
        // The type of bl2.free_blocks is
        // std::shared_ptr<BlockList<std::shared_ptr<char>>::block>
        std::cout << bl2.free_blocks.use_count() << '\n';
    }
```

Saída:
```
    0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3545](<https://cplusplus.github.io/LWG/issue3545>) | C++11 | template primário causava erro grave quando `element_type` era inválido | tornou SFINAE-friendly

### Veja também

[ allocator_traits](<#/doc/memory/allocator_traits>)(C++11) | fornece informações sobre tipos de alocadores
(template de classe)
[ addressof](<#/doc/memory/addressof>)(C++11) | obtém o endereço real de um objeto, mesmo que o operador `&` esteja sobrecarregado
(template de função)
*   [Valor]: O ano/mês em que a funcionalidade foi adotada. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para a funcionalidade fornecida.
*   [Padrão]: Padrão no qual a funcionalidade é introduzida; DR significa relatório de defeito contra essa revisão