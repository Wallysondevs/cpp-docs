# std::ctype&lt;char&gt;

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<>
class ctype<char>;
```

Esta especialização de [std::ctype](<#/doc/locale/ctype>) encapsula funcionalidades de classificação de caracteres para o tipo char. Ao contrário do [std::ctype](<#/doc/locale/ctype>) de propósito geral, que usa funções virtuais, esta especialização usa pesquisa em tabela para classificar caracteres (o que é geralmente mais rápido).

A classe base `std::ctype`&lt;char&gt; implementa classificação de caracteres equivalente à locale "C" mínima. As regras de classificação podem ser estendidas ou modificadas se construídas com um argumento de tabela de classificação não padrão, se construídas como [std::ctype_byname](<#/doc/locale/ctype_byname>)&lt;char&gt; ou como um facet derivado definido pelo usuário. Todas as funções de entrada formatada de [std::istream](<#/doc/io/basic_istream>) são obrigadas a usar `std::ctype`&lt;char&gt; para classificação de caracteres durante a análise da entrada.

Diagrama de herança

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | char

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)
const [std::size_t](<#/doc/types/size_t>) `table_size` [static] | tamanho da tabela de classificação, pelo menos 256

### Funções membro

[ (construtor)](<#/doc/locale/ctype_char/ctype>) | constrói um novo facet ctype&lt;char&gt;
(função membro pública)
[ (destrutor)](<#/doc/locale/ctype_char/~ctype>) | destrói um facet ctype&lt;char&gt;
(função membro protegida)
[ table](<#/doc/locale/ctype_char/table>) | obtém a tabela de classificação de caracteres
(função membro pública)
[ classic_table](<#/doc/locale/ctype_char/classic_table>)[static] | obtém a tabela de classificação de caracteres da locale "C"
(função membro estática pública)
[ is](<#/doc/locale/ctype_char/is>) | classifica um caractere ou uma sequência de caracteres, usando a tabela de classificação
(função membro pública)
[ scan_is](<#/doc/locale/ctype_char/scan_is>) | localiza o primeiro caractere em uma sequência que está em conformidade com a classificação fornecida, usando a tabela de classificação
(função membro pública)
[ scan_not](<#/doc/locale/ctype_char/scan_not>) | localiza o primeiro caractere em uma sequência que falha na classificação fornecida, usando a tabela de classificação
(função membro pública)
[ toupper](<#/doc/locale/ctype/toupper>) | invoca `do_toupper`
(função membro pública de `std::ctype<CharT>`)
[ tolower](<#/doc/locale/ctype/tolower>) | invoca `do_tolower`
(função membro pública de `std::ctype<CharT>`)
[ widen](<#/doc/locale/ctype/widen>) | invoca `do_widen`
(função membro pública de `std::ctype<CharT>`)
[ narrow](<#/doc/locale/ctype/narrow>) | invoca `do_narrow`
(função membro pública de `std::ctype<CharT>`)

### Funções membro protegidas

[ do_toupper](<#/doc/locale/ctype/toupper>)[virtual] | converte um caractere ou caracteres para maiúsculas
(função membro protegida virtual de `std::ctype<CharT>`)
[ do_tolower](<#/doc/locale/ctype/tolower>)[virtual] | converte um caractere ou caracteres para minúsculas
(função membro protegida virtual de `std::ctype<CharT>`)
[ do_widen](<#/doc/locale/ctype/widen>)[virtual] | converte um caractere ou caracteres de char para `CharT`
(função membro protegida virtual de `std::ctype<CharT>`)
[ do_narrow](<#/doc/locale/ctype/narrow>)[virtual] | converte um caractere ou caracteres de `CharT` para char
(função membro protegida virtual de `std::ctype<CharT>`)

## Herdado de [std::ctype_base](<#/doc/locale/ctype_base>)

### Tipos aninhados

Tipo | Definição
---|---
`mask` | tipo [BitmaskType](<#/doc/named_req/BitmaskType>) não especificado (enumeração, tipo inteiro ou bitset)

### Constantes membro

space[static] | o valor de `mask` que identifica a classificação de caracteres de espaço em branco
(constante membro estática pública)
print[static] | o valor de `mask` que identifica a classificação de caracteres imprimíveis
(constante membro estática pública)
cntrl[static] | o valor de `mask` que identifica a classificação de caracteres de controle
(constante membro estática pública)
upper[static] | o valor de `mask` que identifica a classificação de caracteres maiúsculos
(constante membro estática pública)
lower[static] | o valor de `mask` que identifica a classificação de caracteres minúsculos
(constante membro estática pública)
alpha[static] | o valor de `mask` que identifica a classificação de caracteres alfabéticos
(constante membro estática pública)
digit[static] | o valor de `mask` que identifica a classificação de caracteres de dígito
(constante membro estática pública)
punct[static] | o valor de `mask` que identifica a classificação de caracteres de pontuação
(constante membro estática pública)
xdigit[static] | o valor de `mask` que identifica a classificação de caracteres de dígito hexadecimal
(constante membro estática pública)
blank[static] (C++11) | o valor de `mask` que identifica a classificação de caracteres em branco
(constante membro estática pública)
alnum[static] | alpha | digit
(constante membro estática pública)
graph[static] | alnum | punct
(constante membro estática pública)

### Exemplo

O exemplo a seguir demonstra a modificação de ctype&lt;char&gt; para tokenizar valores separados por vírgula:

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <locale>
    #include <sstream>
    #include <vector>
    
    // This ctype facet classifies commas and endlines as whitespace
    struct csv_whitespace : std::ctype<char>
    {
        static const mask* make_table()
        {
            // make a copy of the "C" locale table
            static std::vector<mask> v(classic_table(), classic_table() + table_size);
            v[','] |=  space; // comma will be classified as whitespace
            v[' '] &= ~space; // space will not be classified as whitespace
            return &v[0];
        }
    
        csv_whitespace(std::size_t refs = 0) : ctype(make_table(), false, refs) {}
    };
    
    int main()
    {
        std::string in = "Column 1,Column 2,Column 3\n123,456,789";
        std::string token;
    
        std::cout << "Default locale:\n";
        std::istringstream s1(in);
        while (s1 >> token)
            std::cout << "  " << token << '\n';
    
        std::cout << "Locale with modified ctype:\n";
        std::istringstream s2(in);
        s2.imbue(std::locale(s2.getloc(), new csv_whitespace));
        while (s2 >> token)
            std::cout << "  " << token << '\n';
    }
```

Output:
```
    Default locale:
      Column
      1,Column
      2,Column
      3
      123,456,789
    Locale with modified ctype:
      Column 1
      Column 2
      Column 3
      123
      456
      789
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 695](<https://cplusplus.github.io/LWG/issue695>) | C++98 | `table()` e `classic_table()` eram funções membro protegidas | tornou-as públicas

### Ver também

[ ctype](<#/doc/locale/ctype>) | define tabelas de classificação de caracteres
(modelo de classe)
[ ctype_base](<#/doc/locale/ctype_base>) | define categorias de classificação de caracteres
(classe)
[ ctype_byname](<#/doc/locale/ctype_byname>) | representa o [std::ctype](<#/doc/locale/ctype>) fornecido pelo sistema para a locale nomeada
(modelo de classe)