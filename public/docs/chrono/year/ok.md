# std::chrono::year::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se o valor do ano armazenado em *this está no intervalo válido, ou seja, `[`-32767`, `32767`]`.

### Valor de retorno

true se o valor do ano armazenado em *this estiver no intervalo `[`-32767`, `32767`]`. Caso contrário, false.

### Implementação possível

Veja as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/919858077f4b768c8472f29b977edf0aa6e0f1e5/libstdc%2B%2B-v3/include/std/chrono#L1606>), [libc++](<https://github.com/llvm-mirror/libcxx/blob/78d6a7767ed57b50122a161b91f59f19c9bd0d19/include/chrono#L1832>), e [date.h](<https://github.com/HowardHinnant/date/blob/0b72599bd43f72d8935e507e25e4f0063f9bb34e/include/date/date.h#L1630>) de Howard Hinnant.
```cpp
    class Year
    {
        short year_;   // exposition-only
    
    public:
    
        bool ok() const noexcept { return year_ != std::numeric_limits<short>::min(); }
    
        /*...*/
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::cout << "input year │ internal value │ ok()\n" << std::boolalpha;
    
        for (const int i : {2020, 0x8000, 0x8001, 0xFFFF, 0x18000})
        {
            const std::chrono::year y{i};
            std::cout << std::setw(10) << i << " │ "
                      << std::setw(14) << static_cast<int>(y) << " │ "
                      << y.ok() << '\n';
        }
    }
```

Saída possível:
```
    input year │ internal value │ ok()
          2020 │           2020 │ true
         32768 │         -32768 │ false
         32769 │         -32767 │ true
         65535 │             -1 │ true
         98304 │         -32768 │ false
```