# std::regex_traits&lt;CharT&gt;::regex_traits

regex_traits();

  
Constrói por padrão o objeto [std::regex_traits](<#/doc/regex/regex_traits>), incluindo a construção por padrão do membro privado [std::locale](<#/doc/locale/locale>) ou qualquer outro estado interno conforme necessário. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
     
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::regex_traits<char> r1;
        std::regex_traits<wchar_t> r2;
        std::cout << "The regex locale is " << r1.getloc().name() << '\n';
    }
```

Saída: 
```
    The regex locale is en_US.utf8
```