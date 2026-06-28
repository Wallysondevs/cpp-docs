# std::chrono::locate_zone

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
const std::chrono::time_zone* locate_zone( std::string_view tz_name );
```

Função de conveniência para localizar um fuso horário no banco de dados de fuso horário. Equivalente a [std::chrono::get_tzdb](<#/doc/chrono/tzdb_functions>)().locate_zone(tz_name).

### Exceções

[std::runtime_error](<#/doc/error/runtime_error>) se o fuso horário especificado não puder ser encontrado, ou se esta for a primeira referência ao banco de dados de fuso horário e o banco de dados de fuso horário não puder ser inicializado.

### Notas

Uma chamada a esta função que seja a primeira referência ao banco de dados de fuso horário fará com que ele seja inicializado.

### Veja também

[ locate_zone](<#/doc/chrono/tzdb/locate_zone>) | localiza um fuso horário com o nome fornecido
(função membro pública de `std::chrono::tzdb`)
[ get_tzdbget_tzdb_listreload_tzdbremote_version](<#/doc/chrono/tzdb_functions>)(C++20) | acessa e controla as informações globais do banco de dados de fuso horário
(função)