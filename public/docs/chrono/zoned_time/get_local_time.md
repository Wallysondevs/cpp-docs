# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::operator local_time&lt;duration&gt;, std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::get_local_time

```cpp
std::chrono::local_time<duration> get_local_time() const;  // (desde C++20)
explicit operator std::chrono::local_time<duration>() const;  // (desde C++20)
```

Obtém um [std::chrono::local_time](<#/doc/chrono/local_t>)&lt;duration&gt; representando a hora local no fuso horário correspondente ao ponto no tempo que *this representa.

### Valor de retorno

Um [std::chrono::local_time](<#/doc/chrono/local_t>)&lt;duration&gt; calculado(a) como se por zone->to_local(get_sys_time()), onde `zone` é o membro de dados não estático que contém o ponteiro para o fuso horário armazenado.