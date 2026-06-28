# std::chrono::file_clock::to_sys, std::chrono::file_clock::from_sys

```cpp
template< class Duration >
static std::chrono::sys_time</*see below*/>
to_sys( const std::chrono::file_time<Duration>& t );  // (1) (desde C++20)
(optional*)
template< class Duration >
static std::chrono::file_time</*see below*/>
from_sys( const std::chrono::sys_time<Duration>& t );  // (2) (desde C++20)
(optional*)
```

  
1) Converte o `file_time` t para um `sys_time` representando o mesmo ponto no tempo.

2) Converte o `sys_time` t para um `file_time` representando o mesmo ponto no tempo.

A duração do tipo de retorno é computada a partir de `Duration` de uma maneira não especificada.

Esses function templates são opcionais: uma implementação pode optar por fornecer [`to_utc()`](<#/doc/chrono/file_clock/to_from_utc>) e [`from_utc()`](<#/doc/chrono/file_clock/to_from_utc>) em vez disso.

### Valor de retorno

1) Um `sys_time` representando o mesmo ponto no tempo que o argumento.

2) Um `file_time` representando o mesmo ponto no tempo que o argumento.

### Observações

O código do usuário geralmente deve usar [std::chrono::clock_cast](<#/doc/chrono/clock_cast>), que fornece uma interface genérica para converter pontos no tempo entre clocks, em vez de chamar essas funções diretamente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ to_utcfrom_utc](<#/doc/chrono/file_clock/to_from_utc>)[static] (opcional) | converte entre `file_time` e `utc_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro   
(function template)