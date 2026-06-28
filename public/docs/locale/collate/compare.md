# std::collate&lt;CharT&gt;::compare, std::collate&lt;CharT&gt;::do_compare

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
int compare( const CharT* low1, const CharT* high1,
const CharT* low2, const CharT* high2 ) const;
protected:
virtual int do_compare( const CharT* low1, const CharT* high1,
const CharT* low2, const CharT* high2 ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_compare` da classe mais derivada.

2) Compara a sequência de caracteres `[`low1`, `high1`)` com a sequência de caracteres `[`low2`, `high2`)`, usando as regras de ordenação (collation) desta locale, e retorna 1 se a primeira string segue a segunda, -1 se a primeira string precede a segunda, zero se as duas strings são equivalentes.

### Parâmetros

- **low1** — ponteiro para o primeiro caractere da primeira string
- **high1** — ponteiro um após o final para a primeira string
- **low2** — ponteiro para o primeiro caractere da segunda string
- **high2** — ponteiro um após o final para a segunda string

### Valor de retorno

1 se a primeira string for maior que a segunda (isto é, segue a segunda na ordem de ordenação), -1 se a primeira string for menor que a segunda (precede a segunda na ordem de ordenação), zero se as duas strings forem equivalentes.

### Observações

Quando a comparação de três vias não é necessária (como ao fornecer um argumento `Compare` para algoritmos padrão como [std::sort](<#/doc/algorithm/sort>)), [`std::locale::operator()`](<#/>) pode ser mais apropriado.

A ordem de ordenação é a ordem do dicionário: a posição da letra no alfabeto nacional (sua _classe de equivalência_) tem prioridade maior do que seu caso (maiúscula/minúscula) ou variante. Dentro de uma classe de equivalência, caracteres minúsculos são ordenados antes de seus equivalentes maiúsculos e uma ordem específica da locale pode ser aplicada a caracteres com diacríticos. Em algumas locales, grupos de caracteres são comparados como unidades de ordenação (collation units) únicas. Por exemplo, "ch" em tcheco segue "h" e precede "i", e "dzs" em húngaro segue "dz" e precede "g".

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
    
    template<typename CharT>
    void try_compare(const std::locale& l, const CharT* p1, const CharT* p2)
    {
        auto& f = std::use_facet<std::collate<CharT>>(l);
    
        std::basic_string<CharT> s1(p1), s2(p2);
        if (f.compare(&s1[0], &s1[0] + s1.size(),
                      &s2[0], &s2[0] + s2.size()) < 0)
            std::wcout << p1 << " before " << p2 << '\n';
        else
            std::wcout << p2 << " before " << p1 << '\n';
    }
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
    
        std::wcout << "In the American locale: ";
        try_compare(std::locale(), "hrnec", "chrt");
        std::wcout << "In the Czech locale: ";
        try_compare(std::locale("cs_CZ.utf8"), "hrnec", "chrt");
    
        std::wcout << "In the American locale: ";
        try_compare(std::locale(), L"år", L"ängel");
        std::wcout << "In the Swedish locale: ";
        try_compare(std::locale("sv_SE.utf8"), L"år", L"ängel");
    }
```

Output:
```
    In the American locale: chrt before hrnec
    In the Czech locale: hrnec before chrt
    In the American locale: ängel before år
    In the Swedish locale: år before ängel
```

### Veja também

[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a locale atual
(função)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas wide strings de acordo com a locale atual
(função)
[ operator()](<#/>) | compara lexicograficamente duas strings usando a facet collate desta locale
(função membro pública de `std::locale`)