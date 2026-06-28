# std::chrono::operator==(std::chrono::zoned_time)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Duration1, class Duration2, class TimeZonePtr >
bool operator==( const std::chrono::zoned_time<Duration1, TimeZonePtr>& x,
const std::chrono::zoned_time<Duration2, TimeZonePtr>& y );
```

Compara os dois valores `zoned_time` x e y. Dois objetos `zoned_time` são considerados iguais se seus pontos no tempo (time points) e ponteiros de fuso horário (time zone pointers) forem ambos iguais de acordo com `operator==`.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.get_time_zone() == y.get_time_zone() && x.get_sys_time() == y.get_sys_time(), exceto que as comparações são realizadas diretamente nos membros de dados não estáticos de x e y e nenhuma cópia é realizada.