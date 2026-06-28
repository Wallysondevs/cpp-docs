# std::same_as

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T, class U >
concept same_as = /* veja abaixo */;
```

O concept `same_as<T, U>` é satisfeito se e somente se `T` e `U` denotam o mesmo tipo.

`std::same_as<T, U>` [subsume](<#/doc/language/constraints>) `std::same_as<U, T>` e vice-versa.

### Possível implementação
```cpp
    namespace detail
    {
        template< class T, class U >
        concept SameHelper = std::is_same_v<T, U>;
    }
    
    template< class T, class U >
    concept same_as = detail::SameHelper<T, U> && detail::SameHelper<U, T>;
```

---

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <iostream>
    
    template<typename T, typename ... U>
    concept IsAnyOf = (std::same_as<T, U> || ...);
    
    template<typename T>
    concept IsPrintable = std::integral<T> || std::floating_point<T> ||
        IsAnyOf<std::remove_cvref_t<std::remove_pointer_t<std::decay_t<T>>>, char, wchar_t>;
    
    void println(IsPrintable auto const ... arguments)
    {
        (std::wcout << ... << arguments) << '\n';
    }
    
    int main()
    {
        println("Example: ", 3.14, " : ", 42, " : [", 'a', L'-', L"Z]");
    }
```

Saída:
```
    Example: 3.14 : 42 : [a-Z]
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.2 Concept `same_as` [concept.same]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.2 Concept `same_as` [concept.same]

### Veja também

[ is_same](<#/doc/types/is_same>)(C++11) | verifica se dois tipos são os mesmos
(modelo de classe)