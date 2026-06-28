# std::counting_semaphore&lt;LeastMaxValue&gt;::try_acquire_for

```cpp
template< class Rep, class Period >
bool try_acquire_for( const std::chrono::duration<Rep, Period>& rel_time );  // (desde C++20)
```

  
Tenta decrementar atomicamente o contador interno em 1 se ele for maior que 0; caso contrário, bloqueia até que ele seja maior que 0 e possa decrementar com sucesso o contador interno, ou a duração `rel_time` tenha sido excedida.

### Pré-condições

(nenhuma)

### Parâmetros

rel_time  |  \-  |  a duração _mínima_ que a função deve esperar para falhar   
  
### Valor de retorno

`true` se ele decrementou o contador interno, caso contrário `false`.

### Exceções

Pode lançar [std::system_error](<#/doc/error/system_error>) ou uma exceção relacionada a timeout.

### Observações

Na prática, a função pode levar mais tempo do que `rel_time` para falhar.

### Veja também

[ release](<#/doc/thread/counting_semaphore/release>) |  incrementa o contador interno e desbloqueia os adquirentes   
(função membro pública)  
[ acquire](<#/doc/thread/counting_semaphore/acquire>) |  decrementa o contador interno ou bloqueia até que possa   
(função membro pública)  
[ try_acquire](<#/doc/thread/counting_semaphore/try_acquire>) |  tenta decrementar o contador interno sem bloquear   
(função membro pública)  
[ try_acquire_until](<#/doc/thread/counting_semaphore/try_acquire_until>) |  tenta decrementar o contador interno, bloqueando até um ponto no tempo   
(função membro pública)