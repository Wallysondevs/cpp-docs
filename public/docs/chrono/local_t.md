# std::chrono::local_t

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
struct local_t {};
```

  
A classe `local_t` é um pseudo-relógio que é usado como o primeiro argumento de template para [std::chrono::time_point](<#/doc/chrono/time_point>) para indicar que o time point representa tempo local em relação a um fuso horário ainda não especificado. `local_time` suporta streaming e o conjunto completo de aritmética de time point. 

### Família de time point 

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using local_time = std::chrono::time_point<std::chrono::local_t, Duration>;  // (desde C++20)
using local_seconds = local_time<std::chrono::seconds>;  // (desde C++20)
using local_days = local_time<std::chrono::days>;  // (desde C++20)
```

[ operator<<(std::chrono::local_time)](<#/doc/chrono/local_t/operator_ltlt>)(C++20) |  realiza saída de stream em um `local_time`   
(modelo de função)  
[ from_stream(std::chrono::local_time)](<#/doc/chrono/local_t/from_stream>)(C++20) |  analisa um `local_time` de um stream de acordo com o formato fornecido   
(modelo de função)  
[ std::formatter<std::chrono::local_time>](<#/doc/chrono/local_t/formatter>)(C++20) |  suporte a formatação para `local_time`   
(especialização de modelo de classe)  
  
### Veja também

[ zoned_time](<#/doc/chrono/zoned_time>)(C++20) |  representa um fuso horário e um time point   
(classe)  