# std::chrono::tzdb::locate_zone

const [std::chrono::time_zone](<#/doc/chrono/time_zone>)* locate_zone( [std::string_view](<#/doc/string/basic_string_view>) tz_name ) const; |  |  (desde C++20)  

  
Obtém um ponteiro para um std::chrono::time_zone neste banco de dados que representa o fuso horário designado por tz_name. Se p for o ponteiro retornado, então ou p->name() == tz_name ou existe um [std::chrono::time_zone_link](<#/doc/chrono/time_zone_link>) l neste banco de dados tal que p->name() == l.target() && l.name() == tz_name. 

### Valor de retorno

Um ponteiro para o std::chrono::time_zone neste banco de dados que representa o fuso horário designado por tz_name. 

### Exceções

Lança [std::runtime_error](<#/doc/error/runtime_error>) se nenhum `time_zone` correspondente puder ser encontrado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   