# std::chrono::leap_second

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class leap_second;
```

A classe `leap_second` representa a data e hora de uma inserção de segundo bissexto.

Usuários não podem construir objetos `leap_second` exceto copiando de objetos `leap_second` existentes. A implementação da biblioteca cria objetos `leap_second` quando inicializa o banco de dados de fuso horário e fornece acesso const a esses objetos.

`leap_second` possui um construtor de cópia padrão e um operador de atribuição de cópia padrão.

### Funções membro

[ date](<#/doc/chrono/leap_second/date>) | obtém o tempo de inserção do segundo bissexto
(função membro pública)

### Funções não-membro

[ operator==operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/leap_second/operator_cmp>)(C++20) | compara dois valores `leap_second` ou um valor `leap_second` e um sys_time
(modelo de função)

### Classes auxiliares

[ std::hash<std::chrono::leap_second>](<#/doc/chrono/leap_second/hash>)(C++26) | suporte a hash para `std::chrono::leap_second`
(especialização de modelo de classe)