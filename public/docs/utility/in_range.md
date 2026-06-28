# std::in_range

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class R, class T >
constexpr bool in_range( T t ) noexcept;
```

Retorna true se o valor de t estiver no intervalo de valores que podem ser representados em `R`, ou seja, se t puder ser convertido para `R` de uma maneira que preserve o valor.

É um erro em tempo de compilação se `T` ou `U` for um tipo não-[inteiro](<#/doc/language/types>), um tipo caractere, ou bool.

### Parâmetros

t | \- | valor a ser testado

### Valor de retorno

true se o valor de t for representável em `R`, false caso contrário.

### Possível implementação
```cpp
    template<class R, class T>
    constexpr bool in_range(T t) noexcept
    {
        return std::cmp_greater_equal(t, std::numeric_limits<R>::min()) &&
            std::cmp_less_equal(t, std::numeric_limits<R>::max());
    }
```

---

### Observações

Esta função não pode ser usada com [enums](<#/doc/language/enum>) (incluindo [`std::byte`](<#/doc/types/byte>)), char, char8_t, char16_t, char32_t, wchar_t e bool.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_integer_comparison_functions`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | Funções de comparação de inteiros

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::cout << std::in_range<std::size_t>(-1) << '\n';
        std::cout << std::in_range<std::size_t>(42) << '\n';
    }
```

Saída:
```
    false
    true
```

### Veja também

[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)
[ lerp](<#/doc/numeric/lerp>)(C++20) | função de interpolação linear
(função)