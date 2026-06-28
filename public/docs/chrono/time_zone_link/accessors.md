# std::chrono::time_zone_link::name, std::chrono::time_zone_link::target

```cpp
std::string_view name() const noexcept;  // (1)
std::string_view target() const noexcept;  // (2)
```

  
Acessa o nome e o alvo deste objeto `time_zone_link`. 

### Valor de retorno

1) O nome alternativo que este objeto `time_zone_link` representa.

2) O nome da `std::chrono::time_zone` para a qual este objeto `time_zone_link` fornece um nome alternativo.