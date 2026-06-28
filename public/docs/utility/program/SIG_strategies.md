# SIG_DFL, SIG_IGN

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`

```c
#define SIG_DFL /*implementation defined*/
#define SIG_IGN /*implementation defined*/
```

As macros **SIG_DFL** e **SIG_IGN** expandem-se em expressões integrais que não são iguais ao endereço de nenhuma função. As macros definem estratégias de tratamento de sinal para a função [std::signal](<#/doc/utility/program/signal>)().

Constante | Explicação
---|---
`SIG_DFL` | tratamento de sinal padrão
`SIG_IGN` | sinal é ignorado

### Veja também

[Documentação C](<#/>) para SIG_DFL, SIG_IGN
---