# std::ctype_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class ctype_byname : public std::ctype<CharT>;
```

`std::ctype_byname` é um facet `[std::ctype](<#/doc/locale/ctype>)` que encapsula as regras de classificação de caracteres da locale especificada em sua construção.

### Especializações

A standard library tem garantia de fornecer as seguintes especializações:

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::ctype_byname&lt;char&gt; | fornece classificação de caracteres estreitos (usa busca em tabela para classificação de caracteres)
---|---
std::ctype_byname<wchar_t> | fornece classificação de caracteres largos

### Tipos aninhados

Tipo | Definição
---|---
`mask` | typename [std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt;::mask

### Funções membro

**(construtor)** | constrói um novo facet `ctype_byname`
(função membro pública)
**(destrutor)** | destrói um facet `ctype_byname`
(função membro protegida)

## std::ctype_byname::ctype_byname

```cpp
explicit ctype_byname( const char* name, std::size_t refs = 0 );
explicit ctype_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói um novo facet `std::ctype_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói o facet, quando o último objeto `[std::locale](<#/doc/locale/locale>)` que o contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que apontam para o facet

## std::ctype_byname::~ctype_byname

protected:
~ctype_byname();

Destrói o facet.

## Herdado de [std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt; (somente se `CharT` não for char)

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ is](<#/doc/locale/ctype/is>) | invoca `do_is`
(função membro pública de `std::ctype<CharT>`)
[ scan_is](<#/doc/locale/ctype/scan_is>) | invoca `do_scan_is`
(função membro pública de `std::ctype<CharT>`)
[ scan_not](<#/doc/locale/ctype/scan_not>) | invoca `do_scan_not`
(função membro pública de `std::ctype<CharT>`)
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
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_tolower](<#/doc/locale/ctype/tolower>)[virtual] | converte um caractere ou caracteres para minúsculas
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_widen](<#/doc/locale/ctype/widen>)[virtual] | converte um caractere ou caracteres de char para `CharT`
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_narrow](<#/doc/locale/ctype/narrow>)[virtual] | converte um caractere ou caracteres de `CharT` para char
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_is](<#/doc/locale/ctype/is>)[virtual] | classifica um caractere ou uma sequência de caracteres
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_scan_is](<#/doc/locale/ctype/scan_is>)[virtual] | localiza o primeiro caractere em uma sequência que está em conformidade com a classificação fornecida
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_scan_not](<#/doc/locale/ctype/scan_not>)[virtual] | localiza o primeiro caractere em uma sequência que falha na classificação fornecida
(função membro virtual protegida de `std::ctype<CharT>`)

## Herdado de [std::ctype&lt;char&gt;](<#/doc/locale/ctype_char>) (somente se `CharT` for char)

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

[ table](<#/doc/locale/ctype_char/table>) | obtém a tabela de classificação de caracteres
(função membro pública de `std::ctype<char>`)
[ classic_table](<#/doc/locale/ctype_char/classic_table>)[static] | obtém a tabela de classificação de caracteres da locale "C"
(função membro estática pública de `std::ctype<char>`)
[ is](<#/doc/locale/ctype_char/is>) | classifica um caractere ou uma sequência de caracteres, usando a tabela de classificação
(função membro pública de `std::ctype<char>`)
[ scan_is](<#/doc/locale/ctype_char/scan_is>) | localiza o primeiro caractere em uma sequência que está em conformidade com a classificação fornecida, usando a tabela de classificação
(função membro pública de `std::ctype<char>`)
[ scan_not](<#/doc/locale/ctype_char/scan_not>) | localiza o primeiro caractere em uma sequência que falha na classificação fornecida, usando a tabela de classificação
(função membro pública de `std::ctype<char>`)
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
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_tolower](<#/doc/locale/ctype/tolower>)[virtual] | converte um caractere ou caracteres para minúsculas
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_widen](<#/doc/locale/ctype/widen>)[virtual] | converte um caractere ou caracteres de char para `CharT`
(função membro virtual protegida de `std::ctype<CharT>`)
[ do_narrow](<#/doc/locale/ctype/narrow>)[virtual] | converte um caractere ou caracteres de `CharT` para char
(função membro virtual protegida de `std::ctype<CharT>`)

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
blank[static] (C++11) | o valor de `mask` que identifica a classificação de caractere em branco
(constante membro estática pública)
alnum[static] | alpha | digit
(constante membro estática pública)
graph[static] | alnum | punct
(constante membro estática pública)

### Notas

`std::ctype_byname<char>` foi incorretamente declarado como uma especialização explícita na sinopse de `[`&lt;locale&gt;`](<#/doc/header/locale>)`, e a declaração foi removida pela resolução do [LWG issue 1298](<https://cplusplus.github.io/LWG/issue1298>), mas permanece uma especialização requerida, assim como `std::ctype_byname<wchar_t>`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        wchar_t c = L'\u00de'; // capital letter thorn
    
        std::locale loc("C");
    
        std::cout << "isupper('Þ', C locale) returned "
                  << std::boolalpha << std::isupper(c, loc) << '\n';
    
        loc = std::locale(loc, new std::ctype_byname<wchar_t>("en_US.utf8"));
    
        std::cout << "isupper('Þ', C locale with Unicode ctype) returned "
                  << std::boolalpha << std::isupper(c, loc) << '\n';
    }
```

Saída:
```
    isupper('Þ', C locale) returned false
    isupper('Þ', C locale with Unicode ctype) returned true
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 16](<https://cplusplus.github.io/LWG/issue16>) | C++98 | a definição da especialização explícita `std::ctype_byname<char>`
especificou incorretamente o nome e a lista de parâmetros de `do_narrow` | corrigido
[LWG 616](<https://cplusplus.github.io/LWG/issue616>) | C++98 | o disambiguador `typename` estava faltando na definição de `mask` | adicionado

### Veja também

[ ctype](<#/doc/locale/ctype>) | define tabelas de classificação de caracteres
(modelo de classe)
[ ctype&lt;char&gt;](<#/doc/locale/ctype_char>) | especialização de `[std::ctype](<#/doc/locale/ctype>)` para o tipo char
(especialização de modelo de classe)