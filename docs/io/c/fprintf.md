# std::printf, std::fprintf, std::sprintf, std::snprintf

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int printf( const char* format, ... );
int fprintf( std::FILE* stream, const char* format, ... );
int sprintf( char* buffer, const char* format, ... );
int snprintf( char* buffer, std::size_t buf_size, const char* format, ... );
```

Carrega os dados dos locais fornecidos, converte-os em equivalentes de string de caracteres e escreve os resultados em uma variedade de destinos.

1) Escreve os resultados para [stdout](<#/doc/io/c/std_streams>).

2) Escreve os resultados para um stream de arquivo `stream`.

3) Escreve os resultados para um buffer de string de caracteres.

4) Escreve os resultados para um buffer de string de caracteres. No máximo `buf_size - 1` caracteres são escritos. A string de caracteres resultante será terminada com um caractere nulo, a menos que `buf_size` seja zero. Se `buf_size` for zero, nada é escrito e `buffer` pode ser um ponteiro nulo, no entanto, o valor de retorno (número de bytes que seriam escritos, não incluindo o terminador nulo) ainda é calculado e retornado.

Se uma chamada para `sprintf` ou `snprintf` causar cópia entre objetos que se sobrepõem, o comportamento é indefinido (por exemplo, sprintf(buf, "%s text", buf);).

### Parâmetros

- **stream** — stream de arquivo de saída para escrever
- **buffer** — ponteiro para uma string de caracteres para escrever
- **buf_size** — até `buf_size - 1` caracteres podem ser escritos, mais o terminador nulo
- **format** — ponteiro para uma string multibyte terminada em nulo especificando como interpretar os dados
- **...** — argumentos especificando os dados a serem impressos. Se qualquer argumento após as [promoções de argumento padrão](<#/doc/language/variadic_arguments>) não for do tipo esperado pela especificação de conversão correspondente (o tipo esperado é o tipo promovido ou um tipo compatível com o tipo promovido), ou se houver menos argumentos do que o exigido pelo formato, o comportamento é indefinido. Se houver mais argumentos do que o exigido pelo formato, os argumentos extras são avaliados e ignorados.

A string de **formato** consiste em caracteres de byte comuns (exceto `%`), que são copiados inalterados para o stream de saída, e especificações de conversão. Cada especificação de conversão tem o seguinte formato:

* caractere `%` introdutório.

* (opcional) uma ou mais flags que modificam o comportamento da conversão:

  * `-`: o resultado da conversão é justificado à esquerda dentro do campo (por padrão, é justificado à direita).
  * `+`: o sinal de conversões com sinal é sempre prefixado ao resultado da conversão (por padrão, o resultado é precedido por um sinal de menos apenas quando é negativo).
  * _espaço_ : se o resultado de uma conversão com sinal não começar com um caractere de sinal, ou for vazio, um espaço é prefixado ao resultado. É ignorado se a flag `+` estiver presente.
  * `#`: _forma alternativa_ da conversão é realizada. Veja a tabela abaixo para os efeitos exatos, caso contrário, o comportamento é indefinido.
  * `0`: para conversões de números inteiros e de ponto flutuante, zeros à esquerda são usados para preencher o campo em vez de caracteres de _espaço_. Para números inteiros, é ignorado se a precisão for explicitamente especificada. Para outras conversões, o uso desta flag resulta em comportamento indefinido. É ignorado se a flag `-` estiver presente.

* (opcional) valor inteiro ou `*` que especifica a largura mínima do campo. O resultado é preenchido com caracteres de _espaço_ (por padrão), se necessário, à esquerda quando justificado à direita, ou à direita se justificado à esquerda. No caso em que `*` é usado, a largura é especificada por um argumento adicional do tipo int, que aparece antes do argumento a ser convertido e do argumento que fornece a precisão, se houver. Se o valor do argumento for negativo, resulta na flag `-` especificada e largura de campo positiva (Nota: Esta é a largura mínima: O valor nunca é truncado).

