# std::chrono::duration&lt;Rep,Period&gt;::min

```cpp
static constexpr duration min();  // (até C++20)
static constexpr duration min() noexcept;  // (desde C++20)
```

  
Retorna uma duration com o menor valor possível. 

Se a representação `rep` da duration exigir alguma outra implementação para retornar uma duration de comprimento mínimo, [std::chrono::duration_values](<#/doc/chrono/duration_values>) pode ser especializada para retornar o valor desejado. 

### Parâmetros

(nenhum) 

### Valor de retorno

duration([std::chrono::duration_values](<#/doc/chrono/duration_values>)&lt;rep&gt;::min())

### Veja também

[ zero](<#/doc/chrono/duration/zero>)[static] |  retorna o valor especial de duration zero   
(função membro estática pública)  
[ max](<#/doc/chrono/duration/max>)[static] |  retorna o valor especial de duration max   
(função membro estática pública)