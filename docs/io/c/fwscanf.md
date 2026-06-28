# std::wscanf, std::fwscanf, std::swscanf

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wscanf( const wchar_t* format, ... );
int fwscanf( std::FILE* stream, const wchar_t* format, ... );
int swscanf( const wchar_t* buffer, const wchar_t* format, ... );
```

Lê dados de uma variedade de fontes, interpreta-os de acordo com `format` e armazena os resultados nos locais fornecidos.

1) Lê os dados de [stdin](<#/doc/io/c/std_streams>).

2) Lê os dados do stream de arquivo `stream`.

3) Lê os dados da string larga terminada em nulo `buffer`.

### Parâmetros

- **stream** — stream de arquivo de entrada para ler
- **buffer** — ponteiro para uma string larga terminada em nulo para ler
- **format** — ponteiro para uma string larga terminada em nulo especificando como ler a entrada
- **...** — argumentos de recebimento.

A string de **formato** consiste em

  * caracteres largos não-espaço em branco, exceto %: cada caractere desse tipo na string de formato consome exatamente um caractere idêntico do stream de entrada, ou faz com que a função falhe se o próximo caractere no stream não for igual.
  * caracteres de espaço em branco: qualquer caractere de espaço em branco único na string de formato consome todos os caracteres de espaço em branco consecutivos disponíveis da entrada (determinado como se por chamar [`iswspace`](<#/doc/string/wide/iswspace>) em um loop). Note que não há diferença entre "\n", " ", "\t\t", ou outros espaços em branco na string de formato.
  * especificações de conversão. Cada especificação de conversão tem o seguinte formato:

  * caractere % introdutório.

  * (opcional) caractere supressor de atribuição *. Se esta opção estiver presente, a função não atribui o resultado da conversão a nenhum argumento de recebimento.

  * (opcional) número inteiro (maior que zero) que especifica a _largura máxima do campo_, ou seja, o número máximo de caracteres que a função pode consumir ao fazer a conversão especificada pela especificação de conversão atual. Note que %s e %[ podem levar a estouro de buffer se a largura não for fornecida.

  * (opcional) _modificador de comprimento_ que especifica o tamanho do argumento de recebimento, ou seja, o tipo de destino real. Isso afeta a precisão da conversão e as regras de estouro. O tipo de destino padrão é diferente para cada tipo de conversão (veja a tabela abaixo).

  * especificador de formato de conversão.

Os seguintes especificadores de formato estão disponíveis:

Especificador de
conversão | Explicação | Tipo de argumento
**Modificador de comprimento →** | `hh` (desde C++11) | `h` | (nenhum) | `l` | `ll` (desde C++11) | `j` (desde C++11) | `z` (desde C++11) | `t` (desde C++11) | `L`
`%` | Corresponde ao literal `%`. | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A
`c` |

    Corresponde a um **caractere** ou uma sequência de **caracteres**.
Se um especificador de largura for usado, corresponde exatamente a _width_ caracteres largos (o argumento deve ser um ponteiro para um array com espaço suficiente). Ao contrário de %s e %[, não anexa o caractere nulo ao array. | N/A | N/A | char* | wchar_t* | N/A | N/A | N/A | N/A | N/A
`s` |

    Corresponde a uma sequência de caracteres não-espaço em branco (uma **string**).
Se um especificador de largura for usado, corresponde até _width_ ou até o primeiro caractere de espaço em branco, o que ocorrer primeiro. Sempre armazena um caractere nulo além dos caracteres correspondidos (portanto, o array de argumento deve ter espaço para pelo menos _width+1_ caracteres)
`[`set`]` |

    Corresponde a uma sequência não vazia de caracteres de um conjunto de caracteres.
Se o primeiro caractere do conjunto for `^`, então todos os caracteres que não estão no conjunto são correspondidos. Se o conjunto começar com `]` ou `^]`, então o caractere `]` também é incluído no conjunto. É definido pela implementação se o caractere `-` na posição não inicial no scanset pode indicar um range, como em `[0-9]`. Se um especificador de largura for usado, corresponde apenas até _width_. Sempre armazena um caractere nulo além dos caracteres correspondidos (portanto, o array de argumento deve ter espaço para pelo menos _width+1_ caracteres)
`d` |

    Corresponde a um **inteiro decimal**.
O formato do número é o mesmo esperado por [`wcstol`](<#/doc/string/wide/wcstol>) com o valor 10 para o argumento `base` | signed char* ou unsigned char* | signed short* ou unsigned short* | signed int* ou unsigned int* | signed long* ou unsigned long* | signed long long* ou unsigned long long* | intmax_t* ou uintmax_t* | size_t* | ptrdiff_t* | N/A
`i` |

    Corresponde a um **inteiro**.
O formato do número é o mesmo esperado por [`wcstol`](<#/doc/string/wide/wcstol>) com o valor ​0​ para o argumento `base` (a base é determinada pelos primeiros caracteres analisados)
`u` |

    Corresponde a um **inteiro decimal** sem sinal.
O formato do número é o mesmo esperado por [`wcstoul`](<#/doc/string/wide/wcstoul>) com o valor 10 para o argumento `base`.
`o` |

    Corresponde a um **inteiro octal** sem sinal.
O formato do número é o mesmo esperado por [`wcstoul`](<#/doc/string/wide/wcstoul>) com o valor 8 para o argumento `base`
`x`, `X` |

    Corresponde a um **inteiro hexadecimal** sem sinal.
O formato do número é o mesmo esperado por [`wcstoul`](<#/doc/string/wide/wcstoul>) com o valor 16 para o argumento `base`
`n` |

    Retorna o **número de caracteres lidos até agora**.
Nenhuma entrada é consumida. Não incrementa a contagem de atribuições. Se o especificador tiver o operador supressor de atribuição definido, o comportamento é indefinido
`a`, `A`(desde C++11)
`e`, `E`
`f`, `F`
`g`, `G` |

    Corresponde a um **número de ponto flutuante**.
O formato do número é o mesmo esperado por [`wcstof`](<#/doc/string/wide/wcstof>) | N/A | N/A | float* | double* | N/A | N/A | N/A | N/A | long double*
`p` |

    Corresponde a uma sequência de caracteres definida pela implementação que define um **ponteiro**.
A família de funções `printf` deve produzir a mesma sequência usando o especificador de formato `%p` | N/A | N/A | void** | N/A | N/A | N/A | N/A | N/A | N/A

Para cada especificador de conversão diferente de n, a sequência mais longa de caracteres de entrada que não excede nenhuma largura de campo especificada e que é exatamente o que o especificador de conversão espera ou é um prefixo de uma sequência que ele esperaria, é o que é consumido do stream. O primeiro caractere, se houver, após esta sequência consumida permanece não lido. Se a sequência consumida tiver comprimento zero ou se a sequência consumida não puder ser convertida conforme especificado acima, ocorre uma falha de correspondência, a menos que o fim do arquivo, um erro de codificação ou um erro de leitura tenha impedido a entrada do stream, caso em que é uma falha de entrada.

Todos os especificadores de conversão, exceto [, c e n, consomem e descartam todos os caracteres de espaço em branco iniciais (determinados como se por chamar [`iswspace`](<#/doc/string/wide/iswspace>)) antes de tentar analisar a entrada. Esses caracteres consumidos não contam para a largura máxima de campo especificada.

Se o especificador de comprimento l não for usado, os especificadores de conversão c, s e [ realizam a conversão de caractere largo para multibyte como se por chamar [`wcrtomb`](<#/doc/string/multibyte/wcrtomb>) com um objeto [`mbstate_t`](<#/doc/string/multibyte/mbstate_t>) inicializado com zero antes que o primeiro caractere seja convertido.

Os especificadores de conversão s e [ sempre armazenam o terminador nulo além dos caracteres correspondidos. O tamanho do array de destino deve ser pelo menos um maior que a largura de campo especificada. O uso de %s ou %[, sem especificar o tamanho do array de destino, é tão inseguro quanto [std::gets](<#/doc/io/c/gets>).

As especificações de conversão corretas para os [tipos inteiros de largura fixa](<#/doc/types/integer>) (int8_t, etc) são definidas no cabeçalho [`<cinttypes>`](<#/doc/header/cinttypes>) (embora [`SCNdMAX`](<#/doc/types/integer>), [`SCNuMAX`](<#/doc/types/integer>), etc sejam sinônimos de %jd, %ju, etc).

Existe um [ponto de sequência](<#/doc/language/eval_order>) após a ação de cada especificador de conversão; isso permite armazenar múltiplos campos na mesma variável "sink".

Ao analisar um valor de ponto flutuante incompleto que termina no expoente sem dígitos, como analisar "100er" com o especificador de conversão %f, a sequência "100e" (o prefixo mais longo de um número de ponto flutuante possivelmente válido) é consumida, resultando em um erro de correspondência (a sequência consumida não pode ser convertida para um número de ponto flutuante), com "r" restante. Algumas implementações existentes não seguem esta regra e retrocedem para consumir apenas "100", deixando "er", por exemplo, [glibc bug 1765](<https://sourceware.org/bugzilla/show_bug.cgi?id=1765>).

Uma especificação de conversão deve ser válida. Caso contrário, o comportamento é indefinido.

### Valor de retorno

Número de argumentos lidos com sucesso, ou [EOF](<#/doc/io/c>) se ocorrer uma falha antes que o primeiro argumento de recebimento fosse atribuído.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ vwscanfvfwscanfvswscanf](<#/doc/io/c/vfwscanf>)(desde C++11)(desde C++11)(desde C++11) | lê entrada formatada de caracteres largos de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo
ou um buffer usando lista de argumentos variáveis (função)
[documentação C](<#/>) para wscanf, fwscanf, swscanf