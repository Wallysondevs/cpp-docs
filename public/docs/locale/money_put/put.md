# std::money_put&lt;CharT,OutputIt&gt;::put, do_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type put( iter_type out, bool intl, std::ios_base& f,
char_type fill, long double quant ) const;
iter_type put( iter_type out, bool intl, std::ios_base& f,
char_type fill, const string_type& quant ) const;
protected:
virtual iter_type do_put( iter_type out, bool intl, std::ios_base& str,
char_type fill, long double units ) const;
virtual iter_type do_put( iter_type out, bool intl, std::ios_base& str,
char_type fill, const string_type& digits ) const;
```

Formata um valor monetário e escreve o resultado no fluxo de saída.

1,2) Funções membro públicas, chamam a função membro `do_put` da classe mais derivada.

3) O argumento numérico `units` é convertido para uma string de caracteres largos como se por `ct.widen(buf1, buf1 + [std::sprintf](<#/doc/io/c/fprintf>)(buf1, "%.0Lf", units), buf2)`, onde `ct` é a facet [std::ctype](<#/doc/locale/ctype>) imbuída em `str.getloc()` e `buf1` e `buf2` são buffers de caracteres suficientemente grandes. A string de caracteres resultante `buf2` é processada, formatada e enviada para `out` conforme descrito abaixo.

4) Do argumento string `digits`, apenas o sinal de menos inicial opcional (determinado pela comparação com `ct.widen('-')`, onde `ct` é a facet [std::ctype](<#/doc/locale/ctype>) imbuída em `str.getloc()`) e os caracteres de dígito imediatamente seguintes (classificados por `ct`) são tomados como a sequência de caracteres a ser processada, formatada e enviada para `out` conforme descrito abaixo.

Dada a sequência de caracteres dos passos anteriores, se o primeiro caractere for igual a `ct.widen('-')`, chama `mp.neg_format()` para obter o [padrão](<#/doc/locale/money_base>) de formatação; caso contrário, chama `mp.pos_format()`, onde `mp` é a facet [std::moneypunct](<#/doc/locale/moneypunct>)`<CharT, intl>` imbuída em `str.getloc()`.

Separadores de milhares e caracteres de ponto decimal são inseridos conforme exigido por `mp.grouping()`, `mp.frac_digits()`, `mp.decimal_point()` e `mp.thousands_sep()`, e a string resultante é colocada na sequência de saída onde [value](<#/doc/locale/money_base>) aparece no padrão de formatação.

Se `str.flags() & str.showbase` for diferente de zero (o manipulador [std::showbase](<#/doc/io/manip/showbase>) foi usado), então o símbolo ou string da moeda é gerado chamando `mp.curr_symbol()` e colocado na sequência de saída onde [symbol](<#/doc/locale/money_base>) aparece no padrão de formatação.

Se `mp.positive_sign()` (no caso de ser usado um padrão de formato positivo) ou `mp.negative_sign()` (no caso de ser usado um padrão de formato negativo) retornar uma string com mais de um caractere, o primeiro caractere retornado é colocado na sequência de saída onde [sign](<#/doc/locale/money_base>) aparece no padrão de formatação, e o restante dos caracteres é colocado após todos os outros caracteres; por exemplo, o padrão de formatação `{sign, value, space, symbol}` com `units` 123 e `negative_sign` de "-" pode resultar em "-1.23 €", enquanto `negative_sign` de "()" geraria "(1.23 €)".

Se o número de caracteres gerados para o formato especificado for menor que o valor retornado por `str.width()`, então cópias de `fill` são inseridas para que o comprimento total da sequência de saída seja exatamente `str.width()`, da seguinte forma:

*   Se `str.flags() & str.adjustfield` for igual a `str.internal`, os caracteres de preenchimento são inseridos onde `none` ou `space` aparece no padrão de formatação.
*   Caso contrário, se `str.flags() & str.adjustfield` for igual a `str.left`, as cópias de `fill` são anexadas após todos os outros caracteres.
*   Caso contrário, os caracteres de preenchimento são colocados antes de todos os outros caracteres.

No final, chama `str.width(0)` para cancelar os efeitos de qualquer [std::setw](<#/doc/io/manip/setw>).

### Valor de retorno

Um iterador apontando imediatamente após o último caractere produzido.

### Notas

As unidades monetárias são assumidas como as menores unidades não fracionárias da moeda: centavos nos EUA, ienes no Japão.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    struct my_punct : std::moneypunct_byname<char, false>
    {
        my_punct(const char* name) : moneypunct_byname(name) {}
        string_type do_negative_sign() const { return "()"; }
    };
    
    int main()
    {
        std::locale loc("ru_RU.utf8");
        std::cout.imbue(loc);
        long double units = -123.45;
        std::cout << "In Russian locale, " << units << " prints as " << std::showbase;
    
        // note, the following is equivalent to simply std::put_money(units)
        std::use_facet<std::money_put<char>>(loc).put(
            {std::cout}, false, std::cout, std::cout.fill(), units);
        std::cout << '\n';
    
        std::cout.imbue(std::locale(std::cout.getloc(), new my_punct("ru_RU.utf8")));
        std::cout << "With negative_sign set to \"()\", it prints as ";
        std::use_facet<std::money_put<char>>(loc).put(
            {std::cout}, false, std::cout, std::cout.fill(), units);
        std::cout << '\n';
    }
```

Saída:
```
    In Russian locale, -123,45 prints as -1.23 руб
    With negative_sign set to "()", it prints as (1.23 руб)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 328](<https://cplusplus.github.io/LWG/issue328>) | C++98 | a string de formato usada para [std::sprintf](<#/doc/io/c/printf>) era "%.01f" | corrigido para "%.0Lf"

### Veja também

[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)
[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
[ put_money](<#/doc/io/manip/put_money>)(C++11) | formata e envia um valor monetário
(modelo de função)