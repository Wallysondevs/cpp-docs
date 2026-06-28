# std::chrono::choose

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
enum class choose {
earliest,
latest
};
```

A enumeração com escopo `choose` pode ser passada para certas funções membro de `std::chrono::time_zone` e `std::chrono::zoned_time` para controlar como horários locais ambíguos ou inexistentes devem ser resolvidos. Passar `choose::earliest` faz com que o ponto no tempo mais cedo seja retornado, enquanto passar `choose::latest` faz com que o ponto no tempo mais tarde seja retornado. (Para horários locais inexistentes, esses dois pontos no tempo são idênticos.)

Se um `choose` não for passado e um horário local ambíguo ou inexistente for encontrado, uma exceção `std::chrono::ambiguous_local_time` ou `std::chrono::nonexistent_local_time` (conforme aplicável) será lançada.

### Veja também

[ (constructor)](<#/doc/chrono/zoned_time/zoned_time>) | constrói um `zoned_time`
(função membro pública de `std::chrono::zoned_time<Duration,TimeZonePtr>`)
[ to_sys](<#/doc/chrono/time_zone/to_sys>) | converte um `local_time` nesta `time zone` para um `sys_time`
(função membro pública de `std::chrono::time_zone`)