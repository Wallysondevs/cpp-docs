# std::formatter&lt;std::chrono::gps_time&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Duration, class CharT >
struct formatter<std::chrono::gps_time<Duration>, CharT>;
```

Especialização de [std::formatter](<#/doc/utility/format/formatter>) que define regras de formatação para um std::chrono::gps_time.

Se `%Z` for usado, ele é substituído por "GPS" ampliado para `CharT`. Se `%z` ou uma variante modificada dele for usado, um deslocamento de `0min` será formatado. A data e hora formatadas são equivalentes às formatadas para um std::chrono::sys_time inicializado com [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt;(tp.time_since_epoch()) + [std::chrono::days](<#/doc/chrono/duration>)(3657).

A especialização de [std::formatter](<#/doc/utility/format/formatter>) geralmente não é acessada diretamente, mas é usada através de [funções de formatação](<#/doc/utility/format>).

### Especificação de formato

A especificação de formato tem a forma

---
preenchimento-e-alinhamento (opcional) largura (opcional) precisão (opcional) `L`(opcional) chrono-spec (opcional)
---

preenchimento-e-alinhamento, largura e precisão têm o mesmo significado que na [especificação de formato padrão](<#/doc/utility/format/formatter>). A precisão é válida apenas para tipos [std::chrono::duration](<#/doc/chrono/duration>) onde o tipo de representação `Rep` é um tipo de ponto flutuante, caso contrário [std::format_error](<#/doc/utility/format/format_error>) é lançada.

O locale usado para formatação é determinado da seguinte forma:

*   o locale "C" padrão se `L` não estiver presente na especificação de formato,
*   caso contrário, o locale denotado pelo [std::locale](<#/doc/locale/locale>) passado para a função de formatação, se houver,
*   caso contrário (`L` está presente, mas nenhum [std::locale](<#/doc/locale/locale>) é passado para a função de formatação), o locale global.

Se a [codificação de literal de string (ordinária ou larga)](<#/doc/language/charset>) for uma forma de codificação Unicode e o locale estiver entre um conjunto de locales definido pela implementação, cada substituição que depende do locale é executada como se a sequência de caracteres de substituição fosse convertida para a codificação literal.

O chrono-spec consiste em um ou mais especificadores de conversão e caracteres comuns (diferentes de `{`, `}` e `%`). Um chrono-spec deve começar com um especificador de conversão. Todos os caracteres comuns são escritos na saída sem modificação. Cada especificador de conversão não modificado começa com um caractere `%` seguido por um caractere que determina o comportamento do especificador. Alguns especificadores de conversão têm uma forma modificada na qual um caractere modificador `E` ou `O` é inserido após o caractere `%`. Cada especificador de conversão é substituído por caracteres apropriados na saída, conforme descrito abaixo.

Se o chrono-spec estiver vazio, o objeto chrono é formatado como se fosse transmitido para um objeto `os` do tipo [std::basic_ostringstream](<#/doc/io/basic_ostringstream>)&lt;CharT&gt; com o locale de formatação (um de [std::locale::classic](<#/doc/locale/locale/classic>)(), o objeto [std::locale](<#/doc/locale/locale>) passado e [std::locale::global](<#/doc/locale/locale/global>)()) [imbuído](<#/doc/io/ios_base/imbue>) e copiando os.str() para o buffer de saída com preenchimento e ajustes adicionais conforme os especificadores de formato.

Os seguintes especificadores de formato estão disponíveis:

Especificador de
conversão | Explicação
---|---
`%%` | Escreve um caractere literal `%`.
`%n` | Escreve um caractere de nova linha.
`%t` | Escreve um caractere de tabulação horizontal.
Ano
`%C`
`%EC` | Escreve o ano dividido por 100 usando divisão por piso. Se o resultado for um único dígito decimal, ele é prefixado com 0. O comando modificado `%EC` escreve a representação alternativa do século do locale.
`%y`
`%Oy`
`%Ey` | Escreve os dois últimos dígitos decimais do ano. Se o resultado for um único dígito, ele é prefixado por 0. O comando modificado `%Oy` escreve a representação alternativa do locale. O comando modificado `%Ey` escreve a representação alternativa do locale do deslocamento de `%EC` (apenas ano).
`%Y`
`%EY` | Escreve o ano como um número decimal. Se o resultado tiver menos de quatro dígitos, ele é preenchido à esquerda com 0 para quatro dígitos. O comando modificado `%EY` escreve a representação alternativa completa do ano do locale.
Mês
`%b`
`%h` | Escreve o nome abreviado do mês do locale.
---|---
`%B` | Escreve o nome completo do mês do locale.
`%m`
`%Om` | Escreve o mês como um número decimal (Janeiro é `01`). Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%Om` escreve a representação alternativa do locale.
Dia
`%d`
`%Od` | Escreve o dia do mês como um número decimal. Se o resultado for um único dígito decimal, ele é prefixado com 0. O comando modificado `%Od` escreve a representação alternativa do locale.
`%e`
`%Oe` | Escreve o dia do mês como um número decimal. Se o resultado for um único dígito decimal, ele é prefixado com um espaço. O comando modificado `%Oe` escreve a representação alternativa do locale.
Dia da semana
`%a` | Escreve o nome abreviado do dia da semana do locale.
---|---
`%A` | Escreve o nome completo do dia da semana do locale.
`%u`
`%Ou` | Escreve o dia da semana ISO como um número decimal (1-7), onde Segunda-feira é `1`. O comando modificado `%Ou` escreve a representação alternativa do locale.
`%w`
`%Ow` | Escreve o dia da semana como um número decimal (0-6), onde Domingo é `0`. O comando modificado `%Ow` escreve a representação alternativa do locale.
Ano baseado em semana ISO 8601
No ISO 8601, as semanas começam na Segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