* (opcional) `.` seguido por um número inteiro ou `*`, ou nenhum deles, que especifica a _precisão_ da conversão. No caso em que `*` é usado, a _precisão_ é especificada por um argumento adicional do tipo int, que aparece antes do argumento a ser convertido, mas depois do argumento que fornece a largura mínima do campo, se houver. Se o valor deste argumento for negativo, ele é ignorado. Se nem um número nem `*` for usado, a precisão é considerada zero. Veja a tabela abaixo para os efeitos exatos da _precisão_.

* (opcional) _modificador de comprimento_ que especifica o tamanho do argumento (em combinação com o especificador de formato de conversão, ele especifica o tipo do argumento correspondente).

* especificador de formato de conversão.

Os seguintes especificadores de formato estão disponíveis:

Especificador de
Conversão | Explicação | Tipo de Argumento
Esperado
**Modificador de
Comprimento****→** | `hh` (C++11) | `h` | (nenhum) | `l` | `ll` (C++11) | `j` (C++11) | `z` (C++11) | `t` (C++11) | `L`
---|---|---|---|---|---|---|---|---|---|---
`%` | Escreve o literal `%`. A especificação de conversão completa deve ser `%%`. | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A
`c` | Escreve um **único caractere**. O argumento é primeiro convertido para unsigned char. Se o modificador **l** for usado, o argumento é primeiro convertido para uma string de caracteres como se fosse por **%ls** com um argumento wchar_t[2]. | N/A | N/A | int | wint_t | N/A | N/A | N/A | N/A | N/A
`s` | Escreve uma **string de caracteres**. O argumento deve ser um ponteiro para o elemento inicial de um array de caracteres. A _precisão_ especifica o número máximo de bytes a serem escritos. Se a _precisão_ não for especificada, escreve cada byte até, mas não incluindo, o primeiro terminador nulo. Se o especificador **l** for usado, o argumento deve ser um ponteiro para o elemento inicial de um array de wchar_t, que é convertido para um array de char como se fosse por uma chamada para wcrtomb com estado de conversão inicializado com zero. | N/A | N/A | char* | wchar_t* | N/A | N/A | N/A | N/A | N/A
`d`
`i` | Converte um **inteiro com sinal** em representação decimal _[-]dddd_. A _precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. | signed char | short | int | long | long long | intmax_t | signed size_t | ptrdiff_t | N/A
---|---|---|---|---|---|---|---|---|---|---
`o` | Converte um **inteiro sem sinal** em representação octal _oooo_. A _precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. Na _implementação alternativa_, a precisão é aumentada, se necessário, para escrever um zero à esquerda. Nesse caso, se tanto o valor convertido quanto a precisão forem ​0​, um único ​0​ é escrito. | unsigned char | unsigned short | unsigned int | unsigned long | unsigned long long | uintmax_t | size_t | unsigned version of ptrdiff_t | N/A
`x`
`X` | Converte um **inteiro sem sinal** em representação hexadecimal _hhhh_. Para a conversão `x`, as letras `abcdef` são usadas. Para a conversão `X`, as letras `ABCDEF` são usadas. A _precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. Na _implementação alternativa_, `0x` ou `0X` é prefixado aos resultados se o valor convertido for diferente de zero. | N/A
---|---|---
`u` | Converte um **inteiro sem sinal** em representação decimal _dddd_. A _precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. | N/A
`f`
`F` | Converte um **número de ponto flutuante** para a notação decimal no estilo _[-]ddd.ddd_. A _precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto decimal. A precisão padrão é 6. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | double | double(C++11) | N/A | N/A | N/A | N/A | long double
`e`
`E` | Converte um **número de ponto flutuante** para a notação de expoente decimal. Para o estilo de conversão `e`, _[-]d.ddd_ ﻿`e` _±dd_ é usado. Para o estilo de conversão `E`, _[-]d.ddd_ ﻿`E` _±dd_ é usado. O expoente contém pelo menos dois dígitos; mais dígitos são usados apenas se necessário. Se o valor for ​0​, o expoente também é ​0​. A _precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto decimal. A precisão padrão é 6. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`a`
`A` (C++11) | Converte um **número de ponto flutuante** para a notação de expoente hexadecimal. Para o estilo de conversão `a`, _[-]_ ﻿`0x` _h.hhh_ ﻿`p` _±d_ é usado. Para o estilo de conversão `A`, _[-]_ ﻿`0X` _h.hhh_ ﻿`P` _±d_ é usado. O primeiro dígito hexadecimal não é `0` se o argumento for um valor de ponto flutuante normalizado. Se o valor for ​0​, o expoente também é ​0​. A _precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto hexadecimal. A precisão padrão é suficiente para a representação exata do valor. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`g`
`G` | Converte um **número de ponto flutuante** para notação decimal ou de expoente decimal dependendo do valor e da _precisão_. Para o estilo de conversão `g`, será realizada uma conversão com estilo `e` ou `f`. Para o estilo de conversão `G`, será realizada uma conversão com estilo `E` ou `F`. Seja `P` igual à precisão se não for zero, 6 se a precisão não for especificada, ou 1 se a precisão for ​0​. Então, se uma conversão com estilo `E` teria um expoente de `X`:
  * se _P > X ≥ −4_, a conversão é com estilo `f` ou `F` e precisão _P − 1 − X_.
  * caso contrário, a conversão é com estilo `e` ou `E` e precisão _P − 1_.
