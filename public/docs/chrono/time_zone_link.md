# std::chrono::time_zone_link

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class time_zone_link;
```

  
A classe `time_zone_link` representa um nome alternativo para um fuso horário.

Usuários não podem construir objetos `time_zone_link`. A implementação da biblioteca cria objetos `time_zone_link` quando inicializa o banco de dados de fuso horário e fornece acesso const a esses objetos.

`time_zone_link` não é copiável, mas possui um construtor de movimento padrão e um operador de atribuição de movimento padrão. No entanto, como os usuários têm apenas acesso const a objetos `time_zone_link`, essas funções não podem ser chamadas no código do usuário sem invocar [comportamento indefinido](<#/doc/language/ub>).

### Funções membro

[ nametarget](<#/doc/chrono/time_zone_link/accessors>) | acessa o nome e o alvo deste `time_zone_link`   
(função membro pública)  
  
### Funções não membro

[ operator==operator<=>](<#/doc/chrono/time_zone_link/operator_cmp>)(C++20) | compara dois objetos `time_zone_link`   
(função)  