# std::unreachable_sentinel_t, std::unreachable_sentinel

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
struct unreachable_sentinel_t;
inline constexpr unreachable_sentinel_t unreachable_sentinel{};
```

1) `unreachable_sentinel_t` é um tipo de classe vazia que pode ser usado para denotar o "limite superior" de um intervalo ilimitado.

2) `unreachable_sentinel` é uma constante do tipo `unreachable_sentinel_t`.

### Funções não-membro

** operator==**(C++20) | compara um `unreachable_sentinel_t` com um valor de qualquer tipo [weakly_incrementable](<#/doc/iterator/weakly_incrementable>)
(modelo de função)

## operator==(std::unreachable_sentinel_t)

```cpp
template<std::weakly_incrementable I>
friend constexpr bool operator==( unreachable_sentinel_t, const I& ) noexcept
{ return false; }  // (desde C++20)
```

`unreachable_sentinel_t` pode ser comparado com qualquer tipo [weakly_incrementable](<#/doc/iterator/weakly_incrementable>) e o resultado é sempre falso.

Este modelo de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `std::unreachable_sentinel_t` é uma classe associada dos argumentos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <iostream>
    #include <iterator>
    
    template<class CharT>
    constexpr std::size_t strlen(const CharT* s)
    {
        return std::ranges::find(s, std::unreachable_sentinel, CharT{}) - s;
    }
    
    template<class CharT>
    constexpr std::size_t find_first(const CharT* haystack, const CharT* needle)
    {
        const char* needle_end = needle + strlen(needle);
        // search(begin, unreachable_sentinel) é geralmente mais eficiente do que
        // search(begin, end) devido a uma comparação a menos por ciclo.
        // Mas "needle" DEVE ESTAR PRESENTE no "haystack", caso contrário a chamada
        // é UB (comportamento indefinido), o que é um erro em tempo de compilação em contexto constexpr.
        auto found = std::ranges::search(haystack, std::unreachable_sentinel,
                                         needle, needle_end);
        return found.begin() - haystack;
    }
    
    int main()
    {
        static_assert(strlen("The quick brown fox jumps over a lazy dog.") == 42);
        static_assert(find_first("unsigned short int", "short") == 9);
    //  static_assert(find_first("long int", "float")); // compile-time error
    }
```

### Ver também

[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | uma [view](<#/doc/ranges/view>) que consiste em uma sequência gerada pelo incremento repetido de um valor inicial
(modelo de classe) (objeto de ponto de customização)