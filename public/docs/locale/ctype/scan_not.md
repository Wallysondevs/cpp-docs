# std::ctype&lt;CharT&gt;::scan_not, std::ctype&lt;CharT&gt;::do_scan_not

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
const CharT* scan_not( mask m, const CharT* beg, const CharT* end ) const;
protected:
virtual const CharT* do_scan_not( mask m, const CharT* beg, const CharT* end ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_scan_not` da classe mais derivada.

2) Localiza o primeiro caractere no array de caracteres `[`beg`, `end`)` que não satisfaz a máscara de classificação m, ou seja, o primeiro caractere `c` tal que is(m, c) retornaria false.

### Parâmetros

- **m** — máscara a ser procurada
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser procurado
- **end** — ponteiro um após o final para o array de caracteres a ser procurado

### Valor de retorno

Ponteiro para o primeiro caractere em `[`beg`, `end`)` que não satisfaz a máscara, ou `end` se nenhum caractere desse tipo for encontrado.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        auto& f = std::use_facet<std::ctype<wchar_t>>(std::wcout.getloc());
    
        // skip leading whitespace
        wchar_t s1[] = L"      \t\t\n  Кошка";
        const wchar_t* p1 = f.scan_not(std::ctype_base::space, std::begin(s1), std::end(s1));
        std::wcout << '\'' << p1 << "'\n";
    
        // skip leading digits
        wchar_t s2[] = L"123456789ネプネプ";
        const wchar_t* p2 = f.scan_not(std::ctype_base::digit, std::begin(s2), std::end(s2));
        std::wcout << '\'' << p2 << "'\n";
    }
```

Saída:
```
    'Кошка'
    'ネプネプ'
```

### Veja também

[ scan_not](<#/doc/locale/ctype_char/scan_not>) | localiza o primeiro caractere em uma sequência que falha em uma dada classificação, usando a tabela de classificação
(função membro pública de `std::ctype<char>`)
[ do_scan_is](<#/doc/locale/ctype/scan_is>)[virtual] | localiza o primeiro caractere em uma sequência que está em conformidade com uma dada classificação
(função membro virtual protegida)