*   Inclui 4 de Janeiro
*   Inclui a primeira Quinta-feira do ano

`%g` | Escreve os dois últimos dígitos decimais do ano baseado em semana ISO 8601. Se o resultado for um único dígito, ele é prefixado por 0.
---|---
`%G` | Escreve o ano baseado em semana ISO 8601 como um número decimal. Se o resultado tiver menos de quatro dígitos, ele é preenchido à esquerda com 0 para quatro dígitos.
`%V`
`%OV` | Escreve a semana ISO 8601 do ano como um número decimal. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OV` escreve a representação alternativa do locale.
Semana/dia do ano
`%j` | Escreve o dia do ano como um número decimal (1º de Janeiro é `001`). Se o resultado tiver menos de três dígitos, ele é preenchido à esquerda com 0 para três dígitos.
`%U`
`%OU` | Escreve o número da semana do ano como um número decimal. O primeiro Domingo do ano é o primeiro dia da semana 01. Os dias do mesmo ano anteriores a isso estão na semana 00. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OU` escreve a representação alternativa do locale.
`%W`
`%OW` | Escreve o número da semana do ano como um número decimal. A primeira Segunda-feira do ano é o primeiro dia da semana 01. Os dias do mesmo ano anteriores a isso estão na semana 00. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OW` escreve a representação alternativa do locale.
Data
`%D` | Equivalente a `"%m/%d/%y"`.
---|---
`%F` | Equivalente a `"%Y-%m-%d"`.
`%x`
`%Ex` | Escreve a representação de data do locale. O comando modificado `%Ex` produz a representação de data alternativa do locale.
Hora do dia
`%H`
`%OH` | Escreve a hora (relógio de 24 horas) como um número decimal. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OH` escreve a representação alternativa do locale.
`%I`
`%OI` | Escreve a hora (relógio de 12 horas) como um número decimal. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OI` escreve a representação alternativa do locale.
`%M`
`%OM` | Escreve o minuto como um número decimal. Se o resultado for um único dígito, ele é prefixado com 0. O comando modificado `%OM` escreve a representação alternativa do locale.
`%S`
`%OS` | Escreve o segundo como um número decimal. Se o número de segundos for menor que 10, o resultado é prefixado com 0. Se a precisão da entrada não puder ser representada exatamente com segundos, então o formato é um número decimal de ponto flutuante com um formato fixo e uma precisão que corresponde à precisão da entrada (ou a uma precisão de microssegundos se a conversão para segundos decimais de ponto flutuante não puder ser feita dentro de 18 dígitos fracionários). O caractere para o ponto decimal é localizado de acordo com o locale. O comando modificado `%OS` escreve a representação alternativa do locale.
---|---
`%p` | Escreve o equivalente do locale para as designações AM/PM associadas a um relógio de 12 horas.
`%R` | Equivalente a `"%H:%M"`.
`%T` | Equivalente a `"%H:%M:%S"`.
`%r` | Escreve a hora do relógio de 12 horas do locale.
`%X`
`%EX` | Escreve a representação de hora do locale. O comando modificado `%EX` escreve a representação de hora alternativa do locale.

Fuso horário
`%z`
`%Ez`
`%Oz` | Escreve o deslocamento do UTC no formato ISO 8601. Por exemplo, `-0430` refere-se a 4 horas e 30 minutos atrás do UTC. Se o deslocamento for zero, `+0000` é usado. Os comandos modificados `%Ez` e `%Oz` inserem um `:` entre as horas e os minutos (por exemplo, `-04:30`).
---|---
`%Z` | Escreve a abreviação do fuso horário.
Diversos
`%c`
`%Ec` | Escreve a representação de data e hora do locale. O comando modificado `%Ec` escreve a representação alternativa de data e hora do locale.

Os seguintes especificadores são reconhecidos, mas farão com que [std::format_error](<#/doc/utility/format/format_error>) seja lançada:

Especificador de
conversão | Explicação
Contagem de duração
`%Q` | Escreve a contagem de ticks da duração, ou seja, o valor obtido via [`count()`](<#/doc/chrono/duration/count>).
---|---
`%q` | Escreve o sufixo da unidade da duração, conforme especificado em [`operator<<()`](<#/doc/chrono/duration/operator_ltlt>).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <format>
    #include <iostream>
    
    int main()
    {
        std::chrono::time_point<std::chrono::utc_clock> epoch;
    
        std::cout << std::format("The time of the Unix epoch was {0:%F}T{0:%R%z}.", epoch)
                  << '\n';
    }
```

Saída:
```
    The time of the Unix epoch was 1970-01-01T00:00+0000.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | `formatter` usava o locale global ou o locale passado | o locale "C" padrão é usado quando `L` está ausente

### Ver também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)