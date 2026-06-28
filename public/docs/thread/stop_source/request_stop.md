# std::stop_source::request_stop

```cpp
bool request_stop() noexcept;  // (desde C++20)
```

  
Emite uma requisição de parada para o stop-state, se o objeto `stop_source` possuir um stop-state e se uma parada ainda não tiver sido solicitada.

A determinação é feita atomicamente, e se a parada foi solicitada, o stop-state é atomicamente atualizado para evitar condições de corrida, de modo que:

  * stop_requested() e stop_possible() podem ser invocados concorrentemente em outros `stop_token`s e `stop_source`s do mesmo stop-state;
  * request_stop() pode ser invocado concorrentemente em outros objetos `stop_source`, e apenas um realmente realizará a requisição de parada.

No entanto, veja a seção Notas.

### Parâmetros

(nenhum)

### Valor de retorno

true se o objeto `stop_source` possuir um stop-state e esta invocação fez uma requisição de parada, caso contrário false.

### Pós-condições

stop_possible() é false ou stop_requested() é true.

### Notas

Se request_stop() emitir uma requisição de parada (ou seja, retornar true), então quaisquer `stop_callback`s registrados para o mesmo stop-state associado serão invocados sincronicamente, na mesma thread em que request_stop() foi emitido. Se uma invocação de um callback sair via uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado.

Se o objeto `stop_source` possuir um stop-state mas uma requisição de parada já tiver sido feita, esta função retorna false. No entanto, não há garantia de que outro objeto `stop_source` que acabou de solicitar (com sucesso) uma parada não esteja ainda no meio da invocação de uma função `stop_callback`.

Se request_stop() emitir uma requisição de parada (ou seja, retornar true), então todas as variáveis de condição do tipo base [std::condition_variable_any](<#/doc/thread/condition_variable_any>) registradas com uma espera interruptível para `stop_token`s associados ao stop-state do `stop_source` serão notificadas.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   