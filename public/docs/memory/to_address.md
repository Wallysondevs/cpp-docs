# std::to_address

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Ptr >
constexpr auto to_address( const Ptr& p ) noexcept;
template< class T >
constexpr T* to_address( T* p ) noexcept;
```

Obtém o endereço representado por `p` sem formar uma referência ao objeto apontado por `p`.

1) Sobrecarga para [fancy pointer](<#/doc/named_req/Allocator>): Se a expressão [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;Ptr&gt;::to_address(p) for bem-formada, retorna o resultado dessa expressão. Caso contrário, retorna std::to_address(p.operator->()).

2) Sobrecarga para ponteiro bruto: Se `T` for um tipo de função, o programa é mal-formado. Caso contrário, retorna `p` sem modificação.

### Parâmetros

- **p** — fancy pointer ou ponteiro bruto

### Valor de retorno

Ponteiro bruto que representa o mesmo endereço que `p`.

### Implementação possível
```cpp
    template<class T>
    constexpr T* to_address(T* p) noexcept
    {
        static_assert(!std::is_function_v<T>);
        return p;
    }

    template<class T>
    constexpr auto to_address(const T& p) noexcept
    {
        if constexpr (requires{ std::pointer_traits<T>::to_address(p); })
            return std::pointer_traits<T>::to_address(p);
        else
            return std::to_address(p.operator->());
    }
```

---

### Notas

`std::to_address` pode ser usado mesmo quando `p` não referencia um armazenamento que tenha um objeto construído nele, caso em que [std::addressof](<#/doc/memory/addressof>)(*p) não pode ser usado porque não há um objeto válido para o parâmetro de [std::addressof](<#/doc/memory/addressof>) se ligar.

A sobrecarga de fancy pointer de `std::to_address` inspeciona a especialização [std::pointer_traits](<#/doc/memory/pointer_traits>)&lt;Ptr&gt;. Se a instanciação dessa especialização for ela própria mal-formada (tipicamente porque `element_type` não pode ser definido), isso resulta em um erro grave fora do contexto imediato e torna o programa mal-formado.

`std::to_address` pode ser adicionalmente usado em iterators que satisfazem [std::contiguous_iterator](<#/doc/iterator/contiguous_iterator>).

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_to_address`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | Utilitário para converter um ponteiro em um ponteiro bruto (`std::to_address`)

### Exemplo

Execute este código
```cpp
    #include <memory>

    template<class A>
    auto allocator_new(A& a)
    {
        auto p = a.allocate(1);
        try
        {
            std::allocator_traits<A>::construct(a, std::to_address(p));
        }
        catch (...)
        {
            a.deallocate(p, 1);
            throw;
        }
        return p;
    }

    template<class A>
    void allocator_delete(A& a, typename std::allocator_traits<A>::pointer p)
    {
        std::allocator_traits<A>::destroy(a, std::to_address(p));
        a.deallocate(p, 1);
    }

    int main()
    {
        std::allocator<int> a;
        auto p = allocator_new(a);
        allocator_delete(a, p);
    }
```

### Veja também

[ pointer_traits](<#/doc/memory/pointer_traits>)(C++11) | fornece informações sobre tipos semelhantes a ponteiros
(modelo de classe)
[ to_address](<#/doc/memory/pointer_traits/to_address>)[static] (C++20)(opcional) | obtém um ponteiro bruto de um fancy pointer (inverso de `pointer_to`)
(função membro estática pública de `std::pointer_traits<Ptr>`)