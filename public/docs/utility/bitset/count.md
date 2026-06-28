# std::bitset&lt;N&gt;::count

[std::size_t](<#/doc/types/size_t>) count() const; |  | (noexcept desde C++11)   
(constexpr desde C++23)  

  
Retorna o número de bits que estão definidos como true. 

### Valor de retorno

Número de bits que estão definidos como true. 

### Exemplo

Execute este código
```cpp 
    #include <bitset>
    #include <iostream>
     
    constexpr auto popcount(unsigned x) noexcept
    {
        unsigned num{};
        for (; x; ++num, x &= (x - 1));
        return num;
    };
    static_assert(popcount(0b101010) == std::bitset<8>{0b101010}.count());
     
    int main()
    {
        std::bitset<8> b("00010010");
        std::cout << "Initial value: " << b << '\n';
     
        // Find the first unset bit
        std::size_t idx = 0;
        while (idx < b.size() && b.test(idx))
            ++idx;
     
        // Continue setting bits until half the bitset is filled
        while (idx < b.size() && b.count() < b.size() / 2)
        {
            b.set(idx);
            std::cout << "Setting bit " << idx << ": " << b << '\n';
            while (idx < b.size() && b.test(idx))
                ++idx;
        }
    }
```

Saída: 
```
    Initial value: 00010010
    Setting bit 0: 00010011
    Setting bit 2: 00010111
```

### Veja também

[ size](<#/doc/utility/bitset/size>) |  retorna o número de bits que o bitset contém   
(função membro pública)  
[ popcount](<#/doc/numeric/popcount>)(C++20) |  conta o número de bits 1 em um inteiro sem sinal   
(template de função)