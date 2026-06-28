# std::chrono::duration_values&lt;Rep&gt;::max

```cpp
static constexpr Rep max();  // (desde C++11)
(até C++20)
static constexpr Rep max() noexcept;  // (desde C++20)
```

  
Retorna a maior representação possível.

### Parâmetros

(nenhum)

### Valor de retorno

[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;Rep&gt;::max()

### Veja também

[ max](<#/doc/chrono/duration/max>)[static] |  retorna o valor de duração especial max   
(função membro estática pública de `std::chrono::duration<Rep,Period>`)  
[ zero](<#/doc/chrono/duration_values/zero>)[static] |  retorna uma representação de comprimento zero   
(função membro estática pública)  
[ min](<#/doc/chrono/duration_values/min>)[static] |  retorna a menor representação possível   
(função membro estática pública)