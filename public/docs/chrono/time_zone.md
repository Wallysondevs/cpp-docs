# std::chrono::time_zone

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class time_zone;
```

A classe `time_zone` representa todas as transições de fuso horário para uma área geográfica específica.

Usuários não podem construir objetos `time_zone`. A implementação da biblioteca cria objetos `time_zone` quando inicializa o banco de dados de fuso horário e fornece acesso const a esses objetos.

`time_zone` não é copiável, mas possui um construtor de movimento padrão e um operador de atribuição de movimento padrão. No entanto, como os usuários têm apenas acesso const a objetos `time_zone`, essas funções não podem ser chamadas em código de usuário sem invocar [comportamento indefinido](<#/doc/language/ub>).

### Funções membro

[ name](<#/doc/chrono/time_zone/name>) | obtém o nome desta `time_zone`
(função membro pública)
[ get_info](<#/doc/chrono/time_zone/get_info>) | obtém informações associadas a um sys_time ou local_time
(função membro pública)
[ to_sys](<#/doc/chrono/time_zone/to_sys>) | converte um local_time neste fuso horário para um sys_time
(função membro pública)
[ to_local](<#/doc/chrono/time_zone/to_local>) | converte um sys_time para um local_time neste fuso horário
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/time_zone/operator_cmp>)(C++20) | compara dois objetos `time_zone`
(função)