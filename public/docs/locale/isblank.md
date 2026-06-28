# std::isblank(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isblank( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere em branco pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere é classificado como um caractere em branco, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool isblank(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::blank, ch);
    }
```

---

### Exemplo

Demonstra o uso de `isblank()` com diferentes locales (específicos do SO).

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    void try_with(wchar_t c, const char* loc)
    {
        std::wcout << "isblank('" << c << "', locale(\"" << loc << "\")) returned "
                   << std::boolalpha
                   << std::isblank(c, std::locale(loc)) << '\n';
    }
     
    int main()
    {
        const wchar_t IDEO_SPACE = L'\u3000'; // Unicode character 'IDEOGRAPHIC SPACE'
        try_with(IDEO_SPACE, "C");
        try_with(IDEO_SPACE, "en_US.UTF-8");
    }
```

Saída possível:
```
    isblank(' ', locale("C")) returned false
    isblank(' ', locale("en_US.UTF-8")) returned true
```

### Veja também

[ isblank](<#/doc/string/byte/isblank>)(C++11) | verifica se um caractere é um caractere em branco
(função)
[ iswblank](<#/doc/string/wide/iswblank>)(C++11) | verifica se um caractere largo é um caractere em branco
(função)