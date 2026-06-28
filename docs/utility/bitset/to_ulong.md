# std::bitset&lt;N&gt;::to_ulong

unsigned long to_ulong() const |  |  (constexpr desde C++23)  

  
Converte o conteúdo do bitset para um inteiro unsigned long.

O primeiro bit do bitset corresponde ao dígito menos significativo do número e o último bit corresponde ao dígito mais significativo.

### Parâmetros

(nenhum)

### Valor de retorno

O inteiro convertido.

### Exceções

Lança [std::overflow_error](<#/doc/error/overflow_error>) se o valor não puder ser representado em unsigned long.

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
    #include <stdexcept>
     
    int main()
    {
        for (unsigned long i = 0; i < 10; ++i)
        {
            std::bitset<5> b(i);
            std::bitset<5> b_inverted = ~b;
            std::cout << i << '\t' << b << '\t' << b_inverted << '\t'
                      << b_inverted.to_ulong() << '\n';
        }
     
        std::cout << std::bitset<32>().to_string('-') << '\n';
     
        try
        {
            std::bitset<128> x(42);
            std::cout << x.to_ulong() << '\n';
            x.flip();
            std::cout << x.to_ulong() << '\n'; // throws
        }
        catch (const std::overflow_error& ex)
        {
            std::cout << "ex: " << ex.what() << '\n';
        }
    }
```

Saída possível:
```
    0   00000   11111   31
    1   00001   11110   30
    2   00010   11101   29
    3   00011   11100   28
    4   00100   11011   27
    5   00101   11010   26
    6   00110   11001   25
    7   00111   11000   24
    8   01000   10111   23
    9   01001   10110   22
    --------------------------------
    42
    ex: bitset to_ulong overflow error
```

### Veja também

[ to_string](<#/doc/utility/bitset/to_string>) | retorna uma representação em string dos dados   
(função membro pública)  
[ to_ullong](<#/doc/utility/bitset/to_ullong>)(C++11) | retorna uma representação inteira unsigned long long dos dados   
(função membro pública)