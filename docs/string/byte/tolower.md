# std::tolower

Definido no cabeçalho `[<cctype>](<#/doc/header/cctype>)`

```c
int tolower( int ch );
```

Converte o caractere fornecido para minúscula de acordo com as regras de conversão de caracteres definidas pela locale C atualmente instalada.

Na locale "C" padrão, as seguintes letras maiúsculas `ABCDEFGHIJKLMNOPQRSTUVWXYZ` são substituídas pelas respectivas letras minúsculas `abcdefghijklmnopqrstuvwxyz`.

### Parâmetros

- **ch** — caractere a ser convertido. Se o valor de ch não for representável como unsigned char e não for igual a [EOF](<#/doc/io/c>), o comportamento é indefinido

### Valor de retorno

Versão minúscula de ch ou ch não modificado se nenhuma versão minúscula estiver listada na locale C atual.

### Notas

Assim como todas as outras funções de [`<cctype>`](<#/doc/header/cctype>), o comportamento de `std::tolower` é indefinido se o valor do argumento não for representável como unsigned char nem igual a [EOF](<#/doc/io/c>). Para usar essas funções com segurança com chars simples (ou signed chars), o argumento deve primeiro ser convertido para unsigned char:
```cpp
    char my_tolower(char ch)
    {
        return static_cast<char>(std::tolower(static_cast<unsigned char>(ch)));
    }
```

Similarmente, elas não devem ser usadas diretamente com algoritmos padrão quando o tipo de valor do iterator for char ou signed char. Em vez disso, converta o valor para unsigned char primeiro:
```cpp
    std::string str_tolower(std::string s)
    {
        std::transform(s.begin(), s.end(), s.begin(),
                    // static_cast<int(*)(int)>(std::tolower)         // wrong
                    // { return std::tolower(c); }           // wrong
                    // { return std::tolower(c); }          // wrong
                       { return std::tolower(c); } // correct
                      );
        return s;
    }
```

### Exemplo

Execute este código
```cpp
    #include <cctype>
    #include <clocale>
    #include <iostream>
     
    int main()
    {
        unsigned char c = '\xb4'; // the character Ž in ISO-8859-15
                                  // but ´ (acute accent) in ISO-8859-1
     
        std::setlocale(LC_ALL, "en_US.iso88591");
        std::cout << std::hex << std::showbase;
        std::cout << "in iso8859-1, tolower('0xb4') gives " << std::tolower(c) << '\n';
        std::setlocale(LC_ALL, "en_US.iso885915");
        std::cout << "in iso8859-15, tolower('0xb4') gives " << std::tolower(c) << '\n';
    }
```

Saída possível:
```
    in iso8859-1, tolower('0xb4') gives 0xb4
    in iso8859-15, tolower('0xb4') gives 0xb8
```

### Veja também

[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúscula
(função)
[ tolower(std::locale)](<#/doc/locale/tolower>) | converte um caractere para minúscula usando a facet `ctype` de uma locale
(modelo de função)
[ towlower](<#/doc/string/wide/towlower>) | converte um caractere largo para minúscula
(função)
[Documentação C](<#/>) para tolower

### Links externos

1. | [ISO/IEC 8859-1](<https://en.wikipedia.org/wiki/ISO/IEC_8859-1> "enwiki:ISO/IEC 8859-1"). Da Wikipedia.
---|---
2. | [ISO/IEC 8859-15](<https://en.wikipedia.org/wiki/ISO/IEC_8859-15> "enwiki:ISO/IEC 8859-15"). Da Wikipedia.