# std::chrono::time_zone::to_sys

```cpp
template< class Duration >
auto to_sys( const std::chrono::local_time<Duration>& tp ) const
-> std::chrono::sys_time<std::common_type_t<Duration, std::chrono::seconds>>;  // (1) (desde C++20)
template< class Duration >
auto to_sys( const std::chrono::local_time<Duration>& tp, std::chrono::choose z ) const
-> std::chrono::sys_time<std::common_type_t<Duration, std::chrono::seconds>>;  // (2) (desde C++20)
```

  
Converte o `local_time` `tp` nesta zona de tempo para o `sys_time` correspondente.

1) Lança uma exceção se a conversão for ambígua ou se `tp` representar um tempo inexistente.

2) Resolve a ambiguidade de acordo com o valor de `z`:

  * Se `z == std::chrono::choose::earliest`, retorna o `sys_time` anterior.
  * Se `z == std::chrono::choose::latest`, retorna o `sys_time` posterior.

Se `tp` representar um tempo inexistente entre dois `time_point`s UTC, esses dois `time_point`s serão os mesmos, e esse `time_point` será retornado.

### Valor de retorno

O equivalente UTC de `tp` de acordo com as regras desta zona de tempo.

### Exceções

1) Lança:

  * `[std::chrono::ambiguous_local_time](<#/doc/chrono/ambiguous_local_time>)` se a conversão for ambígua,
  * `[std::chrono::nonexistent_local_time](<#/doc/chrono/nonexistent_local_time>)` se `tp` representar um tempo inexistente.

### Observações

A precisão do resultado é de pelo menos `[std::chrono::seconds](<#/doc/chrono/duration>)`, e será mais fina se o argumento tiver precisão mais fina.

Tempos locais ambíguos e inexistentes podem ocorrer como resultado de transições de zona de tempo (como horário de verão). Por exemplo, "2016-03-13 02:30:00" não existe na zona de tempo "America/New_York", enquanto "2016-11-06 01:30:00" nessa zona de tempo pode corresponder a dois `time_point`s UTC: 2016-11-06 05:30:00 UTC e 2016-11-06 06:30:00 UTC.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   