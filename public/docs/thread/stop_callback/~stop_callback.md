# std::stop_callback&lt;Callback&gt;::~stop_callback

```cpp
~stop_callback();  // (desde C++20)
```

  
Destrói o objeto `stop_callback`.

Se *this possui um `stop_token` com estado de parada associado, desregistra o callback dele.

Se a função de callback estiver sendo invocada concorrentemente em outra thread, o destrutor não é concluído até que a invocação da função de callback esteja completa. Se a função de callback estiver sendo invocada na mesma thread em que o destrutor está sendo invocado, então o destrutor retorna sem esperar que a invocação do callback seja concluída (veja Notas).

### Notes

O destrutor de `stop_callback` é projetado para prevenir condições de corrida e deadlocks. Se outra thread estiver atualmente invocando o callback, então o destrutor não pode retornar até que isso seja concluído, ou então o objeto de função poderia ser destruído enquanto está sendo executado. A função de callback não é exigida ser nem copiável nem movível - ela reside no próprio objeto `stop_callback` mesmo após o registro.

Por outro lado, se a thread atual que invoca o destrutor for a mesma thread que está invocando o callback, então o destrutor não pode esperar, ou então um deadlock ocorreria. É possível e válido para a mesma thread estar destruindo o `stop_callback` enquanto invoca sua função de callback, porque a função de callback pode ela mesma destruir o `stop_callback`, direta ou indiretamente.