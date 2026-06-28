# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::get_time_zone

TimeZonePtr get_time_zone() const; |  |  (desde C++20)  

  
Recupera o ponteiro de fuso horário armazenado. 

### Valor de retorno

Uma cópia do ponteiro de fuso horário armazenado. 

### Observações

Não há como acessar o ponteiro de fuso horário quando `TimeZonePtr` é um tipo *move-only*. 