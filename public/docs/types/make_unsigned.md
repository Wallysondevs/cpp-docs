# std::make_unsigned

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct make_unsigned;
```

Se `T` é um tipo integral (exceto bool) ou de enumeração, fornece o typedef membro `type` que é o tipo inteiro sem sinal correspondente a `T`, com os mesmos qualificadores cv.

Se `T` é char, short, int, long, long long com ou sem sinal; o tipo sem sinal desta lista correspondente a `T` é fornecido.

Se `T` é um tipo de enumeração ou char, wchar_t, char8_t(desde C++20), char16_t, char32_t; o tipo inteiro sem sinal com o menor [rank](<#/doc/language/implicit_cast>) que possui o mesmo `sizeof` que `T` é fornecido.

Caso contrário, o comportamento é indefinido. | (até C++20)
---|---
Caso contrário, o programa é malformado. | (desde C++20)

Se o programa adicionar especializações para `std::make_unsigned`, o comportamento é indefinido.

### Tipos membro

Nome | Definição
---|---
`type` | o tipo inteiro sem sinal correspondente a `T`

### Tipos auxiliares

```cpp
template< class T >
using make_unsigned_t = typename make_unsigned<T>::type;  // (desde C++14)
```

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    int main()
    {
        using uchar_type = std::make_unsigned_t<char>;
        using uint_type  = std::make_unsigned_t<int>;
        using ulong_type = std::make_unsigned_t<volatile long>;
    
        static_assert(
            std::is_same_v<uchar_type, unsigned char> and
            std::is_same_v<uint_type, unsigned int> and
            std::is_same_v<ulong_type, volatile unsigned long>
        );
    }
```

### Ver também

[ is_signed](<#/doc/types/is_signed>)(C++11) | verifica se um tipo é um tipo aritmético com sinal
(modelo de classe)
[ is_unsigned](<#/doc/types/is_unsigned>)(C++11) | verifica se um tipo é um tipo aritmético sem sinal
(modelo de classe)
[ make_signed](<#/doc/types/make_signed>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(modelo de classe)