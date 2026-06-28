# std::barrier&lt;CompletionFunction&gt;::arrive

`arrival_token arrive( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) n = 1 );` | | (desde C++20)

Constrói um objeto `arrival_token` associado ao ponto de sincronização de fase para a fase atual. Em seguida, decrementa a contagem esperada por `n`.

Esta função é executada atomicamente. A chamada a esta função [strongly happens-before](<#/doc/atomic/memory_order>) o início da etapa de conclusão de fase para a fase atual.

O comportamento é indefinido se `n` for menor ou igual a 0 ou maior que a contagem esperada para a fase atual da `barrier`.

### Parâmetros

- **n** — o valor pelo qual a contagem esperada é diminuída

### Valor de retorno

O objeto `arrival_token` construído.

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos de mutex em caso de erro.

### Observações

Esta função pode fazer com que a etapa de conclusão para a fase atual seja iniciada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ wait](<#/doc/thread/barrier/wait>) | bloqueia no ponto de sincronização de fase até que sua etapa de conclusão de fase seja executada
(função membro pública)