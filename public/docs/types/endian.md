# std::endian

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
enum class endian
{
little = /* definido pela implementação */,
big = /* definido pela implementação */,
native = /* definido pela implementação */,
};
```

Indica a [ordem de bytes](<https://en.wikipedia.org/wiki/Endianness#Overview> "enwiki:Endianness") de todos os [tipos escalares](<#/doc/language/type-id>):

*   Se todos os tipos escalares são little-endian, std::endian::native é igual a std::endian::little.
*   Se todos os tipos escalares são big-endian, std::endian::native é igual a std::endian::big.

Plataformas de caso de canto também são suportadas:

*   Se todos os tipos escalares têm `sizeof` igual a 1, a ordem de bytes não importa e todos os três valores, std::endian::little, std::endian::big e std::endian::native, são os mesmos.
*   Se a plataforma usa ordem de bytes mista, std::endian::native não é igual a std::endian::big nem a std::endian::little.

### Possível implementação
```cpp
    enum class endian
    {
    #if defined(_MSC_VER) && !defined(__clang__)
        little = 0,
        big    = 1,
        native = little
    #else
        little = __ORDER_LITTLE_ENDIAN__,
        big    = __ORDER_BIG_ENDIAN__,
        native = __BYTE_ORDER__
    #endif
    };
```

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
[`__cpp_lib_endian`](<#/>) | (C++20) | std::endian

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <iostream>
    
    int main()
    {
        if constexpr (std::endian::native == std::endian::big)
            std::cout << "big-endian\n";
        else if constexpr (std::endian::native == std::endian::little)
            std::cout << "little-endian\n";
        else
            std::cout << "mixed-endian\n";
    }
```

Saída possível:
```
    mixed-endian
```

### Veja também

[ byteswap](<#/doc/numeric/byteswap>)(C++23) | inverte os bytes no valor inteiro fornecido
(modelo de função)
[Documentação C](<#/>) para endian