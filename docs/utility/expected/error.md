# std::expected&lt;T,E&gt;::error

```cpp
constexpr const E& error() const& noexcept;  // (1) (desde C++23)
constexpr E& error() & noexcept;  // (2) (desde C++23)
constexpr const E&& error() const&& noexcept;  // (3) (desde C++23)
constexpr E&& error() && noexcept;  // (4) (desde C++23)
```

  
Acessa o valor inesperado contido em *this.

Se [`has_value()`](<#/doc/utility/expected/operator_bool>) for true, o comportamento é indefinido.

### Valor de retorno

1,2) [`_unex_`](<#/doc/utility/expected>)

3,4) std::move(`_unex_`)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ error_or](<#/doc/utility/expected/error_or>) | retorna o valor inesperado se presente, outro valor caso contrário   
(função membro pública)  
[ operator->operator*](<#/doc/utility/expected/operator_star_>) | acessa o valor esperado   
(função membro pública)  
[ value](<#/doc/utility/expected/value>) | retorna o valor esperado   
(função membro pública)  
[ operator boolhas_value](<#/doc/utility/expected/operator_bool>) | verifica se o objeto contém um valor esperado   
(função membro pública)