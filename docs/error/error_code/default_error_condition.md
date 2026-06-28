# std::error_code::default_error_condition

```cpp
std::error_condition default_error_condition() const noexcept;  // (desde C++11)
```

Retorna a condição de erro padrão para o valor de erro atual.

Equivalente a category().default_error_condition(value()).

### Parâmetros

(nenhum)

### Valor de retorno

A condição de erro padrão para o valor de erro atual.