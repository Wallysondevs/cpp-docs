# SIGTERM, SIGSEGV, SIGINT, SIGILL, SIGABRT, SIGFPE

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`

```c
#define SIGTERM /*implementation defined*/
#define SIGSEGV /*implementation defined*/
#define SIGINT /*implementation defined*/
#define SIGILL /*implementation defined*/
#define SIGABRT /*implementation defined*/
#define SIGFPE /*implementation defined*/
```

Cada uma das constantes de macro acima se expande para uma expressão constante inteira com valores distintos, que representam diferentes sinais enviados ao programa.

Constante | Explicação
---|---
`SIGTERM` | solicitação de término, enviada ao programa
`SIGSEGV` | acesso inválido à memória (falha de segmentação)
`SIGINT` | interrupção externa, geralmente iniciada pelo usuário
`SIGILL` | imagem de programa inválida, como uma instrução inválida
`SIGABRT` | condição de término anormal, como por exemplo iniciada por [std::abort()](<#/doc/utility/program/abort>)
`SIGFPE` | operação aritmética errônea, como divisão por zero

### Notas

Nomes de sinal adicionais [são especificados pelo POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/signal.h.html>).

### Veja também

[ signal](<#/doc/utility/program/signal>) | define um manipulador de sinal para um sinal específico
(function)
[ raise](<#/doc/utility/program/raise>) | executa o manipulador de sinal para um sinal específico
(function)
[Documentação C](<#/>) para tipos de sinal