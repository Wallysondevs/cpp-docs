# std::put_time

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class CharT >
/*não especificado*/ put_time( const std::tm* tmb, const CharT* fmt );
```

Quando usado em uma expressão `out << put_time(tmb, fmt)`, converte as informações de data e hora de um tempo de calendário `tmb` fornecido para uma string de caracteres de acordo com a [string de formato](<#/doc/io/manip/put_time>) `fmt`, como se chamasse [std::strftime](<#/doc/chrono/c/strftime>), [std::wcsftime](<#/doc/chrono/c/wcsftime>), ou análogo (dependendo de `CharT`), de acordo com a facet [std::time_put](<#/doc/locale/time_put>) da locale atualmente imbuída no stream de saída `out`.

### Parâmetros

- **tmb** — ponteiro para a estrutura de tempo de calendário obtida de [std::localtime](<#/doc/chrono/c/localtime>) ou [std::gmtime](<#/doc/chrono/c/gmtime>)
- **fmt** — ponteiro para uma string `CharT` terminada em nulo especificando o [formato de conversão](<#/doc/io/manip/put_time>)

### String de formato

A string de formato consiste em zero ou mais especificadores de conversão e caracteres comuns (exceto `%`). Todos os caracteres comuns, incluindo o caractere nulo terminador, são copiados para a string de saída sem modificação. Cada especificação de conversão começa com o caractere `%`, opcionalmente seguido pelo modificador `E` ou `O` (ignorado se não suportado pela locale), seguido pelo caractere que determina o comportamento do especificador. Os seguintes especificadores de formato estão disponíveis:

Especificador de conversão
| Explicação | Campos usados
---|---|---
`%` | escreve o literal `%`. A especificação de conversão completa deve ser `%%`. |
`n`
(desde C++11) | escreve o caractere de nova linha |
`t`
(desde C++11) | escreve o caractere de tabulação horizontal |
Ano
`Y` | escreve o **ano** como um número decimal, ex. 2017 | `tm_year`
`EY`
(desde C++11) | escreve o **ano** na representação alternativa, ex. 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | `tm_year`
---|---|---
`y` | escreve os últimos 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`Oy`
(desde C++11) | escreve os últimos 2 dígitos do **ano** usando o sistema numérico alternativo, ex. 十一 em vez de 11 na locale ja_JP | `tm_year`
`Ey`
(desde C++11) | escreve o **ano** como deslocamento do período de calendário alternativo da locale `%EC` (dependente da locale) | `tm_year`
`C`
(desde C++11) | escreve os primeiros 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`EC`
(desde C++11) | escreve o nome do **ano base (período)** na representação alternativa da locale, ex. 平成 (era Heisei) em ja_JP | `tm_year`
`G`
(desde C++11) | escreve o **ano baseado na semana ISO 8601**, ou seja, o ano que contém a semana especificada. Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`g`
(desde C++11) | escreve os últimos 2 dígitos do **ano baseado na semana ISO 8601**, ou seja, o ano que contém a semana especificada (intervalo `[00,99]`). Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
Mês
`b` | escreve o nome **abreviado do mês**, ex. `Out` (dependente da locale) | `tm_mon`
`h`
(desde C++11) | sinônimo de `b` | `tm_mon`
---|---|---
`B` | escreve o nome **completo do mês**, ex. `Outubro` (dependente da locale) | `tm_mon`
`m` | escreve o **mês** como um número decimal (intervalo `[01,12]`) | `tm_mon`
`Om`
(desde C++11) | escreve o **mês** usando o sistema numérico alternativo, ex. 十二 em vez de 12 na locale ja_JP | `tm_mon`
Semana
`U` | escreve a **semana do ano** como um número decimal (domingo é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OU`
(desde C++11) | escreve a **semana do ano**, como por `%U`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
---|---|---
`W` | escreve a **semana do ano** como um número decimal (segunda-feira é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OW`
(desde C++11) | escreve a **semana do ano**, como por `%W`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
`V`
(desde C++11) | escreve a **semana ISO 8601 do ano** (intervalo `[01,53]`). Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`OV`
(desde C++11) | escreve a **semana do ano**, como por `%V`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
Dia do ano/mês
`j` | escreve o **dia do ano** como um número decimal (intervalo `[001,366]`) | `tm_yday`
---|---|---
`d` | escreve o **dia do mês** como um número decimal (intervalo `[01,31]`) | `tm_mday`
`Od`
(desde C++11) | escreve o **dia do mês** baseado em zero usando o sistema numérico alternativo, ex. 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
`e`
(desde C++11) | escreve o **dia do mês** como um número decimal (intervalo `[1,31]`). Um único dígito é precedido por um espaço. | `tm_mday`
`Oe`
(desde C++11) | escreve o **dia do mês** baseado em um usando o sistema numérico alternativo, ex. 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
Dia da semana
`a` | escreve o nome **abreviado do dia da semana**, ex. `Sex` (dependente da locale) | `tm_wday`
---|---|---
`A` | escreve o nome **completo do dia da semana**, ex. `Sexta-feira` (dependente da locale) | `tm_wday`
`w` | escreve o **dia da semana** como um número decimal, onde domingo é `0` (intervalo `[0-6]`) | `tm_wday`
`Ow`
(desde C++11) | escreve o **dia da semana**, onde domingo é `0`, usando o sistema numérico alternativo, ex. 二 em vez de 2 na locale ja_JP | `tm_wday`
`u`
(desde C++11) | escreve o **dia da semana** como um número decimal, onde segunda-feira é `1` (formato ISO 8601) (intervalo `[1-7]`) | `tm_wday`
`Ou`
(desde C++11) | escreve o **dia da semana**, onde segunda-feira é `1`, usando o sistema numérico alternativo, ex. 二 em vez de 2 na locale ja_JP | `tm_wday`
Hora, minuto, segundo
`H` | escreve a **hora** como um número decimal, relógio de 24 horas (intervalo `[00-23]`) | `tm_hour`
`OH`
(desde C++11) | escreve a **hora** do relógio de 24 horas usando o sistema numérico alternativo, ex. 十八 em vez de 18 na locale ja_JP | `tm_hour`
---|---|---
`I` | escreve a **hora** como um número decimal, relógio de 12 horas (intervalo `[01,12]`) | `tm_hour`
`OI`
(desde C++11) | escreve a **hora** do relógio de 12 horas usando o sistema numérico alternativo, ex. 六 em vez de 06 na locale ja_JP | `tm_hour`
---|---|---
`M` | escreve o **minuto** como um número decimal (intervalo `[00,59]`) | `tm_min`
`OM`
(desde C++11) | escreve o **minuto** usando o sistema numérico alternativo, ex. 二十五 em vez de 25 na locale ja_JP | `tm_min`
---|---|---
`S` | escreve o **segundo** como um número decimal (intervalo `[00,60]`) | `tm_sec`
`OS`
(desde C++11) | escreve o **segundo** usando o sistema numérico alternativo, ex. 二十四 em vez de 24 na locale ja_JP | `tm_sec`
Outros
`c` | escreve a **string padrão de data e hora**, ex. `Dom Out 17 04:41:13 2010` (dependente da locale) | todos
`Ec`
(desde C++11) | escreve a **string alternativa de data e hora**, ex. usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
---|---|---
`x` | escreve a **representação de data** localizada (dependente da locale) | todos
`Ex`
(desde C++11) | escreve a **representação de data alternativa**, ex. usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
---|---|---
`X` | escreve a **representação de hora** localizada, ex. 18:40:20 ou 6:40:20 PM (dependente da locale) | todos
`EX`
(desde C++11) | escreve a **representação de hora alternativa** (dependente da locale) | todos
`D`
(desde C++11) | equivalente a **"%m/%d/%y"** | `tm_mon`, `tm_mday`, `tm_year`
`F`
(desde C++11) | equivalente a **"%Y-%m-%d"** (o formato de data ISO 8601) | `tm_mon`, `tm_mday`, `tm_year`
`r`
(desde C++11) | escreve a hora localizada do **relógio de 12 horas** (dependente da locale) | `tm_hour`, `tm_min`, `tm_sec`
`R`
(desde C++11) | equivalente a **"%H:%M"** | `tm_hour`, `tm_min`
`T`
(desde C++11) | equivalente a **"%H:%M:%S"** (o formato de hora ISO 8601) | `tm_hour`, `tm_min`, `tm_sec`
---|---|---
`p` | escreve **a.m. ou p.m.** localizado (dependente da locale) | `tm_hour`
`z`
(desde C++11) | escreve o **deslocamento do UTC** no formato ISO 8601 (ex. `-0430`), ou nenhum caractere se a informação de fuso horário não estiver disponível | `tm_isdst`
---|---|---
`Z` | escreve o **nome ou abreviação do fuso horário** dependente da locale, ou nenhum caractere se a informação de fuso horário não estiver disponível | `tm_isdst`

### Valor de retorno

Um objeto de tipo não especificado tal que

  * se `out` for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << put_time(tmb, fmt)`
    * tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    * tem o valor `out`
    * se comporta como se chamasse `f(out, tmb, fmt)`

onde a função `f` é definida como:
```cpp
    template<class CharT, class Traits>
    void f(std::basic_ios<CharT, Traits>& str, const std::tm* tmb, const CharT* fmt)
    {
        using Iter = std::ostreambuf_iterator<CharT, Traits>;
        using TimePut = std::time_put<CharT, Iter>;
    
        const TimePut& tp = std::use_facet<TimePut>(str.getloc());
        const Iter end = tp.put(Iter(str.rdbuf()), str, str.fill(), tmb,
            fmt, fmt + Traits::length(fmt));
    
        if (end.failed())
            str.setstate(std::ios_base::badbit);
    }
```

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::time_t t = std::time(nullptr);
        std::tm tm = *std::localtime(&t);
    
        std::cout.imbue(std::locale("ru_RU.utf8"));
        std::cout << "ru_RU: " << std::put_time(&tm, "%c %Z") << '\n';
    
        std::cout.imbue(std::locale("ja_JP.utf8"));
        std::cout << "ja_JP: " << std::put_time(&tm, "%c %Z") << '\n';
    }
```

Saída possível:
```
    ru_RU: Ср. 28 дек. 2011 10:21:16 EST
    ja_JP: 2011年12月28日 10時21分16秒 EST
```

### Veja também

[ time_put](<#/doc/locale/time_put>) | formata o conteúdo de [std::tm](<#/doc/chrono/c/tm>) para saída como sequência de caracteres
(modelo de classe)
[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)
[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para representação textual personalizada
(função)
[ wcsftime](<#/doc/chrono/c/wcsftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para representação textual de wide string personalizada
(função)