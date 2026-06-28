# std::byteswap

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr T byteswap( T n ) noexcept;
```

Inverte os bytes no valor inteiro `n` fornecido.

`std::byteswap` participa da resolução de sobrecarga apenas se `T` satisfaz [`integral`](<#/doc/concepts/integral>), isto é, `T` é um tipo inteiro. O programa é malformado se `T` possuir bits de preenchimento.

### Parâmetros

- **n** — valor inteiro

### Valor de retorno

Um valor inteiro do tipo `T` cuja representação de objeto compreende os bytes de `n` em ordem inversa.

### Notas

Esta função é útil para processar dados com diferentes endianness.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_byteswap`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | `std::byteswap`

### Possível implementação
```cpp
    template<std::integral T>
    constexpr T byteswap(T value) noexcept
    {
        static_assert(std::has_unique_object_representations_v<T>, 
                      "T may not have padding bits");
        auto value_representation = std::bit_cast<std::array<std::byte, sizeof(T)>>(value);
        std::ranges::reverse(value_representation);
        return std::bit_cast<T>(value_representation);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <concepts>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    
    template<std::integral T>
    void dump(T v, char term = '\n')
    {
        std::cout << std::hex << std::uppercase << std::setfill('0')
                  << std::setw(sizeof(T) * 2) << v << " : ";
        for (std::size_t i{}; i != sizeof(T); ++i, v >>= 8)
            std::cout << std::setw(2) << static_cast<unsigned>(T(0xFF) & v) << ' ';
        std::cout << std::dec << term;
    }
    
    int main()
    {
        static_assert(std::byteswap('a') == 'a');
    
        std::cout << "byteswap for U16:\n";
        constexpr auto x = std::uint16_t(0xCAFE);
        dump(x);
        dump(std::byteswap(x));
    
        std::cout << "\nbyteswap for U32:\n";
        constexpr auto y = std::uint32_t(0xDEADBEEFu);
        dump(y);
        dump(std::byteswap(y));
    
        std::cout << "\nbyteswap for U64:\n";
        constexpr auto z = std::uint64_t{0x0123456789ABCDEFull};
        dump(z);
        dump(std::byteswap(z));
    }
```

Saída possível:
```
    byteswap for U16:
    CAFE : FE CA 
    FECA : CA FE 
    
    byteswap for U32:
    DEADBEEF : EF BE AD DE 
    EFBEADDE : DE AD BE EF 
    
    byteswap for U64:
    0123456789ABCDEF : EF CD AB 89 67 45 23 01 
    EFCDAB8967452301 : 01 23 45 67 89 AB CD EF 
```

### Ver também

[ endian](<#/doc/types/endian>)(C++20) | indica a endianness de tipos escalares
---|---
(enum) |
[ rotl](<#/doc/numeric/rotl>)(C++20) | calcula o resultado da rotação bit a bit para a esquerda
(function template) |
[ rotr](<#/doc/numeric/rotr>)(C++20) | calcula o resultado da rotação bit a bit para a direita
(function template) |