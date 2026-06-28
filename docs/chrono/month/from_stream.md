# std::chrono::from_stream (std::chrono::month)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits, class Alloc = std::allocator<CharT> >
std::basic_istream<CharT, Traits>&
from_stream( std::basic_istream<CharT, Traits>& is, const CharT* fmt,
std::chrono::month& m,
std::basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
std::chrono::minutes* offset = nullptr );
```

Tenta analisar a stream de entrada `is` no `std::chrono::month m` de acordo com a string de formato `fmt`.

Comporta-se como uma [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que tem um efeito não especificado em `is.gcount()`. Após construir e verificar o objeto sentinela, tenta analisar a stream de entrada `is` em `m` de acordo com a string de formato `fmt`. Se a análise falhar em decodificar um `month` válido, `is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` é chamado e `m` não é modificado.

Se o especificador de formato `%Z` for usado e analisado com sucesso, o valor analisado é atribuído a `*abbrev` se `abbrev` não for `nullptr`. Se o especificador de formato `%z` ou uma variante modificada for usado e analisado com sucesso, o valor analisado é atribuído a `*offset` se `offset` não for `nullptr`.

### Parâmetros

- **is** — uma stream de entrada
- **fmt** — uma string de formato (veja abaixo)
- **m** — objeto para armazenar o resultado da análise
- **abbrev** — se não for `nullptr`, ponteiro para um objeto que armazenará a abreviação ou nome do fuso horário correspondente ao especificador `%Z`
- **offset** — se não for `nullptr`, ponteiro para um objeto que armazenará o deslocamento do UTC correspondente ao especificador `%z`

### String de formato

A string de formato consiste em zero ou mais especificadores de conversão e caracteres comuns. Cada caractere comum, excluindo caracteres de espaço em branco e o caractere nulo terminador, corresponde a um caractere idêntico da stream de entrada, ou faz com que a função falhe se o próximo caractere na stream não for igual.

Cada caractere de espaço em branco corresponde a zero ou mais caracteres de espaço em branco na stream de entrada.

Cada especificador de conversão não modificado começa com um caractere `%` seguido por um caractere que determina o comportamento do especificador. Alguns especificadores de conversão têm uma forma modificada na qual um caractere modificador `E` ou `O` é inserido após o caractere `%`. Alguns especificadores de conversão têm uma forma modificada na qual um parâmetro de largura dado como um inteiro decimal positivo (mostrado como _`N`_ abaixo) é inserido após o caractere `%`. Cada especificador de conversão faz com que os caracteres correspondentes sejam interpretados como partes de tipos de data e hora de acordo com a tabela abaixo.

Uma sequência de caracteres na string de formato que começa com um `%` mas não corresponde a um dos especificadores de conversão abaixo é interpretada como caracteres comuns.

Se `from_stream` falhar em analisar tudo o que foi especificado pela string de formato, ou se informações insuficientes forem analisadas para especificar um resultado completo, ou se a análise revelar informações contraditórias, `is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` é chamado.

Os seguintes especificadores de conversão estão disponíveis:

Especificador de conversão
| Explicação
---|---
`%%` | Corresponde a um caractere literal `%`.
`%n` | Corresponde a um caractere de espaço em branco.
`%t` | Corresponde a zero ou um caractere de espaço em branco.
Ano
`%C`
`%_N_ C`
`%EC` | Analisa o século como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%EC` interpreta a representação alternativa do século do `locale`.
`%y`
`%_N_ y`
`%Ey`
`%Oy` | Analisa os dois últimos dígitos decimais do ano. Se o século não for especificado de outra forma (por exemplo, com %C), valores no intervalo [69, 99] são presumidos como referentes aos anos de 1969 a 1999, e valores no intervalo [00, 68] são presumidos como referentes aos anos de 2000 a 2068. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. Os comandos modificados `%Ey` e `%Oy` interpretam a representação alternativa do `locale`.
`%Y`
`%_N_ Y`
`%EY` | Analisa o ano como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 4. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%EY` interpreta a representação alternativa do `locale`.
Mês
`%b`
`%B`
`%h` | Analisa o nome completo ou abreviado do mês do `locale`, não sensível a maiúsculas/minúsculas.
`%m`
`%_N_ m`
`%Om` | Analisa o mês como um número decimal (Janeiro é `1`). A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%Om` interpreta a representação alternativa do `locale`.
Dia
`%d`
`%_N_ d`
`%Od`
`%e`
`%_N_ e`
`%Oe` | Analisa o dia do mês como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. Os comandos modificados `%Od` e `%Oe` interpretam a representação alternativa do `locale`.
Dia da semana
`%a`
`%A` | Analisa o nome completo ou abreviado do dia da semana do `locale`, não sensível a maiúsculas/minúsculas.
`%u`
`%_N_ u` | Analisa o dia da semana ISO como um número decimal (1-7), onde Segunda-feira é `1`. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 1. Zeros à esquerda são permitidos, mas não obrigatórios.
`%w`
`%_N_ w`
`%Ow` | Analisa o dia da semana como um número decimal (0-6), onde Domingo é `0`. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 1. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%Ow` interpreta a representação alternativa do `locale`.
Ano baseado em semana ISO 8601
No ISO 8601, as semanas começam na Segunda-feira e a primeira semana do ano deve satisfazer os seguintes requisitos:

  * Inclui 4 de Janeiro
  * Inclui a primeira Quinta-feira do ano

`%g`
`%_N_ g` | Analisa os dois últimos dígitos decimais do ano baseado em semana ISO 8601. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios.
`%G`
`%_N_ G` | Analisa o ano baseado em semana ISO 8601 como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 4. Zeros à esquerda são permitidos, mas não obrigatórios.
`%V`
`%_N_ V` | Analisa a semana do ano ISO 8601 como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios.
Semana/dia do ano
`%j`
`%_N_ j` | Analisa o dia do ano como um número decimal (1 de Janeiro é `1`). A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 3. Zeros à esquerda são permitidos, mas não obrigatórios.
`%U`
`%_N_ U`
`%OU` | Analisa o número da semana do ano como um número decimal. O primeiro Domingo do ano é o primeiro dia da semana 01. Dias do mesmo ano anteriores a isso estão na semana 00. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OU` interpreta a representação alternativa do `locale`.
`%W`
`%_N_ W`
`%OW` | Analisa o número da semana do ano como um número decimal. A primeira Segunda-feira do ano é o primeiro dia da semana 01. Dias do mesmo ano anteriores a isso estão na semana 00. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OW` interpreta a representação alternativa do `locale`.
Data
`%D` | Equivalente a `"%m/%d/%y"`.
`%F`
`%_N_ F` | Equivalente a `"%Y-%m-%d"`. Se a largura for especificada, ela é aplicada apenas ao `%Y`.
`%x`
`%Ex` | Analisa a representação de data do `locale`. O comando modificado `%Ex` interpreta a representação de data alternativa do `locale`.
Hora do dia
`%H`
`%_N_ H`
`%OH` | Analisa a hora (relógio de 24 horas) como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OH` interpreta a representação alternativa do `locale`.
`%I`
`%_N_ I`
`%OI` | Analisa a hora (relógio de 12 horas) como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OI` interpreta a representação alternativa do `locale`.
`%M`
`%_N_ M`
`%OM` | Analisa o minuto como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OM` interpreta a representação alternativa do `locale`.
`%S`
`%_N_ S`
`%OS` | Analisa o segundo como um número decimal. A largura _N_ especifica o número máximo de caracteres a serem lidos. A largura padrão é 2. Zeros à esquerda são permitidos, mas não obrigatórios. O comando modificado `%OS` interpreta a representação alternativa do `locale`.
---|---
`%p` | Analisa o equivalente do `locale` para as designações AM/PM associadas a um relógio de 12 horas.
`%R` | Equivalente a `"%H:%M"`.
`%T` | Equivalente a `"%H:%M:%S"`.
`%r` | Analisa a hora do relógio de 12 horas do `locale`.
`%X`
`%EX` | Analisa a representação de hora do `locale`. O comando modificado `%EX` interpreta a representação de hora alternativa do `locale`.
Diversos
`%c`
`%Ec` | Analisa a representação de data e hora do `locale`. O comando modificado `%Ec` interpreta a representação alternativa de data e hora do `locale`.
`%z`
`%Ez`
`%Oz` | Analisa o deslocamento do UTC no formato `[+|-]hh[mm]`. Por exemplo, `-0430` refere-se a 4 horas e 30 minutos atrás do UTC e `04` refere-se a 4 horas à frente do UTC. Os comandos modificados `%Ez` e `%Oz` analisam o formato `[+|-]h[h][:mm]` (ou seja, exigindo um `:` entre as horas e os minutos e tornando o zero à esquerda para a hora opcional).
`%Z` | Analisa a abreviação ou nome do fuso horário, considerado como a sequência mais longa de caracteres que contém apenas os caracteres `A` a `Z`, `a` a `z`, `0` a `9`, `-`, `+`, `_`, e `/`.

### Valor de retorno

`is`

### Veja também

[ parse](<#/doc/chrono/parse>)(desde C++20) | analisa um objeto `chrono` de uma stream
(modelo de função)