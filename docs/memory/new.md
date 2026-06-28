# Gerenciamento de memória de baixo nível

A [new-expression](<#/doc/language/new>) é a única forma de criar um objeto ou um array de objetos com duração de armazenamento dinâmica, ou seja, com tempo de vida não restrito ao escopo no qual é criado. Uma new-expression obtém armazenamento chamando uma função de alocação. Uma [delete-expression](<#/doc/language/delete>) destrói um objeto mais derivado ou um array criado por uma new-expression e chama a função de desalocação. As funções de alocação e desalocação padrão, juntamente com funções, tipos e objetos relacionados, são declarados no header [`<new>`](<#/doc/header/new>).

Definido no header `[<new>](<#/doc/header/new>)`
---

##### Funções

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ operator deleteoperator delete[]](<#/doc/memory/new/operator_delete>) | funções de desalocação
(função)
[ get_new_handler](<#/doc/memory/new/get_new_handler>)(desde C++11) | obtém o new handler atual
(função)
[ set_new_handler](<#/doc/memory/new/set_new_handler>) | registra um new handler
(função)

##### Classes

[ bad_alloc](<#/doc/memory/new/bad_alloc>) | exceção lançada quando a alocação de memória falha
(classe)
[ bad_array_new_length](<#/doc/memory/new/bad_array_new_length>)(desde C++11) | exceção lançada na alocação de array com comprimento inválido
(classe)
[ align_val_t](<#/doc/memory/new/align_val_t>)(desde C++17) | tipo usado para passar alinhamento para funções de alocação e desalocação cientes de alinhamento
(enum)

##### Tipos

[ new_handler](<#/doc/memory/new/new_handler>) | tipo de ponteiro para função do new handler
(typedef)

##### Objetos

[ nothrownothrow_t](<#/doc/memory/new/nothrow>) | uma tag usada para selecionar uma _função de alocação_ que não lança exceções
(tag)
[ destroying_deletedestroying_delete_t](<#/doc/memory/new/destroying_delete_t>)(desde C++20) | uma tag usada para selecionar sobrecargas destroying-delete de [operator delete](<#/doc/memory/new/operator_delete>)
(tag)

##### Acesso a objetos

[ launder](<#/doc/utility/launder>)(desde C++17) | barreira de otimização de ponteiro
(function template)