# std::moneypunct

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT, bool International = false >
class moneypunct;
```

  
A facet `std::moneypunct` encapsula as preferências de formato de valores monetários. Os manipuladores de E/S de stream [std::get_money](<#/doc/io/manip/get_money>) e [std::put_money](<#/doc/io/manip/put_money>) usam `std::moneypunct` através de [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>) para analisar a entrada de valores monetários e formatar a saída de valores monetários.

Diagrama de herança

### Especializações

A standard library tem garantia de fornecer as seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`  
---  
std::moneypunct&lt;char&gt; | fornece equivalentes das preferências de locale "C"   
---|---
std::moneypunct<wchar_t> | fornece equivalentes de caracteres largos das preferências de locale "C"   
std::moneypunct<char, true> | fornece equivalentes das preferências de locale "C", com símbolos de moeda internacionais   
std::moneypunct<wchar_t, true> | fornece equivalentes de caracteres largos das preferências de locale "C", com símbolos de moeda internacionais   
  
### Tipos aninhados

Tipo  |  Definição   
---|---
`char_type` |  `CharT`  
`string_type` |  [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;  
  
### Membros de dados

Membro  |  Descrição   
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)  
const bool `intl` [static] | Internacional  
  
### Funções membro

[ (construtor)](<#/doc/locale/moneypunct/moneypunct>) | constrói uma nova facet `moneypunct`   
(função membro pública)  
[ decimal_point](<#/doc/locale/moneypunct/decimal_point>) | invoca `do_decimal_point`   
(função membro pública)  
[ thousands_sep](<#/doc/locale/moneypunct/thousands_sep>) | invoca `do_thousands_sep`   
(função membro pública)  
[ grouping](<#/doc/locale/moneypunct/grouping>) | invoca `do_grouping`   
(função membro pública)  
[ curr_symbol](<#/doc/locale/moneypunct/curr_symbol>) | invoca `do_curr_symbol`   
(função membro pública)  
[ positive_signnegative_sign](<#/doc/locale/moneypunct/positive_sign>) | invoca `do_positive_sign` ou `do_negative_sign`   
(função membro pública)  
[ frac_digits](<#/doc/locale/moneypunct/frac_digits>) | invoca `do_frac_digits`   
(função membro pública)  
[ pos_formatneg_format](<#/doc/locale/moneypunct/pos_format>) | invoca `do_pos_format`/`do_neg_format`   
(função membro pública)  
  
### Funções membro protegidas

[ (destrutor)](<#/doc/locale/moneypunct/~moneypunct>) | destrói uma facet `moneypunct`   
(função membro protegida)  
[ do_decimal_point](<#/doc/locale/moneypunct/decimal_point>)[virtual] | fornece o caractere a ser usado como separador decimal   
(função membro protegida virtual)  
[ do_thousands_sep](<#/doc/locale/moneypunct/thousands_sep>)[virtual] | fornece o caractere a ser usado como separador de milhares   
(função membro protegida virtual)  
[ do_grouping](<#/doc/locale/moneypunct/grouping>)[virtual] | fornece o número de dígitos entre cada par de separadores de milhares   
(função membro protegida virtual)  
[ do_curr_symbol](<#/doc/locale/moneypunct/curr_symbol>)[virtual] | fornece a string a ser usada como identificador de moeda   
(função membro protegida virtual)  
[ do_positive_signdo_negative_sign](<#/doc/locale/moneypunct/positive_sign>)[virtual] | fornece a string para indicar um valor positivo ou negativo   
(função membro protegida virtual)  
[ do_frac_digits](<#/doc/locale/moneypunct/frac_digits>)[virtual] | fornece o número de dígitos a serem exibidos após o ponto decimal   
(função membro protegida virtual)  
[ do_pos_formatdo_neg_format](<#/doc/locale/moneypunct/pos_format>)[virtual] | fornece o padrão de formatação para valores monetários   
(função membro protegida virtual)  
  
## Herdado de [std::money_base](<#/doc/locale/money_base>)

### Tipos aninhados

Tipo  |  Definição   
---|---
enum part { none, space, symbol, sign, value }; | tipo de enumeração não escopado   
struct pattern { char field[4]; }; | o tipo de formato monetário   
Constante de enumeração  |  Descrição   
`none` | espaço em branco é permitido, mas não obrigatório, exceto na última posição, onde espaço em branco não é permitido   
`space` | um ou mais caracteres de espaço em branco são obrigatórios   
`symbol` | a sequência de caracteres retornada por [std::moneypunct::curr_symbol](<#/doc/locale/moneypunct/curr_symbol>) é obrigatória   
`sign` | o primeiro dos caracteres retornados por [std::moneypunct::positive_sign](<#/doc/locale/moneypunct/positive_sign>) ou [std::moneypunct::negative_sign](<#/doc/locale/moneypunct/positive_sign>) é obrigatório   
`value` | o valor monetário numérico absoluto é obrigatório   
  
### Veja também

[ money_base](<#/doc/locale/money_base>) | define padrões de formatação monetária   
(classe)  
[ moneypunct_byname](<#/doc/locale/moneypunct_byname>) | representa o **std::moneypunct** fornecido pelo sistema para o locale nomeado   
(modelo de classe)  
[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada   
(modelo de classe)  
[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres   
(modelo de classe)