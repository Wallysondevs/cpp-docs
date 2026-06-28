# std::isspace(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isspace( CharT ch, const locale& loc );
```

  
Verifica se o caractere fornecido é classificado como um caractere de espaço em branco pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido. 

### Parâmetros

ch  |  \-  |  caractere   
---|---|---
loc  |  \-  |  locale   
  
### Valor de retorno

Retorna true se o caractere for classificado como um caractere de espaço em branco, false caso contrário. 

### Possível implementação
```
    template<class CharT>
    bool isspace(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::space, ch);
    }
```
  
---  
  
### Exemplo

Demonstra o uso de `std::isspace()` com diferentes locales (específicos do SO).

Execute este código
```
    #include <iostream>
    #include <locale>
     
    void try_with(wchar_t c, const char* loc)
    {
        std::wcout << "isspace('" << c << "', locale(\"" << loc << "\")) returned "
                   << std::boolalpha << std::isspace(c, std::locale(loc)) << '\n';
    }
     
    int main()
    {
        const wchar_t EM_SPACE = L'\u2003'; // Caractere Unicode 'EM SPACE'
        try_with(EM_SPACE, "C");
        try_with(EM_SPACE, "en_US.UTF8");
    }
```

Saída possível: 
```
    isspace(' ', locale("C")) returned false
    isspace(' ', locale("en_US.UTF8")) returned true
```

### Veja também

[ isspace](<#/doc/string/byte/isspace>) |  verifica se um caractere é um caractere de espaço   
(função)  
[ iswspace](<#/doc/string/wide/iswspace>) |  verifica se um caractere largo é um caractere de espaço   
(função)