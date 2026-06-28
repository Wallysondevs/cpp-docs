# std::collate

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class collate;
```

A classe `std::collate` encapsula a ordenação (comparação) e o hashing de strings específicos da locale. Esta facet é usada por [std::basic_regex](<#/doc/regex/basic_regex>) e pode ser aplicada, por meio de [`std::locale::operator()`](<#/>), diretamente a todos os algoritmos padrão que esperam um predicado de comparação de strings.

Diagrama de herança

### Especializações

A standard library garante o fornecimento das seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::collate&lt;char&gt; | implementa a ordenação lexicográfica de strings de bytes
---|---
std::collate<wchar_t> | implementa a ordenação lexicográfica de wide strings

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/collate/collate>) | constrói uma nova facet `collate`
(função membro pública)
[ (destrutor)](<#/doc/locale/collate/~collate>) | destrói uma facet `collate`
(função membro protegida)
[ compare](<#/doc/locale/collate/compare>) | invoca `do_compare`
(função membro pública)
[ transform](<#/doc/locale/collate/transform>) | invoca `do_transform`
(função membro pública)
[ hash](<#/doc/locale/collate/hash>) | invoca `do_hash`
(função membro pública)

### Funções membro protegidas

[ do_compare](<#/doc/locale/collate/compare>)[virtual] | compara duas strings usando as regras de ordenação desta facet
(função membro virtual protegida)
[ do_transform](<#/doc/locale/collate/transform>)[virtual] | transforma uma string para que a ordenação possa ser substituída por comparação
(função membro virtual protegida)
[ do_hash](<#/doc/locale/collate/hash>)[virtual] | gera um valor hash inteiro usando as regras de ordenação desta facet
(função membro virtual protegida)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <locale>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale(""));
        std::vector<std::wstring> v
        {
            L"ar", L"zebra", L"\u00f6grupp", L"Zebra",
            L"\u00e4ngel",L"\u00e5r", L"f\u00f6rnamn"
        };
    
        std::wcout << "Default locale collation order: ";
        std::sort(v.begin(), v.end());
        for (auto s : v)
            std::wcout << s << ' ';
        std::wcout << '\n';
    
        std::wcout << "English locale collation order: ";
        std::sort(v.begin(), v.end(), std::locale("en_US.UTF-8"));
        for (auto s : v)
            std::wcout << s << ' ';
        std::wcout << '\n';
    
        std::wcout << "Swedish locale collation order: ";
        std::sort(v.begin(), v.end(), std::locale("sv_SE.UTF-8"));
        for (auto s : v)
            std::wcout << s << ' ';
        std::wcout << '\n';
    }
```

Saída:
```
    Default locale collation order: Zebra ar förnamn zebra ängel år ögrupp
    English locale collation order: ängel ar år förnamn ögrupp zebra Zebra
    Swedish locale collation order: ar förnamn zebra Zebra år ängel ögrupp
```

### Veja também

[ operator()](<#/>) | compara lexicograficamente duas strings usando a facet collate desta locale
(função membro pública de `std::locale`)
[ collate_byname](<#/doc/locale/collate_byname>) | representa o **std::collate** fornecido pelo sistema para a locale nomeada
(modelo de classe)