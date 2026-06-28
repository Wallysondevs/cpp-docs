# std::barrier&lt;CompletionFunction&gt;::arrive_and_drop

```cpp
void arrive_and_drop();  // (desde C++20)
```

Decrementa o contador esperado inicial para todas as fases subsequentes em um, e então decrementa o contador esperado para a fase atual em um.

Esta função é executada atomicamente. A chamada a esta função [strongly happens-before](<#/doc/atomic/memory_order>) o início da etapa de conclusão da fase atual.

O comportamento é indefinido se o contador esperado para a fase atual for zero.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos mutex em caso de erro.

### Observações

Esta função pode fazer com que a etapa de conclusão da fase atual seja iniciada.

Se o contador esperado atual for zero antes de chamar esta função, o contador esperado inicial para todas as fases subsequentes também será zero, o que significa que a `barrier` não pode ser reutilizada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo