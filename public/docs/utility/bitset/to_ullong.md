# std::bitset&lt;N&gt;::to_ullong

```cpp
unsigned long long to_ullong() const  // (desde C++11)
(constexpr desde C++23)
```

  
Converte o conteúdo do bitset para um inteiro unsigned long long. 

O primeiro bit do bitset corresponde ao dígito menos significativo do número e o último bit corresponde ao dígito mais significativo. 

### Parâmetros

(nenhum) 

### Valor de retorno

O inteiro convertido 

### Exceções

[std::overflow_error](<#/doc/error/overflow_error>) se o valor não puder ser representado em unsigned long long. 

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
    #include <limits>
     
    int main()
    {
        std::bitset<std::numeric_limits<unsigned long long>::digits> b
        (
            0x123456789abcdef0LL
        );
     
        std::cout << b << "  " << std::hex << b.to_ullong() << '\n';
        b.flip();
        std::cout << b << "  " << b.to_ullong() << '\n';
     
        std::bitset<std::numeric_limits<unsigned long long>::digits + 1> q{0};
        try
        {
            (~q).to_ullong(); // throws
        }
        catch (const std::overflow_error& ex)
        {
            std::cout << "ex: " << ex.what() << '\n';
        }
    }
```

Saída: 
```
    0001001000110100010101100111100010011010101111001101111011110000  123456789abcdef0
    1110110111001011101010011000011101100101010000110010000100001111  edcba9876543210f
    ex: _Base_bitset::_M_do_to_ullong
```

### Veja também

[ to_string](<#/doc/utility/bitset/to_string>) |  retorna uma representação em string dos dados   
(função membro pública)  
[ to_ulong](<#/doc/utility/bitset/to_ulong>) |  retorna uma representação em inteiro unsigned long dos dados   
(função membro pública)