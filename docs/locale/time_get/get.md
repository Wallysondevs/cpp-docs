# std::time_get&lt;CharT,InputIt&gt;::get, std::time_get&lt;CharT,InputIt&gt;::do_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t,
const char_type* fmtbeg, const char_type* fmtend ) const;
protected:
virtual iter_type do_get( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm *t,
char format, char modifier ) const;
```

1) Analisa a data e hora da sequência de caracteres de entrada [beg, end) de acordo com o formato fornecido na sequência de caracteres [fmtbeg, fmtend). Espera-se que o formato siga o descrito abaixo, embora o processamento real de cada especificador de formato possa ser personalizado sobrescrevendo `do_get`. A função `get` executa o seguinte: Primeiro, limpa os bits de erro em err executando err = [std::ios_base::goodbit](<#/doc/io/ios_base/iostate>). Em seguida, entra em um loop, que termina sempre que qualquer uma das seguintes condições se torna verdadeira (verificadas nesta ordem):

a) Todos os caracteres foram lidos da string de formato (fmtbeg == fmtend).

b) Houve um erro de análise (err != [std::ios_base::goodbit](<#/doc/io/ios_base/iostate>)).

c) Todos os caracteres foram lidos da sequência de entrada (beg == end. Se esta condição terminar o loop, a função define `eofbit` e `failbit` em err.

No corpo do loop, os seguintes passos ocorrem:

a) Se o próximo caractere na string de formato for '%', seguido por um ou dois caracteres que formam um especificador de conversão `[std::get_time](<#/doc/io/manip/get_time>)` válido (veja abaixo), esses caracteres são usados na chamada do_get(beg, end, str, err, t, format, modifier), onde format é o caractere especificador de conversão primário, e modifier é o modificador opcional (que aparece entre `%` e o caractere de formato, se presente). Se não houver modificador, o valor '\0' é usado. Se a string de formato for ambígua ou terminar muito cedo para determinar o especificador de conversão após '%', `eofbit` é definido em err e o loop é terminado. Se, após a chamada para `do_get`, nenhum bit de erro for definido em err, a função incrementa fmtbeg para apontar logo após o especificador de conversão e continua o loop.

b) Se o próximo caractere for um espaço em branco, conforme indicado pela locale fornecida no stream str (ou seja, `[std::isspace](<#/doc/string/byte/isspace>)`(*fmtbeg, str.getloc()) == true), a função continua incrementando fmtbeg até que ele se torne igual a fmtend ou aponte para um caractere que não seja espaço em branco.

c) Se o próximo caractere na string de formato for equivalente ao próximo caractere no stream de entrada de acordo com a comparação que ignora maiúsculas/minúsculas, a função avança ambas as sequências em um caractere ++fmtbeg, ++beg; e continua o loop. Caso contrário, ela define o `failbit` em err.

2) Analisa um especificador de conversão da sequência de entrada [beg, end) e atualiza a estrutura `[std::tm](<#/doc/chrono/c/tm>)` apontada por t de acordo.

