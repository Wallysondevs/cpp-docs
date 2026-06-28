# std::ctype&lt;CharT&gt;::tolower, std::ctype&lt;CharT&gt;::do_tolower

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
CharT tolower( CharT c ) const;
public:
const CharT* tolower( CharT* beg, const CharT* end ) const;
protected:
virtual CharT do_tolower( CharT c ) const;
protected:
virtual const CharT* do_tolower( CharT* beg, const CharT* end ) const;
```

1,2) Função membro pública, chama a função membro virtual protegida `do_tolower` da classe mais derivada.

3) Converte o caractere c para minúscula se uma forma minúscula for definida por esta locale.

4) Para cada caractere no array de caracteres `[`beg`, `end`)`, para o qual existe uma forma minúscula, substitui o caractere por essa forma minúscula.

### Parâmetros

- **c** — caractere a converter
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a converter
- **end** — ponteiro um-depois-do-final para o array de caracteres a converter

### Valor de retorno

1,3) Caractere minúsculo ou c se nenhuma forma minúscula for listada por esta locale.

2,4) end

### Notas

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a letra maiúscula grega 'Σ' tem duas formas minúsculas, dependendo da posição em uma palavra: 'σ' e 'ς'. Uma chamada para `do_tolower` não pode ser usada para obter a forma minúscula correta neste caso.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    void try_lower(const std::ctype<wchar_t>& f, wchar_t c)
    {
        wchar_t up = f.tolower(c);
        if (up != c)
            std::wcout << "Lower case form of \'" << c << "' is " << up << '\n';
        else
            std::wcout << '\'' << c << "' has no lower case form\n";
    }
     
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
        std::wcout << "In US English UTF-8 locale:\n";
        auto& f = std::use_facet<std::ctype<wchar_t>>(std::locale());
        try_lower(f, L'Σ');
        try_lower(f, L'Ɛ');
        try_lower(f, L'Ａ');
     
        std::wstring str = L"HELLo, wORLD!";
        std::wcout << "Lowercase form of the string '" << str << "' is ";
        f.tolower(&str[0], &str[0] + str.size());
        std::wcout << '\'' << str << "'\n";
    }
```

Saída:
```
    In US English UTF-8 locale:
    Lower case form of 'Σ' is σ
    Lower case form of 'Ɛ' is ɛ
    Lower case form of 'Ａ' is ａ
    Lowercase form of the string 'HELLo, wORLD!' is 'hello, world!'
```

### Veja também

[ toupper](<#/doc/locale/ctype/toupper>) | invoca `do_toupper`
(função membro pública)
[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúscula
(função)
[ towlower](<#/doc/string/wide/towlower>) | converte um caractere largo para minúscula
(função)