# std::allocator

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
struct allocator;
template<>
struct allocator<void>;
(removido em C++20)
```

O template de classe `std::allocator` é o [Allocator](<#/doc/named_req/Allocator>) padrão usado por todos os containers da standard library se nenhum allocator especificado pelo usuário for fornecido. O allocator padrão é *stateless* (sem estado), ou seja, todas as instâncias do allocator dado são intercambiáveis, comparam-se como iguais e podem desalocar memória alocada por qualquer outra instância do mesmo tipo de allocator.

A especialização explícita para `void` não possui os `typedefs` de membro `reference`, `const_reference`, `size_type` e `difference_type`. Esta especialização não declara funções membro. | (até C++20)
---|---
O allocator padrão satisfaz os [requisitos de completude do allocator](<#/doc/named_req/Allocator>). | (desde C++17)

### Tipos de Membro

Tipo | Definição
---|---
`value_type` | `T`
`pointer` (obsoleto desde C++17)(removido em C++20) | `T*`
`const_pointer` (obsoleto desde C++17)(removido em C++20) | const T*
`reference` (obsoleto desde C++17)(removido em C++20) | `T&`
`const_reference` (obsoleto desde C++17)(removido em C++20) | const T&
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`propagate_on_container_move_assignment` (C++11) | [std::true_type](<#/doc/types/integral_constant>)
`rebind` (obsoleto desde C++17)(removido em C++20) | template< class U >
struct rebind
{
typedef allocator&lt;U&gt; other;
};
`is_always_equal` (C++11)(obsoleto desde C++23)(removido em C++26) | [std::true_type](<#/doc/types/integral_constant>)

### Funções Membro

[ (construtor)](<#/doc/memory/allocator/allocator>) | cria uma nova instância de allocator
(função membro pública)
[ (destrutor)](<#/doc/memory/allocator/~allocator>) | destrói uma instância de allocator
(função membro pública)
[ address](<#/doc/memory/allocator/address>)(até C++20) | obtém o endereço de um objeto, mesmo que o operator& esteja sobrecarregado
(função membro pública)
[ allocate](<#/doc/memory/allocator/allocate>) | aloca armazenamento não inicializado
(função membro pública)
[ allocate_at_least](<#/doc/memory/allocator/allocate_at_least>)(C++23) | aloca armazenamento não inicializado pelo menos tão grande quanto o tamanho solicitado
(função membro pública)
[ deallocate](<#/doc/memory/allocator/deallocate>) | desaloca armazenamento
(função membro pública)
[ max_size](<#/doc/memory/allocator/max_size>)(até C++20) | retorna o maior tamanho de alocação suportado
(função membro pública)
[ construct](<#/doc/memory/allocator/construct>)(até C++20) | constrói um objeto em armazenamento alocado
(função membro pública)
[ destroy](<#/doc/memory/allocator/destroy>)(até C++20) | destrói um objeto em armazenamento alocado
(função membro pública)

### Funções Não-Membro

[ operator==operator!=](<#/doc/memory/allocator/operator_cmp>)(removido em C++20) | compara duas instâncias de allocator
(função membro pública)

### Notas

O template de classe membro `rebind` fornece uma maneira de obter um allocator para um tipo diferente. Por exemplo, [std::list](<#/doc/container/list>)<T, A> aloca nós de algum tipo interno `Node<T>`, usando o allocator `A::rebind<Node<T>>::other`(até C++11)[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::rebind_alloc<Node&lt;T&gt;>, que é implementado em termos de `A::rebind<Node<T>>::other` se A for um `std::allocator`(desde C++11).

O tipo de membro `is_always_equal` é obsoleto via [LWG issue 3170](<https://cplusplus.github.io/LWG/issue3170>), porque faz com que allocators personalizados derivados de `std::allocator` sejam tratados como sempre iguais por padrão. [std::allocator_traits](<#/doc/memory/allocator_traits>)<std::allocator&lt;T&gt;>::is_always_equal não é obsoleto e sua constante membro `value` é verdadeira para qualquer `T`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        // default allocator for ints
        std::allocator<int> alloc1;
    
        // demonstrating the few directly usable members
        static_assert(std::is_same_v<int, decltype(alloc1)::value_type>);
        int* p1 = alloc1.allocate(1); // space for one int
        alloc1.deallocate(p1, 1);     // and it is gone
    
        // Even those can be used through traits though, so no need
        using traits_t1 = std::allocator_traits<decltype(alloc1)>; // The matching trait
        p1 = traits_t1::allocate(alloc1, 1);
        traits_t1::construct(alloc1, p1, 7);  // construct the int
        std::cout << *p1 << '\n';
        traits_t1::deallocate(alloc1, p1, 1); // deallocate space for one int
    
        // default allocator for strings
        std::allocator<std::string> alloc2;
        // matching traits
        using traits_t2 = std::allocator_traits<decltype(alloc2)>;
    
        // Rebinding the allocator using the trait for strings gets the same type
        traits_t2::rebind_alloc<std::string> alloc_ = alloc2;
    
        std::string* p2 = traits_t2::allocate(alloc2, 2); // space for 2 strings
    
        traits_t2::construct(alloc2, p2, "foo");
        traits_t2::construct(alloc2, p2 + 1, "bar");
    
        std::cout << p2[0] << ' ' << p2[1] << '\n';
    
        traits_t2::destroy(alloc2, p2 + 1);
        traits_t2::destroy(alloc2, p2);
        traits_t2::deallocate(alloc2, p2, 2);
    }
```

Saída:
```
    7
    foo bar
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2103](<https://cplusplus.github.io/LWG/issue2103>) | C++11 | comparação redundante entre `allocator` pode ser necessária | `propagate_on_container_move_assignment` fornecido
[LWG 2108](<https://cplusplus.github.io/LWG/issue2108>) | C++11 | não havia como mostrar que `allocator` é *stateless* (sem estado) | `is_always_equal` fornecido

### Veja também

[ allocator_traits](<#/doc/memory/allocator_traits>)(C++11) | fornece informações sobre tipos de allocator
(template de classe)
[ scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)(C++11) | implementa allocator multi-nível para containers multi-nível
(template de classe)
[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção com *uses-allocator*
(template de classe)