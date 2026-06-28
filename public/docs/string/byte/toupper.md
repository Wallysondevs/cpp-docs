# std::toupper

Definido no cabeçalho `[<cctype>](<#/doc/header/cctype>)`

```c
int toupper( int ch );
```

Converte o caractere fornecido para maiúscula de acordo com as regras de conversão de caracteres definidas pela locale C atualmente instalada.

Na locale "C" padrão, as seguintes letras minúsculas `abcdefghijklmnopqrstuvwxyz` são substituídas pelas respectivas letras maiúsculas `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

### Parâmetros

- **ch** — caractere a ser convertido. Se o valor de ch não for representável como unsigned char e não for igual a [EOF](<#/doc/io/c>), o comportamento é indefinido.

### Valor de retorno

Caractere convertido ou ch se nenhuma versão maiúscula for definida pela locale C atual.

### Observações

Assim como todas as outras funções de [`<cctype>`](<#/doc/header/cctype>), o comportamento de `std::toupper` é indefinido se o valor do argumento não for representável como unsigned char nem igual a [EOF](<#/doc/io/c>). Para usar essas funções com segurança com chars simples (ou signed chars), o argumento deve primeiro ser convertido para unsigned char:
```cpp
    char my_toupper(char ch)
    {
        return static_cast<char>(std::toupper(static_cast<unsigned char>(ch)));
    }
```

Similarmente, elas não devem ser usadas diretamente com algoritmos padrão quando o tipo de valor do iterator for char ou signed char. Em vez disso, converta o valor para unsigned char primeiro:
```cpp
    std::string str_toupper(std::string s)
    {
        std::transform(s.begin(), s.end(), s.begin(),
                    // static_cast<int(*)(int)>(std::toupper)         // wrong
                    // { return std::toupper(c); }           // wrong
                    // { return std::toupper(c); }          // wrong
                       { return std::toupper(c); } // correct
                      );
        return s;
    }
```

### Exemplo

Execute este código
```cpp
    #include <cctype>
    #include <climits>
    #include <clocale>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        for (auto bd{0}; unsigned char lc : std::views::iota(0, UCHAR_MAX))
            if (unsigned char uc = std::toupper(lc); uc != lc)
                std::cout << lc << uc << (13 == ++bd ? '\n' : ' ');
        std::cout << "\n\n";
    
        unsigned char c = '\xb8'; // the character ž in ISO-8859-15
                                  // but ¸ (cedilla) in ISO-8859-1
    
        std::setlocale(LC_ALL, "en_US.iso88591");
        std::cout << std::hex << std::showbase;
        std::cout << "in iso8859-1, toupper('0xb8') gives " << std::toupper(c) << '\n';
        std::setlocale(LC_ALL, "en_US.iso885915");
        std::cout << "in iso8859-15, toupper('0xb8') gives " << std::toupper(c) << '\n';
    }
```

Saída:
```
    aA bB cC dD eE fF gG hH iI jJ kK lL mM
    nN oO pP qQ rR sS tT uU vV wW xX yY zZ
    
    in iso8859-1, toupper('0xb8') gives 0xb8
    in iso8859-15, toupper('0xb8') gives 0xb4
```

### Veja também

[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúscula
(função)
[ toupper(std::locale)](<#/doc/locale/toupper>) | converte um caractere para maiúscula usando a facet ctype de uma locale
(modelo de função)
[ towupper](<#/doc/string/wide/towupper>) | converte um caractere largo para maiúscula
(função)
[Documentação C](<#/>) para toupper

### Links externos

1. | [ISO/IEC 8859-1](<https://en.wikipedia.org/wiki/ISO/IEC_8859-1> "enwiki:ISO/IEC 8859-1"). Da Wikipedia.
---|---
2. | [ISO/IEC 8859-15](<https://en.wikipedia.org/wiki/ISO/IEC_8859-15> "enwiki:ISO/IEC 8859-15"). Da Wikipedia.