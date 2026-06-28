# std::chrono::parse

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Parsable >
/* unspecified */ parse( const CharT* fmt, Parsable& tp );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const std::basic_string<CharT, Traits, Alloc>& fmt,
Parsable& tp );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const CharT* fmt, Parsable& tp,
std::basic_string<CharT, Traits, Alloc>& abbrev );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const std::basic_string<CharT, Traits, Alloc>& fmt,
Parsable& tp,
std::basic_string<CharT, Traits, Alloc>& abbrev );
template< class CharT, class Parsable >
/* unspecified */ parse( const CharT* fmt, Parsable& tp,
std::chrono::minutes& offset );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const std::basic_string<CharT, Traits, Alloc>& fmt,
Parsable& tp, std::chrono::minutes& offset );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const CharT* fmt, Parsable& tp,
std::basic_string<CharT, Traits, Alloc>& abbrev,
std::chrono::minutes& offset );
template< class CharT, class Traits, class Alloc, class Parsable >
/* unspecified */ parse( const std::basic_string<CharT, Traits, Alloc>& fmt,
Parsable& tp,
std::basic_string<CharT, Traits, Alloc>& abbrev,
std::chrono::minutes& offset );
```

Retorna um objeto `manip` de tipo não especificado tal que, dado um objeto [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits> `is`, a expressão `is >> manip` chama `from_stream` (não qualificado, para habilitar a [pesquisa dependente de argumento](<#/doc/language/adl>)) da seguinte forma:

1) from_stream(is, fmt, tp)

2) from_stream(is, fmt.c_str(), tp)

3) from_stream(is, fmt, tp, [std::addressof](<#/doc/memory/addressof>)(abbrev))

4) from_stream(is, fmt.c_str(), tp, [std::addressof](<#/doc/memory/addressof>)(abbrev))

5) from_stream(is, fmt, tp,
static_cast<[std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Alloc>*>(nullptr), &offset)

6) from_stream(is, fmt.c_str(), tp,
static_cast<[std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Alloc>*>(nullptr), &offset)

7) from_stream(is, fmt, tp, [std::addressof](<#/doc/memory/addressof>)(abbrev), &offset)

8) from_stream(is, fmt.c_str(), tp, [std::addressof](<#/doc/memory/addressof>)(abbrev), &offset).

A expressão `is >> manip` é um lvalue do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits> com o valor `is`.

Essas sobrecargas participam da resolução de sobrecarga apenas se a expressão `from_stream` correspondente for bem-formada.

Recomenda-se que as implementações dificultem o uso de referências potencialmente pendentes para a string de formato, por exemplo, tornando os tipos de retorno não-movíveis e impedindo que `operator>>` aceite lvalues de tipos de retorno.

### Parâmetros

- **fmt** — uma string de formato (veja abaixo)
- **tp** — objeto para armazenar o resultado da análise
- **abbrev** — string para armazenar a abreviação ou nome do fuso horário correspondente ao especificador `%Z`
- **offset** — duração para representar o deslocamento UTC correspondente ao especificador `%z`

### String de formato

A string de formato consiste em zero ou mais especificadores de conversão e caracteres comuns. Cada caractere comum, excluindo caracteres de espaço em branco e o caractere nulo terminador, corresponde a um caractere idêntico do stream de entrada, ou faz com que a função falhe se o próximo caractere no stream não for igual.

Cada caractere de espaço em branco corresponde a zero ou mais caracteres de espaço em branco no stream de entrada.

Cada especificador de conversão não modificado começa com um caractere `%` seguido por um caractere que determina o comportamento do especificador. Alguns especificadores de conversão possuem uma forma modificada na qual um caractere modificador `E` ou `O` é inserido após o caractere `%`. Alguns especificadores de conversão possuem uma forma modificada na qual um parâmetro de largura dado como um inteiro decimal positivo (mostrado como _`N`_ abaixo) é inserido após o caractere `%`. Cada especificador de conversão faz com que os caracteres correspondentes sejam interpretados como partes de tipos de data e hora de acordo com a tabela abaixo.

Uma sequência de caracteres na string de formato que começa com um `%` mas não corresponde a um dos especificadores de conversão abaixo é interpretada como caracteres comuns.

Se `from_stream` falhar ao analisar tudo o que foi especificado pela string de formato, ou se informações insuficientes forem analisadas para especificar um resultado completo, ou se a análise revelar informações contraditórias, `is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` é chamado.

Os seguintes especificadores de conversão estão disponíveis:

Especificador de
conversão | Explicação
---|---
`%%` | Corresponde a um caractere literal `%`.
`%n` | Corresponde a um caractere de espaço em branco.
`%t` | Corresponde a zero ou um caractere de espaço em branco.
Ano
`%C`
`%_N_ C`
`%EC` | Analisa o século como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%EC` interpreta a representação alternativa do século da locale.
`%y`
`%_N_ y`
`%Ey`
`%Oy` | Analisa os dois últimos dígitos decimais do ano. Se o século não for especificado de outra forma (por exemplo, com %C), valores no intervalo [69, 99] são presumidos como referentes aos anos de 1969 a 1999, e valores no intervalo [00, 68] são presumidos como referentes aos anos de 2000 a 2068. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. Os comandos modificados `%Ey` e `%Oy` interpretam a representação alternativa da locale.
`%Y`
`%_N_ Y`
`%EY` | Analisa o ano como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 4. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%EY` interpreta a representação alternativa da locale.
Mês
`%b`
`%B`
`%h` | Analisa o nome do mês completo ou abreviado, sem distinção de maiúsculas e minúsculas, da locale.
`%m`
`%_N_ m`
`%Om` | Analisa o mês como um número decimal (Janeiro é `1`). A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%Om` interpreta a representação alternativa da locale.
Dia
`%d`
`%_N_ d`
`%Od`
`%e`
`%_N_ e`
`%Oe` | Analisa o dia do mês como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. Os comandos modificados `%Od` e `%Oe` interpretam a representação alternativa da locale.
Dia da semana
`%a`
`%A` | Analisa o nome do dia da semana completo ou abreviado, sem distinção de maiúsculas e minúsculas, da locale.
`%u`
`%_N_ u` | Analisa o dia da semana ISO como um número decimal (1-7), onde Segunda-feira é `1`. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 1. Zeros à esquerda são permitidos, mas não obrigatórios.
`%w`
`%_N_ w`
`%Ow` | Analisa o dia da semana como um número decimal (0-6), onde Domingo é `0`. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 1. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%Ow` interpreta a representação alternativa da locale.
Ano baseado em semana ISO 8601
No ISO 8601, as semanas começam na Segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de Janeiro
  * Inclui a primeira Quinta-feira do ano

`%g`
`%_N_ g` | Analisa os dois últimos dígitos decimais do ano baseado em semana ISO 8601. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios.
`%G`
`%_N_ G` | Analisa o ano baseado em semana ISO 8601 como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 4. Zeros à esquerda são permitidos, mas não obrigatórios.
`%V`
`%_N_ V` | Analisa a semana ISO 8601 do ano como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios.
Semana/dia do ano
`%j`
`%_N_ j` | Analisa o dia do ano como um número decimal (1 de Janeiro é `1`). A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 3. Zeros à esquerda são permitidos, mas não obrigatórios.
`%U`
`%_N_ U`
`%OU` | Analisa o número da semana do ano como um número decimal. O primeiro Domingo do ano é o primeiro dia da semana 01. Dias do mesmo ano anteriores a isso estão na semana 00. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OU` interpreta a representação alternativa da locale.
`%W`
`%_N_ W`
`%OW` | Analisa o número da semana do ano como um número decimal. A primeira Segunda-feira do ano é o primeiro dia da semana 01. Dias do mesmo ano anteriores a isso estão na semana 00. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OW` interpreta a representação alternativa da locale.
Data
`%D` | Equivalente a `"%m/%d/%y"`.
`%F`
`%_N_ F` | Equivalente a `"%Y-%m-%d"`. Se a largura for especificada, ela é aplicada apenas ao `%Y`.
`%x`
`%Ex` | Analisa a representação de data da locale. O comando modificado `%Ex` interpreta a representação de data alternativa da locale.
Hora do dia
`%H`
`%_N_ H`
`%OH` | Analisa a hora (relógio de 24 horas) como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OH` interpreta a representação alternativa da locale.
`%I`
`%_N_ I`
`%OI` | Analisa a hora (relógio de 12 horas) como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OI` interpreta a representação alternativa da locale.
`%M`
`%_N_ M`
`%OM` | Analisa o minuto como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OM` interpreta a representação alternativa da locale.
`%S`
`%_N_ S`
`%OS` | Analisa o segundo como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OS` interpreta a representação alternativa da locale.
---|---
`%p` | Analisa o equivalente da locale para as designações AM/PM associadas a um relógio de 12 horas.
`%R` | Equivalente a `"%H:%M"`.
`%T` | Equivalente a `"%H:%M:%S"`.
`%r` | Analisa a hora do relógio de 12 horas da locale.
`%X`
`%EX` | Analisa a representação de hora da locale. O comando modificado `%EX` interpreta a representação de hora alternativa da locale.
Diversos
`%c`
`%Ec` | Analisa a representação de data e hora da locale. O comando modificado `%Ec` interpreta a representação alternativa de data e hora da locale.
`%z`
`%Ez`
`%Oz` | Analisa o deslocamento UTC no formato `[+|-]hh[mm]`. Por exemplo, `-0430` refere-se a 4 horas e 30 minutos atrás do UTC e `04` refere-se a 4 horas à frente do UTC. Os comandos modificados `%Ez` e `%Oz` analisam o formato `[+|-]h[h][:mm]` (ou seja, exigindo um `:` entre as horas e os minutos e tornando o zero à esquerda para a hora opcional).
`%Z` | Analisa a abreviação ou nome do fuso horário, considerado como a sequência mais longa de caracteres que contém apenas os caracteres `A` a `Z`, `a` a `z`, `0` a `9`, `-`, `+`, `_`, e `/`.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3554](<https://cplusplus.github.io/LWG/issue3554>) | C++20 | sobrecargas para sequências de caracteres simples terminadas em nulo estavam faltando | adicionado

### Ver também

[ from_stream(std::chrono::sys_time)](<#/doc/chrono/system_clock/from_stream>)(C++20) | analisa um `sys_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream(std::chrono::utc_time)](<#/doc/chrono/utc_clock/from_stream>)(C++20) | analisa um `utc_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream(std::chrono::tai_time)](<#/doc/chrono/tai_clock/from_stream>)(C++20) | analisa um `tai_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream(std::chrono::gps_time)](<#/doc/chrono/gps_clock/from_stream>)(C++20) | analisa um `gps_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream(std::chrono::file_time)](<#/doc/chrono/file_clock/from_stream>)(C++20) | analisa um `file_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream(std::chrono::local_time)](<#/doc/chrono/local_t/from_stream>)(C++20) | analisa um `local_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year/from_stream>)(C++20) | analisa um `year` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/month/from_stream>)(C++20) | analisa um `month` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/day/from_stream>)(C++20) | analisa um `day` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/weekday/from_stream>)(C++20) | analisa um `weekday` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/month_day/from_stream>)(C++20) | analisa um `month_day` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year_month/from_stream>)(C++20) | analisa um `year_month` de um stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year_month_day/from_stream>)(C++20) | analisa um `year_month_day` de um stream de acordo com o formato fornecido
(modelo de função)
[ get_time](<#/doc/io/manip/get_time>)(C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)