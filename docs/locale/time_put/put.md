# std::time_put&lt;CharT,OutputIt&gt;::put, std::time_put&lt;CharT,OutputIt&gt;::do_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type put( iter_type out, std::ios_base& str,
char_type fill, const std::tm* t,
const CharT* fmtbeg, const CharT* fmtend ) const;
public:
iter_type put( iter_type out, std::ios_base& str,
char_type fill, const std::tm* t,
char format, char modifier = 0 ) const;
protected:
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, const std::tm* t,
char format, char modifier ) const;
```

Converte a data e hora do calendário armazenadas no objeto [std::tm](<#/doc/chrono/c/tm>) apontado por t em uma string de caracteres, de acordo com a [string de formato](<#/doc/locale/time_put/put>) `[fmtbeg, fmtend)`. A string de formato é a mesma usada por [std::strftime](<#/doc/chrono/c/strftime>), mas cada especificador de formato é processado por uma chamada individual a `do_put()`, que pode ser personalizada estendendo esta facet.

1) Percorre a sequência de caracteres `[fmtbeg, fmtend)`, examinando os caracteres. Cada caractere que não faz parte de uma sequência de formato é escrito no iterador de saída out imediatamente. Para identificar sequências de formato, esta função restringe o próximo caractere c em `[fmtbeg, fmtend)` como se por [std::ctype](<#/doc/locale/ctype>)<char_type>(str.getloc()).narrow(c, 0) e, se for igual a '%', os próximos um ou dois caracteres são comparados à lista de sequências de formato reconhecidas por [std::strftime](<#/doc/chrono/c/strftime>) mais quaisquer formatos adicionais definidos pela implementação suportados por esta locale. Para cada sequência de formato válida, uma chamada para `do_put(out, str, fill, t, format, modifier)` é feita, onde format é o caractere da sequência de formato, e modifier é o modificador opcional da sequência de formato ('E' ou 'O'). Um valor de '\0' é usado se o modificador estiver ausente.

2) Chama a função membro `do_put` da classe mais derivada.

3) Converte a data e hora do calendário armazenadas no objeto [std::tm](<#/doc/chrono/c/tm>) apontado por t em uma string de caracteres, de acordo com a sequência de conversão de formato formada pela concatenação de '%', o valor de modifier se não for '\0', e o valor de format. O formato é interpretado da mesma forma que a função [std::strftime](<#/doc/chrono/c/strftime>), exceto que os formatos descritos como dependentes da locale são definidos por esta locale, e especificadores de formato adicionais podem ser suportados (o argumento fill é fornecido para que esses especificadores de formato definidos pela implementação possam usar). A string é escrita no iterador de saída out.

### Parâmetros

- **out** — iterador de saída onde o resultado da conversão é escrito
- **str** — um objeto de stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para restringir caracteres
- **t** — ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) do qual os valores de data/hora são obtidos
- **fmtbeg** — ponteiro para o primeiro caractere de uma sequência de caracteres `char_type` especificando o [formato de conversão](<#/doc/locale/time_put/put>)
- **fmtend** — ponteiro um após o último caractere de uma sequência de caracteres `char_type` especificando o [formato de conversão](<#/doc/locale/time_put/put>)
- **fill** — caractere de preenchimento (geralmente espaço)
- **format** — o caractere que nomeia um [especificador de conversão](<#/doc/locale/time_put/put>)
- **modifier** — o modificador opcional que pode aparecer entre `%` e o [especificador de conversão](<#/doc/locale/time_put/put>)

### String de formato

A string de formato consiste em zero ou mais especificadores de conversão e caracteres comuns (exceto `%`). Todos os caracteres comuns, incluindo o caractere nulo de terminação, são copiados para a string de saída sem modificação. Cada especificação de conversão começa com o caractere `%`, opcionalmente seguido pelo modificador `E` ou `O` (ignorado se não suportado pela locale), seguido pelo caractere que determina o comportamento do especificador. Os seguintes especificadores de formato estão disponíveis:

Especificador de
conversão | Explicação | Campos usados
---|---|---
`%` | escreve o caractere literal `%`. A especificação de conversão completa deve ser `%%`. |
`n`
(C++11) | escreve o caractere de nova linha |
`t`
(C++11) | escreve o caractere de tabulação horizontal |
Ano
`Y` | escreve o **ano** como um número decimal, por exemplo, 2017 | `tm_year`
`EY`
(C++11) | escreve o **ano** na representação alternativa, por exemplo, 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | `tm_year`
---|---|---
`y` | escreve os últimos 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`Oy`
(C++11) | escreve os últimos 2 dígitos do **ano** usando o sistema numérico alternativo, por exemplo, 十一 em vez de 11 na locale ja_JP | `tm_year`
`Ey`
(C++11) | escreve o **ano** como deslocamento do período de calendário alternativo da locale `%EC` (dependente da locale) | `tm_year`
`C`
(C++11) | escreve os primeiros 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`EC`
(C++11) | escreve o nome do **ano base (período)** na representação alternativa da locale, por exemplo, 平成 (era Heisei) em ja_JP | `tm_year`
`G`
(C++11) | escreve o **ano baseado em semana ISO 8601**, ou seja, o ano que contém a semana especificada. Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`g`
(C++11) | escreve os últimos 2 dígitos do **ano baseado em semana ISO 8601**, ou seja, o ano que contém a semana especificada (intervalo `[00,99]`). Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
Mês
`b` | escreve o nome **abreviado do mês**, por exemplo, `Oct` (dependente da locale) | `tm_mon`
`h`
(C++11) | sinônimo de `b` | `tm_mon`
---|---|---
`B` | escreve o nome **completo do mês**, por exemplo, `October` (dependente da locale) | `tm_mon`
`m` | escreve o **mês** como um número decimal (intervalo `[01,12]`) | `tm_mon`
`Om`
(C++11) | escreve o **mês** usando o sistema numérico alternativo, por exemplo, 十二 em vez de 12 na locale ja_JP | `tm_mon`
Semana
`U` | escreve a **semana do ano** como um número decimal (domingo é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OU`
(C++11) | escreve a **semana do ano**, como por `%U`, usando o sistema numérico alternativo, por exemplo, 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
---|---|---
`W` | escreve a **semana do ano** como um número decimal (segunda-feira é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OW`
(C++11) | escreve a **semana do ano**, como por `%W`, usando o sistema numérico alternativo, por exemplo, 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
`V`
(C++11) | escreve a **semana do ano ISO 8601** (intervalo `[01,53]`). Nas semanas ISO 8601, elas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`OV`
(C++11) | escreve a **semana do ano**, como por `%V`, usando o sistema numérico alternativo, por exemplo, 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
Dia do ano/mês
`j` | escreve o **dia do ano** como um número decimal (intervalo `[001,366]`) | `tm_yday`
---|---|---
`d` | escreve o **dia do mês** como um número decimal (intervalo `[01,31]`) | `tm_mday`
`Od`
(C++11) | escreve o **dia do mês** baseado em zero usando o sistema numérico alternativo, por exemplo, 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
`e`
(C++11) | escreve o **dia do mês** como um número decimal (intervalo `[1,31]`). Um único dígito é precedido por um espaço. | `tm_mday`
`Oe`
(C++11) | escreve o **dia do mês** baseado em um usando o sistema numérico alternativo, por exemplo, 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
Dia da semana
`a` | escreve o nome **abreviado do dia da semana**, por exemplo, `Fri` (dependente da locale) | `tm_wday`
---|---|---
`A` | escreve o nome **completo do dia da semana**, por exemplo, `Friday` (dependente da locale) | `tm_wday`
`w` | escreve o **dia da semana** como um número decimal, onde domingo é `0` (intervalo `[0-6]`) | `tm_wday`
`Ow`
(C++11) | escreve o **dia da semana**, onde domingo é `0`, usando o sistema numérico alternativo, por exemplo, 二 em vez de 2 na locale ja_JP | `tm_wday`
`u`
(C++11) | escreve o **dia da semana** como um número decimal, onde segunda-feira é `1` (formato ISO 8601) (intervalo `[1-7]`) | `tm_wday`
`Ou`
(C++11) | escreve o **dia da semana**, onde segunda-feira é `1`, usando o sistema numérico alternativo, por exemplo, 二 em vez de 2 na locale ja_JP | `tm_wday`
Hora, minuto, segundo
`H` | escreve a **hora** como um número decimal, relógio de 24 horas (intervalo `[00-23]`) | `tm_hour`
`OH`
(C++11) | escreve a **hora** do relógio de 24 horas usando o sistema numérico alternativo, por exemplo, 十八 em vez de 18 na locale ja_JP | `tm_hour`
---|---|---
`I` | escreve a **hora** como um número decimal, relógio de 12 horas (intervalo `[01,12]`) | `tm_hour`
`OI`
(C++11) | escreve a **hora** do relógio de 12 horas usando o sistema numérico alternativo, por exemplo, 六 em vez de 06 na locale ja_JP | `tm_hour`
---|---|---
`M` | escreve o **minuto** como um número decimal (intervalo `[00,59]`) | `tm_min`
`OM`
(C++11) | escreve o **minuto** usando o sistema numérico alternativo, por exemplo, 二十五 em vez de 25 na locale ja_JP | `tm_min`
---|---|---
`S` | escreve o **segundo** como um número decimal (intervalo `[00,60]`) | `tm_sec`
`OS`
(C++11) | escreve o **segundo** usando o sistema numérico alternativo, por exemplo, 二十四 em vez de 24 na locale ja_JP | `tm_sec`
Outros
`c` | escreve a **string padrão de data e hora**, por exemplo, `Sun Oct 17 04:41:13 2010` (dependente da locale) | todos
`Ec`
(C++11) | escreve a **string alternativa de data e hora**, por exemplo, usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
---|---|---
`x` | escreve a **representação de data** localizada (dependente da locale) | todos
`Ex`
(C++11) | escreve a **representação de data alternativa**, por exemplo, usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
---|---|---
`X` | escreve a **representação de hora** localizada, por exemplo, 18:40:20 ou 6:40:20 PM (dependente da locale) | todos
`EX`
(C++11) | escreve a **representação de hora alternativa** (dependente da locale) | todos
`D`
(C++11) | equivalente a **"%m/%d/%y"** | `tm_mon`, `tm_mday`, `tm_year`
`F`
(C++11) | equivalente a **"%Y-%m-%d"** (o formato de data ISO 8601) | `tm_mon`, `tm_mday`, `tm_year`
`r`
(C++11) | escreve a hora localizada do **relógio de 12 horas** (dependente da locale) | `tm_hour`, `tm_min`, `tm_sec`
`R`
(C++11) | equivalente a **"%H:%M"** | `tm_hour`, `tm_min`
`T`
(C++11) | equivalente a **"%H:%M:%S"** (o formato de hora ISO 8601) | `tm_hour`, `tm_min`, `tm_sec`
---|---|---
`p` | escreve **a.m. ou p.m.** localizado (dependente da locale) | `tm_hour`
`z`
(C++11) | escreve o **deslocamento do UTC** no formato ISO 8601 (por exemplo, `-0430`), ou nenhum caractere se a informação do fuso horário não estiver disponível | `tm_isdst`
---|---|---
`Z` | escreve o **nome ou abreviação do fuso horário** dependente da locale, ou nenhum caractere se a informação do fuso horário não estiver disponível | `tm_isdst`

### Valor de retorno

Iterador apontando um após o último caractere que foi produzido.

### Observações

Nenhuma manipulação de erro é fornecida.

O caractere de preenchimento é fornecido para aqueles especificadores de formato definidos pela implementação e para as sobrescritas definidas pelo usuário de `do_put()` que usam lógica de preenchimento e espaçamento. Tais implementações tipicamente fazem uso das flags de formatação de str.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <iomanip>
    #include <ctime>
    
    void try_time_put(const std::tm* t, const std::string& fmt)
    {
        std::cout.imbue(std::locale());
        std::cout << "In the locale '" << std::cout.getloc().name() << "' : '";
    
        std::use_facet<std::time_put<char>>(std::cout.getloc()).put(
            {std::cout}, std::cout, ' ', t, &fmt[0], &fmt[0] + fmt.size());
    
        std::cout << "'\n";
    }
    
    int main()
    {
        std::time_t t = std::time(NULL);
        std::tm tm = *std::localtime(&t);
    
        std::string fmt = "%c";
        std::cout << "Using the format string '" << fmt
                  << "' to format the time: " << std::ctime(&t) << '\n';
    
        std::locale::global(std::locale("de_DE.utf8"));
        try_time_put(&tm, fmt);
    
        std::locale::global(std::locale("el_GR.utf8"));
        try_time_put(&tm, fmt);
    
        std::locale::global(std::locale("ja_JP.utf8"));
        try_time_put(&tm, fmt);
    }
```

Saída possível:
```
    Using the format string '%c' to format the time: Mon Feb 11 22:58:50 2013
    
    In the locale 'de_DE.utf8' : 'Mo 11 Feb 2013 23:02:38 EST'
    In the locale 'el_GR.utf8' : 'Δευ 11 Φεβ 2013 11:02:38 μμ EST'
    In the locale 'ja_JP.utf8' : '2013年02月11日 23時02分38秒'
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 164](<https://cplusplus.github.io/LWG/issue164>) | C++98 | o propósito do parâmetro fill não estava claro | esclarecido

### Veja também

[ put_time](<#/doc/io/manip/put_time>)(C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(modelo de função)
[ do_get](<#/doc/locale/time_get/get>)[virtual] (C++11) | extrai componentes de data/hora de um stream de entrada, de acordo com o formato especificado
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)