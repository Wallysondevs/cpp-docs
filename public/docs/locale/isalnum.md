# std::isalnum(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isalnum( CharT ch, const locale& loc );
```

  
Verifica se o caractere fornecido é classificado como um caractere alfanumérico pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido. 

### Parâmetros

ch  |  \-  |  caractere   
---|---|---
loc  |  \-  |  locale   
  
### Valor de retorno

Retorna true se o caractere for classificado como alfanumérico, false caso contrário. 

### Implementação possível
```
    template<class CharT>
    bool isalnum(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::alnum, ch);
    }
```
  
---  
  
### Exemplo

Demonstra o uso de `isalnum()` com diferentes locales (específicos do SO).

Execute este código
```
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t c = L'\u2135'; // mathematical symbol aleph
     
        std::locale loc1("C");
        std::cout << "isalnum('ℵ', C locale) returned "
                  << std::boolalpha << std::isalnum(c, loc1) << '\n';
     
        std::locale loc2("en_US.UTF-8");
        std::cout << "isalnum('ℵ', Unicode locale) returned "
                  << std::boolalpha << std::isalnum(c, loc2) << '\n';
    }
```

Saída possível: 
```
    isalnum('ℵ', C locale) returned false
    isalnum('ℵ', Unicode locale) returned true
```

### Veja também

[ isalnum](<#/doc/string/byte/isalnum>) |  verifica se um caractere é alfanumérico   
(função)  
[ iswalnum](<#/doc/string/wide/iswalnum>) |  verifica se um caractere largo é alfanumérico   
(função)