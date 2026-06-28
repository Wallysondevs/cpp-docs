# std::cmp_equal, cmp_not_equal, cmp_less, cmp_greater, cmp_less_equal, cmp_greater_equal

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T, class U >
constexpr bool cmp_equal( T t, U u ) noexcept;
template< class T, class U >
constexpr bool cmp_not_equal( T t, U u ) noexcept;
template< class T, class U >
constexpr bool cmp_less( T t, U u ) noexcept;
template< class T, class U >
constexpr bool cmp_greater( T t, U u ) noexcept;
template< class T, class U >
constexpr bool cmp_less_equal( T t, U u ) noexcept;
template< class T, class U >
constexpr bool cmp_greater_equal( T t, U u ) noexcept;
```

Compara os valores de dois inteiros t e u. Ao contrário dos operadores de comparação embutidos, inteiros com sinal negativos sempre comparam _menor que_ (e _diferente de_) inteiros sem sinal: a comparação é segura contra conversão de inteiro que não preserva o valor.
```
    -1 > 0u; // true
    std::cmp_greater(-1, 0u); // false
```

É um erro em tempo de compilação se `T` ou `U` for um tipo não-[inteiro](<#/doc/language/types>), um tipo caractere, ou bool.

### Parâmetros

- **t** — argumento do lado esquerdo
- **u** — argumento do lado direito

### Valor de retorno

1) true se t for igual a u.

2) true se t for diferente de u.

3) true se t for menor que u.

4) true se t for maior que u.

5) true se t for menor ou igual a u.

6) true se t for maior ou igual a u.

### Possível implementação
```
    template<class T, class U>
    constexpr bool cmp_equal(T t, U u) noexcept
    {
        if constexpr (std::is_signed_v<T> == std::is_signed_v<U>)
            return t == u;
        else if constexpr (std::is_signed_v<T>)
            return t >= 0 && std::make_unsigned_t<T>(t) == u;
        else
            return u >= 0 && std::make_unsigned_t<U>(u) == t;
    }
    
    template<class T, class U>
    constexpr bool cmp_not_equal(T t, U u) noexcept
    {
        return !cmp_equal(t, u);
    }
    
    template<class T, class U>
    constexpr bool cmp_less(T t, U u) noexcept
    {
        if constexpr (std::is_signed_v<T> == std::is_signed_v<U>)
            return t < u;
        else if constexpr (std::is_signed_v<T>)
            return t < 0 || std::make_unsigned_t<T>(t) < u;
        else
            return u >= 0 && t < std::make_unsigned_t<U>(u);
    }
    
    template<class T, class U>
    constexpr bool cmp_greater(T t, U u) noexcept
    {
        return cmp_less(u, t);
    }
    
    template<class T, class U>
    constexpr bool cmp_less_equal(T t, U u) noexcept
    {
        return !cmp_less(u, t);
    }
    
    template<class T, class U>
    constexpr bool cmp_greater_equal(T t, U u) noexcept
    {
        return !cmp_less(t, u);
    }
```

---

### Notas

Essas funções não podem ser usadas para comparar [enums](<#/doc/language/enum>) (incluindo [`std::byte`](<#/doc/types/byte>)), char, char8_t, char16_t, char32_t, wchar_t e bool.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_integer_comparison_functions`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [Funções de comparação de inteiros](<#/doc/utility>)

### Exemplo

O exemplo abaixo pode produzir um aviso de _comparação de sinal diferente_ se compilado sem uma flag de supressão de aviso apropriada, por exemplo, `-Wno-sign-compare` (gcc/clang com `-Wall -Wextra`, veja também [SO: desabilitando um aviso específico](<https://stackoverflow.com/questions/3378560>)).

Execute este código
```
    #include <utility>
    
    // Descomentar a próxima linha desabilitará os avisos de "comparação com/sem sinal":
    // #pragma GCC diagnostic ignored "-Wsign-compare"
    
    int main()
    {
        static_assert(sizeof(int) == 4); // pré-condição
    
        // De forma bastante surpreendente
        static_assert(-1 > 1U); //< aviso: comparação com/sem sinal
        // porque após a conversão implícita de -1 para o tipo do lado direito (`unsigned int`)
        // a expressão é equivalente a:
        static_assert(0xFFFFFFFFU > 1U);
        static_assert(0xFFFFFFFFU == static_cast<unsigned>(-1));
    
        // Em contraste, a família cmp_* compara inteiros como o mais esperado -
        // inteiros com sinal negativos sempre comparam menor que inteiros sem sinal:
        static_assert(std::cmp_less(-1, 1U));
        static_assert(std::cmp_less_equal(-1, 1U));
        static_assert(!std::cmp_greater(-1, 1U));
        static_assert(!std::cmp_greater_equal(-1, 1U));
    
        static_assert(-1 == 0xFFFFFFFFU); //< aviso: comparação com/sem sinal
        static_assert(std::cmp_not_equal(-1, 0xFFFFFFFFU));
    }
```

### Veja também

[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(modelo de classe)
[ not_equal_to](<#/doc/utility/functional/not_equal_to>) | objeto de função que implementa x != y
(modelo de classe)
[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(modelo de classe)
[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(modelo de classe)
[ less_equal](<#/doc/utility/functional/less_equal>) | objeto de função que implementa x <= y
(modelo de classe)
[ greater_equal](<#/doc/utility/functional/greater_equal>) | objeto de função que implementa x >= y
(modelo de classe)
[ ranges::equal_to](<#/doc/utility/functional/ranges/equal_to>)(C++20) | objeto de função restrito que implementa x == y
(classe)
[ ranges::not_equal_to](<#/doc/utility/functional/ranges/not_equal_to>)(C++20) | objeto de função restrito que implementa x != y
(classe)
[ ranges::less](<#/doc/utility/functional/ranges/less>)(C++20) | objeto de função restrito que implementa x < y
(classe)
[ ranges::greater](<#/doc/utility/functional/ranges/greater>)(C++20) | objeto de função restrito que implementa x > y
(classe)
[ ranges::less_equal](<#/doc/utility/functional/ranges/less_equal>)(C++20) | objeto de função restrito que implementa x <= y
(classe)
[ ranges::greater_equal](<#/doc/utility/functional/ranges/greater_equal>)(C++20) | objeto de função restrito que implementa x >= y
(classe)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito que implementa x <=> y
(classe)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)
[ numeric_limits](<#/doc/types/numeric_limits>) | fornece uma interface para consultar propriedades de todos os tipos numéricos fundamentais
(modelo de classe)