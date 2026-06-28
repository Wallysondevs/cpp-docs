# std::chrono::current_zone

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
const std::chrono::time_zone* current_zone();
```

Função de conveniência para obter o fuso horário local do banco de dados de fuso horário. Equivalente a [std::chrono::get_tzdb](<#/doc/chrono/tzdb_functions>)().current_zone().

### Exceções

[std::runtime_error](<#/doc/error/runtime_error>) se esta for a primeira referência ao banco de dados de fuso horário e o banco de dados de fuso horário não puder ser inicializado.

### Notas

Uma chamada a esta função que seja a primeira referência ao banco de dados de fuso horário fará com que ele seja inicializado.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main() {
        const std::chrono::zoned_time cur_time{ std::chrono::current_zone(),
                                                std::chrono::system_clock::now() };
        std::cout << cur_time << '\n';
    }
```

Saída possível:
```
    2021-09-13 19:46:42.249182012 MAGT
```

### Veja também

[ current_zone](<#/doc/chrono/tzdb/current_zone>) | retorna o fuso horário local
(função membro pública de `std::chrono::tzdb`)
[ get_tzdbget_tzdb_listreload_tzdbremote_version](<#/doc/chrono/tzdb_functions>)(C++20) | acessa e controla as informações do banco de dados global de fuso horário
(função)