A menos que uma _representação alternativa_ seja solicitada, os zeros à direita são removidos, e o caractere de ponto decimal também é removido se nenhuma parte fracionária for deixada. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`n` | Retorna o **número de caracteres escritos** até agora por esta chamada à função. O resultado é _escrito_ no valor apontado pelo argumento. A especificação não pode conter nenhuma _flag_, _largura de campo_ ou _precisão_. | signed char* | short* | int* | long* | long long* | intmax_t* | signed size_t* | ptrdiff_t* | N/A
`p` | Escreve uma sequência de caracteres definida pela implementação que define um **ponteiro**. | N/A | N/A | void* | N/A | N/A | N/A | N/A | N/A

As funções de conversão de ponto flutuante convertem infinito para `inf` ou `infinity`. Qual delas é usada é definida pela implementação.

Não-é-um-número é convertido para `nan` ou `nan(_char_sequence_)`. Qual delas é usada é definida pela implementação.

As conversões `F`, `E`, `G`, `A` produzem `INF`, `INFINITY`, `NAN` em vez disso.

O especificador de conversão usado para imprimir char, unsigned char, signed char, short e unsigned short espera tipos promovidos das [promoções de argumento padrão](<#/doc/language/variadic_arguments>), mas antes de imprimir seu valor será convertido para char, unsigned char, signed char, short e unsigned short. É seguro passar valores desses tipos devido à promoção que ocorre quando uma função variádica é chamada.

As especificações de conversão corretas para os tipos de caracteres de largura fixa (int8_t, etc) são definidas no cabeçalho [`<cinttypes>`](<#/doc/header/cinttypes>) (embora [PRIdMAX](<#/doc/types/integer>), [PRIuMAX](<#/doc/types/integer>), etc sejam sinônimos de `%jd`, `%ju`, etc).

O especificador de conversão de escrita de memória `%n` é um alvo comum de exploits de segurança onde as strings de formato dependem da entrada do usuário e não é suportado pela família de funções `printf_s` com verificação de limites.

Existe um [ponto de sequência](<#/doc/language/eval_order>) após a ação de cada especificador de conversão; isso permite armazenar múltiplos resultados de `%n` na mesma variável ou, como um caso limite, imprimir uma string modificada por um `%n` anterior dentro da mesma chamada.

Se uma especificação de conversão for inválida, o comportamento é indefinido.

### Valor de retorno

1,2) Número de caracteres escritos se bem-sucedido ou um valor negativo se ocorreu um erro.

3) Número de caracteres escritos se bem-sucedido (não incluindo o caractere nulo terminador) ou um valor negativo se ocorreu um erro.

4) Número de caracteres que teriam sido escritos para um buffer suficientemente grande se bem-sucedido (não incluindo o caractere nulo terminador), ou um valor negativo se ocorreu um erro. Assim, a saída (terminada em nulo) foi completamente escrita se e somente se o valor retornado for não negativo e menor que `buf_size`.

