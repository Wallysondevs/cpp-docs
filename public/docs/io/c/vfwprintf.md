# std::vwprintf, std::vfwprintf, std::vswprintf

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int vwprintf( const wchar_t* format, va_list vlist );
int vfwprintf( std::FILE* stream, const wchar_t* format, va_list vlist );
int vswprintf( wchar_t* buffer, std::size_t buf_size, const wchar_t* format, va_list vlist );
```

Carrega os dados das localizações, definidas por `vlist`,, converte-os para equivalentes de wide string e escreve os resultados para uma variedade de destinos.

1) Escreve os resultados para [stdout](<#/doc/io/c/std_streams>).

2) Escreve os resultados para um stream de arquivo `stream`.

3) Escreve os resultados para uma wide string `buffer`. No máximo `size-1` wide characters são escritos, seguidos por um wide character nulo.

### Parâmetros

- **stream** — stream de saída wide para escrever
- **buffer** — ponteiro para uma wide string para escrever
- **buf_size** — número máximo de wide characters a serem escritos
- **format** — ponteiro para uma wide string terminada em nulo especificando como interpretar os dados
- **vlist** — [lista de argumentos variáveis](<#/doc/language/variadic_arguments>) contendo os dados a serem impressos.

A string de **formato** consiste em wide characters comuns (exceto `%`), que são copiados inalterados para o stream de saída, e especificações de conversão. Cada especificação de conversão tem o seguinte formato:

*   caractere `%` introdutório.

*   (opcional) uma ou mais flags que modificam o comportamento da conversão:

    *   `-`: o resultado da conversão é justificado à esquerda dentro do campo (por padrão, é justificado à direita).
    *   `+`: o sinal de conversões com sinal é sempre prefixado ao resultado da conversão (por padrão, o resultado é precedido por um sinal de menos apenas quando é negativo).
    *   _espaço_ : se o resultado de uma conversão com sinal não começar com um caractere de sinal, ou for vazio, um espaço é prefixado ao resultado. É ignorado se a flag `+` estiver presente.
    *   `#`: _forma alternativa_ da conversão é realizada. Veja a tabela abaixo para efeitos exatos, caso contrário o comportamento é indefinido.
    *   `0`: para conversões de números inteiros e de ponto flutuante, zeros à esquerda são usados para preencher o campo em vez de caracteres de _espaço_. Para números inteiros, é ignorado se a precisão for explicitamente especificada. Para outras conversões, o uso desta flag resulta em comportamento indefinido. É ignorado se a flag `-` estiver presente.

*   (opcional) valor inteiro ou `*` que especifica a largura mínima do campo. O resultado é preenchido com caracteres de _espaço_ (por padrão), se necessário, à esquerda quando justificado à direita, ou à direita se justificado à esquerda. No caso em que `*` é usado, a largura é especificada por um argumento adicional do tipo int, que aparece antes do argumento a ser convertido e do argumento que fornece a precisão, se houver. Se o valor do argumento for negativo, resulta na flag `-` especificada e largura de campo positiva (Nota: Esta é a largura mínima: O valor nunca é truncado.).

*   (opcional) `.` seguido por um número inteiro ou `*`, ou nenhum dos dois, que especifica a _precisão_ da conversão. No caso em que `*` é usado, a _precisão_ é especificada por um argumento adicional do tipo int, que aparece antes do argumento a ser convertido, mas depois do argumento que fornece a largura mínima do campo, se houver. Se o valor deste argumento for negativo, ele é ignorado. Se nem um número nem `*` for usado, a precisão é considerada zero. Veja a tabela abaixo para os efeitos exatos da _precisão_.

*   (opcional) _modificador de comprimento_ que especifica o tamanho do argumento (em combinação com o especificador de formato de conversão, ele especifica o tipo do argumento correspondente).

*   especificador de formato de conversão.

Os seguintes especificadores de formato estão disponíveis:

Conversão
Especificador | Explicação | Tipo de Argumento
Esperado
**Modificador de
Comprimento****→** | `hh` (C++11) | `h` | (nenhum) | `l` | `ll` (C++11) | `j` (C++11) | `z` (C++11) | `t` (C++11) | `L`
`%` | Escreve o literal `%`. A especificação de conversão completa deve ser `%%`. | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A
`c` |

    Escreve um **único caractere**.
