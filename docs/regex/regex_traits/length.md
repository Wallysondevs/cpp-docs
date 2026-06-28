# std::regex_traits&lt;CharT&gt;::length

static [std::size_t](<#/doc/types/size_t>) length( const char_type* p );

  
Calcula o comprimento de uma sequência de caracteres terminada em nulo, ou seja, o menor `i` tal que p[i] == 0.

Especializações da standard library de [std::regex_traits](<#/doc/regex/regex_traits>) executam [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;::length(p);.

### Parâmetros

p  |  \-  |  ponteiro para o primeiro elemento da sequência de caracteres terminada em nulo   
  
### Valor de retorno

O comprimento da string de caracteres terminada em nulo.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
     
    int main()
    {
        std::cout << std::regex_traits<char>::length("Кошка") << '\n'
                  << std::regex_traits<wchar_t>::length(L"Кошка") << '\n';
    }
```

Saída: 
```
    10
    5
```