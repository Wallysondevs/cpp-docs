# std::packaged_task&lt;R(Args...)&gt;::operator()

```cpp
void operator()( ArgTypes... args );
```
(desde C++11)

Chama a tarefa armazenada como se por [`_INVOKE <R>_`](<#/doc/utility/functional>)(f, args...), onde f é a tarefa armazenada. O valor de retorno da tarefa ou quaisquer exceções lançadas são armazenados no estado compartilhado. O estado compartilhado é preparado e quaisquer threads esperando por ele são desbloqueadas.

### Parâmetros

- `args` — os parâmetros a serem passados na invocação da tarefa armazenada

### Valor de retorno

(nenhum)

### Exceções

[`std::future_error`](<#/doc/thread/future_error>) nas seguintes condições de erro:

*   A tarefa armazenada já foi invocada. A categoria de erro é definida como [`promise_already_satisfied`](<#/doc/thread/future_errc>).
*   `*this` não possui estado compartilhado. A categoria de erro é definida como [`no_state`](<#/doc/thread/future_errc>).

### Exemplo

| Esta seção está incompleta
| Razão: nenhum exemplo
|---|

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2142](<https://cplusplus.github.io/LWG/issue2142>) | C++11 | uma chamada bem-sucedida a operator() sincronizada com uma chamada a qualquer função membro de um [`std::future`](<#/doc/thread/future>) ou [`std::shared_future`](<#/doc/thread/shared_future>) que compartilha seu estado compartilhado com `*this` | nenhuma garantia de sincronização adicional além do que já é fornecido pelo estado compartilhado

### Veja também

[`make_ready_at_thread_exit`](<#/doc/thread/packaged_task/make_ready_at_thread_exit>) | executa a função garantindo que o resultado esteja pronto somente quando a thread atual sair
(função membro pública)