### Notas

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fprintf.html>) que [errno](<#/doc/error/errno>) é definido em caso de erro. Ele também especifica especificações de conversão adicionais, mais notavelmente o suporte para reordenação de argumentos (`n$` imediatamente após `%` indica o `n`-ésimo argumento).

Chamar `std::snprintf` com `buf_size` zero e ponteiro nulo para `buffer` é útil (quando a sobrecarga de uma chamada dupla é aceitável) para determinar o tamanho de buffer necessário para conter a saída:
```cpp
    auto fmt = "sqrt(2) = %f";
    int sz = std::snprintf(nullptr, 0, fmt, std::sqrt(2));
    std::vector<char> buf(sz + 1); // nota +1 para o terminador nulo
    std::sprintf(buf.data(), fmt, std::sqrt(2)); // certamente caberá
```

### Exemplo

Execute este código
```cpp
    #include <cinttypes>
    #include <cstdint>
    #include <cstdio>
    #include <limits>
    
    int main()
    {
        const char* s = "Hello";
        std::printf("Strings:\n"); // same as std::puts("Strings:");
        std::printf("\t[%10s]\n", s);
        std::printf("\t[%-10s]\n", s);
        std::printf("\t[%*s]\n", 10, s);
        std::printf("\t[%-10.*s]\n", 4, s);
        std::printf("\t[%-*.*s]\n", 10, 4, s);
    
        std::printf("Characters:\t%c %%\n", 'A');
    
        std::printf("Integers:\n");
        std::printf("\tDecimal:    \t%i %d %.6i %i %.0i %+i %i\n",
                                      1, 2,   3, 0,   0,  4,-4);
        std::printf("\tHexadecimal:\t%x %x %X %#x\n",
                                      5,10,10,  6);
        std::printf("\tOctal:      \t%o %#o %#o\n",
                                     10, 10,  4);
    
        std::printf("Floating point:\n");
        std::printf("\tRounding:\t%f %.0f %.32f\n", 1.5, 1.5, 1.3);
        std::printf("\tPadding:\t%05.2f %.2f %5.2f\n", 1.5, 1.5, 1.5);
        std::printf("\tScientific:\t%E %e\n", 1.5, 1.5);
        std::printf("\tHexadecimal:\t%a %A\n", 1.5, 1.5);
        std::printf("\tSpecial values:\t0/0=%g 1/0=%g\n", 0.0/0.0, 1.0/0.0);
    
        std::printf("Variable width control:\n");
        std::printf("\tright-justified variable width: '%*c'\n", 5, 'x');
        int r = std::printf("\tleft-justified variable width : '%*c'\n", -5, 'x');
        std::printf("(the last printf printed %d characters)\n", r);
    
        std::printf("Fixed-width types:\n");
        std::uint32_t val = std::numeric_limits<std::uint32_t>::max();
        std::printf("\tLargest 32-bit value is %" PRIu32 " or %#"PRIx32 "\n",
                                                     val,            val);
    }
```

Saída possível:
```
    Strings:
    	[     Hello]
    	[Hello     ]
    	[     Hello]
    	[Hell      ]
    	[Hell      ]
    Characters:	A %
    Integers:
    	Decimal:    	1 2 000003 0  +4 -4
    	Hexadecimal:	5 a A 0x6
    	Octal:      	12 012 04
    Floating point:
    	Rounding:	1.500000 2 1.30000000000000004440892098500626
    	Padding:	01.50 1.50  1.50
    	Scientific:	1.500000E+00 1.500000e+00
    	Hexadecimal:	0x1.8p+0 0X1.8P+0
    	Special values:	0/0=-nan 1/0=inf
    Variable width control:
    	right-justified variable width: '    x'
    	left-justified variable width : 'x    '
    (the last printf printed 41 characters)
    Fixed-width types:
    	Largest 32-bit value is 4294967295 or 0xffffffff
```

### Veja também

[ wprintffwprintfswprintf](<#/doc/io/c/fwprintf>) | imprime saída formatada de caracteres largos para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vprintfvfprintfvsprintfvsnprintf](<#/doc/io/c/vfprintf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
usando lista de argumentos variáveis
(função)
[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres para um stream de arquivo
(função)
[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(função)
[ print](<#/doc/io/print>)(C++23) | imprime para [stdout](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(modelo de função)
[C documentation](<#/>) para printf, fprintf, sprintf, snprintf