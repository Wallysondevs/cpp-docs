# std::messages_base

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class messages_base;
```

A classe `std::messages_base` fornece uma definição de tipo que é herdada e usada pelas facets [std::messages](<#/doc/locale/messages>).

### Tipos de membros

Tipo de membro | Definição
---|---
`catalog` | Um tipo inteiro assinado não especificado

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2028](<https://cplusplus.github.io/LWG/issue2028>) | C++98 | `catalog` era definido como int | definido como um tipo inteiro assinado não especificado[1](<#/doc/locale/messages_base>)

1. [↑](<#/doc/locale/messages_base>) O tipo de catálogo `nl_catd` usado na [POSIX messaging API](<https://unix.org/version4/>) é um typedef de um tipo não especificado.

### Ver também

[ messages](<#/doc/locale/messages>) | implementa a recuperação de strings de catálogos de mensagens
(modelo de classe)