# std::make_signed

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct make_signed;
```

Se `T` é um tipo integral (exceto bool) ou de enumeração, fornece o typedef membro `type` que é o tipo inteiro com sinal correspondente a `T`, com os mesmos qualificadores cv.

Se `T` é `char` com ou sem sinal, `short`, `int`, `long`, `long long`, o tipo com sinal desta lista correspondente a `T` é fornecido.

Se `T` é um tipo de enumeração ou `char`, `wchar_t`, `char8_t`(desde C++20), `char16_t`, `char32_t`, o tipo inteiro com sinal com o menor [rank](<#/doc/language/implicit_cast>) que tenha o mesmo `sizeof` que `T` é fornecido.

Caso contrário, o comportamento é indefinido. | (até C++20)
---|---
Caso contrário, o programa é malformado. | (desde C++20)

Se o programa adicionar especializações para `std::make_signed`, o comportamento é indefinido.

### Tipos membro

Nome | Definição
---|---
`type` | o tipo inteiro com sinal correspondente a `T`

### Tipos auxiliares

```cpp
template< class T >
using make_signed_t = typename make_signed<T>::type;  // (desde C++14)
```

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    enum struct E : unsigned short {};
    
    int main()
    {
        using char_type = std::make_signed_t<unsigned char>;
        using int_type  = std::make_signed_t<unsigned int>;
        using long_type = std::make_signed_t<volatile unsigned long>;
        using enum_type = std::make_signed_t<E>;
    
        static_assert(
            std::is_same_v<char_type, signed char> and
            std::is_same_v<int_type, signed int> and
            std::is_same_v<long_type, volatile signed long> and
            std::is_same_v<enum_type, signed short>
        );
    }
```

### Ver também

[ is_signed](<#/doc/types/is_signed>)(C++11) | verifica se um tipo é um tipo aritmético com sinal
(class template)
[ is_unsigned](<#/doc/types/is_unsigned>)(C++11) | verifica se um tipo é um tipo aritmético sem sinal
(class template)
[ make_unsigned](<#/doc/types/make_unsigned>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(class template)