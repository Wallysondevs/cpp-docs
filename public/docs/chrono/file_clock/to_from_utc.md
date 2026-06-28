# std::chrono::file_clock::to_utc, std::chrono::file_clock::from_utc

```cpp
template< class Duration >
static std::chrono::utc_time</* see below */>
to_utc( const std::chrono::file_time<Duration>& t );  // (1) (desde C++20)
(opcional*)
template< class Duration >
static std::chrono::file_time</* see below */>
from_utc( const std::chrono::utc_time<Duration>& t );  // (2) (desde C++20)
(opcional*)
```

  
1) Converte o `file_time` t para um `utc_time` representando o mesmo ponto no tempo.

2) Converte o `utc_time` t para um `file_time` representando o mesmo ponto no tempo.

A duração do tipo de retorno é computada a partir de `Duration` de uma maneira não especificada. 

Esses function templates são opcionais: uma implementação pode optar por fornecer em vez disso [`to_sys()`](<#/doc/chrono/file_clock/to_from_sys>) e [`from_sys()`](<#/doc/chrono/file_clock/to_from_sys>). 

### Valor de retorno

1) Um `utc_time` representando o mesmo ponto no tempo que o argumento.

2) Um `file_time` representando o mesmo ponto no tempo que o argumento.

### Notas

O código do usuário deve geralmente usar [std::chrono::clock_cast](<#/doc/chrono/clock_cast>), que fornece uma interface genérica para converter pontos no tempo entre clocks, em vez de chamar essas funções diretamente. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ to_sysfrom_sys](<#/doc/chrono/file_clock/to_from_sys>)[static] (opcional) |  converte entre `file_time` e `sys_time`   
(função membro estática pública)  
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) |  converte pontos no tempo de um clock para outro   
(function template)