# std::ctype&lt;CharT&gt;::toupper, std::ctype&lt;CharT&gt;::do_toupper

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
CharT toupper( CharT c ) const;
public:
const CharT* toupper( CharT* beg, const CharT* end ) const;
protected:
virtual CharT do_toupper( CharT c ) const;
protected:
virtual const CharT* do_toupper( CharT* beg, const CharT* end ) const;
```

1,2) Função membro pública, chama a função membro virtual protegida `do_toupper` da classe mais derivada.

3) Converte o caractere c para maiúscula se uma forma em maiúscula for definida por esta locale.

4) Para cada caractere no array de caracteres `[`beg`, `end`)`, para o qual existe uma forma em maiúscula, substitui o caractere por essa forma em maiúscula.

### Parâmetros

- **c** — caractere a ser convertido
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser convertido
- **end** — ponteiro um-além-do-final para o array de caracteres a ser convertido

### Valor de retorno

1,3) Caractere em maiúscula ou c se nenhuma forma em maiúscula for listada por esta locale.

2,4) end

### Observações

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a forma em maiúscula de 'ß' é a string de dois caracteres "SS" (com algumas exceções - veja [«Capital ẞ»](<https://en.wikipedia.org/wiki/Capital_%E1%BA%9E>)), que não pode ser obtida por `do_toupper`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    void try_upper(const std::ctype<wchar_t>& f, wchar_t c)
    {
        wchar_t up = f.toupper(c);
        if (up != c)
            std::wcout << "Upper case form of \'" << c << "' is " << up << '\n';
        else
            std::wcout << '\'' << c << "' has no upper case form\n";
    }
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
        std::wcout << "In US English UTF-8 locale:\n";
        auto& f = std::use_facet<std::ctype<wchar_t>>(std::locale());
        try_upper(f, L's');
        try_upper(f, L'ſ');
        try_upper(f, L'δ');
        try_upper(f, L'ö');
        try_upper(f, L'ß');
    
        std::wstring str = L"Hello, World!";
        std::wcout << "Uppercase form of the string '" << str << "' is ";
        f.toupper(&str[0], &str[0] + str.size());
        std::wcout << '\'' << str << "'\n";
    }
```

Output:
```
    In US English UTF-8 locale:
    Upper case form of 's' is S
    Upper case form of 'ſ' is S
    Upper case form of 'δ' is Δ
    Upper case form of 'ö' is Ö
    'ß' has no upper case form
    Uppercase form of the string 'Hello, World!' is 'HELLO, WORLD!'
```

### Veja também

[ tolower](<#/doc/locale/ctype/tolower>) | invoca `do_tolower`
(função membro pública)
[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúscula
(função)
[ towupper](<#/doc/string/wide/towupper>) | converte um caractere largo para maiúscula
(função)