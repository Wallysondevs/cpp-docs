# std::iswctype

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
int iswctype( std::wint_t wc, std::wctype_t desc );
```

  
Classifica o caractere largo wc usando a categoria [LC_CTYPE](<#/doc/locale/LC_categories>) do locale C atual, identificada por desc.

Se o valor de wc não for representável como um wchar_t nem igual ao valor da macro WEOF, o comportamento é indefinido.

### Parâmetros

wc  |  \-  |  o caractere largo a ser classificado   
---|---|---
desc  |  \-  |  a categoria [LC_CTYPE](<#/doc/locale/LC_categories>), obtida de uma chamada para [std::wctype](<#/doc/string/wide/wctype>)  
  
### Valor de retorno

Diferente de zero se o caractere wc possuir a propriedade identificada por desc na faceta [LC_CTYPE](<#/doc/locale/LC_categories>) do locale C atual, zero caso contrário.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwctype>
    #include <iostream>
     
    bool classify(wchar_t wc, const std::string& cat)
    {
        return std::iswctype(wc, std::wctype(cat.c_str()));
    }
     
    int main()
    {
        std::setlocale(LC_ALL, "ja_JP.UTF-8");
        std::cout << "The character \u6c34 is...\n";
        for (std::string s : {"digit", "alpha", "space", "cntrl", "jkanji"})
            std::cout << s << "? " << std::boolalpha << classify(L'\u6c34', s) << '\n';
    }
```

Saída: 
```
    The character 水 is...
    digit? false
    alpha? true
    space? false
    cntrl? false
    jkanji? true
```

### Veja também

[ wctype](<#/doc/string/wide/wctype>) |  procura uma categoria de classificação de caractere no locale C atual   
(função)  
[documentação C](<#/>) para iswctype