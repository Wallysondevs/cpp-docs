# std::ctype&lt;CharT&gt;::scan_is, std::ctype&lt;CharT&gt;::do_scan_is

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
const CharT* scan_is( mask m, const CharT* beg, const CharT* end ) const;
protected:
virtual const CharT* do_scan_is( mask m, const CharT* beg, const CharT* end ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_scan_is` da classe mais derivada.

2) Localiza o primeiro caractere no array de caracteres `[`beg`, `end`)` que satisfaz a máscara de classificação `m`, ou seja, o primeiro caractere `c` tal que `is(m, c)` retornaria `true`.

### Parâmetros

- **m** — máscara a ser procurada
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser pesquisado
- **end** — ponteiro um após o final para o array de caracteres a ser pesquisado

### Valor de retorno

Ponteiro para o primeiro caractere em `[`beg`, `end`)` que satisfaz a máscara, ou `end` se nenhum caractere for encontrado.

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
     
        // skip until the first letter
        wchar_t s1[] = L"      \t\t\n  Кошка";
        const wchar_t* p1 = f.scan_is(std::ctype_base::alpha, std::begin(s1), std::end(s1));
        std::wcout << '\'' << p1 << "'\n";
     
        // skip until the first letter
        wchar_t s2[] = L"123456789ネプネプ";
        const wchar_t* p2 = f.scan_is(std::ctype_base::alpha, std::begin(s2), std::end(s2));
        std::wcout << '\'' << p2 << "'\n";
    }
```

Saída:
```
    'Кошка'
    'ネプネプ'
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 152](<https://cplusplus.github.io/LWG/issue152>) | C++98 | o efeito de `do_scan_is` mencionava `is(m)`, mas [`is`](<#/doc/locale/ctype/is>) não possui tal sobrecarga | corrigido para `is(m, c)`

### Veja também

[ scan_is](<#/doc/locale/ctype_char/scan_is>) | localiza o primeiro caractere em uma sequência que está em conformidade com uma dada classificação, usando a tabela de classificação (função membro pública de `std::ctype<char>`)
---|---
[ do_scan_not](<#/doc/locale/ctype/scan_not>)[virtual] | localiza o primeiro caractere em uma sequência que falha em uma dada classificação (função membro virtual protegida)