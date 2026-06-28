# std::shared_future&lt;T&gt;::wait_until

```cpp
template< class Clock, class Duration >
std::future_status wait_until( const std::chrono::time_point<Clock,Duration>& timeout_time ) const;  // (desde C++11)
```

  
`wait_until` aguarda que um resultado se torne disponível. Ele bloqueia até que o `timeout_time` especificado seja atingido ou o resultado se torne disponível, o que ocorrer primeiro. O valor de retorno indica por que `wait_until` retornou.

Se o future for o resultado de uma chamada para [async](<#/doc/thread/async>) que usou lazy evaluation, esta função retorna imediatamente sem esperar.

O comportamento é indefinido se [valid()](<#/doc/thread/shared_future/valid>) for `false` antes da chamada a esta função, ou se `Clock` não atender aos requisitos de [Clock](<#/doc/named_req/Clock>). O programa é ill-formed se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for `false`. (desde C++20)

### Parâmetros

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Valor de retorno

Constante  |  Explicação   
---|---
[`future_status::deferred`](<#/doc/thread/future_status>) |  O estado compartilhado contém uma função adiada (deferred function) usando lazy evaluation, então o resultado será computado apenas quando explicitamente solicitado   
[`future_status::ready`](<#/doc/thread/future_status>) |  O resultado está pronto   
[`future_status::timeout`](<#/doc/thread/future_status>) |  O timeout expirou   
  
### Exceções

Qualquer exceção lançada por `clock`, `time_point` ou `duration` durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Observações

As implementações são encorajadas a detectar o caso em que `valid() == false` antes da chamada e lançar uma [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [`future_errc::no_state`](<#/doc/thread/future_errc>).

O padrão recomenda que o `clock` associado a `timeout_time` seja usado para medir o tempo; esse `clock` não é obrigado a ser um monotonic clock. Não há garantias quanto ao comportamento desta função se o `clock` for ajustado de forma descontínua, mas as implementações existentes convertem `timeout_time` de `Clock` para [std::chrono::system_clock](<#/doc/chrono/system_clock>) e delegam a [`pthread_cond_timedwait`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_cond_timedwait.html>) do POSIX para que a espera respeite os ajustes no system clock, mas não no `Clock` fornecido pelo usuário. Em qualquer caso, a função também pode esperar por mais tempo do que até que `timeout_time` tenha sido atingido devido a atrasos de agendamento ou contenção de recursos.

  

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ wait](<#/doc/thread/shared_future/wait>) |  aguarda que o resultado se torne disponível   
(função membro pública)  
[ wait_for](<#/doc/thread/shared_future/wait_for>) |  aguarda o resultado, retorna se ele não estiver disponível pela duração de timeout especificada   
(função membro pública)