# std::chrono::clock_cast

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Dest, class Source, class Duration >
auto clock_cast( const std::chrono::time_point<Source, Duration>& t );
```

Converte o time point `t` de um clock `Source` para um time point equivalente do clock `Dest`, usando [std::chrono::system_clock](<#/doc/chrono/system_clock>) e/ou std::chrono::utc_clock como intermediários, se necessário.

*   Se a expressão [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<Dest, Source>{}(t) for bem-formada, retorna o resultado dessa expressão.
*   Caso contrário, se pelo menos uma das duas expressões a seguir for bem-formada, então

*   Se ambas as expressões forem bem-formadas, a conversão é ambígua, e o programa é mal-formado.
*   Caso contrário, exatamente uma das duas expressões é bem-formada; o resultado dessa expressão é retornado.

1) [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<Dest, [std::chrono::system_clock](<#/doc/chrono/system_clock>)>{}(
[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::system_clock](<#/doc/chrono/system_clock>), Source>{}(t))

2) [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<Dest, [std::chrono::utc_clock](<#/doc/chrono/utc_clock>)>{}(
[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::utc_clock](<#/doc/chrono/utc_clock>), Source>{}(t))

*   Caso contrário, se pelo menos uma das duas expressões a seguir for bem-formada, então

*   Se ambas as expressões forem bem-formadas, a conversão é ambígua, e o programa é mal-formado.
*   Caso contrário, exatamente uma das duas expressões é bem-formada; o resultado dessa expressão é retornado.

1) [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<Dest, [std::chrono::utc_clock](<#/doc/chrono/utc_clock>)>{}(

[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::utc_clock](<#/doc/chrono/utc_clock>), [std::chrono::system_clock](<#/doc/chrono/system_clock>)>{}(

[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::system_clock](<#/doc/chrono/system_clock>), Source>{}(t)))

2) [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<Dest, [std::chrono::system_clock](<#/doc/chrono/system_clock>)>{}(

[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::system_clock](<#/doc/chrono/system_clock>), [std::chrono::utc_clock](<#/doc/chrono/utc_clock>)>{}(

[std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)<[std::chrono::utc_clock](<#/doc/chrono/utc_clock>), Source>{}(t)))

*   Caso contrário, esta função não participa da resolução de sobrecarga.

### Valor de retorno

O resultado da conversão, determinado conforme descrito acima.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ clock_time_conversion](<#/doc/chrono/clock_time_conversion>)(C++20) | classe de traits que define como converter time points de um clock para outro
(template de classe)