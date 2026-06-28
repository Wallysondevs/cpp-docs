# std::moneypunct_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT, bool Intl = false >
class moneypunct_byname : public std::moneypunct<CharT, Intl>;
```

`std::moneypunct_byname` é um facet [std::moneypunct](<#/doc/locale/moneypunct>) que encapsula as preferências de formatação monetária de uma locale especificada em sua construção.

### Especializações

A standard library garante fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

  * `CharT` é um de char e wchar_t, e
  * `Intl` é uma possível especialização em um parâmetro bool.

### Tipos aninhados

Tipo | Definição
---|---
`pattern` | [std::money_base::pattern](<#/doc/locale/money_base>)
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Funções membro

**(construtor)** | constrói um novo facet `moneypunct_byname`
(função membro pública)
**(destrutor)** | destrói um facet `moneypunct_byname`
(função membro protegida)

## std::moneypunct_byname::moneypunct_byname

```cpp
explicit moneypunct_byname( const char* name, std::size_t refs = 0 );
explicit moneypunct_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói um novo facet `std::moneypunct_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói o facet quando o último objeto [std::locale](<#/doc/locale/locale>) que o contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que se ligam ao facet

## std::moneypunct_byname::~moneypunct_byname

protected:
~moneypunct_byname();

Destrói o facet.

## Herdado de [std::moneypunct](<#/doc/locale/moneypunct>)

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)
const bool `intl` [static] | Internacional

### Funções membro

[ decimal_point](<#/doc/locale/moneypunct/decimal_point>) | invoca `do_decimal_point`
(função membro pública de `std::moneypunct<CharT,International>`)
[ thousands_sep](<#/doc/locale/moneypunct/thousands_sep>) | invoca `do_thousands_sep`
(função membro pública de `std::moneypunct<CharT,International>`)
[ grouping](<#/doc/locale/moneypunct/grouping>) | invoca `do_grouping`
(função membro pública de `std::moneypunct<CharT,International>`)
[ curr_symbol](<#/doc/locale/moneypunct/curr_symbol>) | invoca `do_curr_symbol`
(função membro pública de `std::moneypunct<CharT,International>`)
[ positive_signnegative_sign](<#/doc/locale/moneypunct/positive_sign>) | invoca `do_positive_sign` ou `do_negative_sign`
(função membro pública de `std::moneypunct<CharT,International>`)
[ frac_digits](<#/doc/locale/moneypunct/frac_digits>) | invoca `do_frac_digits`
(função membro pública de `std::moneypunct<CharT,International>`)
[ pos_formatneg_format](<#/doc/locale/moneypunct/pos_format>) | invoca `do_pos_format`/`do_neg_format`
(função membro pública de `std::moneypunct<CharT,International>`)

### Funções membro protegidas

[ do_decimal_point](<#/doc/locale/moneypunct/decimal_point>)[virtual] | fornece o caractere a ser usado como separador decimal
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_thousands_sep](<#/doc/locale/moneypunct/thousands_sep>)[virtual] | fornece o caractere a ser usado como separador de milhares
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_grouping](<#/doc/locale/moneypunct/grouping>)[virtual] | fornece o número de dígitos entre cada par de separadores de milhares
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_curr_symbol](<#/doc/locale/moneypunct/curr_symbol>)[virtual] | fornece a string a ser usada como identificador de moeda
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_positive_signdo_negative_sign](<#/doc/locale/moneypunct/positive_sign>)[virtual] | fornece a string para indicar um valor positivo ou negativo
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_frac_digits](<#/doc/locale/moneypunct/frac_digits>)[virtual] | fornece o número de dígitos a serem exibidos após o ponto decimal
(função membro virtual protegida de `std::moneypunct<CharT,International>`)
[ do_pos_formatdo_neg_format](<#/doc/locale/moneypunct/pos_format>)[virtual] | fornece o padrão de formatação para valores monetários
(função membro virtual protegida de `std::moneypunct<CharT,International>`)

## Herdado de [std::money_base](<#/doc/locale/money_base>)

### Tipos aninhados

Tipo | Definição
---|---
enum part { none, space, symbol, sign, value }; | tipo de enumeração não escopado
struct pattern { char field[4]; }; | o tipo de formato monetário
Constante de enumeração | Descrição
`none` | espaço em branco é permitido, mas não obrigatório, exceto na última posição, onde espaço em branco não é permitido
`space` | um ou mais caracteres de espaço em branco são obrigatórios
`symbol` | a sequência de caracteres retornada por [std::moneypunct::curr_symbol](<#/doc/locale/moneypunct/curr_symbol>) é obrigatória
`sign` | o primeiro dos caracteres retornados por [std::moneypunct::positive_sign](<#/doc/locale/moneypunct/positive_sign>) ou [std::moneypunct::negative_sign](<#/doc/locale/moneypunct/positive_sign>) é obrigatório
`value` | o valor monetário numérico absoluto é obrigatório

### Exemplo

Este exemplo demonstra como aplicar regras de formatação monetária de outro idioma sem alterar o restante da locale.

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        long double mon = 1234567;
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
        std::wcout << L"american locale: " << std::showbase
                   << std::put_money(mon) << '\n';
        std::wcout.imbue(std::locale(std::wcout.getloc(),
                                     new std::moneypunct_byname<wchar_t>("ru_RU.utf8")));
        std::wcout << L"american locale with russian moneypunct: "
                   << std::put_money(mon) << '\n';
    }
```

Saída:
```
    american locale: $12,345.67
    american locale with russian moneypunct: 12 345.67 руб
```

### Veja também

[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)