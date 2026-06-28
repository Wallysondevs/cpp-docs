# std::wcsftime

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t wcsftime( wchar_t* str, std::size_t count, const wchar_t* format, const std::tm* time );
```

Converte as informações de data e hora de um determinado tempo de calendário time para uma string de caracteres largos terminada em nulo str de acordo com a [string de formato](<#/doc/chrono/c/wcsftime>) format. Até count caracteres largos são escritos.

### Parâmetros

- **str** — ponteiro para o primeiro elemento do array wchar_t para saída
- **count** — número máximo de caracteres largos a serem escritos
- **format** — ponteiro para uma string de caracteres largos terminada em nulo especificando o [formato de conversão](<#/doc/chrono/c/wcsftime>)
- **time** — ponteiro para as informações de data e hora a serem convertidas

### String de formato

A string de formato consiste em zero ou mais especificadores de conversão e caracteres comuns (exceto `%`). Todos os caracteres comuns, incluindo o caractere nulo terminador, são copiados para a string de saída sem modificação. Cada especificação de conversão começa com o caractere `%`, opcionalmente seguido pelo modificador `E` ou `O` (ignorado se não suportado pela locale), seguido pelo caractere que determina o comportamento do especificador. Os seguintes especificadores de formato estão disponíveis:

Especificador
de conversão | Explicação | Campos usados
---|---|---
`%` | Escreve o caractere literal `%`. A especificação de conversão completa deve ser `%%`. |
`n`
(C++11) | Escreve o caractere de nova linha |
`t`
(C++11) | Escreve o caractere de tabulação horizontal |
Ano
`Y` | Escreve o **ano** como um número decimal, ex. 2017 | `tm_year`
`EY`
(C++11) | Escreve o **ano** na representação alternativa, ex.平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | `tm_year`
---|---|---
`y` | Escreve os últimos 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`Oy`
(C++11) | Escreve os últimos 2 dígitos do **ano** usando o sistema numérico alternativo, ex. 十一 em vez de 11 na locale ja_JP | `tm_year`
`Ey`
(C++11) | Escreve o **ano** como deslocamento do período de calendário alternativo da locale `%EC` (dependente da locale) | `tm_year`
`C`
(C++11) | Escreve os primeiros 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`EC`
(C++11) | Escreve o nome do **ano base (período)** na representação alternativa da locale, ex. 平成 (era Heisei) em ja_JP | `tm_year`
`G`
(C++11) | Escreve o **ano baseado em semana ISO 8601**, ou seja, o ano que contém a semana especificada. No ISO 8601, as semanas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`g`
(C++11) | Escreve os últimos 2 dígitos do **ano baseado em semana ISO 8601**, ou seja, o ano que contém a semana especificada (intervalo `[00,99]`). No ISO 8601, as semanas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
Mês
`b` | Escreve o nome **abreviado do mês**, ex. `Oct` (dependente da locale) | `tm_mon`
`h`
(C++11) | Sinônimo de `b` | `tm_mon`
---|---|---
`B` | Escreve o nome **completo do mês**, ex. `October` (dependente da locale) | `tm_mon`
`m` | Escreve o **mês** como um número decimal (intervalo `[01,12]`) | `tm_mon`
`Om`
(C++11) | Escreve o **mês** usando o sistema numérico alternativo, ex. 十二 em vez de 12 na locale ja_JP | `tm_mon`
Semana
`U` | Escreve a **semana do ano** como um número decimal (domingo é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OU`
(C++11) | Escreve a **semana do ano**, como por `%U`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
---|---|---
`W` | Escreve a **semana do ano** como um número decimal (segunda-feira é o primeiro dia da semana) (intervalo `[00,53]`) | `tm_year`, `tm_wday`, `tm_yday`
`OW`
(C++11) | Escreve a **semana do ano**, como por `%W`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
`V`
(C++11) | Escreve a **semana do ano ISO 8601** (intervalo `[01,53]`). No ISO 8601, as semanas começam na segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de janeiro
  * Inclui a primeira quinta-feira do ano

