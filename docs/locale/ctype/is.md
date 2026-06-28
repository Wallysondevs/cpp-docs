# std::ctype&lt;CharT&gt;::is, std::ctype&lt;CharT&gt;::do_is

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
bool is( mask m, CharT c ) const;
public:
const CharT* is( const CharT* low, const CharT* high, mask* vec ) const;
protected:
virtual bool do_is( mask m, CharT c ) const;
protected:
virtual const CharT* do_is( const CharT* low, const CharT* high, mask* vec ) const;
```

1,2) Função membro pública, chama a função membro virtual protegida `do_is` da classe mais derivada.

3) Verifica se o caractere c é classificado pela mask m.

4) Para cada caractere no array de caracteres `[`low`, `high`)`, identifica a mask de classificação completa (por exemplo, digit|xdigit|alnum|print|graph para o dígito '0' na locale padrão), e armazena as masks nos elementos correspondentes do array apontado por vec.

### Parâmetros

- **c** — caractere a ser classificado
- **m** — mask a ser usada para classificar um único caractere
- **low** — ponteiro para o primeiro caractere em um array de caracteres a ser classificado
- **high** — ponteiro um-depois-do-final para o array de caracteres a ser classificado
- **vec** — ponteiro para o primeiro elemento do array de masks a ser preenchido

### Valor de retorno

1,3) true se c for classificado por m.

2,4) high

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <locale>
    #include <utility>
    #include <vector>
    
    // utility wrapper to make locale-bound facets destructible
    template<class Facet>
    struct deletable_facet : Facet
    {
        template<class ...Args>
        deletable_facet(Args&& ...args) : Facet(std::forward<Args>(args)...) {}
        ~deletable_facet() {}
    };
    
    int main()
    {
        // classify a single character using the default locale
        auto& f = std::use_facet<std::ctype<char>>(std::locale());
        char c = '0';
        if (f.is(std::ctype_base::digit, c)) // or isdigit(c, locale());
            std::cout << '\'' << c << "' is a digit\n";
    
        // classify every character in a string using a named locale
        deletable_facet<std::ctype_byname<wchar_t>> f2("en_US.utf8");
        std::wstring str = L"z\u00df\u6c34\U0001d10b";
        std::vector<std::ctype_base::mask> vec(str.size());
        f2.is(&str[0], &str[0] + str.size(), &vec[0]);
    
        for (std::size_t n = 0; n < str.size(); ++n)
        {
            std::cout << std::hex << "U+" << static_cast<wint_t>(str[n]) << " is: ";
            if (vec[n] & std::ctype_base::alnum) 
                std::cout << "alnum";
            if (vec[n] & std::ctype_base::punct) 
                std::cout << "punct";
            std::cout << '\n';
        }
    }
```

Saída:
```
    '0' is a digit
    U+7a is: alnum 
    U+df is: alnum 
    U+6c34 is: alnum 
    U+1d10b is: punct
```

### Veja também

[ is](<#/doc/locale/ctype_char/is>) | classifica um caractere ou uma sequência de caracteres, usando a tabela de classificação
---|---
(função membro pública de `std::ctype<char>`) |
[ iswctype](<#/doc/string/wide/iswctype>) | classifica um caractere largo de acordo com a categoria `LC_CTYPE` especificada
(função) |