O argumento é primeiro convertido para wchar_t como se por uma chamada a btowc. Se o modificador **l** for usado, o argumento wint_t é primeiro convertido para wchar_t. | N/A | N/A | int | wint_t | N/A | N/A | N/A | N/A | N/A
`s` |

    Escreve uma **string de caracteres**
O argumento deve ser um ponteiro para o elemento inicial de um array de caracteres contendo uma sequência de caracteres multibyte começando no estado de shift inicial, que é convertida para um array de wide characters como se por uma chamada a mbrtowc com estado de conversão inicializado com zero. A _Precisão_ especifica o número máximo de wide characters a serem escritos. Se a _Precisão_ não for especificada, escreve todos os wide characters até e não incluindo o primeiro terminador nulo. Se o especificador **l** for usado, o argumento deve ser um ponteiro para o elemento inicial de um array de wchar_t. | N/A | N/A | char* | wchar_t* | N/A | N/A | N/A | N/A | N/A
`d`
`i` |

    Converte um **inteiro com sinal** para representação decimal _[-]dddd_.
A _Precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1.
Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. | signed char | short | int | long | long long | intmax_t | signed size_t | ptrdiff_t | N/A
`o` |

    Converte um **inteiro sem sinal** para representação octal _oooo_.
A _Precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. Na _implementação alternativa_, a precisão é aumentada se necessário, para escrever um zero à esquerda. Nesse caso, se tanto o valor convertido quanto a precisão forem ​0​, um único ​0​ é escrito. | unsigned char | unsigned short | unsigned int | unsigned long | unsigned long long | uintmax_t | size_t | unsigned version of ptrdiff_t | N/A
`x`
`X` |

    Converte um **inteiro sem sinal** para representação hexadecimal _hhhh_.
Para a conversão `x`, as letras `abcdef` são usadas.
Para a conversão `X`, as letras `ABCDEF` são usadas.
A _Precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. Na _implementação alternativa_, `0x` ou `0X` é prefixado aos resultados se o valor convertido for diferente de zero. | N/A
---|---
`u` |

    Converte um **inteiro sem sinal** para representação decimal _dddd_.
A _Precisão_ especifica o número mínimo de dígitos a aparecer. A precisão padrão é 1. Se tanto o valor convertido quanto a precisão forem ​0​, a conversão resulta em nenhum caractere. | N/A
`f`
`F` |

    Converte um **número de ponto flutuante** para a notação decimal no estilo _[-]ddd.ddd_.
A _Precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto decimal. A precisão padrão é 6. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | double | double(C++11) | N/A | N/A | N/A | N/A | long double
`e`
`E` |

    Converte um **número de ponto flutuante** para a notação de expoente decimal.
Para o estilo de conversão `e`, _[-]d.ddd_ ﻿`e` _±dd_ é usado.
Para o estilo de conversão `E`, _[-]d.ddd_ ﻿`E` _±dd_ é usado.
O expoente contém pelo menos dois dígitos, mais dígitos são usados apenas se necessário. Se o valor for ​0​, o expoente também é ​0​. A _Precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto decimal. A precisão padrão é 6. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`a`
`A` (C++11) |

    Converte um **número de ponto flutuante** para a notação de expoente hexadecimal.
Para o estilo de conversão `a`, _[-]_ ﻿`0x` _h.hhh_ ﻿`p` _±d_ é usado.
Para o estilo de conversão `A`, _[-]_ ﻿`0X` _h.hhh_ ﻿`P` _±d_ é usado.
O primeiro dígito hexadecimal não é `0` se o argumento for um valor de ponto flutuante normalizado. Se o valor for ​0​, o expoente também é ​0​. A _Precisão_ especifica o número exato de dígitos a aparecer após o caractere de ponto hexadecimal. A precisão padrão é suficiente para a representação exata do valor. Na _implementação alternativa_, o caractere de ponto decimal é escrito mesmo que nenhum dígito o siga. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`g`
`G` |

    Converte um **número de ponto flutuante** para notação decimal ou de expoente decimal dependendo do valor e da _precisão_.
