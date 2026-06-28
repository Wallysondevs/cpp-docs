# std::chrono::duration_values&lt;Rep&gt;::min

```cpp
static constexpr Rep min();  // (desde C++11)
(até C++20)
static constexpr Rep min() noexcept;  // (desde C++20)
```

  
Retorna a menor representação possível. 

### Parâmetros

(nenhum) 

### Valor de retorno

[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;Rep&gt;::lowest()

### Veja também

[ min](<#/doc/chrono/duration/min>)[static] |  retorna o valor de duração especial min   
(função membro estática pública de `std::chrono::duration<Rep,Period>`)  
[ zero](<#/doc/chrono/duration_values/zero>)[static] |  retorna uma representação de comprimento zero   
(função membro estática pública)  
[ max](<#/doc/chrono/duration_values/max>)[static] |  retorna a maior representação possível   
(função membro estática pública)