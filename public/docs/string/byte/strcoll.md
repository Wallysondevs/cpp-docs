# std::strcoll

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
int strcoll( const char* lhs, const char* rhs );
```

Compara duas strings de bytes terminadas em nulo de acordo com a localidade atual, conforme definido pela categoria [LC_COLLATE](<#/doc/locale/LC_categories>).

### Parâmetros

- **lhs, rhs** — ponteiros para as strings de bytes terminadas em nulo a serem comparadas

### Valor de retorno

*   Valor negativo se lhs for _menor que_ (precede) rhs.
*   ​0​ se lhs for _igual a_ rhs.
*   Valor positivo se lhs for _maior que_ (segue) rhs.

### Observações

A ordem de agrupamento (collation) é a ordem do dicionário: a posição da letra no alfabeto nacional (sua _classe de equivalência_) tem prioridade maior do que seu caso (maiúscula/minúscula) ou variante. Dentro de uma classe de equivalência, caracteres minúsculos agrupam antes de seus equivalentes maiúsculos e uma ordem específica da localidade pode ser aplicada a caracteres com diacríticos. Em algumas localidades, grupos de caracteres são comparados como unidades de agrupamento (collation units) únicas. Por exemplo, "ch" em tcheco segue "h" e precede "i", e "dzs" em húngaro segue "dz" e precede "g".

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        std::setlocale(LC_COLLATE, "cs_CZ.utf8");
        // Alternatively, ISO-8859-2 (a.k.a. Latin-2)
        // may also work on some OS:
        // std::setlocale(LC_COLLATE, "cs_CZ.iso88592");
     
        const char* s1 = "hrnec";
        const char* s2 = "chrt";
     
        std::cout << "In the Czech locale: ";
        if (std::strcoll(s1, s2) < 0)
            std::cout << s1 << " before " << s2 << '\n';
        else
            std::cout << s2 << " before " << s1 << '\n';
     
        std::cout << "In lexicographical comparison: ";
        if (std::strcmp(s1, s2) < 0)
            std::cout << s1 << " before " << s2 << '\n';
        else
            std::cout << s2 << " before " << s1 << '\n';
    }
```

Saída:
```
    In the Czech locale: hrnec before chrt
    In lexicographical comparison: chrt before hrnec
```

### Veja também

[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas wide strings de acordo com a localidade atual
(função)
[ do_compare](<#/doc/locale/collate/compare>)[virtual] | compara duas strings usando as regras de agrupamento (collation) desta facet
(função membro virtual protegida de `std::collate<CharT>`)
[ strxfrm](<#/doc/string/byte/strxfrm>) | transforma uma string para que `strcmp` produza o mesmo resultado que `strcoll`
(função)
[Documentação C](<#/>) para strcoll