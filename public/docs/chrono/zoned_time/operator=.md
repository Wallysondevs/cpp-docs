# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::operator=

```cpp
zoned_time& operator=( const zoned_time& other ) = default;  // (1) (desde C++20)
zoned_time& operator=( const std::chrono::sys_time<Duration>& other );  // (2) (desde C++20)
zoned_time& operator=( const std::chrono::local_time<Duration>& other );  // (3) (desde C++20)
```

  
Atribui o valor de `other` a `*this`.

1) Operador de atribuição de cópia padrão (defaulted). Atribui por cópia tanto o time point armazenado quanto o ponteiro para o fuso horário armazenado. `zoned_time` não possui operador de atribuição de movimento; um movimento é uma cópia.

2) Atribui `other` ao time point armazenado. O ponteiro para o fuso horário permanece inalterado. Após esta chamada, `get_sys_time() == other`.

3) Converte `other` para um `std::chrono::sys_time` como se por `zone->to_sys(other)` (onde `zone` é o membro de dados não estático que contém o ponteiro para o fuso horário armazenado) e atribui o resultado ao time point armazenado. O ponteiro para o fuso horário permanece inalterado. Após esta chamada, `get_local_time() == other`.

### Valor de retorno 

`*this`