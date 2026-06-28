# std::get_time

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class CharT >
/*unspecified*/ get_time( std::tm* tmb, const CharT* fmt );
```

Quando usado em uma expressão `in >> get_time(tmb, fmt)`, analisa a entrada de caracteres como um valor de data/hora de acordo com a string de formato `fmt` e de acordo com a facet [std::time_get](<#/doc/locale/time_get>) da locale atualmente imbuída no stream de entrada `in`. O valor resultante é armazenado em um objeto [std::tm](<#/doc/chrono/c/tm>) apontado por `tmb`.

### Parâmetros

- **tmb** — ponteiro válido para o objeto [std::tm](<#/doc/chrono/c/tm>) onde o resultado será armazenado
- **fmt** — ponteiro para uma string `CharT` terminada em nulo especificando o formato de conversão. A string de formato consiste em zero ou mais especificadores de conversão, caracteres de espaço em branco e caracteres comuns (exceto `%`). Espera-se que cada caractere comum corresponda a um caractere no stream de entrada em comparação que não diferencia maiúsculas de minúsculas. Cada caractere de espaço em branco corresponde a qualquer espaço em branco na string de entrada. Cada especificação de conversão começa com o caractere `%`, opcionalmente seguido pelo modificador `E` ou `O` (ignorado se não suportado pela locale), seguido pelo caractere que determina o comportamento do especificador. Os especificadores de formato correspondem à função POSIX [`strptime()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/strptime.html>): | Conversão
---|---|---
especificador | Explicação | Escreve nos campos
`%` | corresponde a um `%` literal. A especificação de conversão completa deve ser `%%` | (nenhum)
`t` | corresponde a qualquer espaço em branco | (nenhum)
`n` | corresponde a qualquer espaço em branco | (nenhum)
Ano
`Y` | analisa o **ano** completo como um número decimal de 4 dígitos, zeros à esquerda permitidos, mas não obrigatórios | `tm_year`
---|---|---
`EY` | analisa o **ano** na representação alternativa, por exemplo, 平成23年 (ano Heisei 23) que escreve 2011 para tm_year na locale ja_JP | `tm_year`
`y` | analisa os últimos 2 dígitos do **ano** como um número decimal. O intervalo `[69,99]` resulta nos valores de 1969 a 1999, o intervalo `[00,68]` resulta em 2000-2068 | `tm_year`
`Oy` | analisa os últimos 2 dígitos do **ano** usando o sistema numérico alternativo, por exemplo, 十一 é analisado como 11 na locale ja_JP | `tm_year`
`Ey` | analisa o **ano** como deslocamento do período de calendário alternativo da locale `%EC` | `tm_year`
`C` | analisa os primeiros 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`EC` | analisa o nome do ano base (período) na representação alternativa da locale, por exemplo, 平成 (era Heisei) em ja_JP | `tm_year`
Mês
`b` | analisa o nome do mês, completo ou abreviado, por exemplo, `Out` | `tm_mon`
---|---|---
`h` | sinônimo de `b` | `tm_mon`
`B` | sinônimo de `b` | `tm_mon`
`m` | analisa o **mês** como um número decimal (intervalo `[01,12]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_mon`
`Om` | analisa o **mês** usando o sistema numérico alternativo, por exemplo, 十二 é analisado como 12 na locale ja_JP | `tm_mon`
Semana
`U` | analisa a **semana do ano** como um número decimal (domingo é o primeiro dia da semana) (intervalo `[00,53]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_year`, `tm_wday`, `tm_yday`
---|---|---
`OU` | analisa a **semana do ano**, como por `%U`, usando o sistema numérico alternativo, por exemplo, 五十二 é analisado como 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
`W` | analisa a **semana do ano** como um número decimal (segunda-feira é o primeiro dia da semana) (intervalo `[00,53]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_year`, `tm_wday`, `tm_yday`
`OW` | analisa a **semana do ano**, como por `%W`, usando o sistema numérico alternativo, por exemplo, 五十二 é analisado como 52 na locale ja_JP | `tm_year`, `tm_wday`, `tm_yday`
Dia do ano/mês
`j` | analisa o **dia do ano** como um número decimal (intervalo `[001,366]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_yday`
---|---|---
`d` | analisa o **dia do mês** como um número decimal (intervalo `[01,31]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_mday`
`Od` | analisa o **dia do mês** usando o sistema numérico alternativo, por exemplo, 二十七 é analisado como 27 na locale ja_JP, zeros à esquerda permitidos, mas não obrigatórios | `tm_mday`
`e` | sinônimo de `d` | `tm_mday`
`Oe` | sinônimo de `Od` | `tm_mday`
Dia da semana
`a` | analisa o nome do dia da semana, completo ou abreviado, por exemplo, `Sex` | `tm_wday`
---|---|---
`A` | sinônimo de `a` | `tm_wday`
`w` | analisa o **dia da semana** como um número decimal, onde domingo é `0` (intervalo `[0-6]`) | `tm_wday`
`Ow` | analisa o **dia da semana** como um número decimal, onde domingo é `0`, usando o sistema numérico alternativo, por exemplo, 二 é analisado como 2 na locale ja_JP | `tm_wday`
Hora, minuto, segundo
`H` | analisa a **hora** como um número decimal, relógio de 24 horas (intervalo `[00-23]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_hour`
---|---|---
`OH` | analisa a **hora** do relógio de 24 horas usando o sistema numérico alternativo, por exemplo, 十八 é analisado como 18 na locale ja_JP | `tm_hour`
`I` | analisa a **hora** como um número decimal, relógio de 12 horas (intervalo `[01,12]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_hour`
`OI` | analisa a **hora** do relógio de 12 horas usando o sistema numérico alternativo, por exemplo, 六 é lido como 06 na locale ja_JP | `tm_hour`
`M` | analisa o **minuto** como um número decimal (intervalo `[00,59]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_min`
`OM` | analisa o **minuto** usando o sistema numérico alternativo, por exemplo, 二十五 é analisado como 25 na locale ja_JP | `tm_min`
`S` | analisa o **segundo** como um número decimal (intervalo `[00,60]`), zeros à esquerda permitidos, mas não obrigatórios | `tm_sec`
`OS` | analisa o **segundo** usando o sistema numérico alternativo, por exemplo, 二十四 é analisado como 24 na locale ja_JP | `tm_sec`
Outros
`c` | analisa o formato de string de data e hora padrão da locale, por exemplo, `Dom Out 17 04:41:13 2010` (dependente da locale) | todos
---|---|---
`Ec` | analisa o formato de string de data e hora alternativo da locale, por exemplo, esperando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
`x` | analisa a representação de data padrão da locale | todos
`Ex` | analisa a representação de data alternativa da locale, por exemplo, esperando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
`X` | analisa a representação de hora padrão da locale | todos
`EX` | analisa a representação de hora alternativa da locale | todos
`D` | equivalente a **"%m / %d / %y "** | `tm_mon`, `tm_mday`, `tm_year`
`r` | analisa a hora padrão do relógio de 12 horas da locale (em POSIX, **"%I : %M : %S %p"**) | `tm_hour`, `tm_min`, `tm_sec`
`R` | equivalente a **"%H : %M"** | `tm_hour`, `tm_min`
`T` | equivalente a **"%H : %M : %S"** | `tm_hour`, `tm_min`, `tm_sec`
`p` | analisa o equivalente da locale para **a.m. ou p.m.** | `tm_hour`

Nota: `tm_isdst` não é escrito e precisa ser definido explicitamente para uso com funções como `mktime`.

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `in` é um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão `in >> get_time(tmb, fmt)`
    *   tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    *   tem o valor `in`
    *   comporta-se como se chamasse `f(in, tmb, fmt)`

onde a função `f` é definida como:
```cpp
    template<class CharT, class Traits>
    void f(std::basic_ios<CharT, Traits>& str, std::tm* tmb, const CharT* fmt)
    {
        using Iter = std::istreambuf_iterator<CharT, Traits>;
        using TimeGet = time_get<CharT, Iter>;
    
        std::ios_base::iostate err = std::ios_base::goodbit;
        const TimeGet& tg = std::use_facet<TimeGet>(str.getloc());
    
        tg.get(Iter(str.rdbuf()), Iter(), str, err, tmb,
            fmt, fmt + Traits::length(fmt));
    
        if (err != std::ios_base::goodbit)
            str.setstate(err);
    }
```

### Notas

Conforme especificado em [std::time_get::do_get](<#/doc/locale/time_get/get>), que esta função chama, é não especificado se esta função zera os campos em `*tmb` que não são definidos diretamente pelos especificadores de conversão que aparecem em `fmt`: programas portáveis devem inicializar cada campo de `*tmb` para zero antes de chamar `std::get_time`.

### Exemplo

Nota: escolha clang ou gcc >= 12.1 para observar a saída. libstdc++ antes de 12.1 não implementa corretamente o especificador %b: [bug #78714](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=78714>).

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    int main()
    {
        std::tm t = {};
        std::istringstream ss("2011-Februar-18 23:12:34");
        ss.imbue(std::locale("de_DE.utf-8"));
        ss >> std::get_time(&t, "%Y-%b-%d %H:%M:%S");
    
        if (ss.fail())
            std::cout << "Parse failed\n";
        else
            std::cout << std::put_time(&t, "%c") << '\n';
    }
```

Saída possível:
```
    Sun Feb 18 23:12:34 2011
```

### Veja também

[ time_get](<#/doc/locale/time_get>) | analisa valores de tempo/data de uma sequência de caracteres de entrada em [std::tm](<#/doc/chrono/c/tm>)
(modelo de classe)
[ put_time](<#/doc/io/manip/put_time>)(C++11) | formata e gera um valor de data/hora de acordo com o formato especificado
(modelo de função)
[ parse](<#/doc/chrono/parse>)(C++20) | analisa um objeto `chrono` de um stream
(modelo de função)