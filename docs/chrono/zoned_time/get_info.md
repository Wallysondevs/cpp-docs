# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::get_info

[std::chrono::sys_info](<#/doc/chrono/sys_info>) get_info() const; |  |  (desde C++20)  

  
Obtém o `std::chrono::sys_info` contendo informações sobre o fuso horário no ponto no tempo armazenado em `*this`.

### Valor de retorno

`zone->get_info(tp)`, onde `zone` é o membro de dados não estático que contém o ponteiro para o fuso horário, e `tp` é o membro de dados não estático que contém o ponto no tempo armazenado (como um [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;duration&gt;).