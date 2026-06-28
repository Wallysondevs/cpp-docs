# std::barrier&lt;CompletionFunction&gt;::arrive_and_wait

```cpp
void arrive_and_wait();  // (desde C++20)
```

  
Decrementa atomicamente a contagem esperada em 1, então bloqueia no ponto de sincronização para a fase atual até que a etapa de conclusão da fase atual seja executada. Equivalente a wait(arrive());.

O comportamento é indefinido se a contagem esperada para a fase atual for zero.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos de mutex em caso de erro.

### Observações

Se a contagem esperada atual for decrementada para zero na chamada a esta função, a etapa de conclusão da fase é executada e esta função não bloqueia.

Se a contagem esperada atual for zero antes de chamar esta função, a contagem esperada inicial para todas as fases subsequentes também é zero, o que significa que a `barrier` não pode ser reutilizada.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   