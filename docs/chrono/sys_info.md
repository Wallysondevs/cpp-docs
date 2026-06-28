# std::chrono::sys_info

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
struct sys_info;
```

A classe `sys_info` descreve informações de fuso horário associadas a um fuso horário em um determinado ponto no tempo (representado como um `std::chrono::sys_time` ou um `std::chrono::local_time`). Esta é uma estrutura de dados de baixo nível tipicamente não usada diretamente pelo código do usuário.

### Objetos Membro

Objeto Membro | Tipo
---|---
`begin`, `end` | `std::chrono::sys_seconds`
`offset` | [std::chrono::seconds](<#/doc/chrono/duration>)
`save` | [std::chrono::minutes](<#/doc/chrono/duration>)
`abbrev` | [std::string](<#/doc/string/basic_string>)

Os membros de dados `begin` e `end` indicam o intervalo - `[`begin`, `end`)` \- no qual o `offset` e `abbrev` estão em vigor para o fuso horário associado a este `sys_info`.

Os membros de dados `offset` e `abbrev` indicam o deslocamento UTC e a abreviação do fuso horário, respectivamente, em vigor para o fuso horário associado e `[std::chrono::time_point](<#/doc/chrono/time_point>)`. Note que as abreviações de fuso horário não são únicas.

O membro de dados `save`, se não zero, indica que o fuso horário está em horário de verão no ponto no tempo especificado. Neste caso, `offset - save` é uma sugestão de qual deslocamento este fuso horário poderia usar se não estivesse em horário de verão. No entanto, esta informação não é autoritária: a única maneira de verificar o deslocamento real é consultar o fuso horário com um ponto no tempo que realmente não esteja em horário de verão (ou seja, retorna um `sys_info` tal que `save == 0min`).

### Funções Não-Membro

[ operator<<](<#/doc/chrono/sys_info/operator_ltlt>)(C++20) | envia um `sys_info` para um stream
(modelo de função)

### Classes Auxiliares

[ std::formatter<std::chrono::sys_info>](<#/doc/chrono/sys_info/formatter>)(C++20) | suporte de formatação para `sys_info`
(especialização de modelo de classe)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo