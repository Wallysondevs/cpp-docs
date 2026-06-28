# std::as_bytes, std::as_writable_bytes

Definido no cabeçalho `[<span>](<#/doc/header/span>)`

```c
template< class T, std::size_t N >
std::span<const std::byte, S/* see below */>
as_bytes( std::span<T, N> s ) noexcept;
template< class T, std::size_t N >
std::span<std::byte, S/* see below */>
as_writable_bytes( std::span<T, N> s ) noexcept;
```

Obtém uma view para a representação de objeto dos elementos do span s.

Se `N` for std::dynamic_extent, a extensão do span `S` retornado também é std::dynamic_extent; caso contrário, é sizeof(T) * N.

`as_writable_bytes` só participa da resolução de sobrecarga se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false.

### Valor de retorno

1) Um span construído com {reinterpret_cast&lt;const [std::byte](<#/doc/types/byte>)*&gt;(s.data()), s.size_bytes()}.

2) Um span construído com {reinterpret_cast<[std::byte](<#/doc/types/byte>)*>(s.data()), s.size_bytes()}.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <span>
    
    void print(float const x, std::span<const std::byte> const bytes)
    {
        std::cout << std::setprecision(6) << std::setw(8) << x << " = { "
                  << std::hex << std::uppercase << std::setfill('0');
        for (auto const b : bytes)
            std::cout << std::setw(2) << std::to_integer<int>(b) << ' ';
        std::cout << std::dec << "}\n";
    }
    
    int main()
    {
        /* mutable */ float data[1]{3.141592f};
    
        auto const const_bytes = std::as_bytes(std::span{data});
    
        print(data[0], const_bytes);
    
        auto const writable_bytes = std::as_writable_bytes(std::span{data});
    
        // Change the sign bit that is the MSB (IEEE 754 Floating-Point Standard).
        writable_bytes[3] |= std::byte{0B1000'0000};
    
        print(data[0], const_bytes);
    }
```

Saída possível:
```
     3.14159 = { D8 0F 49 40 }
    -3.14159 = { D8 0F 49 C0 }
```

### Veja também

[ start_lifetime_asstart_lifetime_as_array](<#/doc/memory/start_lifetime_as>)(C++23) | cria implicitamente objetos no armazenamento fornecido com a representação de objeto reutilizada
(modelo de função)
[ byte](<#/doc/types/byte>)(C++17) | o tipo byte
(enum)