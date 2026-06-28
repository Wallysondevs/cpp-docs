# std::vscanf, std::vfscanf, std::vsscanf

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int vscanf( const char* format, std::va_list vlist );
int vfscanf( std::FILE* stream, const char* format, std::va_list vlist );
int vsscanf( const char* buffer, const char* format, std::va_list vlist );
```

Lê dados de uma variedade de fontes, os interpreta de acordo com o format e armazena os resultados nos locais definidos por vlist.

1) Lê os dados de [stdin](<#/doc/io/c/std_streams>).

2) Lê os dados do stream de arquivo stream.

3) Lê os dados do buffer de string de caracteres terminado em nulo.

### Parâmetros

- **stream** — stream de arquivo de entrada para ler
- **buffer** — ponteiro para uma string de caracteres terminada em nulo para ler
- **format** — ponteiro para uma string de caracteres terminada em nulo especificando como ler a entrada
- **vlist** — lista de argumentos variáveis contendo os argumentos de recebimento.

A string **format** consiste em

  * caracteres multibyte não-espaço em branco, exceto %: cada um desses caracteres na string de formato consome exatamente um caractere idêntico do stream de entrada, ou faz com que a função falhe se o próximo caractere no stream não for igual.
  * caracteres de espaço em branco: qualquer caractere de espaço em branco único na string de formato consome todos os caracteres de espaço em branco consecutivos disponíveis da entrada (determinado como se chamando [`isspace`](<#/doc/string/byte/isspace>) em um loop). Note que não há diferença entre "\n", " ", "\t\t", ou outros espaços em branco na string de formato.
  * especificações de conversão. Cada especificação de conversão tem o seguinte formato:

    

  * caractere % introdutório.

    

  * (opcional) caractere * de supressão de atribuição. Se esta opção estiver presente, a função não atribui o resultado da conversão a nenhum argumento de recebimento.

    

  * (opcional) número inteiro (maior que zero) que especifica a _largura máxima do campo_, ou seja, o número máximo de caracteres que a função tem permissão para consumir ao fazer a conversão especificada pela especificação de conversão atual. Note que %s e %[ podem levar a estouro de buffer se a largura não for fornecida.

    

  * (opcional) _modificador de comprimento_ que especifica o tamanho do argumento de recebimento, ou seja, o tipo de destino real. Isso afeta a precisão da conversão e as regras de estouro. O tipo de destino padrão é diferente para cada tipo de conversão (veja a tabela abaixo).

    

  * especificador de formato de conversão.

Os seguintes especificadores de formato estão disponíveis:

Especificador de
conversão | Explicação | Tipo de argumento
**Modificador de comprimento →** | `hh` (desde C++11) | `h` | (nenhum) | `l` | `ll` (desde C++11) | `j` (desde C++11) | `z` (desde C++11) | `t` (desde C++11) | `L`
`%` | Corresponde ao literal `%`. | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A
`c` |

    Corresponde a um **caractere** ou uma sequência de **caracteres**.
Se um especificador de largura for usado, corresponde exatamente a _width_ caracteres (o argumento deve ser um ponteiro para um array com espaço suficiente). Ao contrário de %s e %[, não anexa o caractere nulo ao array. | N/A | N/A | char* | wchar_t* | N/A | N/A | N/A | N/A | N/A
`s` |

    Corresponde a uma sequência de caracteres não-espaço em branco (uma **string**).
Se um especificador de largura for usado, corresponde até _width_ ou até o primeiro caractere de espaço em branco, o que aparecer primeiro. Sempre armazena um caractere nulo além dos caracteres correspondidos (portanto, o array de argumento deve ter espaço para pelo menos _width+1_ caracteres)
`[`set`]` |

    Corresponde a uma sequência não vazia de caracteres do conjunto de caracteres.
Se o primeiro caractere do conjunto for `^`, então todos os caracteres que não estão no conjunto são correspondidos. Se o conjunto começar com `]` ou `^]`, então o caractere `]` também é incluído no conjunto. É definido pela implementação se o caractere `-` na posição não inicial no scanset pode indicar um range, como em `[0-9]`. Se um especificador de largura for usado, corresponde apenas até _width_. Sempre armazena um caractere nulo além dos caracteres correspondidos (portanto, o array de argumento deve ter espaço para pelo menos _width+1_ caracteres)
`d` |

    Corresponde a um **inteiro decimal**.
O formato do número é o mesmo esperado por [`strtol`](<#/doc/string/byte/strtol>) com o valor 10 para o argumento `base` | signed char* ou unsigned char* | signed short* ou unsigned short* | signed int* ou unsigned int* | signed long* ou unsigned long* | signed long long* ou unsigned long long* | intmax_t* ou uintmax_t* | size_t* | ptrdiff_t* | N/A
`i` |

    Corresponde a um **inteiro**.
O formato do número é o mesmo esperado por [`strtol`](<#/doc/string/byte/strtol>) com o valor ​0​ para o argumento `base` (a base é determinada pelos primeiros caracteres analisados)
`u` |

    Corresponde a um **inteiro decimal** sem sinal.
O formato do número é o mesmo esperado por [`strtoul`](<#/doc/string/byte/strtoul>) com o valor 10 para o argumento `base`.
`o` |

    Corresponde a um **inteiro octal** sem sinal.
O formato do número é o mesmo esperado por [`strtoul`](<#/doc/string/byte/strtoul>) com o valor 8 para o argumento `base`
`x`, `X` |

    Corresponde a um **inteiro hexadecimal** sem sinal.
O formato do número é o mesmo esperado por [`strtoul`](<#/doc/string/byte/strtoul>) com o valor 16 para o argumento `base`
`n` |

    Retorna o **número de caracteres lidos até agora**.
Nenhuma entrada é consumida. Não incrementa a contagem de atribuições. Se o especificador tiver o operador de supressão de atribuição definido, o comportamento é indefinido
`a`, `A`(desde C++11)
`e`, `E`
`f`, `F`
`g`, `G` |

    Corresponde a um **número de ponto flutuante**.
O formato do número é o mesmo esperado por [`strtof`](<#/doc/string/byte/strtof>) | N/A | N/A | float* | double* | N/A | N/A | N/A | N/A | long double*
`p` |

    Corresponde a uma sequência de caracteres definida pela implementação que define um **ponteiro**.
A família de funções `printf` deve produzir a mesma sequência usando o especificador de formato `%p` | N/A | N/A | void** | N/A | N/A | N/A | N/A | N/A | N/A

Para cada especificador de conversão diferente de n, a sequência mais longa de caracteres de entrada que não excede nenhuma largura de campo especificada e que é exatamente o que o especificador de conversão espera ou é um prefixo de uma sequência que ele esperaria, é o que é consumido do stream. O primeiro caractere, se houver, após esta sequência consumida permanece não lido. Se a sequência consumida tiver comprimento zero ou se a sequência consumida não puder ser convertida conforme especificado acima, ocorre uma falha de correspondência, a menos que o fim do arquivo, um erro de codificação ou um erro de leitura tenha impedido a entrada do stream, caso em que é uma falha de entrada.

Todos os especificadores de conversão, exceto [, c e n, consomem e descartam todos os caracteres de espaço em branco iniciais (determinados como se chamando [`isspace`](<#/doc/string/byte/isspace>)) antes de tentar analisar a entrada. Esses caracteres consumidos não contam para a largura máxima de campo especificada.

Os especificadores de conversão lc, ls e l[ realizam a conversão de caracteres multibyte para wide character como se chamassem [`mbrtowc`](<#/doc/string/multibyte/mbrtowc>) com um objeto [`mbstate_t`](<#/doc/string/multibyte/mbstate_t>) inicializado com zero antes que o primeiro caractere seja convertido.

Os especificadores de conversão s e [ sempre armazenam o terminador nulo além dos caracteres correspondidos. O tamanho do array de destino deve ser pelo menos um maior que a largura de campo especificada. O uso de %s ou %[, sem especificar o tamanho do array de destino, é tão inseguro quanto [std::gets](<#/doc/io/c/gets>).

As especificações de conversão corretas para os [tipos inteiros de largura fixa](<#/doc/types/integer>) (int8_t, etc) são definidas no cabeçalho [`<cinttypes>`](<#/doc/header/cinttypes>) (embora [`SCNdMAX`](<#/doc/types/integer>), [`SCNuMAX`](<#/doc/types/integer>), etc sejam sinônimos de %jd, %ju, etc).

Existe um [ponto de sequência](<#/doc/language/eval_order>) após a ação de cada especificador de conversão; isso permite armazenar múltiplos campos na mesma variável "sink".

Ao analisar um valor de ponto flutuante incompleto que termina no expoente sem dígitos, como analisar "100er" com o especificador de conversão %f, a sequência "100e" (o prefixo mais longo de um número de ponto flutuante possivelmente válido) é consumida, resultando em um erro de correspondência (a sequência consumida não pode ser convertida para um número de ponto flutuante), com "r" restante. Algumas implementações existentes não seguem esta regra e retrocedem para consumir apenas "100", deixando "er", por exemplo, [glibc bug 1765](<https://sourceware.org/bugzilla/show_bug.cgi?id=1765>).

Uma especificação de conversão deve ser válida. Caso contrário, o comportamento é indefinido.

### Valor de retorno

Número de argumentos lidos com sucesso, ou [EOF](<#/doc/io/c>) se ocorrer falha.

### Notas

Todas essas funções invocam [va_arg](<#/doc/utility/variadic/va_arg>) pelo menos uma vez, o valor de `arg` é indeterminado após o retorno. Essas funções não invocam [va_end](<#/doc/utility/variadic/va_end>), e isso deve ser feito pelo chamador.

### Exemplo

Execute este código
```cpp
    #include <cstdarg>
    #include <cstdio>
    #include <iostream>
    #include <stdexcept>
    
    void checked_sscanf(int count, const char* buf, const char *fmt, ...)
    {
        std::va_list ap;
        va_start(ap, fmt);
        if (std::vsscanf(buf, fmt, ap) != count)
            throw std::runtime_error("parsing error");
        va_end(ap);
    }
    
    int main()
    {
        try
        {
            int n, m;
            std::cout << "Analisando '1 2'... ";
            checked_sscanf(2, "1 2", "%d %d", &n, &m);
            std::cout << "sucesso\n";
            std::cout << "Analisando '1 a'... ";
            checked_sscanf(2, "1 a", "%d %d", &n, &m);
            std::cout << "sucesso\n";
        }
        catch (const std::exception& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída:
```
    Analisando '1 2'... sucesso
    Analisando '1 a'... parsing error
```

### Veja também

[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vprintfvfprintfvsprintfvsnprintf](<#/doc/io/c/vfprintf>)(desde C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
usando lista de argumentos variáveis
(função)
[Documentação C](<#/>) para vscanf, vfscanf, vsscanf