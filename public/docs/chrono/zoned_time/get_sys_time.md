# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::operator sys_time&lt;duration&gt;, std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::get_sys_time

```cpp
operator std::chrono::sys_time<duration>() const;  // (desde C++20)
std::chrono::sys_time<duration> get_sys_time() const;  // (desde C++20)
```

  
Obtém um [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;duration&gt; representando o mesmo ponto no tempo que este objeto `zoned_time`.

### Valor de retorno

Um [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;duration&gt; representando o mesmo ponto no tempo que *this.