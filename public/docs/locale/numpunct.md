# std::numpunct

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class numpunct;
```

A facet `std::numpunct` encapsula as preferências de pontuação numérica. As operações de E/S de stream usam `std::numpunct` através de [`std::num_get`](<#/doc/locale/num_get>) e [`std::num_put`](<#/doc/locale/num_put>) para analisar a entrada numérica e formatar a saída numérica.

Os números suportados por `std::numpunct` têm o formato descrito abaixo. Aqui, `digit` representa o conjunto de radicais especificado pelo valor do argumento `fmtflags`, `thousands-sep` e `decimal-point` são os resultados das funções [`thousands_sep()`](<#/doc/locale/numpunct/thousands_sep>) e [`decimal_point()`](<#/doc/locale/numpunct/decimal_point>), respectivamente.

O formato dos valores inteiros é o seguinte:
```
    integer     ::= [sign] units
    sign        ::= plusminus
    plusminus   ::= '+' | '-'
    units       ::= digits [thousands-sep units]
    digits      ::= digit [digits]
```

O número de dígitos entre os `thousand-sep`s (tamanho máximo de `digits`) é especificado pelo resultado de [`grouping()`](<#/doc/locale/numpunct/grouping>).

O formato dos valores de ponto flutuante é o seguinte:
```
    floatval    ::= [sign] units [decimal-point [digits]] [e [sign] digits] |
                    [sign]        decimal-point  digits   [e [sign] digits]
    e           ::= 'e' | 'E'
```

Diagrama de herança

### Especializações

A biblioteca padrão garante fornecer as seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::numpunct&lt;char&gt; | fornece equivalentes das preferências de locale "C"
---|---
std::numpunct<wchar_t> | fornece equivalentes de caracteres largos das preferências de locale "C"

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [`std::basic_string`](<#/doc/string/basic_string>)`<CharT>`

### Membros de dados

Membro | Descrição
---|---
[`std::locale::id`](<#/doc/locale/locale/id>) `id` [static] | o identificador da [`facet`](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/numpunct/numpunct>) | constrói uma nova facet `numpunct`
(função membro pública)
[ (destrutor)](<#/doc/locale/numpunct/~numpunct>) | destrói uma facet `numpunct`
(função membro protegida)
[ decimal_point](<#/doc/locale/numpunct/decimal_point>) | invoca `do_decimal_point`
(função membro pública)
[ thousands_sep](<#/doc/locale/numpunct/thousands_sep>) | invoca `do_thousands_sep`
(função membro pública)
[ grouping](<#/doc/locale/numpunct/grouping>) | invoca `do_grouping`
(função membro pública)
[ truenamefalsename](<#/doc/locale/numpunct/truefalsename>) | invoca `do_truename` ou `do_falsename`
(função membro pública)

### Funções membro protegidas

[ do_decimal_point](<#/doc/locale/numpunct/decimal_point>)[virtual] | fornece o caractere a ser usado como ponto decimal
(função membro virtual protegida)
[ do_thousands_sep](<#/doc/locale/numpunct/thousands_sep>)[virtual] | fornece o caractere a ser usado como separador de milhares
(função membro virtual protegida)
[ do_grouping](<#/doc/locale/numpunct/grouping>)[virtual] | fornece o número de dígitos entre cada par de separadores de milhares
(função membro virtual protegida)
[ do_truenamedo_falsename](<#/doc/locale/numpunct/truefalsename>)[virtual] | fornece a string a ser usada como o nome dos booleanos true e false
(função membro virtual protegida)

### Exemplo

O exemplo a seguir altera as representações de string de true e false:

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    struct french_bool : std::numpunct<char>
    {
        string_type do_truename() const override { return "vrai"; }
        string_type do_falsename() const override { return "faux"; }
    };
    
    int main()
    {
        std::cout << "default locale: "
                  << std::boolalpha << true << ", " << false << '\n';
        std::cout.imbue(std::locale(std::cout.getloc(), new french_bool));
        std::cout << "locale with modified numpunct: "
                  << std::boolalpha << true << ", " << false << '\n';
    }
```

Saída:
```
    default locale: true, false
    locale with modified numpunct: vrai, faux
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 338](<https://cplusplus.github.io/LWG/issue338>) | C++98 | o token `sign` permitia um espaço em branco opcional após `+` ou `-` | removeu o espaço em branco

### Veja também

[ numpunct_byname](<#/doc/locale/numpunct_byname>) | cria uma facet numpunct para o locale nomeado
(modelo de classe)