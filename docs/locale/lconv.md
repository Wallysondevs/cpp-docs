# std::lconv

Definido no cabeçalho `[<clocale>](<#/doc/header/clocale>)`

```c
struct lconv;
```

A classe `std::lconv` contém regras de formatação numérica e monetária conforme definido por uma locale C. Objetos desta struct podem ser obtidos com [std::localeconv](<#/doc/locale/localeconv>). Os membros de `std::lconv` são valores do tipo char e do tipo char*. Cada membro char*, exceto `decimal_point`, pode estar apontando para um caractere nulo (ou seja, para uma C-string vazia). Os membros do tipo char são todos números não negativos, qualquer um dos quais pode ser [CHAR_MAX](<#/doc/types/climits>) se o valor correspondente não estiver disponível na locale C atual.

### Member objects

#### Parâmetros de formatação numérica não monetária

char* decimal_point | o caractere usado como ponto decimal
(objeto membro público)
char* thousands_sep | o caractere usado para separar grupos de dígitos antes do ponto decimal
(objeto membro público)
char* grouping | uma string cujos elementos indicam os tamanhos dos grupos de dígitos
(objeto membro público)

#### Parâmetros de formatação numérica monetária

char* mon_decimal_point | o caractere usado como ponto decimal
(objeto membro público)
char* mon_thousands_sep | o caractere usado para separar grupos de dígitos antes do ponto decimal
(objeto membro público)
char* mon_grouping | uma string cujos elementos indicam os tamanhos dos grupos de dígitos
(objeto membro público)
char* positive_sign | uma string usada para indicar quantidade monetária não negativa
(objeto membro público)
char* negative_sign | uma string usada para indicar quantidade monetária negativa
(objeto membro público)

#### Parâmetros de formatação numérica monetária local

char* currency_symbol | o símbolo usado para moeda na locale C atual
(objeto membro público)
char frac_digits | o número de dígitos após o ponto decimal a ser exibido em uma quantidade monetária
(objeto membro público)
char p_cs_precedes | 1 se currency_symbol for colocado antes do valor não negativo, ​0​ se depois
(objeto membro público)
char n_cs_precedes | 1 se currency_symbol for colocado antes do valor negativo, ​0​ se depois
(objeto membro público)
char p_sep_by_space | indica a separação de `currency_symbol`, `positive_sign` e o valor monetário não negativo
(objeto membro público)
char n_sep_by_space | indica a separação de `currency_symbol`, `negative_sign` e o valor monetário negativo
(objeto membro público)
char p_sign_posn | indica a posição de `positive_sign` em um valor monetário não negativo
(objeto membro público)
char n_sign_posn | indica a posição de `negative_sign` em um valor monetário negativo
(objeto membro público)

#### Parâmetros de formatação numérica monetária internacional

char* int_curr_symbol | a string usada como nome de moeda internacional na locale C atual
(objeto membro público)
char int_frac_digits | o número de dígitos após o ponto decimal a ser exibido em uma quantidade monetária internacional
(objeto membro público)
char int_p_cs_precedes(desde C++11) | 1 se int_curr_symbol for colocado antes do valor monetário internacional não negativo, ​0​ se depois
(objeto membro público)
char int_n_cs_precedes(desde C++11) | 1 se int_curr_symbol for colocado antes do valor monetário internacional negativo, ​0​ se depois
(objeto membro público)
char int_p_sep_by_space(desde C++11) | indica a separação de `int_curr_symbol`, `positive_sign` e o valor monetário internacional não negativo
(objeto membro público)
char int_n_sep_by_space(desde C++11) | indica a separação de `int_curr_symbol`, `negative_sign` e o valor monetário internacional negativo
(objeto membro público)
char int_p_sign_posn(desde C++11) | indica a posição de `positive_sign` em um valor monetário internacional não negativo
(objeto membro público)
char int_n_sign_posn(desde C++11) | indica a posição de `negative_sign` em um valor monetário internacional negativo
(objeto membro público)

Os caracteres das C-strings apontadas por `grouping` e `mon_grouping` são interpretados de acordo com seus valores numéricos. Quando o '\0' terminador é encontrado, o último valor visto é assumido como repetindo para o restante dos dígitos. Se [CHAR_MAX](<#/doc/types/climits>) for encontrado, nenhum dígito adicional é agrupado. O agrupamento típico de três dígitos por vez é "\003".

Os valores de `p_sep_by_space`, `n_sep_by_space`, `int_p_sep_by_space`, `int_n_sep_by_space` são interpretados da seguinte forma:

0 | nenhum espaço separa o símbolo da moeda e o valor
---|---
1 | o sinal adere ao símbolo da moeda, o valor é separado por um espaço
2 | o sinal adere ao valor. O símbolo da moeda é separado por um espaço

Os valores de `p_sign_posn`, `n_sign_posn`, `int_p_sign_posn`, `int_n_sign_posn` são interpretados da seguinte forma:

0 | parênteses ao redor do valor e do símbolo da moeda são usados para representar o sinal
---|---
1 | sinal antes do valor e do símbolo da moeda
2 | sinal depois do valor e do símbolo da moeda
3 | sinal antes do símbolo da moeda
4 | sinal depois do símbolo da moeda

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <iostream>
     
    int main()
    {
        std::setlocale(LC_ALL, "ja_JP.UTF-8");
        std::lconv* lc = std::localeconv();
        std::cout << "Japanese currency symbol: " << lc->currency_symbol
                  << '(' << lc->int_curr_symbol << ")\n";
    }
```

Saída:
```
    Japanese currency symbol: ￥(JPY )
```

### Veja também

[ localeconv](<#/doc/locale/localeconv>) | consulta detalhes de formatação numérica e monetária da locale atual
(função)
[ numpunct](<#/doc/locale/numpunct>) | define regras de pontuação numérica
(modelo de classe)
[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)
[Documentação C](<#/>) para lconv