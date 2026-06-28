# std::chrono::tzdb_list

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class tzdb_list;
```

  
`tzdb_list` é uma lista singleton de std::chrono::tzdbs, cada uma das quais representa uma cópia do banco de dados de fuso horário IANA. Usuários não podem construir um `tzdb_list` e só podem obter acesso a um através da função livre std::chrono::get_tzdb_list. 

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`const_iterator` |  [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) constante cujo tipo de valor é std::chrono::tzdb  
  
### Funções de membro

(construtor)(deleted) |  construtor de cópia é definido como deletado   
(função de membro pública)  
operator=(deleted) |  operador de atribuição de cópia é definido como deletado   
(função de membro pública)  
[ front](<#/doc/chrono/tzdb_list/front>) |  acessa o primeiro elemento   
(função de membro pública)  
[ erase_after](<#/doc/chrono/tzdb_list/erase_after>) |  apaga um elemento após outro elemento   
(função de membro pública)  
[ begincbegin](<#/doc/chrono/tzdb_list/begin>) |  retorna um iterator para o início da lista   
(função de membro pública)  
[ endcend](<#/doc/chrono/tzdb_list/end>) |  retorna um iterator após o fim da lista   
(função de membro pública)