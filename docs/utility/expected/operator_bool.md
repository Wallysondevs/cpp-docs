# std::expected&lt;T,E&gt;::operator bool, std::expected&lt;T,E&gt;::has_value

```cpp
constexpr explicit operator bool() const noexcept;  // (1) (desde C++23)
constexpr bool has_value() const noexcept;  // (2) (desde C++23)
```

  
Verifica se *this representa um valor esperado.

### Valor de retorno

[`_has_val_`](<#/doc/utility/expected>)

### Observações

Um objeto [`std::expected`](<#/doc/utility/expected>) nunca é sem valor. Se `has_value()` retornar true, [`operator*()`](<#/doc/utility/expected/operator_star_>) pode ser usado para acessar o valor esperado; caso contrário, [`error()`](<#/doc/utility/expected/error>) pode ser usado para acessar o valor inesperado.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[`operator->operator*`](<#/doc/utility/expected/operator_star_>) | acessa o valor esperado   
(função membro pública)  
[`error`](<#/doc/utility/expected/error>) | retorna o valor inesperado   
(função membro pública)