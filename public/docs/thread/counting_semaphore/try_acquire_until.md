# std::counting_semaphore&lt;LeastMaxValue&gt;::try_acquire_until

```cpp
template< class Clock, class Duration >
bool try_acquire_until( const std::chrono::time_point<Clock, Duration>& abs_time );  // (desde C++20)
```

  
Tenta decrementar atomicamente o contador interno em 1 se ele for maior que 0; caso contrário, bloqueia até que seja maior que 0 e possa decrementar com sucesso o contador interno, ou o ponto no tempo `abs_time` tenha sido ultrapassado.

O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for falso.

### Pré-condições

`Clock` atende aos requisitos de [Clock](<#/doc/named_req/Clock>).

### Parâmetros

abs_time  |  \-  |  o tempo _mais cedo_ que a função deve esperar para falhar   
  
### Valor de retorno

`true` se decrementou o contador interno, caso contrário, `false`.

### Exceções

Pode lançar [std::system_error](<#/doc/error/system_error>) ou uma exceção relacionada a tempo limite.

### Observações

Na prática, a função pode levar mais tempo do que `abs_time` para falhar.

### Veja também

[ release](<#/doc/thread/counting_semaphore/release>) |  incrementa o contador interno e desbloqueia os adquirentes   
(função membro pública)  
[ acquire](<#/doc/thread/counting_semaphore/acquire>) |  decrementa o contador interno ou bloqueia até que possa   
(função membro pública)  
[ try_acquire](<#/doc/thread/counting_semaphore/try_acquire>) |  tenta decrementar o contador interno sem bloquear   
(função membro pública)  
[ try_acquire_for](<#/doc/thread/counting_semaphore/try_acquire_for>) |  tenta decrementar o contador interno, bloqueando por até um tempo de duração   
(função membro pública)