Primeiro, limpa os bits de erro em err executando err = [std::ios_base::goodbit](<#/doc/io/ios_base/iostate>). Em seguida, lê caracteres da sequência de entrada [beg, end) que são esperados pelo especificador de formato `[std::time_get](<#/doc/locale/time_get>)` formado pela combinação de '%', modifier (se não for '\0'), e format. Se os caracteres não se combinarem para formar um especificador de conversão válido, define `failbit` em err. Se o fim do stream de entrada for alcançado após a leitura de um caractere, define `eofbit` em err. Se a string de entrada foi analisada com sucesso, atualiza os campos correspondentes de *t.

Para especificadores de conversão complexos, como '%x' ou '%c', ou as diretivas que usam os modificadores 'E' e 'O', a função pode falhar ao determinar alguns dos valores a serem armazenados em *t. Nesse caso, ela define `eofbit` em err e deixa esses campos em estado não especificado.

### Parâmetros

- **beg** — iterator que designa o início da sequência a ser analisada
- **end** — iterator um após o final da sequência a ser analisada
- **str** — um objeto stream que esta função usa para obter facets de locale quando necessário, por exemplo, `[std::ctype](<#/doc/locale/ctype>)` para pular espaços em branco ou `[std::collate](<#/doc/locale/collate>)` para comparar strings
- **err** — objeto de flags de erro de stream que é modificado por esta função para indicar erros
- **t** — ponteiro para o objeto `[std::tm](<#/doc/chrono/c/tm>)` que conterá o resultado desta chamada de função
- **fmtbeg** — ponteiro para o primeiro caractere de uma sequência de caracteres `char_type` especificando o formato de conversão (veja abaixo)
- **fmtend** — ponteiro um após o último caractere de uma sequência de caracteres `char_type` especificando o formato de conversão
- **format** — o caractere que nomeia um especificador de conversão
- **modifier** — o modificador opcional que pode aparecer entre `%` e o especificador de conversão

A string de formato consiste em zero ou mais especificadores de conversão, caracteres de espaço em branco e caracteres comuns (exceto `%`). Espera-se que cada caractere comum corresponda a um caractere no stream de entrada em comparação que ignora maiúsculas/minúsculas. Cada caractere de espaço em branco corresponde a qualquer espaço em branco na string de entrada. Cada especificação de conversão começa com o caractere `%`, opcionalmente seguido pelo modificador `E` ou `O` (ignorado se não suportado pela locale), seguido pelo caractere que determina o comportamento do especificador. Os especificadores de formato correspondem à função POSIX [`strptime()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/strptime.html>):

Especificador de conversão
| Explicação | Escreve nos campos
---|---|---
`%` | corresponde a um `%` literal. A especificação de conversão completa deve ser `%%` | (nenhum)
`t` | corresponde a qualquer espaço em branco | (nenhum)
`n` | corresponde a qualquer espaço em branco | (nenhum)
Ano
`Y` | analisa o **ano** completo como um número decimal de 4 dígitos, zeros à esquerda permitidos, mas não obrigatórios | `tm_year`
---|---|---
`EY` | analisa o **ano** na representação alternativa, por exemplo, 平成23年 (ano Heisei 23) que escreve 2011 em tm_year na locale ja_JP | `tm_year`
`y` | analisa os últimos 2 dígitos do **ano** como um número decimal. O intervalo `[69,99]` resulta em valores de 1969 a 1999, o intervalo `[00,68]` resulta em 2000-2068 | `tm_year`
`Oy` | analisa os últimos 2 dígitos do **ano** usando o sistema numérico alternativo, por exemplo, 十一 é analisado como 11 na locale ja_JP | `tm_year`
`Ey` | analisa o **ano** como deslocamento do período de calendário alternativo da locale `%EC` | `tm_year`
`C` | analisa os primeiros 2 dígitos do **ano** como um número decimal (intervalo `[00,99]`) | `tm_year`
`EC` | analisa o nome do ano base (período) na representação alternativa da locale, por exemplo, 平成 (era Heisei) em ja_JP | `tm_year`
Mês
`b` | analisa o nome do mês, completo ou abreviado, por exemplo, `Oct` | `tm_mon`
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
`a` | analisa o nome do dia da semana, completo ou abreviado, por exemplo, `Fri` | `tm_wday`
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
`c` | analisa o formato padrão de string de data e hora da locale, por exemplo, `Sun Oct 17 04:41:13 2010` (dependente da locale) | todos
---|---|---
`Ec` | analisa o formato alternativo de string de data e hora da locale, por exemplo, esperando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
`x` | analisa a representação padrão de data da locale | todos
`Ex` | analisa a representação alternativa de data da locale, por exemplo, esperando 平成23年 (ano Heisei 23) em vez de 2011年 (ano 2011) na locale ja_JP | todos
`X` | analisa a representação padrão de hora da locale | todos
`EX` | analisa a representação alternativa de hora da locale | todos
`D` | equivalente a **"%m / %d / %y "** | `tm_mon`, `tm_mday`, `tm_year`
`r` | analisa a hora padrão do relógio de 12 horas da locale (em POSIX, **"%I : %M : %S %p"**)| `tm_hour`, `tm_min`, `tm_sec`
`R` | equivalente a **"%H : %M"** | `tm_hour`, `tm_min`
`T` | equivalente a **"%H : %M : %S"** | `tm_hour`, `tm_min`, `tm_sec`
`p` | analisa o equivalente da locale para **a.m. ou p.m.** | `tm_hour`

Nota: `tm_isdst` não é escrito e precisa ser definido explicitamente para uso com funções como `mktime`

### Valor de retorno

Iterator apontando um após o último caractere em [beg, end) que foi analisado com sucesso.

### Notas

A comparação que ignora maiúsculas/minúsculas para os caracteres não-espaço em branco e não-'%' na string de formato, o facet `[std::collate](<#/doc/locale/collate>)` da locale fornecida por str é tipicamente, mas não necessariamente, usado.

Se um erro de análise for encontrado, muitas implementações desta função deixam *t completamente intocado.

Não é especificado se essas funções zeram os campos em *t que elas não definem diretamente: programas portáveis devem inicializar todos os campos com zero antes de chamar `get()`.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    int main()
    {
        std::istringstream ss("2026-März-12 23:45:56");
        ss.imbue(std::locale("de_DE.utf8"));
    
        auto& f = std::use_facet<std::time_get<char>>(ss.getloc());
        std::tm t{};
        std::string s = "%Y-%b-%d %H:%M:%S";
        std::ios_base::iostate err = std::ios_base::goodbit;
        auto ret = f.get({ss}, {}, ss, err, &t, &s[0], &s[0] + s.size());
        ss.setstate(err);
        std::istreambuf_iterator<char> last{};
    
        if (ss)
        {
            std::cout << "Successfully parsed as " << std::put_time(&t, "%c") << '\n';
            if (ret != last)
            {
                std::cout << "Remaining content: ";
                std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
            }
            else
                std::cout << "The input was fully consumed.";
        }
        else
        {
            std::cout << "Parse failed.\nUnparsed string: ";
            std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
        }
        std::cout << '\n';
    }
```

Saída:
```
    Successfully parsed as Sun Mar 12 23:45:56 2026
    The input was fully consumed.
```

### Veja também

[ get_time](<#/doc/io/manip/get_time>)(C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)