Para o estilo de conversão `g`, uma conversão com estilo `e` ou `f` será realizada.
Para o estilo de conversão `G`, uma conversão com estilo `E` ou `F` será realizada.
Seja `P` igual à precisão se não for zero, 6 se a precisão não for especificada, ou 1 se a precisão for ​0​. Então, se uma conversão com estilo `E` tivesse um expoente de `X`:
*   se _P > X ≥ −4_, a conversão é com estilo `f` ou `F` e precisão _P − 1 − X_.
*   caso contrário, a conversão é com estilo `e` ou `E` e precisão _P − 1_.
A menos que a _representação alternativa_ seja solicitada, os zeros à direita são removidos, e o caractere de ponto decimal também é removido se nenhuma parte fracionária for deixada. Para o estilo de conversão de infinito e não-número, veja as notas. | N/A | N/A | N/A | N/A | N/A | N/A
`n` |

    Retorna o **número de caracteres escritos** até agora por esta chamada à função.
O resultado é _escrito_ para o valor apontado pelo argumento. A especificação não pode conter nenhuma _flag_, _largura de campo_ ou _precisão_. | signed char* | short* | int* | long* | long long* | intmax_t* | signed size_t* | ptrdiff_t* | N/A
---|---|---|---|---|---|---|---|---|---
`p` | Escreve uma sequência de caracteres definida pela implementação que define um **ponteiro**. | N/A | N/A | void* | N/A | N/A | N/A | N/A | N/A

As funções de conversão de ponto flutuante convertem infinito para `inf` ou `infinity`. Qual delas é usada é definida pela implementação.

Não-é-um-número é convertido para `nan` ou `nan(_char_sequence_)`. Qual delas é usada é definida pela implementação.

As conversões `F`, `E`, `G`, `A` produzem `INF`, `INFINITY`, `NAN` em vez disso.

O especificador de conversão usado para imprimir char, unsigned char, signed char, short e unsigned short espera tipos promovidos de [promoções de argumento padrão](<#/doc/language/variadic_arguments>), mas antes de imprimir seu valor será convertido para char, unsigned char, signed char, short e unsigned short. É seguro passar valores desses tipos devido à promoção que ocorre quando uma função variádica é chamada.

As especificações de conversão corretas para os tipos de caracteres de largura fixa (int8_t, etc) são definidas no cabeçalho [`<cinttypes>`](<#/doc/header/cinttypes>) (embora [PRIdMAX](<#/doc/types/integer>), [PRIuMAX](<#/doc/types/integer>), etc sejam sinônimos de `%jd`, `%ju`, etc).

O especificador de conversão de escrita de memória `%n` é um alvo comum de exploits de segurança onde as strings de formato dependem da entrada do usuário e não é suportado pela família de funções `printf_s` com verificação de limites.

Existe um [ponto de sequência](<#/doc/language/eval_order>) após a ação de cada especificador de conversão; isso permite armazenar múltiplos resultados de `%n` na mesma variável ou, como um caso extremo, imprimir uma string modificada por um `%n` anterior dentro da mesma chamada.

Se uma especificação de conversão for inválida, o comportamento é indefinido.

### Valor de retorno

1,2) Número de wide characters escritos se bem-sucedido ou valor negativo se ocorreu um erro.

3) Número de wide characters escritos (sem contar o wide character nulo terminador) se bem-sucedido ou valor negativo se ocorreu um erro de codificação ou se o número de caracteres a serem gerados foi igual ou maior que `size`.

### Notas

Enquanto strings narrow fornecem [std::vsnprintf](<#/doc/io/c/vfprintf>), o que torna possível determinar o tamanho do buffer de saída necessário, não há equivalente para wide strings, e para determinar o tamanho do buffer, o programa pode precisar chamar `std::vswprintf`, verificar o valor do resultado e realocar um buffer maior, tentando novamente até ter sucesso.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ vprintfvfprintfvsprintfvsnprintf](<#/doc/io/c/vfprintf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
usando lista de argumentos variáveis
(função)
[ wprintffwprintfswprintf](<#/doc/io/c/fwprintf>) | imprime saída formatada de wide characters para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[Documentação C](<#/>) para vwprintf, vfwprintf, vswprintf