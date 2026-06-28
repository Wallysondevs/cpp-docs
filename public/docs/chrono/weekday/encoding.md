# std::chrono::weekday::c_encoding, std::chrono::weekday::iso_encoding

```cpp
constexpr unsigned c_encoding() const noexcept;  // (1) (desde C++20)
constexpr unsigned iso_encoding() const noexcept;  // (2) (desde C++20)
```

1) Retorna o valor do dia da semana armazenado em *this.

2) Retorna o valor do dia da semana armazenado em *this, exceto que o domingo (armazenado como ​0​) é interpretado como 7 de acordo com a ISO 8601.

### Valor de retorno

1) O valor do dia da semana armazenado em *this.

2) c_encoding() == 0u ? 7u : c_encoding()

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << "i: C: ISO: Weekday:\n";
     
        for (unsigned i{0}; i != 8; ++i)
        {
            const std::chrono::weekday w{i};
            std::cout << i << "  "
                      << w.c_encoding() << "  "
                      << w.iso_encoding() << "    "
                      << w << '\n';
        }
    }
```

Saída:
```
    i: C: ISO: Weekday:
    0  0  7    Sun
    1  1  1    Mon
    2  2  2    Tue
    3  3  3    Wed
    4  4  4    Thu
    5  5  5    Fri
    6  6  6    Sat
    7  0  7    Sun
```