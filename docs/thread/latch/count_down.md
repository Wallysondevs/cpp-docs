# std::latch::count_down

void count_down( [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) n = 1 ); |  |  (desde C++20)  

  
Decrementa atomicamente o contador interno por n sem bloquear o chamador. 

Se n for maior que o valor do contador interno ou for negativo, o comportamento é indefinido. 

Esta operação [strongly happens-before](<#/doc/atomic/memory_order>) todas as chamadas que são desbloqueadas neste `latch`. 

### Parâmetros

n  |  \-  |  o valor pelo qual o contador interno é decrementado   
  
### Valor de retorno

(nenhum) 

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos mutex em caso de erro. 