| `tm_year`, `tm_wday`, `tm_yday`
`OV`
(C++11) | Escreve a **semana do ano**, como por `%V`, usando o sistema numérico alternativo, ex. 五十二 em vez de 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
Dia do ano/mês
`j` | Escreve o **dia do ano** como um número decimal (intervalo `[001,366]`) | `tm_yday`
---|---|---
`d` | Escreve o **dia do mês** como um número decimal (intervalo `[01,31]`) | `tm_mday`
`Od`
(C++11) | Escreve o **dia do mês** baseado em zero usando o sistema numérico alternativo, ex. 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
`e`
(C++11) | Escreve o **dia do mês** como um número decimal (intervalo `[1,31]`). Um único dígito é precedido por um espaço. | `tm_mday`
`Oe`
(C++11) | Escreve o **dia do mês** baseado em um usando o sistema numérico alternativo, ex. 二十七 em vez de 27 na locale ja_JP. Um único caractere é precedido por um espaço. | `tm_mday`
Dia da semana
`a` | Escreve o nome **abreviado do dia da semana**, ex. `Fri` (dependente da locale) | `tm_wday`
---|---|---
`A` | Escreve o nome **completo do dia da semana**, ex. `Friday` (dependente da locale) | `tm_wday`
`w` | Escreve o **dia da semana** como um número decimal, onde domingo é `0` (intervalo `[0-6]`) | `tm_wday`
`Ow`
(C++11) | Escreve o **dia da semana**, onde domingo é `0`, usando o sistema numérico alternativo, ex. 二 em vez de 2 na locale ja_JP | `tm_wday`
`u`
(C++11) | Escreve o **dia da semana** como um número decimal, onde segunda-feira é `1` (formato ISO 8601) (intervalo `[1-7]`) | `tm_wday`
`Ou`
(C++11) | Escreve o **dia da semana**, onde segunda-feira é `1`, usando o sistema numérico alternativo, ex. 二 em vez de 2 na locale ja_JP | `tm_wday`
Hora, minuto, segundo
`H` | Escreve a **hora** como um número decimal, relógio de 24 horas (intervalo `[00-23]`) | `tm_hour`
`OH`
(C++11) | Escreve a **hora** do relógio de 24 horas usando o sistema numérico alternativo, ex. 十八 em vez de 18 na locale ja_JP | `tm_hour`
---|---|---
`I` | Escreve a **hora** como um número decimal, relógio de 12 horas (intervalo `[01,12]`) | `tm_hour`
`OI`
(C++11) | Escreve a **hora** do relógio de 12 horas usando o sistema numérico alternativo, ex. 六 em vez de 06 na locale ja_JP | `tm_hour`
---|---|---
`M` | Escreve o **minuto** como um número decimal (intervalo `[00,59]`) | `tm_min`
`OM`
(C++11) | Escreve o **minuto** usando o sistema numérico alternativo, ex. 二十五 em vez de 25 na locale ja_JP | `tm_min`
---|---|---
`S` | Escreve o **segundo** como um número decimal (intervalo `[00,60]`) | `tm_sec`
`OS`
(C++11) | Escreve o **segundo** usando o sistema numérico alternativo, ex. 二十四 em vez de 24 na locale ja_JP | `tm_sec`
Outros
`c` | Escreve a **string padrão de data e hora**, ex. `Sun Oct 17 04:41:13 2010` (dependente da locale) | all
`Ec`
(C++11) | Escreve a **string alternativa de data e hora**, ex. usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | all
---|---|---
`x` | Escreve a **representação de data** localizada (dependente da locale) | all
`Ex`
(C++11) | Escreve a **representação de data alternativa**, ex. usando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | all
---|---|---
`X` | Escreve a **representação de hora** localizada, ex. 18:40:20 ou 6:40:20 PM (dependente da locale) | all
`EX`
(C++11) | Escreve a **representação de hora alternativa** (dependente da locale) | all
`D`
(C++11) | Equivalente a **"%m/%d/%y"** | `tm_mon`, `tm_mday`, `tm_year`
`F`
(C++11) | Equivalente a **"%Y-%m-%d"** (o formato de data ISO 8601) | `tm_mon`, `tm_mday`, `tm_year`
`r`
(C++11) | Escreve a hora do **relógio de 12 horas** localizada (dependente da locale) | `tm_hour`, `tm_min`, `tm_sec`
`R`
(C++11) | Equivalente a **"%H:%M"** | `tm_hour`, `tm_min`
`T`
(C++11) | Equivalente a **"%H:%M:%S"** (o formato de hora ISO 8601) | `tm_hour`, `tm_min`, `tm_sec`
---|---|---
`p` | Escreve **a.m. ou p.m.** localizado (dependente da locale) | `tm_hour`
`z`
(C++11) | Escreve o **deslocamento do UTC** no formato ISO 8601 (ex. `-0430`), ou nenhum caractere se a informação do fuso horário não estiver disponível | `tm_isdst`
---|---|---
`Z` | Escreve o **nome ou abreviação do fuso horário** dependente da locale, ou nenhum caractere se a informação do fuso horário não estiver disponível | `tm_isdst`

### Valor de retorno

Número de caracteres largos escritos no array de caracteres largos apontado por str, não incluindo o L'\0' terminador em caso de sucesso. Se count for atingido antes que a string inteira possa ser armazenada, ​0​ é retornado e o conteúdo é indefinido.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <cwchar>
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::locale::global(std::locale("ja_JP.utf8"));
        std::time_t t = std::time(nullptr);
        wchar_t wstr[100];
        if (std::wcsftime(wstr, 100, L"%A %c", std::localtime(&t)))
            std::wcout << wstr << '\n';
    }
```

Saída possível:
```
    火曜日 2011年12月27日 17時43分13秒
```

### Veja também

[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual personalizada
(função)
[ put_time](<#/doc/io/manip/put_time>)(C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(modelo de função)
[documentação C](<#/>) para wcsftime