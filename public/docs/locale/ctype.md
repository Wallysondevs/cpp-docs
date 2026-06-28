# std::ctype

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class ctype;
```

A classe `ctype` encapsula funcionalidades de classificação de caracteres. Todas as operações de entrada de stream realizadas através de [std::basic_istream](<#/doc/io/basic_istream>)&lt;CharT&gt; usam o `std::ctype<CharT>` do locale imbuído na stream para identificar caracteres de espaço em branco para a tokenização da entrada. Operações de saída de stream aplicam `std::ctype<CharT>::widen()` a argumentos de caracteres estreitos antes da saída.

Diagrama de herança

### Especializações

A standard library tem garantia de fornecer as seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
[`std::ctype<char>`](<#/doc/locale/ctype_char>) | fornece equivalentes de caracteres estreitos da classificação mínima do locale "C". Esta especialização usa pesquisa em tabela para classificação de caracteres
---|---
std::ctype<wchar_t> | fornece classificação de caracteres largos apropriada para o conjunto de caracteres nativo

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/ctype/ctype>) | constrói um novo facet `ctype`
(função membro pública)
[ (destrutor)](<#/doc/locale/ctype/~ctype>) | destrói um facet `ctype`
(função membro protegida)
[ is](<#/doc/locale/ctype/is>) | invoca `do_is`
(função membro pública)
[ scan_is](<#/doc/locale/ctype/scan_is>) | invoca `do_scan_is`
(função membro pública)
[ scan_not](<#/doc/locale/ctype/scan_not>) | invoca `do_scan_not`
(função membro pública)
[ toupper](<#/doc/locale/ctype/toupper>) | invoca `do_toupper`
(função membro pública)
[ tolower](<#/doc/locale/ctype/tolower>) | invoca `do_tolower`
(função membro pública)
[ widen](<#/doc/locale/ctype/widen>) | invoca `do_widen`
(função membro pública)
[ narrow](<#/doc/locale/ctype/narrow>) | invoca `do_narrow`
(função membro pública)

### Funções membro protegidas

[ do_is](<#/doc/locale/ctype/is>)[virtual] | classifica um caractere ou uma sequência de caracteres
(função membro virtual protegida)
[ do_scan_is](<#/doc/locale/ctype/scan_is>)[virtual] | localiza o primeiro caractere em uma sequência que está em conformidade com a classificação dada
(função membro virtual protegida)
[ do_scan_not](<#/doc/locale/ctype/scan_not>)[virtual] | localiza o primeiro caractere em uma sequência que falha na classificação dada
(função membro virtual protegida)
[ do_toupper](<#/doc/locale/ctype/toupper>)[virtual] | converte um caractere ou caracteres para maiúsculas
(função membro virtual protegida)
[ do_tolower](<#/doc/locale/ctype/tolower>)[virtual] | converte um caractere ou caracteres para minúsculas
(função membro virtual protegida)
[ do_widen](<#/doc/locale/ctype/widen>)[virtual] | converte um caractere ou caracteres de char para `CharT`
(função membro virtual protegida)
[ do_narrow](<#/doc/locale/ctype/narrow>)[virtual] | converte um caractere ou caracteres de `CharT` para char
(função membro virtual protegida)

## Herdado de [std::ctype_base](<#/doc/locale/ctype_base>)

### Tipos aninhados

Tipo | Definição
---|---
`mask` | tipo [BitmaskType](<#/doc/named_req/BitmaskType>) não especificado (enumeração, tipo inteiro ou bitset)

### Constantes membro

space[static] | o valor de `mask` que identifica a classificação de caractere de espaço em branco
(constante membro estática pública)
print[static] | o valor de `mask` que identifica a classificação de caractere imprimível
(constante membro estática pública)
cntrl[static] | o valor de `mask` que identifica a classificação de caractere de controle
(constante membro estática pública)
upper[static] | o valor de `mask` que identifica a classificação de caractere maiúsculo
(constante membro estática pública)
lower[static] | o valor de `mask` que identifica a classificação de caractere minúsculo
(constante membro estática pública)
alpha[static] | o valor de `mask` que identifica a classificação de caractere alfabético
(constante membro estática pública)
digit[static] | o valor de `mask` que identifica a classificação de caractere de dígito
(constante membro estática pública)
punct[static] | o valor de `mask` que identifica a classificação de caractere de pontuação
(constante membro estática pública)
xdigit[static] | o valor de `mask` que identifica a classificação de caractere de dígito hexadecimal
(constante membro estática pública)
blank[static] (desde C++11) | o valor de `mask` que identifica a classificação de caractere em branco
(constante membro estática pública)
alnum[static] | alpha | digit
(constante membro estática pública)
graph[static] | alnum | punct
(constante membro estática pública)

### Exemplo

O exemplo a seguir demonstra a modificação de um `ctype` diferente de `ctype<char>` para tokenizar um arquivo CSV:

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    struct csv_whitespace : std::ctype<wchar_t>
    {
        bool do_is(mask m, char_type c) const
        {
            if ((m & space) && c == L' ')
                return false; // space will NOT be classified as whitespace
    
            if ((m & space) && c == L',')
                return true; // comma will be classified as whitespace
    
            return ctype::do_is(m, c); // leave the rest to the base class
        }
    };
    
    int main()
    {
        std::wstring in = L"Column 1,Column 2,Column 3\n123,456,789";
        std::wstring token;
    
        std::wcout << "default locale:\n";
        std::wistringstream s1(in);
        while (s1 >> token)
            std::wcout << "  " << token << '\n';
    
        std::wcout << "locale with modified ctype:\n";
        std::wistringstream s2(in);
        csv_whitespace* my_ws = new csv_whitespace;
        s2.imbue(std::locale(s2.getloc(), my_ws));
        while (s2 >> token)
            std::wcout << "  " << token << '\n';
    }
```

Saída:
```
    default locale:
      Column
      1,Column
      2,Column
      3
      123,456,789
    locale with modified ctype:
      Column 1
      Column 2
      Column 3
      123
      456
      789
```

### Veja também

[ ctype&lt;char&gt;](<#/doc/locale/ctype_char>) | especialização de **std::ctype** para o tipo char
(especialização de modelo de classe)
[ ctype_base](<#/doc/locale/ctype_base>) | define categorias de classificação de caracteres
(classe)
[ ctype_byname](<#/doc/locale/ctype_byname>) | representa o **std::ctype** fornecido pelo sistema para o locale nomeado
(modelo de classe)