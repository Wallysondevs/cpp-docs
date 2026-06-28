# std::wcscoll

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wcscoll( const wchar_t* lhs, const wchar_t* rhs );
```

Compara duas wide strings terminadas em nulo de acordo com a locale mais recentemente instalada por [std::setlocale](<#/doc/locale/setlocale>), conforme definido pela categoria [LC_COLLATE](<#/doc/locale/LC_categories>).

### Parâmetros

- **lhs, rhs** — ponteiros para as wide strings terminadas em nulo a serem comparadas

### Valor de retorno

Valor negativo se lhs for _menor que_ (precede) rhs.

​0​ se lhs for _igual a_ rhs.

Valor positivo se lhs for _maior que_ (segue) rhs.

### Notas

A ordem de agrupamento (collation order) é a ordem de dicionário: a posição da letra no alfabeto nacional (sua _classe de equivalência_) tem prioridade maior do que seu caso (maiúscula/minúscula) ou variante. Dentro de uma classe de equivalência, caracteres minúsculos agrupam-se antes de seus equivalentes maiúsculos e uma ordem específica da locale pode ser aplicada aos caracteres com diacríticos. Em algumas locales, grupos de caracteres são comparados como unidades de agrupamento (collation units) únicas. Por exemplo, "ch" em tcheco segue "h" e precede "i", e "dzs" em húngaro segue "dz" e precede "g".

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <iostream>
     
    void try_compare(const wchar_t* p1, const wchar_t* p2)
    {
        if (std::wcscoll(p1, p2) < 0)
            std::wcout << p1 << " before " << p2 << '\n';
        else
            std::wcout << p2 << " before " << p1 << '\n';
    }
     
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout << "In the American locale: ";
        try_compare(L"hrnec", L"chrt");
     
        std::setlocale(LC_COLLATE, "cs_CZ.utf8");
        std::wcout << "In the Czech locale: ";
        try_compare(L"hrnec", L"chrt");
     
        std::setlocale(LC_COLLATE, "en_US.utf8");
        std::wcout << "In the American locale: ";
        try_compare(L"år", L"ängel");
     
        std::setlocale(LC_COLLATE, "sv_SE.utf8");
        std::wcout << "In the Swedish locale: ";
        try_compare(L"år", L"ängel");
    }
```

Output:
```
    In the American locale: chrt before hrnec
    In the Czech locale: hrnec before chrt
    In the American locale: ängel before år
    In the Swedish locale: år before ängel
```

### Ver também

[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a locale atual
(função)
[ do_compare](<#/doc/locale/collate/compare>)[virtual] | compara duas strings usando as regras de agrupamento (collation) desta facet
(função membro virtual protegida de `std::collate<CharT>`)
[ wcsxfrm](<#/doc/string/wide/wcsxfrm>) | transforma uma wide string para que `wcscmp` produza o mesmo resultado que `wcscoll`
(função)
[Documentação C](<#/>) para wcscoll